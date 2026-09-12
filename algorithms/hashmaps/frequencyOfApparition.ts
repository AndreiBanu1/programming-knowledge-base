/**
 * Given an integer array `nums`, return a frequency map
 * that contains the number of occurrences of each element.
 *
 * Each key in the map represents a unique number from the array,
 * and its corresponding value represents how many times it appears.
 *
 * @param {number[]} nums - An array of integers
 * @returns {Map<number, number>} A map where keys are numbers from the array
 * and values are their frequency (count of occurrences)
 *
 * @example
 * countOccurrences([1, 2, 2, 3, 3, 3, 4])
 * // returns Map {
 * //   1 => 1,
 * //   2 => 2,
 * //   3 => 3,
 * //   4 => 1
 * // }
 */

function countOccurrences(nums: number[]): Map<number, number> {
    const frequency = new Map<number, number>();

    for (const num of nums) {
        const count = frequency.get(num) ?? 0;
        frequency.set(num, count + 1);
    }

    return frequency;
}

const result = countOccurrences([1, 2, 2, 3, 3, 3, 4]);

console.log(result);

// Time -> O(n)
// Space -> O(n)


function countOccurrencesBruteForce(nums: number[]): Map<number, number> {
    const frequency = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        let count = 0;

        for (let j = 0; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }

        frequency.set(nums[i], count);
    }

    return frequency;
}