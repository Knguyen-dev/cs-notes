from typing import List, Dict

class Solution:

  def coinChange_bottomUp(self, coins: List[int], amount: int) -> int:
    dp: List[int] = [amount+1 for x in range(amount+1)]
    dp[0] = 0
    
    for i in range(amount+1):
      # From our amount i, choose the coin c
      # that results in the subamount (i-c) that's accomplished in the 
      # least amoount of coins.
      # NOTE: In the case none of the subamounts were valid, 
      # dp[i] will stay equal to amount + 1. 
      for c in coins:
        subamount: int = i - c

        # Skip negative amounts (happens most at the bottom of the tree)
        if subamount < 0:
          continue

        # Otherwise record the current total and account for adding coin 'c' to the amount i
        dp[i] = min(dp[i], dp[i-c] + 1)

    if dp[amount] == amount+1:
      return -1
    return dp[amount]

  def coinChange_topDown(self, coins: List[int], amount: int) -> int:
    cache: Dict[int, int] = {}
    coin_list: List[int] = []

    def recursion_helper(subamount: int) -> int:
      if subamount in cache:
        return cache[subamount]
      if subamount < 0:
        return -1
      if subamount == 0:
        return 0

      min_coins: int = float("inf")
      is_valid: bool = False
      for c in coins:
        coin_list.append(c)
        r: int = recursion_helper(subamount-c)
        if r != -1:
          min_coins = min(min_coins, r+1)
          is_valid = True
        coin_list.pop()
      if is_valid:
        cache[subamount] = min_coins
      else:
        cache[subamount] = -1
      return cache[subamount]

    res: int = recursion_helper(amount)
    return res