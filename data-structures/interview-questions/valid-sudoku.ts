/** 
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 */

function isValidSudoku(board: string[][]): boolean {
  for (const row of board) {
    if (hasDuplicates(row)) return false
  }

  for (let col = 0; col < 9; col++) {
    const column: string[] = []

    for (let row = 0; row < 9; row++) {
      column.push(board[row]![col]!)
    }
    if (hasDuplicates(column)) return false
  }

  for (let startRow = 0; startRow < 9; startRow += 3) {
    for (let startCol = 0; startCol < 9; startCol += 3) {
      const box: string[] = []

      for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
          box.push(board[row]![col]!)
        }
      }

      if (hasDuplicates(box)) return false
    }
  }
  return true
}

function hasDuplicates(strings: string[]): boolean {
  const seen = new Set<string>()

  for (let s of strings) {
    if (s === '.') continue
    if (seen.has(s)) return true
    seen.add(s)
  }
  return false
}
