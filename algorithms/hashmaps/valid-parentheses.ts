/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true
 */

function isValidParentheses(s: string): boolean {
  const pairs = new Map<string, string>([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ])
  const stack: string[] = []

    for (const char of s) {
        if (pairs.has(char)) {
            if (stack.pop() !== pairs.get(char)) {
                return false;
          }
        } else {
            stack.push(char);
      }
  }

  return stack.length === 0
}

console.log(isValidParentheses("()[]{}")) // true
console.log(isValidParentheses("(]")) // false
