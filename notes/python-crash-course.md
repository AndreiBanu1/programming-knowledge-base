# TypeScript vs Python — Practical Comparison

## 1. Primitive / Basic Values

| Concept     | TypeScript  | Python     | Notes                                      |
| ----------- | ----------- | ---------- | ------------------------------------------ |
| String      | `string`    | `str`      | Very similar                               |
| Integer     | `number`    | `int`      | Python separates integers and floats       |
| Float       | `number`    | `float`    | TypeScript uses `number` for both          |
| Boolean     | `boolean`   | `bool`     | `true/false` vs `True/False`               |
| Null        | `null`      | `None`     | Python uses `None`                         |
| Undefined   | `undefined` | —          | No direct equivalent in Python             |
| Big Integer | `bigint`    | `int`      | Python integers can grow arbitrarily large |
| Symbol      | `symbol`    | —          | No common direct equivalent                |
| Any         | `any`       | any object | Python is dynamically typed by default     |

```ts
let age: number = 30;
let name: string = "Ana";
let active: boolean = true;
```

```python
age = 30
name = "Ana"
active = True
```
---

## 2. Collections — Quick Declarations and Mental Mapping

Before looking at each collection individually, it is useful to understand the main Python collection types and how they compare to TypeScript.

### Quick Reference

| Purpose                    | TypeScript         | Python           | Empty Declaration | Example           |
| -------------------------- | ------------------ | ---------------- | ----------------- | ----------------- |
| Dynamic ordered collection | `Array<T>`         | `list[T]`        | `items = []`      | `[1, 2, 3]`       |
| Stack                      | `Array<T>`         | `list[T]`        | `stack = []`      | `[1, 2, 3]`       |
| Fixed ordered values       | Tuple type         | `tuple`          | `values = ()`     | `(1, 2, 3)`       |
| Unique values              | `Set<T>`           | `set[T]`         | `items = set()`   | `{1, 2, 3}`       |
| Key → value mapping        | `Map<K, V>`        | `dict[K, V]`     | `data = {}`       | `{"a": 1}`        |
| Typed object map           | `Record<K, V>`     | `dict[K, V]`     | `data = {}`       | `{"a": 1}`        |
| Plain object               | `{ ... }`          | `dict` / class   | `data = {}`       | `{"name": "Ana"}` |
| Queue                      | usually `Array<T>` | `deque`          | `queue = deque()` | `deque([1, 2])`   |
| Double-ended queue         | custom / library   | `deque`          | `queue = deque()` | `deque([1, 2])`   |
| Priority queue             | custom / library   | `heapq` + `list` | `heap = []`       | `[1, 3, 5]`       |

---

### The Most Important Python Collection Syntax

```python
# List
items = []

# Stack — usually implemented using a list
stack = []

# Tuple
coordinates = ()

# Empty set
unique_items = set()

# Set with values
unique_items = {1, 2, 3}

# Empty dictionary
user = {}

# Dictionary with values
user = {
    "name": "Ana",
    "age": 30,
}
```

The important syntax to remember is:

```text
[]              → list

()              → tuple

set()           → empty set

{1, 2, 3}       → set

{}              → empty dict

{"a": 1}        → dict
```

### Important: `{}` Is Not an Empty Set

This is a common Python beginner trap.

```python
value = {}

print(type(value))
# <class 'dict'>
```

An empty set must be created explicitly:

```python
value = set()

print(type(value))
# <class 'set'>
```

Once a set contains values, however, curly braces are used:

```python
numbers = {1, 2, 3}
```

So:

```text
{}              → dict

{1, 2, 3}       → set

{"a": 1}        → dict
```

Python distinguishes a `set` from a `dict` by the presence of `key: value` pairs.

---

## TypeScript → Python Mental Mapping

### Array → List

TypeScript:

```ts
const numbers: number[] = [1, 2, 3];
```

Python:

```python
numbers: list[int] = [1, 2, 3]
```

Mental mapping:

```text
Array<T> → list[T]
```

---

### Stack → List

TypeScript commonly uses an Array:

```ts
const stack: number[] = [];

stack.push(1);
stack.pop();
```

Python normally uses a list:

```python
stack = []

stack.append(1)
stack.pop()
```

Mental mapping:

```text
Stack → list
```

---

### Set → Set

TypeScript:

```ts
const ids = new Set<number>();

ids.add(1);
ids.add(2);
```

Python:

```python
ids = set()

ids.add(1)
ids.add(2)
```

Or with initial values:

