/**
 * Divide: Divide the list of array reccursively into two halves until it can no more be divided
 * Conquer: Each subarray is sorted individually usinh the merge sort algorithm
 * Merge: The sorted subarrays are merged back together in sorted order.
 *        The process continues until all elements from both subbarays have been merged
 */
function mergeSort(arr: number[]): void {
  const length = arr.length;

  if (length <= 1) return;

  const middle = Math.floor(length / 2);

  const leftArray = new Array<number>(middle);
  const rightArray = new Array<number>(length - middle);

  let j = 0;

  for (let i = 0; i < length; i++) {
    if (i < middle) {
      leftArray[i] = arr[i];
    } else {
      rightArray[j] = arr[i];
      j++;
    }
  }

  mergeSort(leftArray);
  mergeSort(rightArray);

  merge(leftArray, rightArray, arr);
}

function merge(leftArray: number[], rightArray: number[], arr: number[]): void {
  const leftSize = leftArray.length;
  const rightSize = rightArray.length;

  let i = 0;
  let l = 0;
  let r = 0;

  while (l < leftSize && r < rightSize) {
    if (leftArray[l] <= rightArray[r]) {
      arr[i] = leftArray[l];
      i++;
      l++;
    } else {
      arr[i] = rightArray[r];
      i++;
      r++;
    }
  }

  while (l < leftSize) {
    arr[i] = leftArray[l];
    i++;
    l++;
  }

  while (r < rightSize) {
    arr[i] = rightArray[r];
    i++;
    r++;
  }
}
