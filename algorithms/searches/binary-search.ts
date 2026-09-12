export default function binary_search(haystack: number[], needle: number): boolean {
  let low = 0
  let high = haystack.length

  while (low < high) {
    let mid = Math.floor(low + (high - low) / 2)

    if (haystack[mid] === needle) {
      return true
    } else if (haystack[mid] > needle) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  return false
}

// O(log n)

console.log(binary_search([1, 3, 5, 7, 9], 1)) // true (primul element)

console.log(binary_search([1, 3, 5, 7, 9], 5)) // true (mijloc)

console.log(binary_search([1, 3, 5, 7, 9], 9)) // true (ultimul element)

console.log(binary_search([1, 3, 5, 7, 9], 6)) // false (nu există)

console.log(binary_search([1], 1)) // true (un singur element)

console.log(binary_search([1], 2)) // false

console.log(binary_search([], 1)) // false (array gol)

console.log(binary_search([2, 4], 2)) // true

console.log(binary_search([2, 4], 4)) // true

console.log(binary_search([2, 4], 3)) // false

console.log(binary_search([-10, -5, 0, 5, 10], -5)) // true

console.log(binary_search([-10, -5, 0, 5, 10], 1)) // false

console.log(binary_search([10, 20, 30, 40, 50, 60, 70], 60)) // true

console.log(binary_search([10, 20, 30, 40, 50, 60, 70], 100)) // false
