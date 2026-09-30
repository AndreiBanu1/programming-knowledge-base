"""Given an image represented by a grid of pixel values, a starting pixel (row, col) and new pixel
value p, transform all pixels connected to the starting pixel to the new pixel value

(row, col): (2, 2) p: 3
(row, col): (2, 4) p: 5

1 1 1 1 0               3 3 3 3 0
1 0 1 1 0               3 0 3 3 0
1 1 1 1 0       =>      3 3 3 3 0
0 0 1 1 1               0 0 3 3 3
1 1 0 1 0               1 1 0 3 0
"""

def flood_fill(img, row, col, p):
    start = img[row][col]
    queue = [(row, col)]
    visited = set()

    while queue:
        row, col = queue.pop(0)

        if (row, col) in visited:
            continue

        visited.add((row, col))
        img[row][col] = p

        for neighbor_row, neighbor_col in neighbors(img, row, col, start):
            if (neighbor_row, neighbor_col) not in visited:
                queue.append((neighbor_row, neighbor_col))

    return img


def neighbors(img, row, col, start):
    indices = [
        (row - 1, col),
        (row + 1, col),
        (row, col - 1),
        (row, col + 1),
    ]

    return [
        (row, col)
        for row, col in indices
        if is_valid(img, row, col) and img[row][col] == start
    ]


def is_valid(img, row, col):
    return (
        0 <= row < len(img)
        and 0 <= col < len(img[0])
    )