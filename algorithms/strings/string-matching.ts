/**
 * Given an array of string words, return all strings in words that are a substring of another word. You can return the answer in any order.
Example 1:
Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.

Example 2:
Input: words = ["leetcode","et","code"]
Output: ["et","code"]
Explanation: "et", "code" are substring of "leetcode".

Example 3:
Input: words = ["blue","green","bu"]
Output: []
Explanation: No string of words is substring of another string.
 */

function stringMatching(words: string[]): string[] {
  const result = new Set<string>()

  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (words[i].includes(words[j]) && !result.has(words[j])) {
        result.add(words[j])
      } else if (words[j].includes(words[i]) && !result.has(words[i])) {
        result.add(words[i])
      }
    }
  }

  return [...result]
}

console.log(stringMatching(['leetcoder', 'leetcode', 'od', 'hamlet', 'am'])) // ["leetcode"]
console.log(stringMatching(['blue', 'green', 'bu'])) // []
console.log(stringMatching(['leetcod', 'et', 'code'])) // ["et", "code"]
