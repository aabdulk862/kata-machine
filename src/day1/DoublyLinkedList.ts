type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new RangeError("Index out of bounds");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        const current = this.getAt(idx) as Node<T>;
        const node = { value: item } as Node<T>;
        node.next = current;
        node.prev = current.prev;

        if (current.prev) {
            current.prev.next = node;
        }
        current.prev = node;

        if (idx === 0) {
            this.head = node;
        }
    }

    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let current = this.head;

        for (let i = 0; current && i < this.length; i++) {
            if (current.value === item) {
                return this.removeNode(current);
            }
            current = current.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return undefined;
        }
        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        if (!node) return undefined;

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        this.length--;

        if (this.length === 0) {
            this.head = undefined;
            this.tail = undefined;
        }

        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        if (idx < 0 || idx >= this.length) return undefined;

        let current = this.head;
        for (let i = 0; current && i < idx; i++) {
            current = current.next;
        }
        return current;
    }
}
