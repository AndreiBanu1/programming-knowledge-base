// 1️⃣ Two Sum II – Sorted Array
//
// Ai un array de numere întregi numbers sortat crescător.
//
//     Găsește două numere astfel încât suma lor să fie egală cu target.
//
//     Cerințe:
//
// Returnează un array cu indexurile celor două numere (1-based indexing).
//
// Se garantează că există exact o soluție.
//
//     Nu ai voie să folosești același element de două ori.
//
//     Soluția trebuie să fie O(n).
//
//     Exemplu:
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]

function twoSum_SortedArray(arr: Array<number>, num: number) {
    let i= 0;
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

console.log(twoSum_SortedArray([2, 7, 11, 15], 9));
// Expected: [1, 2]

console.log(twoSum_SortedArray([1, 3, 4, 6, 8, 10], 10));
// 4 + 6 = 10
// Expected: [3, 4]

console.log(twoSum_SortedArray([1, 2, 3, 4, 7], 8));
// 1 + 7 = 8
// Expected: [1, 5]

console.log(twoSum_SortedArray([-4, -1, 1, 2], 1));
// -1 + 2 = 1
// Expected: [2,4]

console.log(twoSum_SortedArray([1, 2], 3));
// 1 + 2 = 3
// Expected: [1, 2]