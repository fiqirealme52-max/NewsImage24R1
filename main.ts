// News 24 R3 — hand the finished front page to the grader.
//
// The entry is a single finished image (entry.png, drawn by draw.py).
// This entrypoint only moves that image into the grader's output
// directory and proves the copy is byte-identical, so a broken or
// half-written file can never be judged. It never draws anything.
// R3 verification: run twice from the repo dir — both runs must exit 0
// and leave a byte-identical entry.png in MAKEFUN_OUTPUT_DIR.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ART = "entry.png";

function fail(message) {
  console.error(`news24-r3: ${message}`);
  process.exit(1);
}

function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, ART);
  if (!existsSync(source)) fail(`missing ${ART} next to main.ts`);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, ART);
  copyFileSync(source, target);
  const a = readFileSync(source);
  const b = readFileSync(target);
  if (!a.equals(b)) fail("handed-in copy differs from entry.png");
  console.log(`news24-r3: handed in ${target} (${a.length} bytes)`);
}

main();
