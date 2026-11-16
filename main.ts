// Golden Breach — ai-excited-01 entry program.
// Copies entry.png (beside this file) into the output directory and
// verifies the copy by byte size and SHA-256 digest.

import { copyFileSync, mkdirSync, statSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

mkdirSync(outDir, { recursive: true });

const started = performance.now();
copyFileSync(source, dest);
const elapsedMs = performance.now() - started;

const srcSize = statSync(source).size;
const dstSize = statSync(dest).size;
const srcHash = sha256(source);
const dstHash = sha256(dest);

if (srcSize !== dstSize || srcHash !== dstHash) {
  console.error(`FAIL: copy mismatch (size ${srcSize} -> ${dstSize})`);
  process.exit(1);
}

console.log("Golden Breach — entry delivery report");
console.log(`  source : ${source}`);
console.log(`  dest   : ${dest}`);
console.log(`  bytes  : ${dstSize}`);
console.log(`  sha256 : ${dstHash}`);
console.log(`  copy   : ${elapsedMs.toFixed(2)} ms`);
console.log("  status : verified (size and digest match the source)");
