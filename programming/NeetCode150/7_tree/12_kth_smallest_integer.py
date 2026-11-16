from typing import Optional, List
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthSmallest_helper(self, node: Optional[TreeNode]) -> List[TreeNode]:
        if not node:
            return []
        left_arr: List[TreeNode] = self.kthSmallest_helper(node.left)
        right_arr: List[TreeNode] = self.kthSmallest_helper(node.right)
        left_arr.append(node.val)
        return left_arr + right_arr

    def kthSmallest(self, root: Optional[TreeNode], k:int) -> int:
        sorted_arr: List[TreeNode] = self.kthSmallest_helper(root)
        return sorted_arr[k-1]


