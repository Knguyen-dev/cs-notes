from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        l: int = 0
        r: int = len(nums) - 1
        while (l <= r):
            m: int = int((l + r) / 2)

            # If subarray is sorted.
            # Otherwise, subarray is rotated in some way
            if ((nums[l] <= nums[m]) and (nums[m] <= nums[r])):
                return nums[l]

            # If in left sublist, then discard left sublist.
            if (nums[l] <= nums[m] and nums[m] > nums[r]):
                l = m + 1
            elif (nums[l] > nums[m] and nums[m] <= nums[r]):
            # Elif, in the right-side of rotated sorted array
            # a. If smallest in the right side, return nums[m]
            # b. Otherwise, not the smallest in the right side, continue to recur
                if (nums[m-1] > nums[m]):
                    return nums[m];
                else:
                    r = m - 1;