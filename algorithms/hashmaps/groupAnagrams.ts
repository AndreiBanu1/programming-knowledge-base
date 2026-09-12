/**
Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.
An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

Example 1:
Input: strs = ["act","pots","tops","cat","stop","hat"]
Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
 */

// #1: Understand the problem, input, output, edge case

// #2; Go manually step by step

// #3: Patterns observed
//  Două string-uri sunt anagrame dacă și numai dacă au aceleași litere în aceeași cantitate.\
//   "amprentă" identică pentru toate anagramele din aceeași grupă:
//   "act" → sort → "act"  ┐
//   "cat" → sort → "act"  ┘→ aceeași cheie → același bucket
//   "pots" → sort → "opst" → cheie diferită → bucket separat

// #4: Code

function groupAnagrams(strs: string[]): string[][] {
  const hash: Record<string, string[]> = {}

  for (const str of strs) {
    const key = str.split('').sort().join('')

    if (!hash[key]) {
      hash[key] = []
    }

    hash[key].push(str)
  }

  return Object.values(hash)
}

function group2Anagrams(strs: string[]): string[][] {
  // 1. make an empty map: key = string, value = string[]
  const map = new Map<string, string[]>()
  // 2. for each word:
  //    - compute the key (sort its letters into a string)
  //    - if the key isn't in the map, create an empty array for it
  //    - push the word into that key's array
  for (const str of strs) {
    const key = str.split('').sort().join('')
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key)!.push(str)
  }
  // 3. return all the values of the map
  return [...map.values()]
}

// #5: Test
