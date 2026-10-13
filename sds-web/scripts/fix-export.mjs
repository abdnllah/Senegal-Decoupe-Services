// Next.js on Windows exports prefetch files as `__next.a/b.txt` instead of
// `__next.a.b.txt` (backslash segment paths). Flatten them so client
// navigation finds them. No-op on Linux/macOS builds.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");

function flatten(dir, prefix, target) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) flatten(p, `${prefix}.${e.name}`, target);
    else fs.renameSync(p, path.join(target, `${prefix}.${e.name}`));
  }
  fs.rmdirSync(dir);
}

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) flatten(p, e.name, dir);
    else walk(p);
  }
}

walk(out);
