// Ordered collections of data
// [1, 2, 3, 4, 5]
// Stored in contiguous memory (each value is stored next to each other). To add a value in the middle, the entire array must shift out

// Time Complexity
// Read - O(1)
// Insert - O(n)
// Delete - O(n)

// Declare an array of numbers
let numbers: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] //this actually is an array list in js

// Static arrays are stored in contiguous memory.
const realArr = new Uint8Array(10)

// Insert at end
numbers.push(40) // [10, 20, 30, 40]

// Delete last element
numbers.pop() // [5, 10, 20, 30]

// Insert at beginning
numbers.unshift(5) // [5, 10, 20, 30, 40]

// Delete first element
numbers.shift() // [10, 20, 30]

// Create a copy starting from i up to but not including j
numbers.slice(2, 5)

// Delete at index 1 (remove 1 element)
numbers.splice(1, 1) // [10, 30]

// Find element (returns index or -1)
console.log(numbers.indexOf(30)) // 1

// Check if includes
console.log(numbers.includes(20)) // false

// Iterate
numbers.forEach((num) => console.log(num)) // 10, 30

// Map
const doubled = numbers.map((num) => num * 2) // [20, 60]
console.log(doubled)

// Filter
const evens = numbers.filter((num) => num % 2 === 0) // [10, 30]
console.log(evens)

// Deep copy vs shallow copy of arrays
realArr[0] = 5
realArr[1] = 5
realArr[2] = 69

// deep copy
const b = realArr.slice(0, 5)
b[3] = 5
console.log(realArr)
// Uint8Array(10) [
//   5, 5, 69, 0, 0,
//   0, 0,  0, 0, 0
// ]

const buf = Buffer.alloc(5)
buf.writeUInt8(5, 0)
console.log(buf) // <Buffer 05 00 00 00 00>

// Buffers are shallow sliced
const buf2 = buf.slice(0, 5)
buf2.writeUInt8(5, 0)
console.log(buf) // <Buffer 05 00 00 05 00>
