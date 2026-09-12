def max_profit(prices: list[int]) -> int:
  minPrice = prices[0]
  maxProfit = 0
  
  for i in range(len(prices)):
    minPrice = min(minPrice, prices[i])
    
    currentProfit = prices[i] - minPrice
    
    maxProfit = max(maxProfit, currentProfit)
    
  return maxProfit