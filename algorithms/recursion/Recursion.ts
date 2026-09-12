// A function that calls intself until the problem is solved.
// Base case is the point in which the problem is solved at.
// The stack grows downward as recursive calls are made, then unwinds upward as each function returns its calculated value,
// with each function adding its own computation to the final result

function foo(n: number): number {
  // Base case
  if (n === 1) {
    return 1
  }

  return n + foo(n - 1)
}

/**  Recursion can be broke down in 3 steps:
 * pre-recursion:
 * recurse:
 * post-recurse:
 * */

function twoSumRecursionForFun(nums: number[], target: number): number[] {
  function search(i: number, j: number): number[] {
    // base case 1: we finished all pairs
    if (i >= nums.length - 1) {
        return [];
    }

    // base case 2: we finished all elements for i in the current pair
    if (j >= nums.length) {
        return search(i+1, i+2)
    }

    // we found the pair
    if (nums[i] + nums[j] === target) {
        return [i, j];
    }

    // recurse
    return search(i, j + 1);
  }

  return search(0, 1);
}
