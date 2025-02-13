export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = [head];
    while (q.length) {
        const current = q.shift() as BinaryNode<number>;
        if (current.value === needle) {
            return true;
        }
        if (current.left) {
            q.push(current.left);
        }
        if (current.right) {
            q.push(current.right);
        }
    }
    return false;
}
