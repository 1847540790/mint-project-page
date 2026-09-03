const root = document.documentElement;
const body = document.body;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const saveData = Boolean(navigator.connection?.saveData);

function setLanguage(language) {
  const nextLanguage = language === "zh" ? "zh" : "en";
  root.dataset.language = nextLanguage;
  root.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-language-option]").forEach((option) => {
    option.classList.toggle("is-active", option.dataset.languageOption === nextLanguage);
  });
  document.title = nextLanguage === "zh"
    ? "MINT — 世界坐标系相机与双手运动估计"
    : "MINT: A Unified Model for World-Space Camera and Hand Motion Estimation";
  try {
    localStorage.setItem("mint-language", nextLanguage);
  } catch (_) {
    // Persistence is optional in privacy-restricted browsers.
  }
}

let storedLanguage = "en";
try {
  storedLanguage = localStorage.getItem("mint-language") || "en";
} catch (_) {
  storedLanguage = "en";
}
setLanguage(storedLanguage);

const distributionLabels = {
  "个人护理/穿戴": "Personal care / dressing",
  "其他": "Other",
  "办公/文具/阅读": "Office / stationery / reading",
  "包装/拆封": "Packaging / unboxing",
  "厨房/烹饪": "Kitchen / cooking",
  "园艺/户外": "Gardening / outdoors",
  "家居/家具/床品": "Home / furniture / bedding",
  "手工/编织/饰品": "Crafts / knitting / jewelry",
  "收纳/容器": "Storage / containers",
  "木工/装修/建材": "Woodwork / renovation",
  "机械/维修/工具": "Mechanical / repair / tools",
  "模型/结构组装": "Model / structural assembly",
  "清洁/洗涤": "Cleaning / washing",
  "玩具/模型": "Toys / models",
  "电子/线缆/设备": "Electronics / cables / devices",
  "益智/桌游": "Puzzles / board games",
  "纺织/衣物/洗衣": "Textile / clothing / laundry",
  "绘画/艺术": "Painting / art",
  "车辆/驾驶": "Vehicles / driving",
  "运动/健身": "Sports / fitness",
  "伸手/触碰": "Reach / touch",
  "倾倒/装填": "Pour / fill",
  "切削/剥皮": "Cut / peel",
  "工具操作": "Tool use",
  "开合": "Open / close",
  "抓握/持握": "Grasp / hold",
  "折叠/包裹": "Fold / wrap",
  "拆卸/分离": "Disassemble / separate",
  "拉动": "Pull",
  "拿取/举起": "Pick up / lift",
  "按压/推动": "Press / push",
  "插入/移除": "Insert / remove",
  "搅拌/混合": "Stir / mix",
  "放置/放下": "Place / set down",
  "旋转/翻转": "Rotate / flip",
  "清洁/擦洗": "Clean / wash",
  "移动/搬运": "Move / carry",
  "组装/连接": "Assemble / connect",
  "绘画/书写": "Draw / write",
  "调整/整理": "Adjust / arrange",
  "进食/饮用": "Eat / drink"
};

function distributionRow(label, count, total) {
  const percent = count / total * 100;
  const row = document.createElement("div");
  row.className = "bar-row";

  const heading = document.createElement("div");
  const english = document.createElement("span");
  english.className = "lang-en";
  english.textContent = distributionLabels[label] || label;
  const chinese = document.createElement("span");
  chinese.className = "lang-zh";
  chinese.textContent = label;
  const value = document.createElement("b");
  value.textContent = percent > 0 && percent < 0.05 ? "<0.1%" : `${percent.toFixed(1)}%`;
  heading.append(english, chinese, value);

  const track = document.createElement("i");
  const fill = document.createElement("span");
  fill.style.setProperty("--value", String(percent));
  track.append(fill);
  row.append(heading, track);
  return row;
}

const completeDistributionLists = [...document.querySelectorAll("[data-distribution-dataset]")];
if (completeDistributionLists.length) {
  fetch("assets/data/diversity/result.json")
    .then((response) => {
      if (!response.ok) throw new Error(`Diversity report request failed: ${response.status}`);
      return response.json();
    })
    .then((report) => {
      completeDistributionLists.forEach((list) => {
        const dataset = report.datasets.find((item) => item.dataset === list.dataset.distributionDataset);
        const counts = dataset?.text?.[list.dataset.distributionKey];
        const total = dataset?.text?.task_ids;
        if (!counts || !total) return;
        const fragment = document.createDocumentFragment();
        Object.entries(counts)
          .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
          .forEach(([label, count]) => fragment.append(distributionRow(label, count, total)));
        list.replaceChildren(fragment);
        list.classList.add("is-complete");
      });
    })
    .catch(() => {
      // The six-row HTML fallback remains visible if the report cannot be loaded.
    });
}

function toggleLanguage() {
  setLanguage(root.dataset.language === "en" ? "zh" : "en");
}

