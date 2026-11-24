// Copies entry.png from the repo root to MAKEFUN_OUTPUT_DIR
// (default /output) and verifies the copy is byte-identical.
const fs = require('node:fs');
const path = require('node:path');

const source = path.join(__dirname, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const dest = path.join(outDir, 'entry.png');

if (!fs.existsSync(source)) {
  console.error(`entry.png not found: ${source}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(source, dest);

const srcBuf = fs.readFileSync(source);
const dstBuf = fs.readFileSync(dest);
if (!srcBuf.equals(dstBuf)) {
  console.error('verification failed: copied entry.png differs from source');
  process.exit(1);
}

console.log(`entry.png copied to ${dest}`);
