// #1: Understand the problem, input, output, edge case
// we receive a string in form of 'a4b3c3' and we must decompress it by looking at the char+number combination and return the number of chars we see.
// a4b3c3 -> aaaabbbccc
// a1b2c1d4 -> abbcdddd
// edge case: only if str is empty

// #2: Do it by hand, solve one example manually
// a4b3c3 -> we do a for loop to iterate through the string by index
// we read the char at index 0 -> a
// we then read the next char, which represents the number of times
// we need to add it to a result variable in the form of char*count (maybe we need addition while loop?)
// we move to the next index and repeat

// #3: Patterns: what did you track? when did you act?
// first we need a result string empty
// we keep track of the chars we read and the count number

// #4: Code
function reverseRLE(str: string): string {
  if (str.length === 0) return ''

  let result = ''
  let char = ''
  let i = 0

  while (i < str.length) {
    let count = 0
    char = str[i]
    i++
    while (!isNaN(Number(str[i]))) {
      count = count * 10 + Number(str[i])
      i++
    }
    let j = 0
    while (j < count) {
      result += char
      j++
    }
  }
  console.log(result)
  return result
}

// #5 Test
reverseRLE('a4b3c3')
reverseRLE('a14b3c3')
