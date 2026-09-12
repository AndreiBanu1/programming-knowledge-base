// divide and conquer
function qs(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) return

  const pivot = partition(arr, lo, hi)
  qs(arr, lo, pivot)
  qs(arr, pivot + 1, hi)
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi]
  let left = lo + 1
  let right = hi

  while (left < right) {
    while (left <= right && arr[left] <= pivot) left++
    while (right >= left && arr[right] > pivot) right--

    if (left < right) {
      swap(arr, left, right)
    }
  }
  swap(arr, lo, right)
  return right
}

function swap(arr: number[], i: number, j: number): void {
  const tmp = arr[i]
  arr[j] = arr[i]
  arr[i] = tmp
}

function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1)
}
