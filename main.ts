// Golden Breach — make.fun ai-excited-01 entry program.
// Copies the entry image (entry.png, beside this file) into the output
// directory and verifies the copy byte-for-byte via size + SHA-256.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

function sha256(path) {
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
const ok = srcSize === dstSize && srcHash === dstHash;

console.log("--- Golden Breach entry ---");
console.log(`source : ${source} (${srcSize} bytes)`);
console.log(`dest   : ${dest} (${dstSize} bytes)`);
console.log(`copied : in ${elapsedMs.toFixed(1)} ms`);
console.log(`sha256 : ${srcHash}`);
console.log(`verify : size ${srcSize === dstSize ? "OK" : "MISMATCH"}, digest ${srcHash === dstHash ? "OK" : "MISMATCH"}`);
console.log(`result : ${ok ? "entry.png delivered intact" : "COPY FAILED"}`);

if (!ok) {
  process.exit(1);
}
