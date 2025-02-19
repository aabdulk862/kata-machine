export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const previous = new Array(graph.length).fill(-1);
    seen[source] = true;
    const queue: number[] = [source];

    do {
        const current = queue.shift() as number;
        if (current === needle) {
            break;
        }
        const adjs = graph[current];
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) {
                continue;
            }
            if (seen[i]) {
                continue;
            }
            seen[i] = true;
            previous[i] = current;
            queue.push(i);
        }
    } while (queue.length);
    let current = needle;
    const path: number[] = [];
    while (previous[current] !== -1) {
        path.push(current);
        current = previous[current];
    }

    if (path.length) {
        return [source].concat(path.reverse());
    }

    return null;
}
