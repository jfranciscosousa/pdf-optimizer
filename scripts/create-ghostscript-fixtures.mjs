import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { deflateSync } from "node:zlib";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";

const output = process.argv[2];
if (!output)
  throw new Error(
    "Usage: node scripts/create-ghostscript-fixtures.mjs <output-directory>",
  );
const directory = resolve(output);
await mkdir(directory, { recursive: true });

function pngChunk(type, data) {
  const body = Buffer.concat([Buffer.from(type), data]);
  let crc = 0xffffffff;
  for (const byte of body) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([length, body, checksum]);
}

function scanImage() {
  const width = 1600;
  const height = 1200;
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  const pixels = Buffer.alloc((width * 3 + 1) * height);
  let seed = 42;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const offset = y * (width * 3 + 1) + 1 + x * 3;
      const grain = seed >>> 28;
      pixels[offset] = (x / 8 + grain) & 255;
      pixels[offset + 1] = (y / 5 + grain) & 255;
      pixels[offset + 2] = ((x + y) / 11 + grain) & 255;
    }
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(pixels)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

const text = await PDFDocument.create();
const font = await text.embedFont(StandardFonts.Helvetica);
for (const [index, size] of [
  [595, 842],
  [842, 595],
  [400, 600],
].entries()) {
  const page = text.addPage(size);
  page.drawText(`Ghostscript regression page ${index + 1}`, {
    x: 30,
    y: size[1] - 60,
    size: 14,
    font,
  });
  page.drawRectangle({
    x: 40,
    y: 100,
    width: 200,
    height: 150,
    color: rgb(0.1, 0.5, 0.9),
    opacity: 0.5,
  });
  if (index === 2) page.setRotation(degrees(90));
}
await writeFile(join(directory, "text-layout.pdf"), await text.save());

const scan = await PDFDocument.create();
const image = await scan.embedPng(scanImage());
scan
  .addPage([595, 842])
  .drawImage(image, { x: 40, y: 100, width: 384, height: 288 });
await writeFile(join(directory, "scan.pdf"), await scan.save());
await writeFile(
  join(directory, "invalid.pdf"),
  "%PDF-1.7\nnot a valid document",
);
console.log(`Created synthetic PDF fixtures in ${directory}`);
