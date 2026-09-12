// List of strings where # is a wall, E is ending, S is start. We need to find the path from S to E.

// ["#####E###",
//  "#.      #",
//  "#S#######"]

// at any given square, we can move up, down, left or right

// Base Case:
// 1. its a wall
// 2. off the map
// 3. its the end
// 4. if we have seen it

type Point = {
  x: number
  y: number
}

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

function walk(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
): boolean {
  // 1. Base case off the map
  if (curr.x < 0 || curr.x >= maze[0].length || curr.y < 0 || curr.y >= maze.length) {
    return false
  }

  // 2. Base case on a wall
  if (maze[curr.y][curr.x] === wall) {
    return false
  }

  // 3. Base case on the end
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end)
    return true
  }

  // 4. Base case we seen it
  if (seen[curr.y][curr.x]) {
    return false
  }

  // recursive step
  // pre
  seen[curr.y][curr.x] = true
  path.push(curr)

  // recurse
  for (let i = 0; i < dir.length; i++) {
    const [x, y] = dir[i]
    if (
      walk(
        maze,
        wall,
        {
          x: curr.x + x,
          y: curr.y + y,
        },
        end,
        seen,
        path,
      )
    ) {
      return true
    }
  }
  // post
  path.pop();
  return false;
}

function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = []
  const path: Point[] = []

  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false))
  }

  walk(maze, wall, start, end, seen, path)

  return path
}
