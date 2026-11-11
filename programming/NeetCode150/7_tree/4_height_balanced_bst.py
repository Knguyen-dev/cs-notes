
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:

    def isBalanced_helper(self, node: Optional[TreeNode]) -> int:
        if not node:
            return 0
        left_height: int = self.isBalanced_helper(node.left)
        right_height: int = self.isBalanced_helper(node.right)
        if (left_height == -1 or right_height == -1):
            return -1
        if abs(left_height - right_height) > 1:
            return -1
        return max(left_height, right_height) + 1
        

    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        tree_height: int = self.isBalanced_helper(root)

        if tree_height == -1:
            return False
        return True
        