from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        # Let 'slow' find the middle of the linked list
        slow, fast = head, head.next
        while (fast and fast.next):
            slow = slow.next 
            fast = fast.next.next

        """
        When loop stops, we've defined slow.next as the second half 
        of the list. We'll partition the linked list into two sections.
        Then now we'll reverse the second half of the linked list.

        After the loop finishes, second should be null, whilst prev should 
        point to the head of the reversed linked list.
        """
        second = slow.next
        slow.next = None 
        prev = None
        while (second):
            temp_next = second.next
            second.next = prev
            prev = second
            second = temp_next

        """
        Now we'll merge the two halves. Know that the second half 
        of the list will always be shorter than the first half. Therefore
        we'll iterate based on the second hal
        """
        first = head
        second = prev
        while second:
            # Get the next heads
            temp1, temp2 = first.next, second.next

            # Add 'second' and `temp1` into the linked list
            first.next = second
            second.next = temp1

            # Advance the heads of the current linked lists
            first = temp1
            second = temp2