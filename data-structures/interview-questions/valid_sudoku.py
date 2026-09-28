def is_valid_sudoku(board) -> bool:
    for row in board:
        if has_duplicates(row):
            return False

    for col in range(9):
        if has_duplicates([board[row][col] for row in range(9)]):
            return False

    for box_row in range(3):
        for box_col in range(3):
            box = []
            for row in range(box_row * 3, box_row * 3 + 3):
                for col in range(box_col * 3, box_col * 3 + 3):
                    box.append(board[row][col])
            if has_duplicates(box):
                return False

    return True


def has_duplicates(array) -> bool:
    seen = set()
    for value in array:
        if value != ".":
            if value in seen:
                return True
            seen.add(value)
    return False
