from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth_helper(self, node: Optional[TreeNode]) -> int:
        if not node:
            return 0
        left_depth: int = self.maxDepth_helper(node.left)
        right_depth: int = self.maxDepth_helper(node.right)
        return max(left_depth, right_depth) + 1

    def maxDepth(self, root: Optional[TreeNode]) -> int:
        max_depth: int = self.maxDepth_helper(root)
        return max_depth
        