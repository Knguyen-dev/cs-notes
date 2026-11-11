class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        candidates.sort() # Duplicates are now adjacent.

        def dfs(i: int, cur: List[int], total: int) -> None:
            if total == target:
                # 'cur' is passed by reference 
                res.append(cur.copy())

            # If we overshot or we made a choice on all numbers already
            if total > target or i == len(candidates):
                return

            # Include candidates[i] in our choice
            cur.append(candidates[i])
            dfs(i+1, cur, total+candidates[i])

            # Simulate skipping candidates[i] as a choice.
            # Ensure we skip any duplicates of candidates[i]
            # using a while loop. Two scenarios at the end:
            # a. Run out of numbers, calling dfs(i+1) will early return
            #    since i+1 == len(candidates).
            # b. candidates[i+1] is a new number. Therefore finish the skip
            #    and recur.
            cur.pop()
            while i+1 < len(candidates) and candidates[i] == candidates[i+1]:
                i += 1
            dfs(i+1, cur, total)

        dfs(0, [], 0)
        return res



