from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def hasCycle_hashset(self, head: Optional[ListNode]) -> bool:
        hashset = set()
        current = head
        while (current):
            if current in hashset:
                return True
            hashset.add(current)
            current = current.next
        return False

    def hasCycle_tortoise_hare(self, head: Optional[ListNode]) -> bool:
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if (slow == fast):
                return True     
        return False