export default class ArrayList<T> {
    public length: number;
    private data: T[];
    private capacity: number;

    constructor(initialCapacity: number = 10) {
        this.length = 0;
        this.capacity = initialCapacity;
        this.data = new Array(this.capacity); // Initialize with the given capacity
    }

    prepend(item: T): void {
        this.resizeIfNeeded();
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1]; // Shift elements to the right
        }
        this.data[0] = item;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        }
        this.resizeIfNeeded();
        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1]; // Shift elements to the right
        }
        this.data[idx] = item;
        this.length++;
    }

    append(item: T): void {
        this.resizeIfNeeded();
        this.data[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        const idx = this.data.indexOf(item as any); // Find the index of the item
        if (idx === -1) return undefined;

        return this.removeAt(idx); // Remove by index if found
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined; // Out of bounds check
        }
        return this.data[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined; // Out of bounds check
        }
        const item = this.data[idx];
        for (let i = idx; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1]; // Shift elements to the left
        }
        this.data[this.length - 1] = undefined as any; // Clear the last slot
        this.length--;
        return item;
    }

    private resizeIfNeeded(): void {
        if (this.length < this.capacity) {
            return;
        }
        // Double the capacity if needed
        this.capacity *= 2;
        const newData = new Array(this.capacity);
        for (let i = 0; i < this.length; i++) {
            newData[i] = this.data[i];
        }
        this.data = newData;
    }
}
