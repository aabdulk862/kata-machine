export default class MinHeap {
    public length: number;
    public data: number[];
    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.goUp(this.length);
        this.length++;
    }

    delete(): number {
        const root = this.data[0];
        this.length--;
        
        if (this.length === 0) {
            this.data = [];
            return root;
        }

        this.data[0] = this.data[this.length];
        this.goDown(0);
        return root;
    }

    private goDown(idx: number): void {
        if (idx >= this.length) {
            return;
        }

        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (idx >= this.length || leftIdx >= this.length) {
            return;
        }

        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        const value = this.data[idx];

        if (leftValue > rightValue && value > rightValue) {
            this.data[idx] = rightValue;
            this.data[rightIdx] = value;
            this.goDown(rightIdx);
        } else if (rightValue > leftValue && value > leftValue) {
            this.data[idx] = leftValue;
            this.data[leftIdx] = value;
            this.goDown(leftIdx);
        }
    }

    private goUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        if (parentValue > value) {
            this.data[idx] = parentValue;
            this.data[parentIdx] = value;
            this.goUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}
