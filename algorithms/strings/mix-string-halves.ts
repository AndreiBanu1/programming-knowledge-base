/**
 * Given two strings, return a new string formed by concatenating:
 * - the first half of the first string, and
 * - the second half of the second string.
 *
 * If a string has an odd length, the first half contains
 * the smaller number of characters.
 *
 * @param {string} first
 * @param {string} second
 * @returns {string}
 */

function mixStringHalves(str1: string, str2: string): string {
//   const firstHalf = str1.slice(0, Math.floor(str1.length / 2))
//   const secondHalf = str2.slice(Math.floor(str2.length / 2))

//   return firstHalf + secondHalf

  let string1: string[] = []
  let string2: string[] = []

  let i = 0
  while (i < Math.floor(str1.length / 2)) {
    string1.push(str1[i])
    i++
  }

  let j = Math.floor(str2.length / 2)
  while (j < str2.length) {
    string2.push(str2[j])
    j++
  }

  return string1.join('') + string2.join('')
}

console.log(mixStringHalves('abcd', 'cbad')) // "abad"

console.log(mixStringHalves('Hello', 'World')) // "Herld"

console.log(mixStringHalves('abc', '12345')) // "a345"

console.log(mixStringHalves('Java', 'Script')) // "Javipt"

console.log(mixStringHalves('abcdef', 'uvwxyz')) // "abcxyz"

console.log(mixStringHalves('a', 'b')) // "b"

console.log(mixStringHalves('', 'hello')) // "llo"

console.log(mixStringHalves('hello', '')) // "he"

console.log(mixStringHalves('', '')) // ""

console.log(mixStringHalves('123456', 'abcdef')) // "123def"

console.log(mixStringHalves('abcde', 'uvwxyz')) // "abxyz"

console.log(mixStringHalves('frontend', 'backend')) // "fronkend"