```python
ids = {1, 2, 3}
```

Mental mapping:

```text
Set<T> → set[T]
```

A set contains values only:

```python
{"Ana", "John", "Maria"}
```

It does not contain key/value pairs.

---

### Map → Dict

TypeScript:

```ts
const ages = new Map<string, number>();

ages.set("Ana", 30);
ages.set("John", 25);
```

Python:

```python
ages: dict[str, int] = {
    "Ana": 30,
    "John": 25,
}
```

Mental mapping:

```text
Map<K, V> → dict[K, V]
```

---

### Record → Dict

TypeScript:

```ts
const ages: Record<string, number> = {
    Ana: 30,
    John: 25,
};
```

Python:

```python
ages: dict[str, int] = {
    "Ana": 30,
    "John": 25,
}
```

Mental mapping:

```text
Record<K, V> → dict[K, V]
```

Python's `dict` covers many use cases where TypeScript may use:

```text
Object
Record
Map
```

They are not identical concepts in TypeScript, but their most common Python equivalent is often `dict`.

---

### Object → Dict or Class

TypeScript:

```ts
const user = {
    name: "Ana",
    age: 30
};
```

Python dictionary:

```python
user = {
    "name": "Ana",
    "age": 30,
}
```

Access:

```python
user["name"]
```

For richer domain objects, Python often uses a class or `dataclass` instead:

```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
```

So the mental mapping is:

```text
simple JS/TS object
        ↓
Python dict

domain object / model
        ↓
Python class / dataclass
```

---

### Queue → deque

TypeScript often uses an Array:

```ts
const queue: number[] = [];

queue.push(1);
queue.push(2);

const first = queue.shift();
```

Python provides `deque`:

```python
from collections import deque

queue = deque()

queue.append(1)
queue.append(2)

first = queue.popleft()
```

Mental mapping:

```text
TS Array used as Queue
        ↓
Python deque
```

Prefer `deque` instead of:

```python
items.pop(0)
```

when implementing a real queue.

---

## Quick Operations Cheat Sheet

| Operation                | TypeScript        | Python                         |
| ------------------------ | ----------------- | ------------------------------ |
| List / Array add         | `arr.push(x)`     | `arr.append(x)`                |
| List / Array remove last | `arr.pop()`       | `arr.pop()`                    |
| Contains                 | `arr.includes(x)` | `x in arr`                     |
| Length                   | `arr.length`      | `len(arr)`                     |
| Set add                  | `set.add(x)`      | `set.add(x)`                   |
| Set contains             | `set.has(x)`      | `x in set`                     |
| Set remove               | `set.delete(x)`   | `set.remove(x)` / `discard(x)` |
| Map set                  | `map.set(k, v)`   | `dict[k] = v`                  |
| Map get                  | `map.get(k)`      | `dict.get(k)`                  |
| Map contains key         | `map.has(k)`      | `k in dict`                    |
| Map delete               | `map.delete(k)`   | `del dict[k]`                  |
| Queue add                | `queue.push(x)`   | `queue.append(x)`              |
| Queue remove             | `queue.shift()`   | `queue.popleft()`              |
| Stack push               | `stack.push(x)`   | `stack.append(x)`              |
| Stack pop                | `stack.pop()`     | `stack.pop()`                  |

---

## Fastest Mental Model

```text
TypeScript             Python

Array<T>           →   list[T]

Stack              →   list

Tuple              →   tuple

Set<T>             →   set[T]

Map<K, V>          →   dict[K, V]

Record<K, V>       →   dict[K, V]

Object             →   dict / class

Queue              →   deque

Priority Queue     →   heapq
```

And for declarations:

```python
items = []                  # list
stack = []                  # stack using list
coordinates = ()            # tuple

ids = set()                 # empty set
ids = {1, 2, 3}             # set with values

user = {}                   # empty dict
user = {"name": "Ana"}      # dict

from collections import deque
queue = deque()             # queue
```

If only one syntax rule is memorized, make it this one:

```text
[]          list
()          tuple
set()       empty set
{1, 2, 3}   set
{}          dict
{"a": 1}    dict
```


## 2. Array vs List
| TypeScript      | Python          |
| --------------- | --------------- |
| `Array<T>`      | `list[T]`       |
| `[1, 2, 3]`     | `[1, 2, 3]`     |
| Mutable         | Mutable         |
| Indexed         | Indexed         |
| Preserves order | Preserves order |

```ts
const numbers = [1, 2, 3];
numbers.push(4);
numbers.pop();
```

