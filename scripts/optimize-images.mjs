/* One-off image optimizer — converts the heavy photographic PNGs under
   /public into resized, high-quality WebP files (same path, .webp ext).
   Run: node scripts/optimize-images.mjs */
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import sharp from "sharp";

const pub = join(process.cwd(), "public");

/* Each job: folder or file → max width + WebP quality, tuned to the
   largest size the image is actually rendered at (with retina headroom) */
const jobs = [
  { path: "images/we-are-asg.png", maxW: 2880, q: 82 }, // full-bleed section bg
  { path: "images/footer-copywrite-bg.png", maxW: 2560, q: 70 }, // dim bg strip
  { path: "images/sustainability", maxW: 2048, q: 82 }, // 60vw accordion panels
  { path: "images/our-business", maxW: 1600, q: 82 }, // 40vw carousel cards
  { path: "images/newsroom", maxW: 1200, q: 82 }, // 33vw news cards
  { path: "images/navbar", maxW: 900, q: 80 }, // mega-menu hover cards
];

const collect = (p) => {
  const abs = join(pub, p);
  if (statSync(abs).isFile()) return [abs];
  return readdirSync(abs)
    .filter((f) => extname(f).toLowerCase() === ".png")
    .map((f) => join(abs, f));
};

let beforeTotal = 0;
let afterTotal = 0;
for (const job of jobs) {
  for (const file of collect(job.path)) {
    const before = statSync(file).size;
    const out = file.replace(/\.png$/i, ".webp");
    await sharp(file)
      .resize({ width: job.maxW, withoutEnlargement: true })
      .webp({ quality: job.q, effort: 5 })
      .toFile(out);
    const after = statSync(out).size;
    beforeTotal += before;
    afterTotal += after;
    console.log(
      `${(before / 1024).toFixed(0).padStart(6)} KB → ${(after / 1024)
        .toFixed(0)
        .padStart(6)} KB  ${out.replace(pub, "")}`
    );
  }
}
console.log(
  `\nTOTAL: ${(beforeTotal / 1048576).toFixed(1)} MB → ${(
    afterTotal / 1048576
  ).toFixed(1)} MB`
);
