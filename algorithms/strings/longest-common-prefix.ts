/**
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
Example 1:
Input: strs = ["flower","flow","flight"]
Output: "fl"
*/

function longestCommonPrefix(strs: string[]): string {
  let prefix = strs[0]

  for (let i = 0; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, prefix.length - 1)
    }

    if (prefix.length === 0) {
      return ''
    }
  }
  return prefix
}
