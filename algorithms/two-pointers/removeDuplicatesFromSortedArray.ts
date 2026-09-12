// 2️⃣ Remove Duplicates from Sorted Array
//
// Ai un array nums sortat crescător.
//
//     Elimină duplicatele in-place astfel încât fiecare element să apară o singură dată.
//
//     Cerințe:
//
// Nu returnezi array nou.
//
//     Modifici array-ul in-place.
//
//     Returnezi k = numărul elementelor unice.
//
//     Primele k poziții trebuie să conțină elementele unice.
//
//     Exemplu:
// Input: nums = [1,1,2]
// Output: 2
// nums devine: [1,2,_]

function removeDuplicatesFromSortedArray(nums: number[]): number {      // O(n)
    let k = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
}

function removeDuplicatesFromSortedArrayJSSplice(nums: number[]): number {          // O(n^2)
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            nums.splice(i, 1);
            i--; // stay at same index after removal
        }
    }

    return nums.length;
}