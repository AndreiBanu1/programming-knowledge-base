// Given two crystal balls that will break if dropped from high enough
// distance, determine the exact spot in which it will break in the most optimized way
// or (You are in a 100 story building and you have 2 crystal balls and want to find out at which floor will they break)

// we can break down the solution to an array full of false and one true like:
// [f, f, f, f, t, t, t, t, t, t] (true is the floor where the balls start breaking)

// Problems:
// Linear search is O(N), and binary search with two crystal balls still results in O(N) time complexity, as the second ball requires a linear search after the first ball breaks

// Solution: Jump by square root of N, then linearly search backwards to find the exact breaking point, resulting in a O(√N) time complexity

export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jumpAmount;
    for (i; i < breaks.length; i+=jumpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    i -= jumpAmount;
    for (let j = 0; j < jumpAmount && i < breaks.length; j++, i++) {
        if (breaks[i]) {
            return i;
        }
    }
    return -1;
}

console.log(two_crystal_balls([false, false, false, true, true])) // 3 (first breaking floor)

console.log(two_crystal_balls([false, false, false, false, false, true, true, true])) // 5

console.log(two_crystal_balls([true, true, true, true])) // 0 (breaks from the first floor)

console.log(two_crystal_balls([false, false, false, false])) // -1 (never breaks)

console.log(two_crystal_balls([false])) // -1

console.log(two_crystal_balls([true])) // 0

console.log(two_crystal_balls([])) // -1 (empty array)