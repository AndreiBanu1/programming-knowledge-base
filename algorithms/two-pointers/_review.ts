// 1️⃣ Remove Duplicates from Sorted Array
// Ai un array nums sortat crescător.
//     Elimină duplicatele in-place astfel încât fiecare element să apară o singură dată.
//     Cerințe:
// Nu returnezi array nou.
//     Modifici array-ul in-place.
//     Returnezi k = numărul elementelor unice.
//     Primele k poziții trebuie să conțină elementele unice.
//     Exemplu:
// Input: nums = [1,1,2]
// Output: 2
// nums devine: [1,2,_]
function removeDuplicatesFromSortedArray(nums: number[]): number {
    let k = 1;

    for (let i=0; i < nums.length; i++) {
        if (nums[i] !== nums[i-1]) {
            nums[k] = nums[i]
            k++;
        }
    }
    return k;
}

// 2️⃣ Remove Element From Array
// Dat fiind un array de numere întregi nums și un număr întreg val, trebuie să eliminați toate aparițiile lui val in-place.
// Ordinea elementelor poate fi schimbată. Nu contează ce rămâne după elementele valide.
//
// Cerințe
// Modifici array-ul in-place
// Nu aloci alt array
// Returnezi numărul de elemente care nu sunt egale cu val
// Primele k elemente ale array-ului trebuie să conțină elementele valide
// Nu contează ce rămâne după poziția k
function removeElementFromArray(nums: number[], val: number): number {
    let k = 0;

    for (let i=0; i<nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++
        }
    }
    return k;
}

// 3️⃣ Valid Palindrome
// Ai un string s.
//     Determină dacă este palindrom, ignorând:
// caractere non-alfanumerice
// diferența dintre litere mari și mici
// Exemplu:
//     Input: "A man, a plan, a canal: Panama"
// Output: true
// Input: "race a car"
// Output: false
function isValidPalindrome(s: string): boolean {
   let left = 0;
   let right = s.length - 1;

   while (left < right) {
       if (s[left] !== s[right]) {
           return false;
       } else {
           left++;
           right--
       }
   }
   return true;
}

// 4️⃣ Two Sum II – Sorted Array
// Ai un array de numere întregi numbers sortat crescător.
//     Găsește două numere astfel încât suma lor să fie egală cu target.
//     Cerințe:
// Returnează un array cu indexurile celor două numere (1-based indexing).
// Se garantează că există exact o soluție.
//     Nu ai voie să folosești același element de două ori.
//     Soluția trebuie să fie O(n).
//     Exemplu:
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
function twoSum_SortedArray(arr: Array<number>, num: number) {
    let i = 0;
    let j = arr.length - 1;

    while (i < j) {
        if (arr[i] + arr[j] === num) {
            return [i+1, j+1];
        } else if (arr[i] + arr[j] < num) {
            i++;
        } else {
            j--;
        }
    }
}

// 5️⃣ Duplicate Zeros
// Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.
// Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.
// Example 1:
// Input: arr = [1,0,2,3,0,4,5,0]
// Output: [1,0,0,2,3,0,0,4]
// Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]
// Example 2:
// Input: arr = [1,2,3]
// Output: [1,2,3]
// Explanation: After calling your function, the input array is modified to: [1,2,3]
//
// Constraints:
// 1 <= arr.length <= 104
// 0 <= arr[i] <= 9
function duplicateZeros(arr: number[]): void {
    let zeroCount = 0;

    for (let i=0; i<arr.length; i++) {
        if (arr[i] === 0) {
            zeroCount++;
        }
    }

    let i = arr.length-1;
    let j = arr.length+zeroCount -1;

    while (i>= 0) {
        if (arr[j] < arr.length) {
            arr[j] = arr[i];
        }

        if (arr[i] === 0) {
            j--;
            if (j < arr.length) {
                arr[j] = 0;
            }
        }

        i--;
        j--;
    }



}

// 6️⃣ Sorted Squares
// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.
//     Example 1:
// Input: nums = [-4,-1,0,3,10]
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
//     After sorting, it becomes [0,1,9,16,100].
//     Example 2:
// Input: nums = [-7,-3,2,3,11]
// Output: [4,9,9,49,121]
function sortedSquares(nums: number[]) {
    let i = 0;
    let j = nums.length - 1;
    let result = new Array(nums.length);
    let k = nums.length - 1;

    while (i <= j) {
        let leftSquare = nums[i] * nums[i];
        let rightSquare = nums[j] * nums[j];

        if (leftSquare > rightSquare) {
            result[k] = leftSquare;
            i++;
            k--
        } else {
            result[k] = rightSquare;
            j--;
            k--
        }
    }
    return result;
};

// 7️⃣ Reverse string
// Reverse the given string
function reverseString(s: string) {
    // return s.split('').reverse().join('');

    let arr = s.split('');
    let i = 0;
    let j = arr.length - 1;

    while (i < j) {
        let k = arr[j];
        arr[j] = arr[i];
        arr[i] = k;
        i++;
        j--;
    }
    return arr.join('');
}

// 8️⃣ Move Zeroes
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

    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    while (slow < nums.length) {
        nums[slow] = 0;
        slow++;
    }

}

// 9️⃣ Merge Array
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
//     Merge nums1 and nums2 into a single array sorted in non-decreasing order.
//     The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
//     Example 1:
// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
//     The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
//     Example 2:
// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
//     The result of the merge is [1].
//     Example 3:
// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]
// Explanation: The arrays we are merging are [] and [1].
//     The result of the merge is [1].
//     Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
//
//     Constraints:
// nums1.length == m + n
// nums2.length == n
// 0 <= m, n <= 200
// 1 <= m + n <= 200
// -109 <= nums1[i], nums2[j] <= 109
function mergeArrays(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m-1;
    let j = n-1;
    let k = m+n-1;

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }

    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
}

// 🔟 Encoded String
// Given a string your task is to complete the function encode that returns the run length encoded string for the given string.
////     eg. if the input string is "wwwwaaadexxxxxx" then the function should return "w4a3d1e1x6".
////     You are required to complete the function encode that takes only one argument the string which is to be encoded and returns the encoded string.
//     Example 1:
//// Input:
//     str = aaaabbbccc
// output= a4b3c3
// Explanation: a repeats 4 times
// consecutively b 3 times, c also 3 times
// Example 2:
//// Input
// str = abbbcdddd
// output = a1b3c1d4
//
// Complete the function encode() which takes a character array as a input parameter and returns the encoded string.
function encodeString(s: string): string {
    let result = "";
    let count = 1;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[i + 1]) {
            count++;
        } else {
            result += s[i] + count;
            count = 1;
        }
    }

    return result;
}