```py
numbers = [1, 2, 3]
numbers.append(4)
numbers.pop()
```

### Important Array / List Methods

| Operation          | TypeScript Array    | Python List                |
| ------------------ | ------------------- | -------------------------- |
| Add at end         | `push(x)`           | `append(x)`                |
| Remove last        | `pop()`             | `pop()`                    |
| Add at beginning   | `unshift(x)`        | `insert(0, x)`             |
| Remove first       | `shift()`           | `pop(0)`                   |
| Insert             | `splice()`          | `insert()`                 |
| Remove by value    | custom / `splice()` | `remove(x)`                |
| Find index         | `indexOf(x)`        | `index(x)`                 |
| Contains           | `includes(x)`       | `x in list`                |
| Length             | `.length`           | `len(list)`                |
| Sort in place      | `.sort()`           | `.sort()`                  |
| Return sorted copy | `toSorted()`        | `sorted(list)`             |
| Reverse            | `.reverse()`        | `.reverse()`               |
| Map                | `.map()`            | comprehension / `map()`    |
| Filter             | `.filter()`         | comprehension / `filter()` |
| Reduce             | `.reduce()`         | `functools.reduce()`       |
| Find               | `.find()`           | `next(...)`                |
| Some               | `.some()`           | `any()`                    |
| Every              | `.every()`          | `all()`                    |
| Join               | `.join()`           | `"".join(...)`             |
| Slice              | `.slice()`          | slicing `list[a:b]`        |

A very Pythonic example:

```python
numbers = [1, 2, 3, 4]

squares = [number**2 for number in numbers] # [1, 4, 9, 16]
squares_map = list(map(lambda number: number**2, numbers))

divided_by_2 = [number % 2 == 0 for num in numbers] # [False, True, False, True]

divisible_by_2 = [number for number in numbers if number % 2 == 0] # [2, 4]
divisible_by_2_filter = list(
    filter(lambda number: number % 2 == 0, numbers)
)
```

Equivalent TypeScript:
```ts
const squares = numbers.map(number => number ** 2); // [1, 4, 9, 16]
const dividedBy2 = numbers.map(number => number % 2 == 0); // [False, True, False, True]
const divisibileBy2 = numbers.filter(number => number % 2 == 0) // [2, 4]
```

---

## 3. Tuple

TypeScript supports tuples:

```ts
const user: [string, number] = ["Ana", 30];
```

Python has a built-in `tuple` type:

```python
user = ("Ana", 30)
```

Main difference:

| `list`                        | `tuple`               |
| ----------------------------- | --------------------- |
| Mutable                       | Immutable             |
| `[1, 2]`                      | `(1, 2)`              |
| Good for changing collections | Good for fixed values |

Example:

```python
coordinates = (10, 20)
```

---

## 4. Object vs Dict

Another important mapping.

TypeScript:

```ts
const user = {
    name: "Ana",
    age: 30
};
```

Python:

```python
user = {
    "name": "Ana",
    "age": 30,
}
```

In Python, this is called a: dict

### Object / Dict Methods

| Operation    | TypeScript                 | Python `dict`     |
| ------------ | -------------------------- | ----------------- |
| Access       | `obj.name` / `obj["name"]` | `obj["name"]`     |
| Safe access  | `obj?.name`                | `obj.get("name")` |
| Keys         | `Object.keys(obj)`         | `obj.keys()`      |
| Values       | `Object.values(obj)`       | `obj.values()`    |
| Entries      | `Object.entries(obj)`      | `obj.items()`     |
| Delete       | `delete obj.name`          | `del obj["name"]` |
| Contains key | `"name" in obj`            | `"name" in obj`   |
| Length       | `Object.keys(obj).length`  | `len(obj)`        |
| Merge        | `{...a, ...b}`             | `{**a, **b}`      |

Example:

```python
user = {
    "name": "Ana",
    "age": 30,
}

print(user.get("name"))
```

---

## 5. Map

```ts
const users = new Map<string, number>();
users.set("Ana", 30);
users.get("Ana");
```

In Python, you usually use a `dict`:

```python
users = {}
users["Ana"] = 30
print(users["Ana"])
```

It is not a perfect equivalence, but it is the closest practical match.

---

## 6. Set

Very similar in both languages.

TypeScript:

```ts
const ids = new Set([1, 2, 3]);

ids.add(4);
ids.has(2);
ids.delete(1);
```

Python:

```python
ids = {1, 2, 3}

ids.add(4)
2 in ids
ids.remove(1)
```

