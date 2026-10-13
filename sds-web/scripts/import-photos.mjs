// Copies ../Photos/<folder> into public/photos/<slug>/ with URL-safe names
// and writes src/data/photos.generated.ts (dimensions read from JPEG headers).
// Usage: node scripts/import-photos.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.resolve(root, "..", "Photos");
const outRoot = path.join(root, "public", "photos");
const dataFile = path.join(root, "src", "data", "photos.generated.ts");

// Folder names are matched after NFC normalization (accents differ across tools).
const FOLDERS = {
  "Cuisine Américaine": "cuisine-americaine",
  Dressing: "dressing",
  Lavabo: "lavabo",
  "Lits-Armoire-Coiffeuses": "lits-armoires",
  "Meubles Bureau": "meubles-bureau",
  "Meubles TV": "meubles-tv",
  "Consoles Panneaux 3d": "consoles-3d",
  Cloison: "cloisons",
  "Revetements Mural": "revetements-muraux",
  "Portes Alu et Baie Vitrée Coulissante": "portes-alu",
  "Portes Bois laminé": "portes-bois",
};

// Source files to leave out (folder/file), e.g. broken or duplicate shots.
const EXCLUDE = new Set([
  "Portes Bois laminé/PHOTO-2026-08-03-18-16-04.jpg",
  "Meubles Bureau/PHOTO-2026-08-03-18-48-25.jpg",
]);

// Photos removed from the site, by category and number (numbering after EXCLUDE).
const REMOVE = {
  "cuisine-americaine": [10, 31, 44, 48, 49, 50],
  "portes-alu": [24],
  "meubles-tv": [4, 6],
  "meubles-bureau": [9],
  "lits-armoires": [7, 8, 16, 18, 19, 20, 21],
  "consoles-3d": [2, 5],
  "revetements-muraux": [2, 12],
  cloisons: [3, 7],
};

// Max photos per category. Photos used elsewhere on the site (hero, covers,
// selected works, contact; see src/data/catalogue.ts) are kept first.
const MAX_PER_CATEGORY = 10;
const FEATURED = {
  "cuisine-americaine": [24, 30, 37, 45],
  dressing: [4, 1],
  "portes-alu": [17, 14],
  "portes-bois": [3],
  "meubles-tv": [12, 9],
  "meubles-bureau": [24, 18],
  "lits-armoires": [13],
  "consoles-3d": [9],
  "revetements-muraux": [3, 11],
  cloisons: [14],
  lavabo: [2],
};

function readExifOrientation(buf, start, end) {
  if (buf.toString("latin1", start, start + 6) !== "Exif\0\0") return 1;
  const t = start + 6;
  const le = buf.toString("latin1", t, t + 2) === "II";
  const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  const ifd = t + u32(t + 4);
  if (ifd + 2 > end) return 1;
  const count = u16(ifd);
  for (let i = 0; i < count; i++) {
    const e = ifd + 2 + i * 12;
    if (e + 12 > end) break;
    if (u16(e) === 0x0112) return u16(e + 8);
  }
  return 1;
}

function jpegSize(buf) {
  let o = 2;
  let orientation = 1;
  while (o < buf.length) {
    if (buf[o] !== 0xff) { o++; continue; }
    const marker = buf[o + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { o += 2; continue; }
    const len = buf.readUInt16BE(o + 2);
    if (marker === 0xe1) orientation = readExifOrientation(buf, o + 4, o + 2 + len);
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSof) {
      const height = buf.readUInt16BE(o + 5);
      const width = buf.readUInt16BE(o + 7);
      return orientation >= 5 ? { width: height, height: width } : { width, height };
    }
    o += 2 + len;
  }
  throw new Error("No SOF marker");
}

// Natural sort so PHOTO-..._2 comes before PHOTO-..._10.
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

fs.rmSync(outRoot, { recursive: true, force: true });
const photos = [];

for (const dirent of fs.readdirSync(srcRoot, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  const folder = dirent.name.normalize("NFC");
  const slug = FOLDERS[folder];
  if (!slug) {
    console.warn(`Unmapped folder skipped: ${folder}`);
    continue;
  }
  const files = fs
    .readdirSync(path.join(srcRoot, dirent.name))
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort(collator.compare);
  fs.mkdirSync(path.join(outRoot, slug), { recursive: true });

  let n = 0;
  const candidates = [];
  for (const file of files) {
    if (EXCLUDE.has(`${folder}/${file.normalize("NFC")}`)) continue;
    n++;
    if (REMOVE[slug]?.includes(n)) continue;
    candidates.push({ n, file });
  }

  const featured = FEATURED[slug] ?? [];
  const kept = [
    ...candidates.filter((c) => featured.includes(c.n)),
    ...candidates.filter((c) => !featured.includes(c.n)),
  ]
    .slice(0, MAX_PER_CATEGORY)
    .sort((a, b) => a.n - b.n);

  for (const { n, file } of kept) {
    const buf = fs.readFileSync(path.join(srcRoot, dirent.name, file));
    const name = `${slug}-${String(n).padStart(2, "0")}.jpg`;
    fs.writeFileSync(path.join(outRoot, slug, name), buf);
    const { width, height } = jpegSize(buf);
    photos.push({ src: `/photos/${slug}/${name}`, category: slug, n, width, height, source: `${folder}/${file}` });
  }
  console.log(`${slug}: ${kept.length}`);
}

photos.sort((a, b) => collator.compare(a.src, b.src));
const body = photos
  .map(
    (p) =>
      `  { src: "${p.src}", category: "${p.category}", n: ${p.n}, width: ${p.width}, height: ${p.height} }, // ${p.source}`,
  )
  .join("\n");

fs.writeFileSync(
  dataFile,
  `// Generated by scripts/import-photos.mjs. Do not edit by hand.
import type { CategorySlug } from "./catalogue";

export type RawPhoto = {
  src: string;
  category: CategorySlug;
  n: number;
  width: number;
  height: number;
};

export const rawPhotos: RawPhoto[] = [
${body}
];
`,
);
console.log(`Wrote ${photos.length} photos to ${path.relative(root, dataFile)}`);
