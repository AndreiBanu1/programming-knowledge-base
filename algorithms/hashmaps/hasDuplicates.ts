/**
 * Contains Duplicate
 * Given an integer array `nums`, return true if any value appears more than
 * once in the array, otherwise return false.
 */

// --- Approach 1: Set size comparison --------------------------------------
// Time O(n) · Space O(n)
function hasDuplicateSet(nums: number[]): boolean {
  const unique = new Set(nums);
  return unique.size < nums.length;
}

// --- Approach 2: Early-exit with a Map ------------------------------------
// Time O(n) · Space O(n)
function hasDuplicateMap(nums: number[]): boolean {
  const numbers = new Map<number, boolean>();
  for (const num of nums) {
    if (numbers.has(num)) {
      return true;
    }
    numbers.set(num, true);
  }
  return false;
}

// --- Approach 3: Brute force ----------------------------------------------
// Time O(n²) · Space O(1)
function hasDuplicateBruteForce(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

// Quick sanity checks
for (const fn of [hasDuplicateSet, hasDuplicateMap, hasDuplicateBruteForce]) {
  console.log(fn.name, fn([1, 2, 3, 3]), fn([1, 2, 3, 4])); // true false
}

export { hasDuplicateSet, hasDuplicateMap, hasDuplicateBruteForce };