### Set Methods

| TypeScript Set | Python Set                   |
| -------------- | ---------------------------- |
| `.add(x)`      | `.add(x)`                    |
| `.has(x)`      | `x in set`                   |
| `.delete(x)`   | `.remove(x)` / `.discard(x)` |
| `.size`        | `len(set)`                   |
| —              | `.union()`                   |
| —              | `.intersection()`            |
| —              | `.difference()`              |

Python also has concise set operators:

```python
a = {1, 2, 3}
b = {2, 3, 4}

print(a | b)  # union
print(a & b)  # intersection
print(a - b)  # difference
```

---

## 7. Queue

JavaScript / TypeScript does not have a dedicated general-purpose Queue built in.

A common approach is:

```ts
const queue: number[] = [];

queue.push(1);
queue.push(2);

const first = queue.shift();
```

Python provides a better data structure:

```python
from collections import deque

queue = deque()

queue.append(1)
queue.append(2)

first = queue.popleft()
```

Mental mapping:

```text
TypeScript
Array
push()
shift()

Python
deque
append()
popleft()
```

`deque` is more efficient than:

```python
list.pop(0)
```

for removing elements from the beginning.

---

## 8. Stack

Both languages can use arrays/lists.

TypeScript:

```ts
const stack = [];

stack.push(10);
stack.push(20);

stack.pop();
```

Python:

```python
stack = []

stack.append(10)
stack.append(20)

stack.pop()
```

So:

```text
TypeScript Array ≈ Python list
```

works very well for stacks.

---

## 9. Linked List

Neither TypeScript nor Python has a commonly used built-in general-purpose `LinkedList`.

You usually implement one yourself:

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
```

Conceptually:

```text
Node
 ↓
[value | next]
         ↓
      [value | next]
               ↓
             None
```

In normal Python applications, you rarely need a linked list.

In many cases:

```python
list
```

or:

```python
collections.deque
```

is more appropriate.

---

## 10. Other Useful Data Structures

| Data Structure     | TypeScript       | Python                    |
| ------------------ | ---------------- | ------------------------- |
| Dynamic Array      | `Array`          | `list`                    |
| Tuple              | tuple type       | `tuple`                   |
| Hash Map           | `Map` / Object   | `dict`                    |
| Hash Set           | `Set`            | `set`                     |
| Queue              | `Array`          | `collections.deque`       |
| Stack              | `Array`          | `list`                    |
| Double-ended Queue | custom / package | `deque`                   |
| Priority Queue     | custom / package | `heapq`                   |
| Linked List        | custom           | custom                    |
| Immutable Set      | —                | `frozenset`               |
| Counter            | custom / `Map`   | `collections.Counter`     |
| Default Dictionary | custom           | `collections.defaultdict` |

---

## 11. Priority Queue / Heap

Python has a built-in heap implementation through `heapq`:

```python
import heapq

numbers = [5, 2, 8, 1]

heapq.heapify(numbers)

smallest = heapq.heappop(numbers)
```

Useful for:

* algorithms
* pathfinding
* scheduling
* Dijkstra
* AI search

In TypeScript, you usually implement a heap yourself or use a library.

---

## 12. Counter

Python has a very useful built-in utility:

```python
from collections import Counter

letters = Counter(["a", "b", "a", "a"])

print(letters)
```

Output:

```python
{"a": 3, "b": 1}
```

In TypeScript, you would usually use a `Map` and increment values manually.

---

## 13. `for` Loops

TypeScript:

```ts
for (const number of numbers) {
    console.log(number);
}
```

Python:

```python
for number in numbers:
    print(number)
```

With an index:

TypeScript:

```ts
numbers.forEach((number, index) => {
    console.log(index, number);
});
```

Python:

```python
for index, number in enumerate(numbers):
    print(index, number)
```

`enumerate()` is very important in Python.

---

## 14. Map / Filter: Style Difference

In TypeScript, this is very common:

```ts
const adults = users
    .filter(user => user.age >= 18)
    .map(user => user.name);
```

Python often prefers:

```python
adults = [
    user["name"]
    for user in users
    if user["age"] >= 18
]
```

This is called a:

```text
list comprehension
```

It is one of the most important Python idioms.

---

## 15. `map()` Also Exists in Python

You can write:

```python
numbers = [1, 2, 3]

