/** Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

Example 1:

Input: s = "racecar", t = "carrace"

Output: true
Example 2:

Input: s = "jar", t = "jam"

Output: false
 */

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false

  let mapS = new Map<string, number>()
  for (let i = 0; i < s.length; i++) {
    const count = mapS.get(s[i]) ?? 0
    mapS.set(s[i], count + 1)
  }

  let mapT = new Map<string, number>()
  for (let i = 0; i < t.length; i++) {
    const count = mapT.get(t[i]) ?? 0
    mapT.set(t[i], count + 1)
  }

  for (const [k, v] of mapS) {
    if (mapT.get(k) !== v) return false
  }
  return true
}

console.log(isAnagram("racecar", "carrace"));
console.log(isAnagram("jar", "jam"));
console.log(isAnagram("aab","abb"));