// One-Line Office Joke: 24-Hour Sprint
// Entry program: writes a single-line joke about office life to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The gate requires UTF-8 text of 1-200 characters, not only whitespace,
// so the program refuses to write anything outside that range.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// v2: the early joiner, and the calendar invite's quiet lie.
// (v1 joked about the weekly meeting discovering the mute button;
//  this one takes a different angle: showing up early to a meeting
//  that never needed to exist.)
const JOKE =
  "I joined the meeting five minutes early just to watch the calendar invite pretend this couldn't have been an email.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function main(): void {
  const text = JOKE.trim();

  // Read-back gate: single line, 1-200 characters, not only whitespace.
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `Joke must be 1-200 characters, got ${text.length}. Refusing to write.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Joke must not be only whitespace. Refusing to write.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Joke must be a single line. Refusing to write.");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, text, "utf8");

  const back = readFileSync(outFile, "utf8");
  if (back !== text) {
    throw new Error("Read-back mismatch: written text differs from the joke.");
  }

  console.log(`Wrote ${text.length} characters to ${outFile}`);
  console.log(text);
}

main();
