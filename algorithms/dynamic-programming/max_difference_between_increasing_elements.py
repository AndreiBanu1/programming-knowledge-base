def maximum_difference(nums: list[int]) -> int:
    min_num = nums[0]
    max_diff = -1

    for num in nums:
        if num > min_num:
            current_diff = num - min_num

            max_diff = max(max_diff, current_diff)

        else:
            min_num = num

    return max_diff

print(maximum_difference([1, 5, 2, 10])) # 9
