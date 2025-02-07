function walk(current: BinaryNode<number> | null, path: number[]): number[] {
    if (!current) {
        return path;
    }
    walk(current.left, path);
    path.push(current.value);
    walk(current.right, path);
    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}