// News 24 R4 — hand the finished front page to the grader.
//
// The front page is a single finished image (entry.png, drawn by draw.py).
// This entrypoint only carries that image into the grader's output
// directory and checks the delivered copy byte for byte, so a broken
// or half-written file can never be judged. It never draws anything.
// R4 verification: run twice from the repo dir — both runs must exit 0
// and leave a byte-identical entry.png in MAKEFUN_OUTPUT_DIR.
// R4 changes vs R3 (same image pipeline): masthead title case 84px,
// DATE CHECK names the two verified pre-17-Nov exclusions (UN 4 Nov,
// UNICEF 25 Aug) — no other content changed.
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const IMAGE = "entry.png";
const TAG = "news24-r4";

const die = (why) => {
  console.error(`${TAG}: ${why}`);
  process.exit(1);
};

const handIn = () => {
  const root = dirname(fileURLToPath(import.meta.url));
  const from = join(root, IMAGE);
  if (!existsSync(from)) die(`missing ${IMAGE} next to main.ts`);
  const destDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(destDir, { recursive: true });
  const to = join(destDir, IMAGE);
  copyFileSync(from, to);
  const src = readFileSync(from);
  const dst = readFileSync(to);
  if (!src.equals(dst)) die("delivered copy differs from entry.png");
  const bytes = statSync(to).size;
  console.log(`${TAG}: delivered ${to} (${bytes} bytes)`);
};

handIn();
