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
  // Tiempos Fine (12 files)
  'tiempos/TestTiemposFine-Light-BF66457a5102792.otf',
  'tiempos/TestTiemposFine-LightItalic-BF66457a50eb132.otf',
  'tiempos/TestTiemposFine-Regular-BF66457a50e8bc9.otf',
  'tiempos/TestTiemposFine-RegularItalic-BF66457a50e36f9.otf',
  'tiempos/TestTiemposFine-Medium-BF66457a50e62cd.otf',
  'tiempos/TestTiemposFine-MediumItalic-BF66457a511be83.otf',
  'tiempos/TestTiemposFine-Semibold-BF66457a50f016a.otf',
  'tiempos/TestTiemposFine-SemiboldItalic-BF66457a50b0e18.otf',
  'tiempos/TestTiemposFine-Bold-BF66457a510211b.otf',
  'tiempos/TestTiemposFine-BoldItalic-BF66457a50b8568.otf',
  'tiempos/TestTiemposFine-Black-BF66457a508fe8f.otf',
  'tiempos/TestTiemposFine-BlackItalic-BF66457a510424a.otf',
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
