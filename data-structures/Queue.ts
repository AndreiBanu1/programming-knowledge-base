/**
 * 🔹 Queue (TypeScript Implementation)
 *
 * Definition:
 *  - A Queue is a linear data structure that follows FIFO (First In, First Out) order.
 *  - Elements are added at the rear (enqueue) and removed from the front (dequeue).
 *
 * Characteristics:
 *  - FIFO behavior ensures that the first element added is the first to be removed.
 *  - Commonly used in scheduling, buffering, and breadth-first search (BFS) algorithms.
 *  - Time Complexity:
 *      - Enqueue: O(1)
 *      - Dequeue: O(1)
 *      - Peek/Front: O(1)
 *      - Search: O(n)
 */

type QueueNode<T> = {
  value: T
  next?: QueueNode<T>
}

class Queue<T> {
  private head?: QueueNode<T>
  private tail?: QueueNode<T>
  private length: number

  constructor() {
    this.head = this.tail = undefined
    this.length = 0
  }

  // Add element at the end
  // O(1)
  enqueue(item: T): void {
    const node = {value: item} as QueueNode<T>;
    this.length++;

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    
    this.tail.next = node;
    this.tail = node;
  }

  // Remove element from front - O(1)
  dequeue(): T | undefined {
    if (!this.head) {
      return undefined
    }

    this.length--;

    const head = this.head
    this.head = this.head.next

    head.next = undefined

    return head.value
  }

  // View first element - O(1)
  peek(): T | undefined {
    return this.head?.value
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  size(): number {
    return this.length
  }

  print(): void {
    const values: T[] = []

    let current = this.head

    while (current) {
      values.push(current.value)
      current = current.next
    }

    console.log(values.join(' <- '))
  }
}

// Example usage
const queue = new Queue<number>()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

queue.print() // 10 <- 20 <- 30
console.log(queue.dequeue()) // 10
console.log(queue.peek()) // 20
queue.print() // 20 <- 30
console.log(queue.size()) // 2
console.log(queue.isEmpty()) // false
