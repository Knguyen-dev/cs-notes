"""
In this approach, just like our writeup, either both partitions 
are going to be equal in size. Or the partition that we labeled 'A', will 
be the smaller one.

"""
from typing import List
class Solution:
    def findMedianSortedArrays_optimal(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        total: int = len(nums1) + len(nums2)
        half = total // 2
        if len(B) < len(A):
            A, B = B, A

        l, r = 0, len(A) - 1
        while True:
            i = (l + r) // 2
            j = half - i - 2

            # If i is out of bounds that means
            # i < 0. Is there a default value that we can 
            # give to this if it's out of bounds?
            Aleft = A[i] if i >= 0 else float("-infinity")

            # If i+1 is out of bounds, that means all the values 
            # in A must be in the left partition. we'll give this infinity
            Aright = A[i + 1] if (i+1) < len(A) else float("infinity")

            # If j is out of bounds, that means j < 0
            # We'll set it to negative infinity
            Bleft = B[j]

            Bright = B[j + 1] if (j+1) < len(B) else float("infinity")

            # If the partition is correct, then there are two scenarios:
            # a. If the total is odd, get the minimum between the right boundaries
            # b. Otherwise total is even, 
            if (Aleft <= Bright and Bleft <= Aright):
                if total % 2:
                    return min(Aright, Bright)
                else:
                    return max(Aleft, Bleft) + min(Aright, Bright) / 2
            elif Aleft > Bright:
            # Aleft is too big, so we have too many elements from A
            # Reducing the size of the A's left partition.
                r = i - 1
            else: 
                l = i + 1

