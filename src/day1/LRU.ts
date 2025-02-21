type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return { value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverse: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverse = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key);
        if (!node) {
            const newNode = createNode(value);
            this.length++;
            this.prepend(newNode);
            this.trimCache();
            this.lookup.set(key, newNode);
            this.reverse.set(newNode, key);
        } else {
            this.detach(node);
            this.prepend(node);
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }
        this.detach(node);
        this.prepend(node);
        return node.value;
    }
    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.length === 1) {
            this.head = undefined;
            this.tail = undefined;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const node = this.tail as Node<V>;
        this.detach(node);
        const key = this.reverse.get(node) as K;
        this.lookup.delete(key);
        this.reverse.delete(node);
        this.length--;
    }
}
