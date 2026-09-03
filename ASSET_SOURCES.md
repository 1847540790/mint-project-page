# Displayed asset sources

Every raster image and video displayed by this site comes from either the MINT
manuscript or the final compact project film. Dataset plots, decorative layout,
borders, and the favicon are code-native HTML/CSS/SVG rather than externally
sourced imagery.

## Manuscript figures

Source: `wuji_data_pipeline_distill.pdf`

| Website asset | Manuscript source |
| --- | --- |
| `assets/overview.webp` | Figure 1, page 1 |
| `assets/egopipeline.webp` | Figure 2, page 3 |
| `assets/architecture.webp` | Figure 3, page 4 |

## Project film

Source: `MINT_v2_revised_music_enhanced_compact.mp4`, 1920 x 1080 at 30 fps,
133.434 seconds. `assets/media/mint-film-compact.mp4` is a byte-for-byte copy;
both files have SHA-256
`af90f751556dc6fd9b06748710a0a0de8fae06ddd412d6d74b73b9e09a01a3d3`.

| Website asset | Source interval or frame |
| --- | --- |
| `assets/media/film-poster.webp` | 00:14.500 frame |
| `assets/media/hero-mint-wall.webp` | Eight frames sampled at 1 fps from 00:01.500-00:09.500; used only inside the hero `MINT` letterforms |
| `assets/media/mint-film-720p.webm` | Complete film, browser fallback |
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

## Benchmark values

The HOT3D and ARCTIC hand and camera-trajectory values are transcribed from the
benchmark tables in `README.md` / `README_ZH.md` of the MINT repository. The
camera protocol uses complete sequences, SE(3)-only alignment, and no fitted
scale. The benchmark videos listed above show the matching tables from the
latest project film.
