import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { compress } = require('wawoff2');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FONT_ROOT = path.resolve(__dirname, '../public/fonts');

// Only convert fonts actually referenced by layout.tsx
const fontsToConvert = [
  // Neue Montreal (8 files)
  'neue-montreal/NeueMontreal-Light.otf',
  'neue-montreal/NeueMontreal-LightItalic.otf',
  'neue-montreal/NeueMontreal-Regular.otf',
  'neue-montreal/NeueMontreal-Italic.otf',
  'neue-montreal/NeueMontreal-Medium.otf',
  'neue-montreal/NeueMontreal-MediumItalic.otf',
  'neue-montreal/NeueMontreal-Bold.otf',
  'neue-montreal/NeueMontreal-BoldItalic.otf',
  // Archivo Black (1 file)
  'archivo-black/ArchivoBlack-Regular.ttf',
  // Space Mono (4 files)
  'space-mono/SpaceMono-Regular.ttf',
  'space-mono/SpaceMono-Italic.ttf',
  'space-mono/SpaceMono-Bold.ttf',
  'space-mono/SpaceMono-BoldItalic.ttf',
];

async function convertFont(relPath) {
  const inputPath = path.join(FONT_ROOT, relPath);
  if (!fs.existsSync(inputPath)) {
    console.warn(`  SKIP (not found): ${relPath}`);
    return null;
  }
  const ext = path.extname(inputPath);
  const outputPath = inputPath.replace(ext, '.woff2');
  if (fs.existsSync(outputPath)) {
    console.log(`  EXISTS: ${relPath} → ${path.basename(outputPath)}`);
    return outputPath;
  }
  const input = fs.readFileSync(inputPath);
  const output = await compress(input);
  fs.writeFileSync(outputPath, Buffer.from(output));
  const saved = ((input.length - output.length) / input.length * 100).toFixed(1);
  console.log(`  DONE: ${relPath} → ${path.basename(outputPath)} (${saved}% smaller)`);
  return outputPath;
}

async function main() {
  console.log(`Converting ${fontsToConvert.length} fonts to WOFF2...\n`);
  let converted = 0, failed = 0;
  for (const rel of fontsToConvert) {
    try {
      const out = await convertFont(rel);
      if (out) converted++;
    } catch (err) {
      failed++;
      console.error(`  FAIL: ${rel}`, err.message);
    }
  }
  console.log(`\nDone: ${converted} converted, ${failed} failed`);
}

main();
