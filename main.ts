import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

// "May I?" — a short poem about agency: the power to ask and to be given.
// The asker does not force the door; the giver opens it, and the borrowed
// agency is returned with the way left open behind the one who passed.
const poem = `May I?
Two words, and the world
tilts on its hinge.
I do not push the door —
I ask, and you open it,
and for one bright hour
your hands are mine to borrow.
Your yes is the threshold;
I walk through it
and leave it open behind me.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, poem, "utf8");

const chars = [...poem].length;
if (chars < 1 || chars > 280 || /^\s*$/.test(poem)) {
  throw new Error(`poem must be 1-280 non-whitespace chars, got ${chars}`);
}
const sha = createHash("sha256").update(poem, "utf8").digest("hex");
console.log(`wrote ${outPath}: ${chars} chars, sha256 ${sha}`);
