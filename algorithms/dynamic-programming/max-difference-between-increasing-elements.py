def maximum_difference(nums: list[int]) -> int:
    minNo = nums[0]
    maxDiff = -1;
    
    for num in nums:
        if num > minNo:
            currentDiff = num - minNo

            maxDiff = max(maxDiff, currentDiff)
        
        else:
            minNo = num
    
    return maxDiff;

print(maximum_difference([1, 5, 2, 10])) # 9
