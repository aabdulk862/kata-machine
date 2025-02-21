export default class Map<T extends string | number, V> {
    private storage: { key: T; value: V }[]; // Array-based storage

    constructor() {
        this.storage = [];
    }

    // Retrieve a value by key
    get(key: T): V | undefined {
        for (const pair of this.storage) {
            if (pair.key === key) {
                return pair.value;
            }
        }
        return undefined;
    }

    // Set a key-value pair (update if key exists, otherwise add new pair)
    set(key: T, value: V): void {
        for (const pair of this.storage) {
            if (pair.key === key) {
                pair.value = value; // Update existing value
                return;
            }
        }
        this.storage.push({ key, value }); // Add new key-value pair
    }

    // Delete a key and return its value if it existed
    delete(key: T): V | undefined {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].key === key) {
                const value = this.storage[i].value;
                this.storage.splice(i, 1); // Remove key-value pair
                return value;
            }
        }
        return undefined;
    }

    // Return the number of stored key-value pairs
    size(): number {
        return this.storage.length;
    }
}
