type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        const head = this.head;
        this.head = this.head.next;
        this.length--;

        if (!this.head) {
            this.tail = undefined; // Update tail when the queue becomes empty
        }

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
