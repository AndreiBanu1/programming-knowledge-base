// A string is good if there are no repeated characters.
// Given a string s​​​​​, return the number of good substrings of length three in s​​​​​​.
// Note that if there are multiple occurrences of the same substring, every occurrence should be counted.
// A substring is a contiguous sequence of characters in a string.

// Input: s = "xyzzaz"
// Output: 1
// Explanation: There are 4 substrings of size 3: "xyz", "yzz", "zza", and "zaz".
// The only good substring of length 3 is "xyz".

export function countGoodSubstrings(s: string): number {
  let count = 0

  for (let i = 0; i + 3 <= s.length; i++) {
    if (new Set(s.slice(i, i + 3)).size === 3) count++
  }
  return count
}
