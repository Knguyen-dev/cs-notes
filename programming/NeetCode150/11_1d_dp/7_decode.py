from typing import List

class Solution:
  def numDecodings_topdown(self, s: str) -> int:
    # Base Case: Decoding an empty string is done in one way
    # dp: index i -> number to decode s[i:]
    dp = {len(s): 1}

    def dfs(i):
      if i in dp:
        return dp[i]

      # If the substring starts with zero, then
      # regardless of how we choose (0 or 0X), 
      # it'll be an invalid sequence.
      if s[i] == "0":
        return 0

      # Map the current character to a letter
      res = dfs(i+1)

      # We can map characters i and i+1 to a single character
      # if the following conditions are met:
      # a. If the next char is within bounds.
      # b. If the first char is '1' or '2'
      # c. The second char is 0-6
      # NOTE: If the current and next characters 
      # form a number [10-26], then it's valid!
      # The recursion should start at an index after the two 
      # characters that were used
      if (i+1 < len(s)) and (s[i]=="1" or s[i]=="2") and (s[i+1] in "0123456"):
        res += dfs(i + 2)

      # Cache the result
      dp[i] = res
      return res
    
    return dfs(0)

  def numDecoding_bottomup(self, s:str) -> int:

    # If empty string or the string starts with 0 in general
    # then there are no ways to decode
    if not s or s[0] == "0":
      return 0

    # dp[i] represents the number of ways to decode s[i:]
    # Base case: 1 way to decode an empty string
    n = len(s)
    dp = [0] * (n+1)
    dp[n] = 1 

    # Last character base case
    dp[n-1] = 0 if s[n-1] == "0" else 1

    # Start at i=n-2, calculate dp[n-2] first
    for i in range(n-2, -1, -1):

      # If current character is '0' it can't be decoded
      # on its own
      if s[i] == "0":
        dp[i] = 0
        continue

      # Option 1: Take 1 digit s[i]
      dp[i] = dp[i+1]

      # Option 2: Take 2 digits (s[i] and s[i+1]) if valid (10 to 26)
      if s[i] == "1" or (s[i] == "2" and s[i + 1] in "0123456"):
          dp[i] += dp[i + 2]

    return dp[0]
      



    
    