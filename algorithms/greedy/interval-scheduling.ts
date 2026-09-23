// Non-overlapping Intervals
// Se dă un array de intervale intervals, unde fiecare interval este reprezentat ca:
//     intervals[i] = [start_i, end_i]
// Un interval [a, b] se consideră că se intersectează cu [c, d] dacă există un punct comun între ele.
//     Cerință
// Returnează numărul minim de intervale pe care trebuie să le elimini astfel încât restul intervalelor să nu se mai intersecteze.
//     Exemple
// Exemplul 1
// Input:
//     intervals = [[1,2],[2,3],[3,4],[1,3]]
// Output:
//     1
// Explicație:
//     Dacă eliminăm [1,3], restul intervalelor nu se mai intersectează.
//     Exemplul 2
//
// Input:
//     intervals = [[1,2],[1,2],[1,2]]
// Output:
//     2
// Exemplul 3
// Input:
//     intervals = [[1,2],[2,3]]
// Output:
//     0
// Constrângeri
// 1 <= intervals.length <= 10^5
// intervals[i].length == 2
// -5 * 10^4 <= start_i < end_i <= 5 * 10^4


// Greedy -> sortezi capatul drept (y) crescator
// Alegi mereu intervalul care se termina cel mai devreme

function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let prevEnd = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        let nextStart = intervals[i][0];
        if (nextStart >= prevEnd) {
            prevEnd = nextStart;
        } else {
            count++;
        }
    }
    return count;
}



//Tests
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]));
// Expected: 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));
// Expected: 2
console.log(eraseOverlapIntervals([[1,2],[2,3]]));
// Expected: 0
console.log(eraseOverlapIntervals([[1,10],[2,9],[3,8],[4,7]]));
// Expected: 3
console.log(eraseOverlapIntervals([[3,4],[1,2],[2,3]]));
// Expected: 0
console.log(eraseOverlapIntervals([[-5,-1],[-3,0],[1,2]]));
// Expected: 1
console.log(eraseOverlapIntervals([[1,5]]));
// Expected: 0
console.log(eraseOverlapIntervals([[1,100],[11,22],[1,11],[2,12]]));
// Expected: 2