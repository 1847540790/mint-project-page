# Displayed asset sources

Every raster image and video displayed by this site comes from the MINT
manuscript, the final compact project film, or the project-provided qualitative
and EgoPipeline material directories. Dataset plots, decorative layout,
borders, and the favicon are code-native HTML/CSS/SVG rather than externally
sourced imagery.

## Paper

The project page links to the current manuscript on arXiv:
`https://arxiv.org/pdf/2609.04958`.

## Manuscript figures

Source: `wuji_data_pipeline_distill.pdf`

| Website asset | Manuscript source |
| --- | --- |
| `assets/overview.webp` | Supplied `../new_out/Teaser.pdf` (2026-09-05), complete page rendered at 2400 x 922 pixels and encoded as WebP |
| `assets/egopipeline.webp` | Supplied `../new_out/egopipeline.pdf` (2026-09-05), complete page rendered at 2400 x 1165 pixels and encoded as WebP |
| `assets/architecture.webp` | MINT architecture figure recolored from neutral gray to the page's lavender palette, with the Camera Trajectory panel replaced by the supplied `assets/world_trajectory_subplot/camera_trajectory_black.png`; the source plot's lightness is inverted and lightly lavender-tinted |
| `assets/world-frame-hand-motion.webp` | EgoPipeline stage 5 world-frame hand-motion figure |

## Project film

Source: `MINT_v2_revised_music_enhanced_compact.mp4`, 1920 x 1080 at 30 fps,
133.434 seconds, with SHA-256
`af90f751556dc6fd9b06748710a0a0de8fae06ddd412d6d74b73b9e09a01a3d3`.
The public 720p encodes retain the complete film. The H.264/AAC MP4 preserves
the source audio and has SHA-256
`791373a81f3ca3f67db28b8e407c5ac2eea8f7467262a780800d980b72888435`;
the VP9/Opus WebM has SHA-256
`b2073e9c845ed45ed7ec2b4537b1d0f848429a8fa93eb4a7ad2bb8311bdcb8a9`.

| Website asset | Source interval or frame |
| --- | --- |
| `assets/media/film-poster.webp` | 00:14.500 frame |
| `assets/media/mint-film-compact.mp4` | Complete film, H.264 compatibility encode |
| `assets/media/mint-film-720p.webm` | Complete film, preferred modern-browser encode |
| `assets/media/feature-in-wild.*` | 00:00.000-00:09.800 |
| `assets/media/feature-in-wild-poster.webp` | 00:02.000 frame |
| `assets/media/feature-zero-shot.*` | 00:20.200-00:30.000 |
| `assets/media/feature-zero-shot-poster.webp` | 00:24.200 frame |
| `assets/media/feature-unified-pipeline.*` | 01:14.200-01:24.200 |
| `assets/media/feature-unified-pipeline-poster.webp` | 01:20.700 frame |
| `assets/media/feature-speed.*` | 01:54.500-02:02.400 |
| `assets/media/feature-speed-poster.webp` | 02:00.000 frame |
| `assets/media/benchmark-hands.*` | 01:37.433-01:45.433, complete camera-frame hand benchmark segment |
| `assets/media/benchmark-hands-poster.webp` | 01:43.433 frame |
| `assets/media/benchmark-camera.*` | 01:45.433-01:53.433, complete camera-trajectory benchmark segment |
| `assets/media/benchmark-camera-poster.webp` | 01:49.433 frame |

The feature wildcard denotes the `.mp4` and `.webm` versions of the same cut.
The benchmark wildcard follows the same convention. No repository screenshots,
generated illustrations, or imagery from the two visual-reference websites are
displayed.

The six challenging case clips are H.264 re-encodes with the same 8-second
duration and frame dimensions as their project sources. They use a web-friendly
constant-rate-factor encode with the MP4 index at the front of each file, while
the original project material remains the provenance source listed below.

## Qualitative videos

