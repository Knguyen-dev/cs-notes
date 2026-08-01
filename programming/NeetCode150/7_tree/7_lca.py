from typing import Optional, Tuple

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:

    ##### Approach 1: Recursion with Propagation #####
    def lca_helper(self, node: Optional[TreeNode], p: TreeNode, q: TreeNode) -> Tuple[int, TreeNode]:
        if not node:
            return (0, node)

        left_res = self.lca_helper(node.left, p, q)
        right_res = self.lca_helper(node.right, p, q)

        # If LCA was already found in left subtree, pass it up immediately
        if left_res[0] == 2:
            return left_res

        # If LCA was already found in right subtree, pass it up immediately
        if right_res[0] == 2:
            return right_res

        # Three cases can happen here:
        # a. left and right sum to 2, meaning p and q were found in 
        #    the left and right subtrees. So return (2, node) as the4 current node is the LCA;.
        # b. Otherwise, local_sum < 2, but the curernt node is a target node, so now local_sum == 2
        #    Therefore return (2, node), as the current node is the LCA.
        # c. Otherwise local_sum < 2, and the current node isn't a target.
        #    This time we still return local_sum, as it could be greater than 0,
        #    but yeah, the 'node' being returned isn't gonna be used ,it's just a snetinel.
        local_sum: int = left_res[0] + right_res[0]
        if (node.val == p.val or node.val == q.val):
            local_sum += 1

        # if local_sum == 2, we were going to return
        # tuple(local_sum, node) anyways. The if and else 
        # case are the same, in this implementation
        return (local_sum, node)
            
    def lowestCommonAncestor_recursion_propagate(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        lca_res: TreeNode = self.lca_helper(root, p, q)
        return lca_res[1]        
