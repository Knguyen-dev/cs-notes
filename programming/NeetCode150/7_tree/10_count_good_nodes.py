from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def goodNodes_helper(self, node: Optional[TreeNode], max_value: int):
        if not node:
            return 0
        
        # If current node is greater than max_value, then:
        # a. Current node counts as one of the the good ones, therefore +1
        # b. Update max_value to the current node's value, as it's the new maximum for 
        #    all subsequent nodes in the subtree rooted at the current node.
        # Otherwise, the current node is less than the max_value, so ignore it
        sum: int = 0
        if (node.val >= max_value):
            sum += 1
            max_value = node.val

        left_count: int = self.goodNodes_helper(node.left, max_value)
        right_count: int = self.goodNodes_helper(node.right, max_value)
        sum += left_count + right_count
        return sum
        
    def goodNodes(self, root: TreeNode) -> int:
        num_good_nodes: int = self.goodNodes_helper(root, root.val)
        return num_good_nodes