Case-grid and failure copies are complete 8-second project-provided clips with
the renderer's HUD strip removed: the Ego4D clips drop the top 34 pixels that
carry the "Our MINT Pred" and presence labels, and the EPIC-KITCHENS clips are
cropped to their 512x288 picture area, which removes the same strip together
with the letterbox. Posters are sampled at 4 seconds. The three comparison copies preserve all
frames but crop the source renderers' 48-pixel title and footer strips; their
posters are sampled at 6 seconds where the pipeline/model difference is clear.
Unless noted otherwise, the displayed video is `model_prediction.mp4` from the
source directory.

Every clip under `assets/media/cases/` and `assets/media/samples/` was
re-encoded in place at CRF 24 by `../tools/compress_clips.py`, which preserves
each source's resolution, frame count, frame rate, and silent track: 50.9 MB
down to 28.8 MB across 45 files. The worst case in the set measures SSIM 0.98
against its original.

| Website asset | Project material source |
| --- | --- |
| `assets/media/cases/dough-mint.mp4` | `materials/curated/frequent_action/ego4d/ego4d_c000_f814_ep00076294_o009/model_prediction.mp4` |
| `assets/media/cases/dough-original.mp4` | same clip, `original_rgb.mp4` |
| `assets/media/cases/dough-pipeline.mp4` | same clip, `egopipeline_prediction.mp4` |
| `assets/media/cases/comparison-original.mp4` | `materials/curated/hand_presence_switching/epickitchen/epickitchen_c000_f017_ep00006704_o000/original_rgb.mp4` |
| `assets/media/cases/comparison-pipeline.mp4` | same clip, `egopipeline_prediction.mp4` |
| `assets/media/cases/comparison-mint.mp4` | same clip, `model_prediction.mp4` |
| `assets/media/cases/rapid-camera.mp4` | `materials/curated/rapid_camera_motion/ego4d/ego4d_c002_f002_ep00187579_o006/model_prediction.mp4` |
| `assets/media/cases/close-hands.mp4` | `materials/curated/close_hand_interaction/ego4d/ego4d_c001_f096_ep00102748_o076/model_prediction.mp4` |
| `assets/media/cases/low-light.mp4` | `materials/curated/low_light/ego4d/ego4d_c000_f592_ep00055529_o018/model_prediction.mp4` |
| `assets/media/cases/bimanual.mp4` | `materials/curated/bimanual_coordination/epickitchen/epickitchen_c000_f038_ep00014848_o120/model_prediction.mp4` |
| `assets/media/cases/motion-blur.mp4` | `materials/curated/motion_blur/epickitchen/epickitchen_c000_f048_ep00019018_o015/model_prediction.mp4` |
| `assets/media/cases/failure-01.mp4` | `materials/errors/ego4d_c000_f502_s00_ep00047158/model_prediction.mp4` |
| `assets/media/cases/failure-02.mp4` | `materials/errors/ego4d_c001_f457_s00_ep00136602/model_prediction.mp4` |

## EgoPipeline material