document.querySelector("[data-language-toggle]")?.addEventListener("click", toggleLanguage);
document.querySelector("[data-language-toggle-inline]")?.addEventListener("click", toggleLanguage);

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}

function closeMenu({ returnFocus = false } = {}) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  body.classList.remove("menu-open");
  if (returnFocus) menuToggle.focus();
}

function openMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.hidden = false;
  body.classList.add("menu-open");
  mobileMenu.querySelector("a")?.focus();
}

menuToggle?.addEventListener("click", () => {
  if (menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu({ returnFocus: true });
  } else {
    openMenu();
  }
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    closeMenu({ returnFocus: true });
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && body.classList.contains("menu-open")) closeMenu();
});
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const projectFilm = document.querySelector("[data-project-film]");
const chapterButtons = [...document.querySelectorAll("[data-chapter]")];

function setActiveChapter(activeChapter) {
  chapterButtons.forEach((chapter) => {
    const active = chapter === activeChapter;
    chapter.classList.toggle("is-active", active);
    chapter.setAttribute("aria-pressed", String(active));
  });
}

chapterButtons.forEach((chapter) => {
  chapter.setAttribute("aria-pressed", String(chapter.classList.contains("is-active")));
  chapter.addEventListener("click", () => {
    if (!projectFilm) return;
    projectFilm.currentTime = Number(chapter.dataset.time || 0);
    projectFilm.play().catch(() => {});
    setActiveChapter(chapter);
  });
});

projectFilm?.addEventListener("timeupdate", () => {
  const activeChapter = chapterButtons.reduce((current, chapter) => {
    return Number(chapter.dataset.time) <= projectFilm.currentTime ? chapter : current;
  }, chapterButtons[0]);
  if (activeChapter) setActiveChapter(activeChapter);
});

const sampleTabs = [...document.querySelectorAll("[data-sample-tab]")];
const samplePanels = [...document.querySelectorAll("[data-sample-panel]")];

function showSample(key) {
  samplePanels.forEach((panel) => {
    const active = panel.dataset.samplePanel === key;
    panel.hidden = !active;
    if (!active) panel.querySelectorAll("video").forEach((video) => video.pause());
  });
  sampleTabs.forEach((tab) => {
    const active = tab.dataset.sampleTab === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
}

if (sampleTabs.length) {
  sampleTabs.forEach((tab) => {
    tab.setAttribute("role", "tab");
    tab.addEventListener("click", () => showSample(tab.dataset.sampleTab));
  });
  showSample(sampleTabs[0].dataset.sampleTab);
}

const loopVideos = [...document.querySelectorAll("[data-loop-video]")];

function updateVideoButton(video) {
  const button = video.closest(".loop-frame")?.querySelector("[data-video-toggle]");
  if (!button) return;
  const paused = video.paused;
  button.setAttribute("aria-label", paused ? "Play video" : "Pause video");
  button.querySelector(".lang-en").textContent = paused ? "Play" : "Pause";
  button.querySelector(".lang-zh").textContent = paused ? "播放" : "暂停";
}

loopVideos.forEach((video) => {
  const button = video.closest(".loop-frame")?.querySelector("[data-video-toggle]");
  button?.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    window.setTimeout(() => updateVideoButton(video), 0);
  });
  video.addEventListener("play", () => updateVideoButton(video));
  video.addEventListener("pause", () => updateVideoButton(video));
  updateVideoButton(video);
});

if (reducedMotion.matches || saveData) {
  loopVideos.forEach((video) => video.pause());
} else if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && document.visibilityState === "visible") {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });
  loopVideos.forEach((video) => videoObserver.observe(video));
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") loopVideos.forEach((video) => video.pause());
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
let lightboxTrigger = null;

function closeLightbox() {
  if (!lightbox?.open) return;
  lightbox.close();
  body.classList.remove("lightbox-open");
  lightboxTrigger?.focus();
}

document.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxTrigger = trigger;
    lightboxImage.src = trigger.dataset.lightboxSrc;
    lightboxImage.alt = trigger.dataset.lightboxAlt || "";
    lightbox.showModal();
    body.classList.add("lightbox-open");
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox?.addEventListener("close", () => body.classList.remove("lightbox-open"));

const copyButton = document.querySelector("[data-copy-bibtex]");
const copyToast = document.querySelector("[data-copy-toast]");
let toastTimer;

copyButton?.addEventListener("click", async () => {
  const citation = document.querySelector("#bibtex")?.innerText.trim();
  if (!citation) return;
  try {
    await navigator.clipboard.writeText(citation);
  } catch (_) {
    const textarea = document.createElement("textarea");
    textarea.value = citation;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  if (!copyToast) return;
  copyToast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { copyToast.hidden = true; }, 2200);
});

const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
if ("IntersectionObserver" in window) {
  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    desktopLinks.forEach((link) => link.classList.toggle("is-active", link.hash === `#${visible.target.id}`));
  }, { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.6] });
  sections.forEach((section) => sectionObserver.observe(section));
}
