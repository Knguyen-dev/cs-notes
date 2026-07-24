from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l: int = 0
        r: int = len(nums) - 1
        while (l <= r):
            m: int = (l+r) // 2
            if target == nums[m]: 
                return m
            # If sorted array is non-rotated, do typical binary search.
            # Otherwise, the sorted subarray is rotated in some manner.
            if ((nums[l] <= nums[m]) and (nums[m] <= nums[r])):
                if (nums[m] > target):
                    r = m -1
                else:
                    l = m + 1
            # If middle is in left sublist
            # a. If nums[l] <= target < nums[m], target is in left sublist [l, m-1]
            # b. Otherwise, it's in right sublist [m+1, r]
            elif (nums[l] <= nums[m] and nums[m] > nums[r]):
                if nums[m] > target and nums[l] <= target:
                    r = m - 1
                else:
                    l = m + 1
            elif (nums[l] > nums[m] and nums[m] <= nums[r]):
            # If middle is in the right sublist
            # a. If nums[m] < target <= nums[r], target is in the right sublist.
            # b. Otherwise, target is in the left sublist [l, m-1]
                if nums[m] < target and nums[r] >= target:
                    l = m + 1
                else:
                    r = m - 1

        return -1

            
            