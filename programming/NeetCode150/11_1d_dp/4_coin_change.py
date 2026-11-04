from typing import List, Dict

class Solution:
  def coinChange(self, coins: List[int], amount: int) -> int:
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