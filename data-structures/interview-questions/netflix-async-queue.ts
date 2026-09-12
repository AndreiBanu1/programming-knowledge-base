/**
 * Async Request Queue with Concurrency Limit
 *
 * Problem:
 * Implement an asynchronous request queue that allows only a fixed number
 * of async operations to run at the same time.
 *
 * Example:
 * Given 10 async requests and a concurrency limit of 3:
 *
 * - Requests 1, 2, and 3 start immediately.
 * - Request 4 waits until one of the running requests finishes.
 * - When a request completes, the next queued request starts.
 *
 * The queue must ensure that at any moment:
 *
 *     activeRequests <= concurrencyLimit
 *
 * Requirements:
 *
 * 1. Add async tasks to the queue.
 * 2. Execute tasks automatically when slots are available.
 * 3. Maintain the concurrency limit.
 * 4. Start waiting tasks as soon as running tasks complete.
 *
 * Example flow:
 *
 * Queue:
 * [
 *   request1,
 *   request2,
 *   request3,
 *   request4,
 *   request5
 * ]
 *
 * Concurrency limit: 3
 *
 * Initial state:
 *
 * Running:
 * request1
 * request2
 * request3
 *
 * Waiting:
 * request4
 * request5
 *
 * After request2 finishes:
 *
 * Running:
 * request1
 * request3
 * request4
 *
 * Waiting:
 * request5
 *
 *
 * Concepts tested:
 *
 * - Promises
 * - async/await
 * - Promise lifecycle
 * - Queue data structure
 * - Concurrency control
 * - Resource management
 *
 *
 * Time Complexity:
 *
 * Adding a task:
 * O(1)
 *
 * Processing all tasks:
 * O(n)
 *
 *
 * Space Complexity:
 *
 * O(n)
 * because pending tasks must be stored until execution.
 *
 *
 * Note:
 *
 * This is not parallel execution.
 * JavaScript runs async operations concurrently through the event loop,
 * but the queue controls how many operations are allowed to be in-flight
 * at the same time.
 */
class AsyncQueue {
  private queue: (() => Promise<void>)[] = []
  private running = 0
  private concurrency: number

  constructor(concurrency: number) {
    this.concurrency = concurrency
  }

  add(task: () => Promise<void>): void {
    this.queue.push(task)
    this.run()
  }

  private run(): void {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift()
      if (!task) return

      this.running++

      task().finally(() => {
        this.running--
        this.run()
      })
    }
  }
}