squares = list(map(lambda x: x**2, numbers))
```

But Python developers usually prefer:

```python
squares = [x**2 for x in numbers]
```

because it is usually easier to read.

---

## 16. Arrow Functions vs Lambda

TypeScript:

```ts
const double = (x: number) => x * 2;
```

Python:

```python
double = lambda x: x * 2
```

However, Python often prefers:

```python
def double(x):
    return x * 2
```

Python `lambda` expressions are intentionally limited to a single expression.

---

## 17. Destructuring / Unpacking

TypeScript:

```ts
const [first, second] = numbers;
```

Python:

```python
first, second = numbers
```

Python also supports:

```python
first, *rest = [1, 2, 3, 4]
```

Result:

```python
first == 1
rest == [2, 3, 4]
```

This is called unpacking.

---

## 18. Spread Operator

TypeScript:

```ts
const combined = [...a, ...b];
```

Python:

```python
combined = [*a, *b]
```

For objects / dictionaries:

TypeScript:

```ts
const result = {
    ...user,
    active: true
};
```

Python:

```python
result = {
    **user,
    "active": True,
}
```

---

## 19. Optional Chaining

TypeScript:

```ts
user?.address?.city
```

Python does not have `?.`.

You usually write:

```python
if user is not None:
    print(user.address.city)
```

For dictionaries:

```python
city = user.get("address", {}).get("city")
```

---

## 20. Null / None

TypeScript:

```ts
if (user === null) {
}
```

Python:

```python
if user is None:
    pass
```

In Python, prefer:

```python
value is None
```

instead of:

```python
value == None
```

---

## 21. Truthy / Falsy Values

Both languages have truthy and falsy values.

In Python, the following are falsy:

```python
False
None
0
0.0
""
[]
{}
set()
```

So you can write:

```python
if not users:
    print("The list is empty")
```

instead of:

```python
if len(users) == 0:
```

---

## 22. `==` — Important Difference

In JavaScript / TypeScript you have:

```ts
==
===
```

and usually prefer:

```ts
===
```

Python has:

```python
==
```

for value equality and:

```python
is
```

for object identity.

Example:

```python
a = [1, 2]
b = [1, 2]

print(a == b)  # True
print(a is b)  # False
```

Think of it as:

```text
==    same value?

is    exact same object?
```

---

## 23. Mutability

This is very important in Python.

### Mutable

```python
list
dict
set
```

### Immutable

```python
int
float
bool
str
tuple
frozenset
```

Example:

```python
numbers = [1, 2]
numbers.append(3)
```

The same list is modified.

But strings are immutable:

```python
name = "Ana"
```

The internal string value cannot be changed in place.

---

## 24. Type System — One of the Biggest Differences

TypeScript is essentially:

```text
JavaScript
+
static type checking
```

Example:

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

Python is dynamically typed:

```python
def add(a, b):
    return a + b
```

But Python supports type hints:

```python
def add(a: int, b: int) -> int:
    return a + b
```

Important:

Python type hints do not behave exactly like TypeScript types.

Python can still execute:

```python
add("hello", "world")
```

at runtime.

Type checkers such as:

```text
Pyright
mypy
```

perform static checking.

VS Code with Pylance primarily uses Pyright.

---

## 25. Interface vs Python

TypeScript:

```ts
interface User {
    name: string;
    age: number;
}
```

Python can use a `dataclass`:

```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
```

Then:

```python
user = User("Ana", 30)
```

For TypeScript developers, `dataclass` is a very useful Python concept.

Python also has:

```text
Protocol
TypedDict
```

for more interface-like typing scenarios.

---

## 26. Object Access

TypeScript:

```ts
user.name
```

Python class instance:

```python
user.name
```

But Python dictionary:

```python
user["name"]
```

This distinction is important:

```text
class instance
user.name

dict
user["name"]
```

---

## 27. Class

TypeScript:

```ts
class User {
    constructor(
        public name: string
    ) {}
}
```

Python:

```python
class User:
    def __init__(self, name):
        self.name = name
```

`self` is roughly equivalent to:

```ts
this
```

So:

```text
TypeScript    Python

this          self
```

---

## 28. Private Properties

TypeScript:

```ts
class User {
    private password: string;
}
```

Python does not have strict private members in the same way.

Convention:

```python
self._password
```

means:

```text
This attribute is internal; do not access it directly.
```

Python also supports:

```python
self.__password
```

which triggers name mangling, but it is still not absolute privacy.

---

## 29. Exceptions

TypeScript:

```ts
try {
    ...
} catch (error) {
    ...
}
```

Python:

```python
try:
    ...
except Exception as error:
    ...
