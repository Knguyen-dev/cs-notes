from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST_helper(self, node: Optional[TreeNode], interval: tuple[int, int]) -> bool:
        if not node:
            return True

        if not (interval[0] < node.val < interval[1]):
            return False

        is_valid_left: bool = self.isValidBST_helper(node.left, (interval[0], node.val))
        is_valid_right: bool = self.isValidBST_helper(node.right, (node.val, interval[1]))

        if not (is_valid_left and is_valid_right):
            return False

        # If both subtrees are valid, then the current subtree is also valid.
        # Otherwise, this returns false when one subtree is invalid, which makes sense 
        return is_valid_left and is_valid_right

    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        return self.isValidBST_helper(root, (float('-inf'), float('inf')))
