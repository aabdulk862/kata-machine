export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;
 
    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (haystack[mid] === needle) {
            return true;
        }
        if (haystack[mid] < needle) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return false;

}