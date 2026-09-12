// Ordered list of data elements
// Pointer = address of the next element in the list.
// Elements can be stored anywhere in memory because the previous element will point to next one
// They do not use Indexes. So to read an element from middle, you need to go through whole list

// Time Complexity
// Read by index       O(n)
// Search by value     O(n)
// Insert at head      O(1)
// Insert after node   O(1)
// Delete after node   O(1)
// Delete by value     O(n)

// Node class
class ListNode<T> {
  value: T
  next: ListNode<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

// LinkedList class
class LinkedList<T> {
  head: ListNode<T> | null
  tail: ListNode<T> | null
  length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  getLength(): number {
    return this.length
  }

  // Insert at the beginning - O(1)
  prepend(value: T): void {
    const newNode = new ListNode(value)
    newNode.next = this.head
    this.head = newNode
  }

  // Insert at the end - O(n)
  append(value: T): void {
    const newNode = new ListNode(value)
    if (!this.head) {
      this.head = newNode
      return
    }
    let current = this.head
    while (current.next) {
      current = current.next
    }
    current.next = newNode
  }

  // Delete first occurrence of value - O(n)
  delete(value: T): void {
    if (!this.head) return

    if (this.head.value === value) {
      this.head = this.head.next
      return
    }

    let current = this.head
    while (current.next && current.next.value !== value) {
      current = current.next
    }

    if (current.next) {
      current.next = current.next.next
    }
  }

  // Find a node - O(n)
  find(value: T): ListNode<T> | null {
    let current = this.head
    while (current) {
      if (current.value === value) {
        return current
      }
      current = current.next
    }
    return null
  }

  // Print all values - O(n)
  print(): T[] {
    const values: T[] = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }
    return values
  }

  reverse(): void {
    let previous = null
    let current = this.head

    this.tail = this.head

    while (current) {
      const next = current.next
      current.next = previous
      previous = current
      current = next
    }

    this.head = previous
  }

  clear(): void {
    this.head = null
    this.tail = null
  }
}

class DoublyNode<T> {
  value: T
  next: DoublyNode<T> | null
  prev: DoublyNode<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList<T> {
  head: DoublyNode<T> | null
  tail: DoublyNode<T> | null

  constructor() {
    this.head = null
    this.tail = null
  }

  deleteHead(): void {
    if (!this.head) {
      return
    }

    this.head = this.head.next

    if (this.head) {
      this.head.prev = null
    } else {
      this.tail = null
    }
  }

  // Insert at the beginning - O(1)
  prepend(value: T): void {
    const newNode = new DoublyNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return
    }

    newNode.next = this.head
    this.head.prev = newNode
    this.head = newNode
  }

  // Insert at the end - O(1)
  append(value: T): void {
    const newNode = new DoublyNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return
    }

    this.tail!.next = newNode
    newNode.prev = this.tail
    this.tail = newNode
  }

  getAt(idx: number): DoublyNode<T> | null {
    let curr = this.head
    for (let i = 0; curr && i < idx; i++) {
      curr = curr.next
    }
    return curr
  }

  removeAt(idx: number): T | null {
    const node = this.getAt(idx)

    if (!node) {
      return null
    }
    return this.removeNode(node)
  }

  removeNode(node: DoublyNode<T>): T {
    const value = node.value

    if (node.prev) {
      node.prev.next = node.next
    } else {
      // node is head
      this.head = node.next
    }

    if (node.next) {
      node.next.prev = node.prev
    } else {
      // node is tail
      this.tail = node.prev
    }

    node.prev = null
    node.next = null

    return value
  }
}
