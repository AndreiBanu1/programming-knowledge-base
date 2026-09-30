def qs(arr, lo, hi):
    if lo >= hi:
        return
    pivot = partition(arr, lo, hi)
    qs(arr, lo, pivot)
    qs(arr, pivot + 1, hi)


def partition(arr, lo, hi):
    pivot = arr[hi]
    left = lo + 1
    right = hi

    while left < right:
        while left <= right and arr[left] <= pivot:
            left += 1
        while right >= left and arr[right] > pivot:
            right -= 1

        if left < right:
            swap(arr, left, right)

    swap(arr, lo, right)
    return right


def swap(arr, i, j):
    tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp


def quick_sort(arr):
    qs(arr, 0, len(arr) - 1)
