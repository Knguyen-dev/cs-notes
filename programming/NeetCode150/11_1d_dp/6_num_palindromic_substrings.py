from typing import List

class Solution:
  def countSubstrings(self, s: str) -> int:
    if not s:
      return ""

    res: int = 0
    len_s: int = len(s)

    def extendString(i: int, j: int, num_palindromes) -> int:
      while (i >= 0 and j < len_s and s[i] == s[j]):
        num_palindromes += 1
        i -= 1
        j += 1
      return num_palindromes

    for i in range(len_s):
      res = extendString(i, i, res)
      res = extendString(i, i+1, res)
    return res
  

