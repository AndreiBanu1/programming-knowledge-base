def max_profit(prices: list[int]) -> int:
    min_price = prices[0]
    best_profit = 0

    for i in range(len(prices)):
        min_price = min(min_price, prices[i])

        current_profit = prices[i] - min_price

        best_profit = max(best_profit, current_profit)

    return best_profit
