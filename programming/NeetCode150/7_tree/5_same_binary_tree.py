from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        queue_p: List[TreeNode] = []
        queue_q: List[TreeNode] = []
        if p: queue_p.append(p)
        if q: queue_q.append(q)
        while len(queue_p) > 0 and len(queue_q) > 0:
            p_current = queue_p.pop(0)
            q_current = queue_q.pop(0)

            # If values differ
            if (p_current.val != q_current.val):
                return False

            # 1. If left is defined
            if p_current.left:
                # a. If both left subchilds are defined, add them on the stack.
                # b. Otherwise, one of them is undefined, return false
                if (q_current.left):
                    queue_p.append(p_current.left)
                    queue_q.append(q_current.left)
                else:
                    return False
            else:
                # If p's left subtree is not defined whilst 
                # q's left is defined, then we have an assue
                # Otherwise, both left subtrees are undefined, no need to do anything
                if (q_current.left):
                    return False

            if p_current.right:
                if q_current.right:
                    queue_p.append(p_current.right)
                    queue_q.append(q_current.right)
                else:
                    return False
            else:
                if q_current.right:
                    return False

        # If they were equal they'd end with the 
        # same number of nodes in both queues. 
        # This condition tests the opposite case
        if len(queue_q) != len(queue_p):
            return False
        return True