```

Python also supports:

```python
else:
```

and:

```python
finally:
```

Example:

```python
try:
    number = int("abc")
except ValueError:
    print("Not a valid number")
```

---

## 30. Async / Await

The syntax is conceptually similar.

TypeScript:

```ts
async function getData() {
    const result = await fetchData();
}
```

Python:

```python
async def get_data():
    result = await fetch_data()
```

However, the ecosystem and event loop model are different.

Python commonly uses:

```python
asyncio
```

---

## 31. Imports

TypeScript:

```ts
import { User } from "./user";
```

Python:

```python
from user import User
```

or:

```python
import math

print(math.sqrt(9))
```

---

## 32. String Interpolation

TypeScript:

```ts
const message = `Hello ${name}`;
```

Python:

```python
message = f"Hello {name}"
```

These are called:

```text
f-strings
```

and they are used very frequently.

---

## 33. Ternary Operator

TypeScript:

```ts
const result = age >= 18 ? "adult" : "minor";
```

Python:

```python
result = "adult" if age >= 18 else "minor"
```

The order is different.

---

## 34. Switch

TypeScript:

```ts
switch (status) {
    case "active":
        ...
}
```

Modern Python uses:

```python
match status:
    case "active":
        ...
```

This is called:

```text
structural pattern matching
```

---

## 35. Increment

TypeScript:

```ts
count++;
```

Python has no `++`.

Use:

```python
count += 1
```

---

## 36. Scope — Important Difference

TypeScript:

```ts
if (true) {
    const x = 10;
}

// x does not exist here
```

Python:

```python
if True:
    x = 10

print(x)
```

In Python, `if`, `for`, and `while` do not create a new local scope.

New scopes are mainly introduced by:

```text
function
class
module
```

This often surprises JavaScript / TypeScript developers.

---

## 37. Braces vs Indentation

TypeScript:

```ts
if (age >= 18) {
    console.log("Adult");
}
```

Python:

```python
if age >= 18:
    print("Adult")
```

In Python, indentation is part of the syntax.

It is not just formatting.

---

## 38. Semicolons

TypeScript:

```ts
const x = 10;
```

Python:

```python
x = 10
```

Semicolons are normally not used.

---

## 39. `const` Does Not Exist

TypeScript:

```ts
const pi = 3.14;
```

Python:

```python
PI = 3.14
```

But `PI` is not protected from reassignment.

Uppercase naming is only a convention:

```text
UPPER_CASE = constant
```

---

## 40. Mental Mapping Summary

If you come from TypeScript, these associations are useful:

| TypeScript        | Python                               |
| ----------------- | ------------------------------------ |
| `number`          | `int`, `float`                       |
| `string`          | `str`                                |
| `boolean`         | `bool`                               |
| `null`            | `None`                               |
| `Array`           | `list`                               |
| Tuple             | `tuple`                              |
| `Object`          | `dict` / class                       |
| `Map`             | `dict`                               |
| `Set`             | `set`                                |
| Stack             | `list`                               |
| Queue             | `deque`                              |
| `this`            | `self`                               |
| Arrow function    | `lambda` / `def`                     |
| `.map()`          | list comprehension                   |
| `.filter()`       | list comprehension                   |
| `.some()`         | `any()`                              |
| `.every()`        | `all()`                              |
| `.length`         | `len()`                              |
| `.includes()`     | `in`                                 |
| `===`             | `==`                                 |
| Null check        | `is None`                            |
| Template literals | f-strings                            |
| `interface`       | `dataclass`, `Protocol`, `TypedDict` |
| `try/catch`       | `try/except`                         |
| `switch`          | `match`                              |
| `npm`             | `uv` / `pip`                         |
| `package.json`    | `pyproject.toml`                     |
| `node_modules`    | `.venv` + installed packages         |

---

# The Most Important Mindset Shift

If you come from TypeScript, your first instinct may be to write Python like this:

```python
result = list(
    map(
        lambda x: x * 2,
        filter(lambda x: x > 5, numbers),
    )
)
```

This works.

However, the more Pythonic version is:

```python
result = [
    number * 2
    for number in numbers
    if number > 5
]
```

One of the biggest mindset shifts is:

```text
TypeScript
array.map().filter().reduce()

        ↓

Python
comprehensions + built-ins + for loops
```

For Python used in AI, the most important concepts to master first are:

* `list`
* `dict`
* `tuple`
* `set`
* list comprehensions
* dictionary comprehensions
* slicing
* `enumerate()`
* `zip()`
* mutability
* type hints
