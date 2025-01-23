export default function two_crystal_balls(breaks: boolean[]): number {
    // Calculate the step size (square root of the array length)
    const stepSize = Math.floor(Math.sqrt(breaks.length));

    // Find the range where the first 'true' appears
    let currentIndex = stepSize;
    while (currentIndex < breaks.length) {
        if (breaks[currentIndex]) {
            break; // Found a breaking point, stop jumping
        }
        currentIndex += stepSize; // Jump to the next block
    }

    // Go back to the start of the current block
    currentIndex -= stepSize;

    // Linearly search within the identified block
    for (
        let i = 0;
        i < stepSize && currentIndex < breaks.length;
        i++, currentIndex++
    ) {
        if (breaks[currentIndex]) {
            return currentIndex; // Found the exact breaking point
        }
    }

    // If no breaking point is found, return -1
    return -1;
}
