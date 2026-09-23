# LeetCode Pattern Recognition Cheat Sheet

## Short Mental Model

Start with this decision tree:

```text
ARRAY / STRING
│
├─ Need lookup / frequency / duplicates?
│    → HashMap / HashSet
│
├─ Sorted?
│    ├─ Find pair → Two Pointers
│    └─ Find target / boundary → Binary Search
│
├─ Contiguous subarray / substring?
│    → Sliding Window
│
├─ Range sums?
│    → Prefix Sum
│
├─ Next greater / smaller?
│    → Monotonic Stack
│
└─ Top K / smallest / largest?
     → Heap


LINKED LIST
│
├─ Cycle / middle?
│    → Fast & Slow Pointers
│
└─ Modify links?
     → Pointer Manipulation / Dummy Node


TREE / GRAPH
│
├─ Explore deeply / all paths?
│    → DFS
│
├─ Level by level / shortest unweighted path?
│    → BFS
│
├─ Groups / connectivity?
│    → DFS / BFS / Union Find
│
└─ Dependencies / prerequisites?
     → Topological Sort


GENERATE ALL POSSIBILITIES
→ Backtracking


OPTIMAL RESULT + REPEATED SUBPROBLEMS
→ Dynamic Programming
```

---

# Core Recognition Rules

## 1. Start With Constraints

Before thinking about the algorithm, look at `n`.

| Constraint        |          Usually Acceptable | Think About                          |
| ----------------- | --------------------------: | ------------------------------------ |
| `n <= 20`         | `O(2^n)`, sometimes `O(n!)` | Backtracking, brute force            |
| `n <= 100`        |          `O(n²)` often fine | Nested loops, DP                     |
| `n <= 1,000`      |      `O(n²)` sometimes fine | DP, nested loops                     |
| `n <= 100,000`    |      `O(n)` or `O(n log n)` | HashMap, Two Pointers, Heap, Sorting |
| `n <= 1,000,000`  |              Usually `O(n)` | Single pass, hashing                 |
| Huge search space |                  `O(log n)` | Binary Search, math                  |

### Important rule

If:

```text
n = 100,000
```

then this:

```text
for ...
    for ...
```

should immediately look suspicious.

`O(n²)` would mean roughly:

```text
10,000,000,000 operations
```

which is usually far too slow.

---

# 2. Input Type → Likely Patterns

## Arrays

Think about:

* HashMap / HashSet
* Two Pointers
* Sliding Window
* Binary Search
* Prefix Sum
* Heap
* Sorting
* Dynamic Programming

---

## Strings

Think about:

* HashMap
* HashSet
* Sliding Window
* Two Pointers
* Stack
* Trie

---

## Sorted Array

Sorted input is a major hint.

Think:

```text
Binary Search
Two Pointers
```

Examples:

```text
find target
find pair
find first occurrence
find last occurrence
```

---

## Linked List

Think:

```text
Fast & Slow Pointers
Dummy Node
Pointer Manipulation
```

Common problems:

```text
cycle
middle node
reverse list
merge lists
remove node
```

---

## Binary Tree

Think:

```text
DFS
BFS
Recursion
```

---

## Graph

Think:

```text
DFS
BFS
Union Find
Topological Sort
Shortest Path
```

---

## Matrix / Grid

A matrix is often secretly a graph.

Think:

```text
DFS
BFS
Dynamic Programming
```

Examples:

```text
islands
connected cells
shortest path
flood fill
```

---

## Intervals

Think:

```text
Sort first
Then merge / compare
```

Typical pattern:

```text
sort by start time
compare current interval with previous interval
```

---

# 3. Keyword → Pattern

## HashMap / HashSet

If the problem asks:

```text
Have I seen this value before?
```

think:

```text
HashSet
```

If it asks:

```text
How many times have I seen this?
```

think:

```text
HashMap
```

Common clues:

```text
duplicates
frequency
count
occurrence
anagram
lookup
pair with target
```

Examples:

