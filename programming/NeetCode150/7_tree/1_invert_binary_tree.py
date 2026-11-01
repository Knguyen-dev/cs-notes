from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        queue: List[TreeNode] = [root]
        while len(queue) > 0:
            node: TreeNode = queue.pop(0)
            temp: Optional[TreeNode] = node.left
            node.left = node.right
            node.right = temp
            # NOTE: Prevents us from appending NULL nodes
            # to the queue
            if (node.left):
                queue.append(node.left)
            if (node.right):
                queue.append(node.right)
        return root
            