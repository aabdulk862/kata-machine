function hasUnvisited(seen: boolean[], distance: number[]): boolean {
    return seen.some((s,i) => !s && distance[i] < Infinity);
}
function getUnvisited(seen: boolean[], distance: number[]): number {
    let idx = -1;
    let lowest = Infinity;
    for (let i = 0; i < seen.length; i++) {
        if(seen[i]){
            continue;
        }
        if (distance[i] < lowest) {
            lowest = distance[i];
            idx = i;
        }
    }
    return idx;
}
export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
) {
    const seen = new Array(arr.length).fill(false);
    const previous = new Array(arr.length).fill(-1);
    const distance = new Array(arr.length).fill(Infinity);
    distance[source] = 0;

    while(hasUnvisited(seen, distance)) {
        const current = getUnvisited(seen, distance);
        seen[current] = true;
        const adjs = arr[current];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }
            const newDistance = distance[current] + edge.weight;
            if (newDistance < distance[edge.to]) {
                distance[edge.to] = newDistance;
                previous[edge.to] = current;
            }
        }
    }

    const path: number[] = [];
    let current = sink;
    while (previous[current] !== -1) {
        path.push(current);
        current = previous[current];
    }
    path.push(source);
    return path.reverse();
}
