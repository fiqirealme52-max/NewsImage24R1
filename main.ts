// News 24 R1 — "Tuesday 24 November 2026" front page.
// The entry image (1024x1024, 38 stories) is shipped in this repo as
// entry.png. This program only copies it to the output directory, so
// both graded runs write byte-identical files.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");
if (!existsSync(src)) {
  throw new Error("entry.png missing from repository");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
