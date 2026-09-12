/**
 * Strings — immutable arrays of characters
 * ========================================
 *
 * In JS a string can't be mutated in place: every `+=` builds a new string.
 * So the default move for anything that builds output is to push into an array
 * and `.join("")` once at the end — O(n) instead of O(n^2) copying.
 *
 * The recurring shapes:
 *
 *   1. RUN SCANNING      walk the string tracking the CURRENT run (char +
 *                        count); flush when it changes, and flush once more
 *                        after the loop.
 *                        -> run-length-encoding
 *
 *   2. PARSING           two-phase per token: read the symbol, then read all
 *                        the digits that follow (multi-digit numbers!).
 *                        -> string-decompression-reverse-rle
 *
 *   3. INDEX WEAVING     build output by interleaving/reordering indices.
 *                        -> mix-string-halves
 *
 *   4. CHAR CODES        `charCodeAt` / `String.fromCharCode` for alphabet
 *                        arithmetic: `c.charCodeAt(0) - 97` -> 0..25 bucket.
 *
 * Useful, and their gotchas:
 *   s[i]                  -> string | undefined (with noUncheckedIndexedAccess)
 *   s.slice(a, b)         end EXCLUSIVE; negatives count from the end
 *   s.split("")           breaks emoji/surrogate pairs — use [...s] for
 *                         codepoints if that matters
 *   s.localeCompare(t)    for human-facing ordering; `<` is codepoint order
 *   /[a-z0-9]/i.test(c)   quick alphanumeric check (validPalindrome)
 *   s.toLowerCase()       normalise BEFORE comparing
 *
 * Watch out for:
 *   - The forgotten final flush after a run-scanning loop.
 *   - Assuming single-digit counts when parsing "a12b".
 *   - `+=` inside a hot loop over a long string.
 *   - Uppercase/punctuation when the problem says "ignore non-alphanumeric".
 */

// --- 1. Run scanning: run-length encoding -----------------------------------
// Track the current run; flush on change, then flush the last one.
export function encode(str: string): string {
  if (str.length === 0) return "";

  const out: string[] = [];
  let char = str[0]!;
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    } else {
      out.push(char + count); // run ended -> flush
      char = str[i]!;
      count = 1;
    }
  }
  out.push(char + count); // the final run never hits a change

  return out.join("");
}
// encode("aaaabbbccc") -> "a4b3c3"

// --- 2. Parsing: decode RLE, digits may be multi-character -----------------
export function decode(str: string): string {
  const out: string[] = [];
  let i = 0;

  while (i < str.length) {
    const char = str[i]!;
    i++;

    // consume ALL consecutive digits, not just one
    let digits = "";
    while (i < str.length && str[i]! >= "0" && str[i]! <= "9") {
      digits += str[i];
      i++;
    }
    out.push(char.repeat(Number(digits)));
  }
  return out.join("");
}
// decode("a4b3c12") -> "aaaabbbcccccccccccc"

// --- 3. Char codes: fixed 26-slot tally, no Map needed ---------------------
// Cheaper than a Map when the alphabet is known and small.
export function isAnagram(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const tally = new Array(26).fill(0);
  for (let i = 0; i < a.length; i++) {
    tally[a.charCodeAt(i) - 97]++; // 'a' -> 0
    tally[b.charCodeAt(i) - 97]--; // same letters cancel out
  }
  return tally.every((n) => n === 0);
}
// isAnagram("racecar", "carrace") -> true
