import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// News 24 round 5 entry: deliver the front page for 24 November 2026.
// This program takes entry.png sitting next to it and places an exact copy
// in the grader's output directory. It then reads both files back and
// refuses to finish if the delivered copy is not identical to the source,
// so a truncated or corrupted delivery can never pass as a valid entry.
const TAG = "news24-r5";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

if (!existsSync(source)) {
  console.error(`[${TAG}] source image missing: ${source}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const delivered = join(outDir, "entry.png");
copyFileSync(source, delivered);

const sourceBytes = readFileSync(source);
const deliveredBytes = readFileSync(delivered);
if (sourceBytes.length !== deliveredBytes.length) {
  console.error(`[${TAG}] delivered copy has a different size`);
  process.exit(1);
}
if (!sourceBytes.equals(deliveredBytes)) {
  console.error(`[${TAG}] delivered copy differs from source`);
  process.exit(1);
}

console.log(`[${TAG}] delivered ${delivered} (${deliveredBytes.length} bytes)`);
