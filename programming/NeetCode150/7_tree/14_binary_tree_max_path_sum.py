from typing import Optional

class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right
  
class Solution:
  def __init__(self):
    self.max_path_sum: int = float("-inf")

  def helper(self, node: Optional[TreeNode]) -> int:
    if not node: return 0

    # Clamp to zero; This encodes hte logic 
    # of picking the largest between: both subtrees, only the highest, or none.
    max_left_sum = max(self.helper(node.left), 0)
    max_right_sum = max(self.helper(node.right), 0)
    max_node_sum = node.val + max_left_sum + max_right_sum
    
    self.max_path_sum = max(self.max_path_sum, max_node_sum)

    # Cannot only return with one subtree, or none
    # Note that if both subtrees are negative, we already zeroed
    # them out so they'll be ignored
    return node.val + max(max_left_sum, max_right_sum) 

  def maxPathSum(self, root: Optional[TreeNode]) -> int:
    self.helper(root)
    return self.max_path_sum
  
  