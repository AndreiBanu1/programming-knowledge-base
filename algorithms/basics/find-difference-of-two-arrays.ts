/**
 * Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:
 * answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
 * answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
 * Note that the integers in the lists may be returned in any order.
 * Example 1:
 * Input: nums1 = [1,2,3], nums2 = [2,4,6]
 * Output: [[1,3],[4,6]]
 */
function findDifference(nums1: number[], nums2: number[]): number[][] {
  let answer = []
  const set1 = new Set(nums1)
  const set2 = new Set(nums2)

  answer[0] = [...set1].filter((x) => !set2.has(x))
  answer[1] = [...set2].filter((x) => !set1.has(x))

  return answer
}
