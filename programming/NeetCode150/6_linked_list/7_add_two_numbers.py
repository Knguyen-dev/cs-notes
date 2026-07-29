from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        carry: int = 0
        dummy: ListNode = ListNode()
        tail: ListNode = dummy
        while (l1 or l2 or carry):

            # Get the column values if defined
            l1_val: int = l1.val if l1 else 0
            l2_val: int = l2.val if l2 else 0

            # Calculate the sum, carry, and least significant
            # column digit. Then create a new node for the digit
            # , attach the digit to the tail and update the tail.
            column_sum: int = l1_val + l2_val + carry
            carry = 1 if column_sum > 9 else 0
            column_digit: int = column_sum % 10
            new_digit: ListNode = ListNode(column_digit)
            tail.next = new_digit
            tail = new_digit

            # Advance the l1 and l2 pointers 
            # if they're stilled defined.
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

        return dummy.next

            


        