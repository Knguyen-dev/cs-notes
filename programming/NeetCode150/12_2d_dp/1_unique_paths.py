from typing import List

class Solution: 
  def uniquePaths(self, m: int, n: int) -> int:

    # If it's a mx1 or 1xn, then there's only one path
    # Otherwise we have an actual grid
    if n==1 or m==1:
      return 1

    dp: List[List[int]] = []
    for i in range(m):
      sublist = []
      for j in range(n):
        # NOTE: If they were both 'if' statements, then
        # on the goal index, we would have inserted 2 elements.
        # a. If cell is from bottom row, represent as 1.
        # b. If cell is from right column, represent as 1.
        # c. Otherwise, represent as zero.
        if i == m-1:
          sublist.append(1)
        elif j == n-1:
          sublist.append(1)
        else:
          sublist.append(0)
      dp.append(sublist)

    # Start at the top right cell from goal
    # NOTE: Notice that at most, I am only accessing 
    # the bottom rows or the rightmost column, I shouldn't be
    # accessing anything out of bounds in my grid.
    for i in range(m-2, -1, -1):
      for j in range(n-2, -1, -1):
        dp[i][j] = dp[i+1][j] + dp[i][j+1]

    return dp[0][0]