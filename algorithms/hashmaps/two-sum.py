def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    
    for i in range(len(nums)):
        diff = target - nums[i]
        
        if diff in seen:
            return [seen[diff], i]
        
        seen[nums[i]] = i
    
    return []