// Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.
//
//     Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.
//
//
//
//     Example 1:
//
// Input: arr = [1,0,2,3,0,4,5,0]
// Output: [1,0,0,2,3,0,0,4]
// Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]
// Example 2:
//
// Input: arr = [1,2,3]
// Output: [1,2,3]
// Explanation: After calling your function, the input array is modified to: [1,2,3]
//
//
// Constraints:
//
//     1 <= arr.length <= 104
// 0 <= arr[i] <= 9

/**
 Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr: number[]): void {
    let zeros = 0;
    const n = arr.length;

    // Step 1: Count zeros
    for (let i = 0; i < n; i++) {
        if (arr[i] === 0) zeros++;
    }

    // Step 2: Two pointers
    let i = n - 1;               // original end
    let j = n + zeros - 1;       // "virtual" extended end

    // Step 3: Move backwards
    while (i >= 0) {
        if (j < n) {
            arr[j] = arr[i];
        }

        if (arr[i] === 0) {
            j--;
            if (j < n) {
                arr[j] = 0;
            }
        }

        i--;
        j--;
    }
};