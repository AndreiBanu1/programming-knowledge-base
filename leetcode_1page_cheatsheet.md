# LeetCode Patterns — 1 Page Cheat Sheet

## 1. Fast Mental Model

```text
ARRAY / STRING
│
├─ Duplicates / frequency / lookup?
│    → HashMap / HashSet
│
├─ Sorted?
│    ├─ Pair / compare ends → Two Pointers
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
├─ Cycle / middle?
│    → Fast & Slow Pointers
└─ Modify links?
     → Dummy Node / Pointer Manipulation


TREE / GRAPH
├─ Paths / depth / explore branch?
│    → DFS
├─ Levels / nearest / shortest unweighted?
│    → BFS
├─ Connectivity / groups?
│    → DFS / BFS / Union Find
└─ Dependencies / prerequisites?
     → Topological Sort


ALL POSSIBILITIES
→ Backtracking

OPTIMAL RESULT + REPEATED SUBPROBLEMS
→ Dynamic Programming
```

---

## 2. Keywords → Pattern

| Problem Says                        | Think                     |
| ----------------------------------- | ------------------------- |
| duplicate / seen before             | HashSet                   |
| frequency / count / occurrence      | HashMap                   |
| anagram                             | HashMap / frequency array |
| pair + target                       | HashMap                   |
| sorted + pair                       | Two Pointers              |
| palindrome                          | Two Pointers              |
| remove duplicates in-place          | Two Pointers              |
| substring / subarray / contiguous   | Sliding Window            |
| fixed size `k`                      | Fixed Sliding Window      |
| longest / shortest contiguous range | Sliding Window            |
| range sum                           | Prefix Sum                |
| sorted search                       | Binary Search             |
| first / last occurrence             | Binary Search             |
| minimize maximum / maximize minimum | Binary Search on Answer   |
| parentheses / brackets              | Stack                     |
| next greater / smaller              | Monotonic Stack           |
| K largest / K smallest / Top K      | Heap                      |
| linked-list middle / cycle          | Fast & Slow               |
| modify linked list                  | Dummy Node                |
| tree depth / path                   | DFS                       |
| tree level order                    | BFS                       |
| shortest unweighted path            | BFS                       |
| islands / connected cells           | DFS / BFS                 |
| connected components                | DFS / BFS / Union Find    |
| prerequisites / dependencies        | Topological Sort          |
| all subsets                         | Backtracking              |
| all permutations                    | Backtracking              |
| all combinations                    | Backtracking              |
| number of ways                      | DP                        |
| minimum cost                        | DP                        |
| longest subsequence                 | DP                        |
| prefix lookup                       | Trie                      |
| unique number / XOR                 | Bit Manipulation          |

---

## 3. Constraint Filter

```text
n <= 20
→ brute force / backtracking can be okay

n <= 1,000
→ O(n²) may be okay

n <= 100,000
→ aim for O(n) or O(n log n)

n >= 1,000,000
→ usually O(n) or better
```

If `n = 100,000`, nested loops should immediately look suspicious.

---

## 4. Important Distinction

```text
SUBARRAY / SUBSTRING
→ contiguous
→ Sliding Window / Prefix Sum

SUBSEQUENCE
→ not necessarily contiguous
→ often Dynamic Programming
```

Example:

```text
[1, 2, 3, 4]

subarray:
[2, 3]

subsequence:
[1, 3, 4]
```

---

## 5. Pattern Properties

```text
HashSet
→ "Have I seen this?"

HashMap
→ "How many times?" / "Where did I see it?"

Two Pointers
→ move two indices toward a solution

Sliding Window
→ maintain a valid contiguous range

Stack
→ Last In, First Out

Queue / BFS
→ First In, First Out / level-by-level

Heap
→ repeatedly get min/max efficiently

DFS
→ go deep, then backtrack

BFS
→ explore level by level

Backtracking
→ choose → explore → undo

DP
→ save answers to repeated smaller problems
```

---

## 6. Before Coding, Ask

```text
1. What is n?
2. What input type do I have?
3. Is it sorted?
4. Is the problem contiguous?
5. Do I need fast lookup?
6. Do I repeatedly need min/max?
7. Is this a tree/graph traversal?
8. Do I need all possibilities?
9. Are subproblems repeating?
10. Will brute force pass the constraints?
```

---

## 7. The Goal

```text
problem wording
    ↓
recognize shape
    ↓
identify likely pattern
    ↓
choose data structure
    ↓
write algorithm
```

Do not memorize full solutions.

Memorize **signals → patterns**.
