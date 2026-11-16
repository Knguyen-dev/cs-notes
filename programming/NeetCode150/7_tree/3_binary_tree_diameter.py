from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.max_diameter: int  = 0

        def depth(node: Optional[TreeNode]) -> int:
            if not node:
                return 0
            l = depth(node.left) 
            r = depth(node.right)

            # Max path through current node is a concatenation
            # of the longest paths from the left and right
            # subtrees, with the current node connecting them.
            # NOTE: This is l+r, and it might be bigger 
            # than our current max.
            self.max_diameter = max(self.max_diameter, l+r)

            # Increment to account for the edge 
            # from current node to parent.
            return 1 + max(l, r)

        depth(root)
        return self.max_diameter
