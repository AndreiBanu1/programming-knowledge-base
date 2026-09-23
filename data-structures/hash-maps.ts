/**
 * 🔹 HashMap (Custom Implementation in TypeScript)
 *
 * Definition:
 *  - A HashMap is a data structure that stores key-value pairs.
 *  - Uses a hash function to convert keys into an index in an internal array.
 *
 * Characteristics:
 *  - Average time complexity for insert/search/delete: O(1).
 *  - Worst case (if many collisions): O(n).
 *  - Keys must be unique.
 *  - Collisions are handled using chaining (array of pairs at the same bucket).
 *
 * Why Hashing?
 *  - Without hashing, searching in an array of pairs is O(n).
 *  - With hashing, we can jump directly to the bucket → O(1) average time.
 */


// Simple HashMap implementation
class HashMap<K extends string | number, V> {
    private buckets: [K, V][][]; // array of key-value pairs
    private capacity: number;

    constructor(capacity: number = 16) {
        this.capacity = capacity;
        this.buckets = new Array(capacity).fill(null).map(() => []);
    }

    // Basic hash function
    private hash(key: K): number {
        if (typeof key === "number") {
            return key % this.capacity;
        }
        let hash = 0;
        const strKey = key.toString();
        for (let i = 0; i < strKey.length; i++) {
            hash = (hash + strKey.charCodeAt(i) * (i + 1)) % this.capacity;
        }
        return hash;
    }

    // Insert or update key-value pair - O(1) avg
    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index]!; // hash() always returns an in-range, pre-filled index

        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value; // update existing
                return;
            }
        }

        bucket.push([key, value]); // insert new
    }

    // Retrieve value by key - O(1) avg
    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index]!; // hash() always returns an in-range, pre-filled index

        for (const pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return undefined;
    }

    // Delete key - O(1) avg
    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index]!; // hash() always returns an in-range, pre-filled index

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i]![0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // Check if key exists - O(1) avg
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    // Return all keys - O(n)
    keys(): K[] {
        const keys: K[] = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                keys.push(pair[0]);
            }
        }
        return keys;
    }
}

// Example usage
const map = new HashMap<string, number>();
map.set("apple", 10);
map.set("banana", 20);
map.set("orange", 30);

console.log(map.get("banana")); // 20
map.delete("apple");
console.log(map.has("apple")); // false
console.log(map.keys()); // ["banana", "orange"]
