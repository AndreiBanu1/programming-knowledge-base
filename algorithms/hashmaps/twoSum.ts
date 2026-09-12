/**
 * Given an array of integers `nums` and an integer `target`,
 * return the indices of the two numbers such that they add up to `target`.
 *
 * The returned indices must satisfy:
 * - nums[i] + nums[j] === target
 * - i !== j
 * - The smaller index should be returned first
 *
 * You may assume that each input contains exactly one valid pair of indices.
 *
 * @param {number[]} nums - An array of integers
 * @param {number} target - The target sum value
 * @returns {number[]} An array containing the two indices [i, j]
 *
 * @example
 * twoSum([3, 4, 5, 6], 7)
 * // returns [0, 1]
 *
 * @example
 * twoSum([4, 5, 6], 10)
 * // returns [0, 2]
 *
 * @example
 * twoSum([5, 5], 10)
 * // returns [0, 1]
 *
 * Constraints:
 * - 2 <= nums.length <= 1000
 * - -10^7 <= nums[i] <= 10^7
 * - -10^7 <= target <= 10^7
 */

// #1: Understand the problem, input, output, edge case

// #2; Go manually step by step
// i=0 => nums[i]=4, difference = 10-4 = 6. map.has(6) ? -> false -> map.set(4,0)
// i=1 => nums[i]=5, difference = 10-5 = 5. map.has(5) ? -> false -> map.set(5,1)
// i=2 => nums[i]=6, difference = 10-6 = 4. map.has(4) ? -> true -> return

// #3: Patterns observed
// we need to calculate difference between target and number. Then we search for that number in the map, if it exists, we return the indexes.

// #4: Code
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const difference = target - nums[i]

    if (map.has(difference)) {
      console.log([map.get(difference)!, i])
      return [map.get(difference)!, i]
    }

    map.set(nums[i], i)
  }

  return []
}

// #4: Test
twoSum([3, 4, 5, 6], 7) // Output: [0,1]
twoSum([4, 5, 6], 10) // Output: [0,2]
