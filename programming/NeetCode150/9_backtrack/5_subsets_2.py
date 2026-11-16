
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        res: List[List[int]] = []
        subset: List[int] = []
        nums.sort()

        def dfs_helper(i: int) -> None:
            if i == len(nums):
                res.append(subset.copy())
                return
            subset.append(nums[i])
            dfs_helper(i+1)
            subset.pop()
            while ((i+1 < len(nums)) and (nums[i] == nums[i+1])):
                i += 1
            dfs_helper(i+1)
        dfs_helper(0)
        return res
