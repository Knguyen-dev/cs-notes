from typing import List

class Solution:
  def longestCommonSubsequence_bottomup(self, text1: str, text2: str) -> int:
    m: int = len(text1)
    n: int = len(text2)
    dp: List[List[int]] = []

    # If one of the strings is empty, then LCS is 0
    if m == 0 or n == 0:
      return 0

    # Let dp be an m+1 by n+1 array. This 
    # lets us access dp[m+1][*] = dp[*][n+1] = 0
    # for our base cases 
    dp: List[List[int]] = []
    for i in range(m+1):
      sublist: List[int] = []
      for j in range(n+1):
        sublist.append(0)
      dp.append(sublist)

    # Start at dp[m-1][n-1] to calculate the bottom right
    # corner. Then start going left and then up.
    for i in range(m-1, -1, -1):
      for j in range(n-1, -1, -1):
        if text1[i] == text2[j]:
          dp[i][j] = 1 + dp[i+1][j+1]
        else:
          skip_i = dp[i+1][j]
          skip_j = dp[i][j+1]
          dp[i][j] = max(skip_i, skip_j)
    return dp[0][0]