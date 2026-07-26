/**
 * Generates the icon set, the PWA screenshots, and the blueprint-plate
 * placeholders used where a real photograph would be inappropriate.
 *
 * Site photography is downloaded separately by `scripts/fetch-images.mjs`.
 * The testimonial portraits stay as plates on purpose: showing a real,
 * identifiable person beside a testimonial they did not give would
 * misrepresent them. Replace them only with signed-off customer portraits.
 *
 * Run with `npm run images:placeholders`.
 *
 * Pure Node — PNGs are encoded by hand with the built-in zlib, so the project
 * needs no image dependency.
 */
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* ── design tokens (mirrors styles/tokens.css) ───────────────────────────── */
const INK = [0x1d, 0x2d, 0x3d]; // --color-accent-900
const PLATE = [0x2c, 0x45, 0x5d]; // --color-accent-800
const LINE = [0x41, 0x61, 0x80]; // --color-accent-700
const MARK = [0xb5, 0xd9, 0xfd]; // --color-accent-300

/* ── minimal PNG encoder ─────────────────────────────────────────────────── */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, rgb) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(2, 9); // colour type: truecolour
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  // Prefix each scanline with filter byte 0 (None).
  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (1 + width * 3);
    raw[rowStart] = 0;
    rgb.copy(raw, rowStart + 1, y * width * 3, (y + 1) * width * 3);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ── tiny drawing surface ────────────────────────────────────────────────── */

function createCanvas(width, height, fill) {
  const pixels = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i += 1) {
    pixels[i * 3] = fill[0];
    pixels[i * 3 + 1] = fill[1];
    pixels[i * 3 + 2] = fill[2];
  }

  const setPixel = (x, y, colour) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const offset = (y * width + x) * 3;
    pixels[offset] = colour[0];
    pixels[offset + 1] = colour[1];
    pixels[offset + 2] = colour[2];
  };

  const fillRect = (x0, y0, w, h, colour) => {
    for (let y = y0; y < y0 + h; y += 1) {
      for (let x = x0; x < x0 + w; x += 1) setPixel(x, y, colour);
    }
  };

  const grid = (step, colour) => {
    for (let x = step; x < width; x += step) fillRect(x, 0, 1, height, colour);
    for (let y = step; y < height; y += step) fillRect(0, y, width, 1, colour);
  };

  const border = (inset, thickness, colour) => {
    fillRect(inset, inset, width - inset * 2, thickness, colour);
    fillRect(inset, height - inset - thickness, width - inset * 2, thickness, colour);
    fillRect(inset, inset, thickness, height - inset * 2, colour);
    fillRect(width - inset - thickness, inset, thickness, height - inset * 2, colour);
  };

  /** Registration ticks, echoing the `.corner` marks in the design system. */
  const corners = (inset, length, thickness, colour) => {
    const far = (v) => v - inset - thickness;
    fillRect(inset, inset, length, thickness, colour);
    fillRect(inset, inset, thickness, length, colour);
    fillRect(width - inset - length, inset, length, thickness, colour);
    fillRect(far(width), inset, thickness, length, colour);
    fillRect(inset, far(height), length, thickness, colour);
    fillRect(inset, height - inset - length, thickness, length, colour);
    fillRect(width - inset - length, far(height), length, thickness, colour);
    fillRect(far(width), height - inset - length, thickness, length, colour);
  };

  return { pixels, setPixel, fillRect, grid, border, corners };
}

/** A blueprint plate sized to the slot it stands in for. */
function plate(width, height, { base = PLATE, gridStep, accent = MARK } = {}) {
  const canvas = createCanvas(width, height, base);
  const step = gridStep ?? Math.max(16, Math.round(Math.min(width, height) / 8));
  canvas.grid(step, LINE);

  const inset = Math.max(4, Math.round(Math.min(width, height) * 0.03));
  const thickness = Math.max(1, Math.round(Math.min(width, height) / 300));
  canvas.border(inset, thickness, LINE);
  canvas.corners(inset, Math.round(Math.min(width, height) * 0.08), thickness, accent);

  // A centred cross-hair so the plate reads as a deliberate placeholder.
  const cx = Math.round(width / 2);
  const cy = Math.round(height / 2);
  const arm = Math.round(Math.min(width, height) * 0.06);
  canvas.fillRect(cx - arm, cy, arm * 2, thickness, accent);
  canvas.fillRect(cx, cy - arm, thickness, arm * 2, accent);

  return encodePng(width, height, canvas.pixels);
}

/** The AeroCore mark: a hairline square with a stylised airflow glyph inside. */
function markIcon(size, { background = INK, foreground = MARK, padded = false } = {}) {
  const canvas = createCanvas(size, size, background);
  const pad = padded ? Math.round(size * 0.18) : Math.round(size * 0.1);
  const stroke = Math.max(1, Math.round(size / 16));
  const boxInset = pad;
  const boxSize = size - pad * 2;

  canvas.fillRect(boxInset, boxInset, boxSize, stroke, foreground);
  canvas.fillRect(boxInset, boxInset + boxSize - stroke, boxSize, stroke, foreground);
  canvas.fillRect(boxInset, boxInset, stroke, boxSize, foreground);
  canvas.fillRect(boxInset + boxSize - stroke, boxInset, stroke, boxSize, foreground);

  // Three airflow bars.
  const barHeight = Math.max(1, Math.round(size / 14));
  const innerLeft = boxInset + Math.round(boxSize * 0.18);
  const innerWidth = Math.round(boxSize * 0.64);
  const gap = Math.round(boxSize * 0.16);
  const firstTop = boxInset + Math.round(boxSize * 0.26);

  for (let i = 0; i < 3; i += 1) {
    const width = i === 1 ? innerWidth : Math.round(innerWidth * 0.72);
    canvas.fillRect(innerLeft, firstTop + i * gap, width, barHeight, foreground);
  }

  return encodePng(size, size, canvas.pixels);
}

/** Wraps a 32px PNG in an ICO container. */
function encodeIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

/* ── output manifest ─────────────────────────────────────────────────────── */

/** Slots that intentionally ship as plates rather than photographs. */
const IMAGES = [
  ['testimonial-danielle-okafor.png', 240, 240],
  ['testimonial-marcus-bell.png', 240, 240],
  ['testimonial-priya-nair.png', 240, 240],
];

function write(relativePath, buffer) {
  const target = join(ROOT, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buffer);
  console.log(`  ${relativePath}  ${(buffer.length / 1024).toFixed(1)} kB`);
}

console.log('Writing placeholder imagery…');
for (const [name, width, height] of IMAGES) {
  write(join('public', 'images', name), plate(width, height));
}

console.log('Writing icons…');
const favicon32 = markIcon(32);
write(join('app', 'favicon.ico'), encodeIco(favicon32, 32));
write(join('app', 'apple-icon.png'), markIcon(180, { padded: true }));
write(join('public', 'icons', 'icon-192.png'), markIcon(192));
write(join('public', 'icons', 'icon-512.png'), markIcon(512));
write(join('public', 'icons', 'icon-maskable-512.png'), markIcon(512, { padded: true }));
write(join('public', 'icons', 'screenshot-wide.png'), plate(1280, 720, { base: INK }));
write(join('public', 'icons', 'screenshot-narrow.png'), plate(720, 1280, { base: INK }));

console.log('Done.');
