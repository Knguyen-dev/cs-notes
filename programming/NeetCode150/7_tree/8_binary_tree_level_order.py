from typing import Optional, List, Tuple

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        res: List[List[int]] = [[]]
        current_level: int = 0
        queue: List[Tuple[TreeNode, int]] = [(root, current_level)]

        while len(queue) > 0:
            curr: Tuple[TreeNode, int] = queue.pop(0)
        
            # Push current node into most recent sublist or a brand new one
            if curr[1] == current_level:
                res[-1].append(curr[0].val)
            else:
                res.append([curr[0].val])
                current_level = curr[1]

            # If they're defined, push the left and then right subchildren
            # into the queue. Here we want to increment their levels
            next_level: int = curr[1] + 1
            if (curr[0].left):
                queue.append((curr[0].left, next_level))
            if (curr[0].right):
                queue.append((curr[0].right, next_level))

        return res



