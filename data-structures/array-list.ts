class ArrayList<T> {
    private data: (T | undefined)[];
    private length: number;
    private capacity: number;

    constructor(capacity: number = 4) {
        this.capacity = capacity;
        this.length = 0;
        this.data = new Array(capacity);
    }

    // Number of elements
    size(): number {
        return this.length;
    }

    // Current allocated capacity
    getCapacity(): number {
        return this.capacity;
    }

    // Read element by index - O(1)
    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            return undefined;
        }

        return this.data[index];
    }

    // Replace element - O(1)
    set(index: number, value: T): boolean {
        if (index < 0 || index >= this.length) {
            return false;
        }

        this.data[index] = value;
        return true;
    }

    // Add element at end - O(1) amortized
    add(value: T): void {
        if (this.length === this.capacity) {
            this.resize();
        }

        this.data[this.length] = value;
        this.length++;
    }

    // Insert at index - O(n)
    insert(index: number, value: T): void {
        if (index < 0 || index > this.length) {
            return;
        }

        if (this.length === this.capacity) {
            this.resize();
        }

        for (let i = this.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[index] = value;
        this.length++;
    }

    // Remove at index - O(n)
    remove(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            return undefined;
        }

        const removed = this.data[index];

        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        this.data[this.length - 1] = undefined;
        this.length--;

        return removed;
    }

    // Find element - O(n)
    indexOf(value: T): number {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === value) {
                return i;
            }
        }

        return -1;
    }

    contains(value: T): boolean {
        return this.indexOf(value) !== -1;
    }

    // Remove all elements - O(1)
    clear(): void {
        this.data = new Array(this.capacity);
        this.length = 0;
    }

    // Print values
    print(): T[] {
        return this.data.slice(0, this.length) as T[];
    }

    // Double capacity
    private resize(): void {
        this.capacity *= 2;

        const newData = new Array<T | undefined>(this.capacity);

        for (let i = 0; i < this.length; i++) {
            newData[i] = this.data[i];
        }

        this.data = newData;
    }
}