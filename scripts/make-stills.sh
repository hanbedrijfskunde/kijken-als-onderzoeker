#!/bin/sh
# Zet de 12 toegestane stills om naar webp (max. 1280 px breed) in site/assets/stills/.
# Nooit 01, 03, 07, 08, 09: geen meerwaarde, of het kind is in beeld.
set -eu
cd "$(dirname "$0")/.."
SRC=raw/images/behind-the-research-quantitative-observational-coding
DST=site/assets/stills
mkdir -p "$DST"
for f in \
  02-11m40-rq2-average-scores-eight-domains \
  04-15m40-how-to-quantify-metacognition \
  05-20m30-coding-framework-metascope \
  06-21m00-metascope-codebook-excerpt \
  10-32m00-cohens-kappa \
  11-33m50-confusion-matrix \
  12-38m10-steps-for-establishing-reliability \
  13-40m25-types-of-inter-rater-reliability \
  14-43m18-language-transcripts \
  15-45m00-steps-adapting-language-coding-schemes \
  16-45m30-baseline-language-coding-framework \
  17-48m40-takeaway
do
  cwebp -quiet -q 82 -resize 1280 0 "$SRC/$f.png" -o "$DST/$f.webp"
done
