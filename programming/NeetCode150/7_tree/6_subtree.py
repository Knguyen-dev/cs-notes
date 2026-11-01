from typing import Optional, List
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
            if (p_current.val != q_current.val):
                return False
            if p_current.left:
                if (q_current.left):
                    queue_p.append(p_current.left)
                    queue_q.append(q_current.left)
                else:
                    return False
            else:
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
        if len(queue_q) != len(queue_p):
            return False
        return True

    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        queue: List[TreeNode] = [root]
        while len(queue) > 0:
            node: TreeNode = queue.pop(0)

            # If they match, run an equality checking subroutine.
            # a. If the two subtrees match, return true, we found it.
            # b. Otherwise, we continue traversing through the tree like normal
            if node.val == subRoot.val and self.isSameTree(node, subRoot):
                return True

            if (node.left):
                queue.append(node.left)
            if (node.right):
                queue.append(node.right)

        # At this point, we searched through the entire tree
        # and still found nothing
        return False
        