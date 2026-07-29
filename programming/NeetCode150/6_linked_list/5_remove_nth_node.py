from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        curr = head
        len = 0
        while (curr):
            len += 1
            curr = curr.next

        target_index = len - n
        i = 0
        curr = head
        prev = None
        while (curr):
            temp = curr.next
            if i == target_index:
                if i == 0:
                    # prev is undefined, curr == head, 
                    # temp is the new head
                    head = temp
                else:
                    # Otherwise least prev is defined.
                    prev.next = temp
                curr.next = None
                return head

            # Otherwise, not the target index
            i += 1
            prev = curr
            curr = curr.next
        
        