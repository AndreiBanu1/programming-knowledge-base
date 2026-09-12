/**
 * Run-Length Encoding (RLE)
 *
 * Run-Length Encoding compresses a string by replacing consecutive occurrences
 * of the same character with the character followed by the number of times it
 * appears consecutively.
 *
 * eg. "wwwwaaadexxxxxx" -> "w4a3d1e1x6"
 *
 * Example 1:
 *   Input:  str = "aaaabbbccc"
 *   Output: "a4b3c3"          (a repeats 4x, b 3x, c 3x)
 *
 * Example 2:
 *   Input:  str = "abbbcdddd"
 *   Output: "a1b3c1d4"        (runs of length 1 still get a count)
 */

// --- Manual solution (derived via UDPCT — see lessons/0001) --------------------
// Track a running `count`; flush `char + count` when the character changes;
// flush once more after the loop for the final, un-changed run.
function encode(str: string): string {
    if (str.length === 0) return "";

    let encodedString = "";
    let count = 1;

    for (let i = 1; i < str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            encodedString += str[i - 1] + count;
            count = 1;
        }
    }
    encodedString += str[str.length - 1] + count; // flush the last run

    return encodedString;
}

// --- Regex variant (concise, but hides the mechanics) --------------------------
// (.)\1*  =  one char captured in group 1, followed by zero or more of that same char.
function encodeRegex(s: string): string {
    return s.replace(/(.)\1*/g, (group) => group[0] + group.length);
}

console.log(encode("wwwwaaadexxxxxx")); // w4a3d1e1x6
console.log(encode("aaaabbbccc"));      // a4b3c3
console.log(encode("abbbcdddd"));       // a1b3c1d4

export { encode, encodeRegex };
