// 4️⃣ Move Zeroes
//
// Ai un array nums.
//     Mută toate zerourile la final, păstrând ordinea elementelor nenule.
//     Cerințe:
// In-place
// O(n)
// Fără array auxiliar
// Exemplu:
//     Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]

function moveZeroes(nums: number[]): void {
    let slow = 0;

    for (let fast = 0; fast<nums.length; fast++) {
        if (nums[fast] != 0) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    while (slow < nums.length) {
        nums[slow] = 0;
        slow++;
    }
}

// // Tests
// let arr = [0,1,0,3,12];
// moveZeroes(arr);
// console.log(arr);
// // Expected: [1,3,12,0,0]
//
// let arr2 = [1,2,3];
// moveZeroes(arr2);
// console.log(arr2);
// // Expected: [1,2,3]
//
// let arr3 = [0,0,0];
// moveZeroes(arr3);
// console.log(arr3);
// // Expected: [0,0,0]
//
// let arr4 = [4,0,5,0,6];
// moveZeroes(arr4);
// console.log(arr4);
// // Expected: [4,5,6,0,0]
//
// let arr6 = [0];
// moveZeroes(arr6);
// console.log(arr6);
// // Expected: [0]
//
// let arr7 = [1,2,3,0,0];
// moveZeroes(arr7);
// console.log(arr7);
// // Expected: [1,2,3,0,0]