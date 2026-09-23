/**
 * Given an integer `n`, return an array of strings from `1` to `n`.
 *
 * For each number:
 * - Return "Fizz" if the number is divisible by 3.
 * - Return "Buzz" if the number is divisible by 5.
 * - Return "FizzBuzz" if the number is divisible by both 3 and 5.
 * - Otherwise, return the number as a string.
 *
 * @param {number} n - The upper limit of the sequence
 * @returns {string[]} An array containing the FizzBuzz result for each number from 1 to n
 *
 * @example
 * fizzBuzz(3)
 * // returns ["1", "2", "Fizz"]
 *
 * @example
 * fizzBuzz(5)
 * // returns ["1", "2", "Fizz", "4", "Buzz"]
 *
 * @example
 * fizzBuzz(15)
 * // returns [
 * //   "1", "2", "Fizz", "4", "Buzz",
 * //   "Fizz", "7", "8", "Fizz", "Buzz",
 * //   "11", "Fizz", "13", "14", "FizzBuzz"
 * // ]
 *
 * Constraints:
 * - 1 <= n <= 10^4
 */

function fizzBuzz(num: number): string[] {
    const result: string[] = [];

    for (let i = 1; i <= num; i++) {
        if (i%3 === 0 && i%5 === 0) {
            result.push('FizzBuzz');
        } else if (i % 3 === 0) {
            result.push('Fizz');
        } else if (i % 5 === 0) { 
            result.push('Buzz');
        } else {
            result.push(i.toString());
        }
    }
    console.log(result);
    return result;
}

fizzBuzz(5) // [ "1", "2", "Fizz", "4", "Buzz"]
fizzBuzz(3) // returns ["1", "2", "Fizz"]