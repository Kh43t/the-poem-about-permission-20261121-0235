// "The Shoelaces" — a poem about permission.
//
// A father asks his daughter to tie his shoes. She kneels where he
// once knelt to tie hers, and ties the same knot he taught her —
// only now the hands on top are hers.
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const lines: string[] = [
  "\u201CTie them for me?\u201D",
  "Dad holds out his shoe,",
  "his hands shaking",
  "too much for the bow.",
  "",
  "I kneel where he knelt",
  "to tie mine, years ago,",
  "and tie the same knot:",
  "then, his hands over mine;",
  "now, mine over his.",
  "",
  "He stands, takes a step,",
  "and doesn't say thank you.",
  "He just walks.",
];

const poem: string = lines.join("\n");

const destDir: string = process.env.MAKEFUN_OUTPUT_DIR
  ? process.env.MAKEFUN_OUTPUT_DIR
  : "/output";
mkdirSync(destDir, { recursive: true });

const destFile: string = join(destDir, "entry.txt");
writeFileSync(destFile, poem, "utf8");

const lengthInChars: number = [...poem].length;
if (lengthInChars < 1 || lengthInChars > 280 || poem.trim().length === 0) {
  throw new Error(
    `entry must be 1-280 chars of non-whitespace text, got ${lengthInChars}`,
  );
}
const fingerprint: string = createHash("sha256")
  .update(poem, "utf8")
  .digest("hex");
console.log(`${destFile} | ${lengthInChars} chars | sha256 ${fingerprint}`);
