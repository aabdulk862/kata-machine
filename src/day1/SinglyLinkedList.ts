type Node<T> = {
    value: T;
    next: Node<T> | null;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | null;

    constructor() {
        this.length = 0;
        this.head = null;
    }

    prepend(item: T): void {
        const node = { value: item, next: this.head } as Node<T>;
        this.head = node;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length)
            throw new RangeError("Index out of bounds");

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        const prev = this.getNode(idx - 1);
        if (!prev) throw new Error("Previous node not found");

        const node = { value: item, next: prev.next } as Node<T>;
        prev.next = node;
        this.length++;
    }

    append(item: T): void {
        const node = { value: item, next: null } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = node;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }

        current.next = node;
    }

    remove(item: T): T | undefined {
        if (!this.head) return undefined;

        if (this.head.value === item) {
            const removedValue = this.head.value;
            this.head = this.head.next;
            this.length--;
            return removedValue;
        }

        let current = this.head;
        while (current.next && current.next.value !== item) {
            current = current.next;
        }

        if (current.next) {
            const removedValue = current.next.value;
            current.next = current.next.next;
            this.length--;
            return removedValue;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        const node = this.getNode(idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length)
            throw new RangeError("Index out of bounds");

        if (idx === 0 && this.head) {
            const removedValue = this.head.value;
            this.head = this.head.next;
            this.length--;
            return removedValue;
        }

        const prev = this.getNode(idx - 1);
        if (!prev || !prev.next) return undefined;

        const removedValue = prev.next.value;
        prev.next = prev.next.next;
        this.length--;
        return removedValue;
    }

    private getNode(idx: number): Node<T> | null {
        if (idx < 0 || idx >= this.length) return null;

        let current = this.head;
        let i = 0;

        while (current && i < idx) {
            current = current.next;
            i++;
        }

        return current;
    }
}
