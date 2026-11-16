from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        res: List[str] = []
        digit_map = {
                "2": "abc",
                "3": "def",
                "4": "ghi",
                "5": "jkl",
                "6": "mno",
                "7": "pqrs",
                "8": "tuv",
                "9": "wxyz"
        }

        def recursion_helper(substr: str, digit_index: int) -> None:
            if digit_index == len(digits):
                res.append(substr)
                return

            letter_set = digit_map[digits[digit_index]]
            for c in letter_set:
                new_s = substr + c
                recursion_helper(new_s, digit_index+1)

        recursion_helper("", 0)
        return res