| Website asset | Project material source |
| --- | --- |
| `assets/pipeline/execution-optimization-horizontal.png` | Transparent horizontal web reflow of `materials/sub_pic/ego_pipeline/world_frame_hand_motion/v1/images/07_execution_optimization_v2.svg`; generated by `tools/render_execution_optimization_horizontal.py` |
| `assets/pipeline/filter-no-hand.webp` | `materials/sub_pic/ego_pipeline/canonical_video_format/v1/assets/panels/rejected_no_hands.png`, centred 16:9 crop resized to 720x405 (the figure's red reject overlay is not baked in; the caption carries it) |
| `assets/pipeline/filter-many-hands.webp` | `materials/sub_pic/ego_pipeline/canonical_video_format/v1/assets/panels/rejected_three_hands.png`, centred 16:9 crop resized to 720x405 (the figure's red reject overlay is not baked in; the caption carries it) |
| `assets/pipeline/filter-low-resolution.webp` | `materials/sub_pic/ego_pipeline/canonical_video_format/v1/assets/panels/rejected_low_resolution.png`, centred 16:9 crop resized to 720x405 (the figure's red reject overlay is not baked in; the caption carries it) |
| `assets/pipeline/filter-too-dark.webp` | `materials/sub_pic/ego_pipeline/canonical_video_format/v1/assets/panels/rejected_dark_frame.png`, centred 16:9 crop resized to 720x405 (the figure's red reject overlay is not baked in; the caption carries it) |

## Dataset diversity analysis

Source data: the processed LeRobot v3 outputs for Ego4D, EgoDex, and
EPIC-KITCHENS-100. Source implementation:
`eval/model_effect/visualization/viewer/diversity_analysis.py` in the MINT code
repository, schema version 3.

- All available task labels are used for semantic-scene, action-family,
  normalized-unique-label, and entropy statistics.
- Each dataset uniformly samples 96 data Parquet shards for episode-level
  camera span, net displacement, one-Hz path length, head sweep, hand workspace,
  duration, and hand-use statistics.
- EPIC-KITCHENS-100 is assigned to the kitchen/cooking semantic domain by the
  analysis protocol; this is not frame-level visual scene ground truth.
- `assets/data/diversity/result.json` is the complete report and
  `assets/data/diversity/datasets.csv` is its compact table.

## Ego4D camera-intrinsic analysis

Source data: the processed Ego4D LeRobot v3 output. Source implementation:
`tools/video_summary/video_summary.py` in the MINT code repository, schema
version 8.

- Exactly one FOV sample is read at the first frame of each episode; ffprobe is
  not involved.
- Pixel `fx` and `fy` are recovered from vertical/horizontal FOV and the video
  resolution recorded in LeRobot metadata.
- The derivation assumes a centered principal point and zero skew because those
  values are not annotated; distortion coefficients are unavailable.
- `assets/data/ego4d-intrinsics/result.json` and `summary.txt` publish the core
  generated statistics. The public copies use repository-relative source
  labels instead of machine-local absolute paths.

## Held-out sample comparison

Four episodes from `data/samples/lerobot_v3` in the MINT code repository
(episode indices 0, 2, 3 and 7; HOT3D, 240 frames each at 30 fps). Every video
was rendered offline through `eval/model_effect/visualization/viewer/store.py`
with `checkpoints/model.safetensors` and
`configs/training/mint_step2.yaml`. Ground truth and prediction are solved
independently; the prediction path uses no ground-truth hands, presence,
camera extrinsics or intrinsics.

| Website asset | Renderer |
| --- | --- |
| `assets/media/samples/ep<NNN>-2d-{gt,pred}.mp4` | `Store.mp4(eid, "mesh_skel", "side", "both")`, split into its GT and PRED halves |
| `assets/media/samples/ep<NNN>-world-{gt,pred}.mp4` | `Store.world_video(eid, render_source=...)` |
| `assets/media/samples/ep<NNN>-mujoco-{gt,pred}.mp4` | `Store.mujoco_video(eid, source=...)` |
| `assets/media/samples/ep<NNN>-retarget-{gt,pred}.mp4` | `Store.retarget_video(eid, source=...)` |

The Viewer now exposes these same four categories through **Download Individual
GT/PRED Videos (ZIP)**. For a labeled LeRobot episode, the archive contains the
eight independently rendered files using the same `ep<NNN>-<view>-<source>.mp4`
naming convention shown above. The four website tabs use episodes 0, 2, 3, and
7, for 32 videos in total.

Each copy is cropped to remove the renderer's own `GT` / `PRED` HUD label, so
the page's own captions are the only source of that distinction. The MuJoCo and
retargeting copies additionally drop the empty sky and foreground above and
below the hand motion, using one window per episode that is shared by the GT and
prediction videos so the two stay directly comparable. Posters are sampled at 3
seconds.

## Benchmark values

The HOT3D and ARCTIC hand and camera-trajectory values are transcribed from the
benchmark tables in `README.md` / `README_ZH.md` of the MINT repository. The
camera protocol uses complete sequences, SE(3)-only alignment, and no fitted
scale. The benchmark videos listed above show the matching tables from the
latest project film.

The camera-frame table contains the eight public methods reported by ViDiHand
Table 1 plus the latest MINT and MINT + UKF records. The world-frame trajectory
table keeps the paper's full-sequence, SE(3)-only protocol. `MegaSaM†` runs without depth
refinement, and the homepage omits the camera-trajectory sequence coverage
column.
