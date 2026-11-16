import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(import.meta.dirname, "entry.png");
const dst = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(src, dst);

const srcSize = statSync(src).size;
const dstSize = statSync(dst).size;

console.log(`Source size: ${srcSize} bytes`);
console.log(`Destination size: ${dstSize} bytes`);

if (srcSize !== dstSize) {
  console.error("ERROR: size mismatch — copy may be corrupt");
  process.exit(1);
}

// Second verification: compare SHA-256 digests of source and destination.
const srcHash = createHash("sha256").update(readFileSync(src)).digest("hex");
const dstHash = createHash("sha256").update(readFileSync(dst)).digest("hex");

if (srcHash !== dstHash) {
  console.error(`ERROR: hash mismatch\n  src: ${srcHash}\n  dst: ${dstHash}`);
  process.exit(1);
}

console.log(`SHA-256: ${srcHash}`);
console.log("Sizes and hashes match — copy verified.");
