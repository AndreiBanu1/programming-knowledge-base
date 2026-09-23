/**
 * Ring Buffer (Circular Buffer)
 *
 * Definition:
 *  - A Ring Buffer is a fixed-size circular data structure.
 *  - When the end of the array is reached, it wraps around to the beginning.
 *  - It is commonly used for queues, streaming, networking, audio processing,
 *    logging, and producer-consumer systems.
 *
 * Characteristics:
 *  - Fixed capacity
 *  - O(1) enqueue
 *  - O(1) dequeue
 *  - O(1) peek
 *  - Reuses allocated memory
 *
 * Time Complexity:
 *  - Enqueue: O(1)
 *  - Dequeue: O(1)
 *  - Peek: O(1)
 *
 * Space Complexity:
 *  - O(capacity)
 */
class RingBuffer<T> {
  private buffer: (T | undefined)[]
  private head: number
  private tail: number
  private length: number
  private capacity: number

  constructor(capacity: number) {
    this.capacity = capacity
    this.buffer = new Array(capacity)
    this.head = 0
    this.tail = 0
    this.length = 0
  }

  // Add element to the buffer
  enqueue(value: T): boolean {
    if (this.isFull()) {
      return false
    }

    this.buffer[this.tail] = value
    this.tail = (this.tail + 1) % this.capacity
    this.length++

    return true
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }

    const value = this.buffer[this.head]
    this.head = (this.head + 1) % this.capacity
    this.length--

    return value
  }

  isFull(): boolean {
    return this.length === this.capacity
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  size(): number {
    return this.length
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.buffer[this.head]
  }

  clear(): void {
    this.buffer = new Array(this.capacity)
    this.head = 0
    this.tail = 0
    this.length = 0
  }
}