```text
Contains Duplicate
Two Sum
Valid Anagram
Group Anagrams
```

---

# 4. Two Pointers

Think Two Pointers when:

```text
array is sorted
compare values from both ends
find pair
remove duplicates in-place
palindrome
```

Typical shape:

```text
left →           ← right
```

Example:

```text
[1, 2, 3, 4, 6]
```

Target:

```text
7
```

Start:

```text
1 + 6 = 7
```

No nested loops required.

---

# 5. Sliding Window

Think Sliding Window when the problem contains:

```text
substring
subarray
contiguous
window
longest
shortest
maximum/minimum contiguous section
```

Typical structure:

```text
[left ........ right]
```

The window grows and shrinks.

---

## Fixed Sliding Window

If the problem says:

```text
subarray of size k
substring of size k
```

think:

```text
fixed sliding window
```

Example:

```text
Find maximum sum of any 3 consecutive numbers.
```

---

## Variable Sliding Window

If the problem says:

```text
longest substring satisfying condition
shortest subarray satisfying condition
```

think:

```text
variable sliding window
```

Typical logic:

```text
expand right

while condition invalid:
    move left
```

---

# 6. Prefix Sum

Think Prefix Sum when you see:

```text
range sum
subarray sum
sum between index i and j
many sum queries
```

Example:

```text
nums = [2, 4, 1, 3]
```

Prefix:

```text
[2, 6, 7, 10]
```

Then a range sum can be calculated quickly.

Instead of recalculating:

```text
nums[i] + nums[i+1] + ...
```

every time.

---

# 7. Binary Search

Classic clue:

```text
sorted input
```

Think:

```text
Binary Search
```

Common wording:

```text
find target
first occurrence
last occurrence
minimum valid value
maximum valid value
```

Complexity:

```text
O(log n)
```

---

## Binary Search on Answer

A less obvious pattern.

Look for:

```text
minimum possible X
maximum possible X
smallest value such that...
largest value such that...
```

Especially when you can ask:

```text
If X works, do all larger values also work?
```

or:

```text
If X works, do all smaller values also work?
```

Then the answer space may be searchable using binary search.

---

# 8. Stack

Think Stack when the problem involves:

```text
parentheses
brackets
nested structures
undo-like behavior
last opened must close first
```

Think:

```text
LIFO
Last In, First Out
```

Example:

```text
([])
```

The latest opening bracket must close first.

Classic problem:

```text
Valid Parentheses
```

---

# 9. Monotonic Stack

Think Monotonic Stack when the problem asks:

```text
next greater element
next smaller element
previous greater element
previous smaller element
```

Instead of comparing every element with every later element:

```text
O(n²)
```

you can often maintain a stack:

```text
O(n)
```

---

# 10. Heap / Priority Queue

Think Heap when you repeatedly need:

```text
smallest
largest
top K
Kth largest
Kth smallest
highest priority
lowest priority
```

Key property:

```text
Give me the smallest/largest element quickly.
```

Examples:

```text
Kth Largest Element
Top K Frequent Elements
Merge K Sorted Lists
```

---

# 11. Linked List Patterns

## Fast & Slow Pointers

Think:

```text
cycle
middle
```

Typical setup:

```text
slow moves 1 step
fast moves 2 steps
```

If there's a cycle, eventually:

```text
fast == slow
```

---

## Dummy Node

Useful when modifying:

```text
head
```

Examples:

```text
delete nodes
merge lists
remove nth node
reconnect nodes
```

Instead of handling the head as a special case, create:

```text
dummy → head
```

Then manipulate everything uniformly.

---

# 12. Tree Traversal

For binary trees, your first question is usually:

```text
DFS or BFS?
```

---

## DFS

Think DFS when you need:

```text
depth
all paths
subtrees
recursive calculations
explore branch fully
```

Common implementations:

```text
recursion
stack
```

Typical idea:

```text
go deep
then come back
```

Examples:

```text
Maximum Depth of Binary Tree
Invert Binary Tree
Path Sum
```

---

## BFS

