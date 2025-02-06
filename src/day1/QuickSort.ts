function sort(arr: number[], low: number, high: number): void {
    if (low <= high) {
        const pivot = partition(arr, low, high);
        sort(arr, low, pivot - 1);
        sort(arr, pivot + 1, high);
    }
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    i++;
    arr[high] = arr[i];
    arr[i] = pivot;
    return i;
}

export default function quick_sort(arr: number[]): void {
    sort(arr, 0, arr.length - 1);
}