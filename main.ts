import fs from "node:fs";
import path from "node:path";

const scriptDir = path.dirname(process.argv[1]);
const sourcePath = path.join(scriptDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = path.join(outputDir, "entry.png");

if (!fs.existsSync(sourcePath)) {
  console.error(`entry.png not found: ${sourcePath}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(sourcePath, outputPath);

const original = fs.readFileSync(sourcePath);
const copied = fs.readFileSync(outputPath);

if (original.length !== copied.length || !original.equals(copied)) {
  console.error("verification failed: copied entry.png is not identical to entry.png");
  process.exit(1);
}

console.log(`entry.png copied to ${outputPath} (${original.length} bytes, verified identical)`);