Think BFS when you see:

```text
level
level-order
nearest
minimum number of steps
```

Uses:

```text
queue
```

Typical idea:

```text
process level by level
```

Example:

```text
        1

     2     3

   4   5
```

BFS visits:

```text
1
2 3
4 5
```

---

# 13. Graph Traversal

Think:

```text
nodes + connections
```

even if the problem doesn't explicitly call it a graph.

Examples:

```text
cities connected by roads
people connected as friends
courses with dependencies
cells connected in a grid
```

---

## DFS / BFS

Use when exploring:

```text
connected components
reachable nodes
islands
paths
```

---

# 14. Union Find

Think Union Find when the problem asks:

```text
Are these two things connected?
```

or:

```text
How many separate groups exist?
```

Useful for:

```text
dynamic connectivity
connected components
cycle detection
```

---

# 15. Topological Sort

Think:

```text
dependencies
prerequisites
must happen before
ordering tasks
```

Classic clue:

```text
Course A must be completed before Course B.
```

Think:

```text
Directed Graph
Topological Sort
```

Classic example:

```text
Course Schedule
```

---

# 16. Backtracking

Think Backtracking when the problem asks for:

```text
all possibilities
all subsets
all permutations
all combinations
all valid arrangements
```

Typical structure:

```text
choose
explore
undo
```

Conceptually:

```text
pick something

try deeper

remove it

try another choice
```

Examples:

```text
Subsets
Permutations
Combination Sum
N-Queens
```

---

# 17. Dynamic Programming

DP often appears when the problem asks:

```text
number of ways
minimum cost
maximum profit
longest subsequence
best possible result
```

Important clue:

```text
the same smaller problem gets solved repeatedly
```

Think:

```text
Can I store previous results?
```

Typical DP idea:

```text
answer[current]
depends on
answer[previous]
```

Examples:

```text
Climbing Stairs
House Robber
Coin Change
Longest Increasing Subsequence
```

---

# 18. Greedy

Think Greedy when:

```text
making the best choice right now
leads to the global solution
```

Common clues:

```text
minimum operations
maximum number of tasks
interval scheduling
choose best available option
```

But be careful:

```text
A greedy choice must be provably safe.
```

Not every optimization problem is Greedy.

---

# 19. Trie

Think Trie when the problem focuses heavily on:

```text
words
prefixes
dictionary lookup
autocomplete
```

Example:

```text
apple
app
application
```

They share the prefix:

```text
app
```

Trie stores that shared prefix efficiently.

---

# 20. Bit Manipulation

Think Bit Manipulation when the problem mentions:

```text
binary
XOR
bits
power of 2
single number
```

Classic trick:

```text
x ^ x = 0
x ^ 0 = x
```

So:

```text
[4, 1, 2, 1, 2]
```

XOR everything:

```text
4
```

Classic problem:

```text
Single Number
```

---

# 21. Output Type Can Reveal the Pattern

## Output Is Boolean

Example:

```text
Does duplicate exist?
```

Think:

```text
HashSet
```

Example:

```text
Can node A reach node B?
```

Think:

```text
DFS / BFS
```

---

## Output Is Pair of Indices

Think:

```text
HashMap
Two Pointers
```

Example:

```text
Two Sum
```

---

## Output Is Longest / Shortest Contiguous Segment

Think:

```text
Sliding Window
```

---

## Output Is All Possibilities

Think:

```text
Backtracking
```

---

## Output Is Minimum / Maximum Value

Think:

```text
DP
Greedy
Heap
Binary Search on Answer
```

---

## Output Is Number of Ways

Think:

```text
Dynamic Programming
```

---

## Output Modifies Array In Place

Think:

```text
Two Pointers
```

---

# 22. Very Important Distinction

## Subarray

Contiguous.

Example:

```text
[1, 2, 3]
```

Possible subarray:

```text
[1, 2]
```

But not:

```text
[1, 3]
```

Think:

```text
Sliding Window
Prefix Sum
```

---

## Substring

Same idea, but for strings.

