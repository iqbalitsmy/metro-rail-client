function subArrayLength(arr, elem1, elem2) {
    const index1 = arr.indexOf(elem1);
    const index2 = arr.indexOf(elem2);

    if (index1 === -1 || index2 === -1) {
        return -1; // One or both elements not found in the array
    }

    return Math.abs(index1 - index2) + 1;
}

export default subArrayLength;

// Example usage:
// const A = ["a", "b", "c", "d", "e", "f"];
// console.log(subArrayLength(A, "a", "e")); // Output: 5
// console.log(subArrayLength(A, "f", "c")); // Output: 4
// console.log(subArrayLength(A, "d", "b")); // Output: 3