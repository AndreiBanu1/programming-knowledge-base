/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

function bubbleSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

// Example usage
const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", unsorted);
console.log("Sorted array:", bubbleSort([...unsorted]));

export { bubbleSort };
