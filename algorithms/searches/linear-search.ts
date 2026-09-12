export default function linear_search(haystack: number[], needle: number): boolean {
    // return haystack.includes(needle);

    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) {
            return true;
        }
    }
    return false;
}

// O(n)