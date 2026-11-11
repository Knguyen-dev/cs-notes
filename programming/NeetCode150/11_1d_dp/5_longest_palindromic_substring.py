from typing import List

class Solution:
  def longestPalindrome(self, s: str) -> str:
    if not s:
      return ""

    res: List[int, int] = [0, 0]
    res_len = 0
    len_s = len(s)

    def extendString(i: int, j: int, max_len: int) -> int:
      while (i >= 0 and j < len_s and s[i] == s[j]):
        if (j-i+1 > max_len):
          max_len = j-i+1
          res[0] = i
          res[1] = j
        i = i - 1
        j = j + 1

      return max_len

    for i in range(len_s):
      # Check all odd-lengthed substrings centered at i
      res_len = extendString(i, i, res_len)

      # Check all even numbered substrings centered at i and i+1
      res_len = extendString(i, i+1, res_len)

    return s[res[0]:res[1]+1]

      


