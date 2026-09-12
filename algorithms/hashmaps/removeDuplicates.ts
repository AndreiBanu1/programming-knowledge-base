function removeDuplicates(arr: number[]): number[] {
    return [...new Set(arr)];
}


function removeDuplicatesBruteForce(arr: number[]): number[] {
    const result: number[] = [];

    for (const num of arr) {
        let found = false;

        for (const existing of result) {
            if (existing === num) {
                found = true;
                break;
            }
        }

        if (!found) {
            result.push(num);
        }
    }

    return result;
}