import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const SOURCE = join(process.cwd(), "entry.png");
const DEST = join(OUTPUT_DIR, "entry.png");

if (!existsSync(SOURCE)) {
  console.error(`Missing input image: ${SOURCE}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, DEST);

if (!existsSync(DEST)) {
  console.error(`Copy failed: ${DEST} was not created`);
  process.exit(1);
}
console.log(`Copied entry.png to ${DEST}`);
