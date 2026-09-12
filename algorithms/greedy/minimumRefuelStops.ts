/**
 * Minimum Number of Refueling Stops
 *
 * Problem:
 *
 * A car travels from a starting point to a destination located
 * `target` miles east of the starting point.
 *
 * There are gas stations along the route.
 * Each station is represented as:
 *
 *     stations[i] = [position, fuel]
 *
 * where:
 *
 * - position: distance from the starting point
 * - fuel: amount of fuel available at the station
 *
 *
 * Rules:
 *
 * - The car starts with `startFuel` liters of fuel.
 * - The fuel tank has unlimited capacity.
 * - The car consumes exactly 1 liter of fuel per mile.
 * - When the car reaches a gas station, it may stop and take
 *   all available fuel from that station.
 *
 *
 * Task:
 *
 * Return the minimum number of refueling stops required to reach
 * the destination.
 *
 * If the destination cannot be reached, return -1.
 *
 *
 * Example:
 *
 * Input:
 *
 * target = 100
 * startFuel = 10
 *
 * stations = [
 *   [10, 60],
 *   [20, 30],
 *   [50, 40]
 * ]
 *
 *
 * Explanation:
 *
 * - Start with 10 liters.
 * - Reach station at position 10 and refuel +60.
 * - Continue driving.
 * - Reach station at position 50 and refuel +40.
 * - Destination can be reached with 2 stops.
 *
 *
 * Output:
 *
 * 2
 *
 *
 * Algorithm:
 *
 * Greedy + Max Heap
 *
 * Idea:
 *
 * Always choose the station with the largest available fuel
 * among the stations already passed whenever more fuel is needed.
 *
 *
 * Time Complexity:
 *
 * O(n log n)
 *
 * because each station is added and removed from the heap at most once.
 *
 *
 * Space Complexity:
 *
 * O(n)
 *
 * because the heap stores available fuel from visited stations.
 */

function minRefuelStops(
    target: number,
    startFuel: number,
    stations: number[][]
): number {

    // max heap
    const maxHeap: number[] = [];

    const push = (fuel: number) => {
        maxHeap.push(fuel);

        let i = maxHeap.length - 1;

        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if (maxHeap[parent] >= maxHeap[i]) {
                break;
            }

            [maxHeap[parent], maxHeap[i]] =
            [maxHeap[i], maxHeap[parent]];

            i = parent;
        }
    };


    const pop = (): number => {
        const max = maxHeap[0];

        const last = maxHeap.pop()!;

        if (maxHeap.length > 0) {
            maxHeap[0] = last;

            let i = 0;

            while (true) {
                let left = i * 2 + 1;
                let right = i * 2 + 2;
                let largest = i;

                if (
                    left < maxHeap.length &&
                    maxHeap[left] > maxHeap[largest]
                ) {
                    largest = left;
                }

                if (
                    right < maxHeap.length &&
                    maxHeap[right] > maxHeap[largest]
                ) {
                    largest = right;
                }

                if (largest === i) break;

                [maxHeap[i], maxHeap[largest]] =
                [maxHeap[largest], maxHeap[i]];

                i = largest;
            }
        }

        return max;
    };


    let fuel = startFuel;
    let stops = 0;
    let prev = 0;

    stations.push([target, 0]);


    for (const [position, stationFuel] of stations) {

        // consumăm combustibil până la stație
        fuel -= position - prev;


        // dacă nu putem ajunge aici, alimentăm cu cel mai mare fuel anterior
        while (fuel < 0 && maxHeap.length > 0) {
            fuel += pop();
            stops++;
        }


        if (fuel < 0) {
            return -1;
        }


        push(stationFuel);

        prev = position;
    }


    return stops;
}