Contiguous.

```text
"abcdef"
```

Substring:

```text
"bcd"
```

Think:

```text
Sliding Window
```

---

## Subsequence

Does **not** need to be contiguous.

Example:

```text
[1, 2, 3, 4]
```

Possible subsequence:

```text
[1, 3, 4]
```

Think more often:

```text
Dynamic Programming
```

---

# 23. Recognition Table

| Problem Says                  | First Pattern to Consider |
| ----------------------------- | ------------------------- |
| duplicates                    | HashSet                   |
| frequency                     | HashMap                   |
| count occurrences             | HashMap                   |
| anagram                       | HashMap / frequency array |
| pair + target                 | HashMap                   |
| sorted + pair                 | Two Pointers              |
| palindrome                    | Two Pointers              |
| remove duplicates             | Two Pointers              |
| substring                     | Sliding Window            |
| contiguous subarray           | Sliding Window            |
| fixed size `k`                | Fixed Sliding Window      |
| longest substring             | Sliding Window            |
| range sum                     | Prefix Sum                |
| sorted search                 | Binary Search             |
| first / last occurrence       | Binary Search             |
| minimize maximum              | Binary Search on Answer   |
| middle linked list            | Fast / Slow               |
| linked list cycle             | Fast / Slow               |
| modify linked list            | Dummy Node / Pointers     |
| parentheses                   | Stack                     |
| nested brackets               | Stack                     |
| next greater                  | Monotonic Stack           |
| next smaller                  | Monotonic Stack           |
| K largest                     | Heap                      |
| K smallest                    | Heap                      |
| Top K                         | Heap                      |
| tree depth                    | DFS                       |
| tree path                     | DFS                       |
| level order                   | BFS                       |
| nearest / shortest unweighted | BFS                       |
| islands                       | DFS / BFS                 |
| connected groups              | DFS / BFS / Union Find    |
| prerequisites                 | Topological Sort          |
| all subsets                   | Backtracking              |
| all permutations              | Backtracking              |
| all combinations              | Backtracking              |
| number of ways                | DP                        |
| minimum cost                  | DP                        |
| maximum profit                | DP / Greedy               |
| longest subsequence           | DP                        |
| prefix lookup                 | Trie                      |
| single unique number          | XOR                       |
| power of 2                    | Bit Manipulation          |

---

# 24. Recommended Learning Order

A good order for learning these patterns is:

```text
1. Arrays
2. HashMap / HashSet
3. Two Pointers
4. Sliding Window
5. Stack
6. Linked Lists
7. Binary Search
8. Trees
9. DFS
10. BFS
11. Heap
12. Graphs
13. Backtracking
14. Dynamic Programming
```

You don't need to master everything immediately.

The most useful early patterns are:

```text
HashMap / HashSet
Two Pointers
Sliding Window
Stack
Binary Search
DFS / BFS
```

These already cover a very large number of Easy and Medium LeetCode problems.

---

# Final Pattern Recognition Checklist

When opening a new problem, ask these questions in order:

```text
1. What are the constraints?

2. What type of input do I have?
   Array?
   String?
   Linked List?
   Tree?
   Graph?

3. Is the input sorted?

4. Is the problem asking about:
   duplicates?
   frequencies?
   pairs?
   contiguous elements?
   paths?
   levels?
   all combinations?

5. Does it say substring or subarray?
   → Sliding Window

6. Does it say subsequence?
   → Possibly DP

7. Do I repeatedly need smallest/largest?
   → Heap

8. Do I need "have I seen this before?"
   → HashSet / HashMap

9. Do I need to explore connections?
   → DFS / BFS

10. Do I need all possible solutions?
    → Backtracking

11. Do smaller repeated problems appear?
    → Dynamic Programming

12. Does my brute-force solution violate the constraints?
```

The goal is not:

```text
memorize solutions
```

The goal is:

```text
recognize the shape of the problem
        ↓
identify the likely pattern
        ↓
choose the data structure
        ↓
then write the algorithm
```
