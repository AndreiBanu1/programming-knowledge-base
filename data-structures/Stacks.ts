/**
 * 🔹 Stack (TypeScript Implementation)
 *
 * Definition:
 *  - A Stack is a linear data structure that follows LIFO (Last In, First Out) order.
 *  - Elements are added and removed from the top of the stack.
 *
 * Characteristics:
 *  - LIFO behavior ensures that the last element added is the first to be removed.
 *  - Commonly used in recursion, undo/redo operations, expression evaluation, and syntax parsing.
 *  - Time Complexity:
 *      - Push: O(1)
 *      - Pop: O(1)
 *      - Peek/Top: O(1)
 *      - Search: O(n)
 */

class StackNode<T> {
  value: T
  prev: StackNode<T> | null

  constructor(value: T) {
    this.value = value
    this.prev = null
  }
}
class Stack<T> {
  private length: number
  private head: StackNode<T> | null

  constructor() {
    this.head = null
    this.length = 0
  }

  // Add an element to the top of the stack
  push(element: T): void {
    const node = new StackNode(element)
    this.length++

    if (!this.head) {
      this.head = node
      return
    }

    node.prev = this.head
    this.head = node
  }

  // Remove an element from the top of the stack
  pop(): T | undefined {
    if (!this.head) {
      return undefined
    }

    this.length--

    const head = this.head
    this.head = head.prev

    return head.value
  }

  // View the top element without removing it
  peek(): T | undefined {
    return this.head?.value
  }

  // Check if the stack is empty
  isEmpty(): boolean {
    return this.length === 0;
  }

  // Get the size of the stack
  size(): number {
    return this.length
  }

  // Print the stack
  print(): void {}
}

// Example usage
const stack = new Stack<number>()
stack.push(10)
stack.push(20)
stack.push(30)

stack.print() // 10 -> 20 -> 30
console.log(stack.pop()) // 30
console.log(stack.peek()) // 20
stack.print() // 10 -> 20
console.log(stack.size()) // 2
console.log(stack.isEmpty()) // false
