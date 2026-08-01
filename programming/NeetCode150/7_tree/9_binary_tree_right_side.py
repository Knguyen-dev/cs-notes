from typing import Tuple, List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        
        current_level: int = -1
        queue: List[Tuple[TreeNode, int]] = [(root, 0)]
        res: List[int] = []

        while len(queue) > 0:
            curr: Tuple[TreeNode, int] = queue.pop(0)

            # If processing node on a new level 
            # a. Record the new level and value in a dictionary
            # b. Update the current_level
            # c. Append the current node's value into res
            # NOTE: This must be the rightmost node on the new level.
            if (curr[1] != current_level):
                current_level = curr[1]
                res.append(curr[0].val)
            # Reason that if we've seen the level before, that means 
            # we have processed a node further right on this level
            # already. Therefore the current node cannot be visible.
            # No need to put th current node into the result list.

            # Enqueue the right child first, which enqueues that we 
            # dequeue the rightmost nodes first.
            if (curr[0].right):
                queue.append((curr[0].right, curr[1]+1))
            if (curr[0].left):
                queue.append((curr[0].left, curr[1]+1))
        return res