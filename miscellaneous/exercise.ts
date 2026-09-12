const ages: number[] = [12, 17, 22, 30, 45, 22, 12, 16, 18, 25, 22, 30, 17]

const obj: Record<string, number> = {}

// Method I:
// Step 1: store each age as a key
for (const age of ages) {
    obj[age] = age
}

// Step 2: extract values (duplicates removed)
const objBasedDeduped = Object.values(obj)
console.log("method I:", objBasedDeduped);

// or method II:
const uniqueAgesSet = Array.from(new Set(ages))
console.log("method II:", uniqueAgesSet);

// or:
const formats = new Set(ages);
const strings = [...formats];
console.log("method II.2:", strings);

// or
let sortedAges = [...ages].sort((a, b) => a - b);
console.log("method IV:", removeDuplicatesFromAges(sortedAges));

function removeDuplicatesFromAges(nums: number[]) {
    let k = 1;

    for (let i = 1; i < nums.length; i++) {
        const current = nums[i]!;
        if (current !== nums[i - 1]) {
            nums[k] = current;
            k++;
        }
    }

    return nums.slice(0, k);
}

const obs = new Set<string>();
console.log(obs)
