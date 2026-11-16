import { copyFileSync, mkdirSync, statSync } from "fs";
import { join } from "path";

const src = join(import.meta.dirname, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(src, dest);

const { size } = statSync(dest);
console.log(`entry.png → ${dest} (${size} bytes)`);
