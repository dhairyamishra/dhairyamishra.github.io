import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const svgPath = resolve(root, 'public/og.svg');
const pngPath = resolve(root, 'public/og.png');

if (!existsSync(svgPath)) {
  console.error(`[build-og] Missing ${svgPath}`);
  process.exit(1);
}

const svg = await readFile(svgPath);
const png = await sharp(svg, { density: 192 })
  .resize(1200, 630, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(pngPath, png);
console.log(`[build-og] Wrote ${pngPath} (${(png.byteLength / 1024).toFixed(1)} kB)`);
