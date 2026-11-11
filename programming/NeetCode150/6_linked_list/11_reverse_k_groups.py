from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:

    def reverse_node_positions(self, node_group_stack: List[ListNode]):
        """Given a stack of nodes, where the top is the last node in a linked list. Return 
        a linked list where the top is the head of said linked list."""
        dummy: ListNode = ListNode()
        tail: ListNode = dummy
        while (len(node_group_stack) > 0):
            node = node_group_stack.pop()
            tail.next = node
            tail = node
        tail.next = None
        return [dummy.next, tail]

    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dummy: ListNode = ListNode()
        tail: ListNode = dummy

        stack: List[ListNode] = []
        starting_group_node: ListNode = head
        current: ListNode = head

        count: int = 0
        while (current):
            count += 1
            stack.append(current)
            if (count == k):
                next: ListNode = current.next
                new_head, new_tail = self.reverse_node_positions(stack)
                count = 0
                stack = []
                
                tail.next = new_head
                tail = new_tail

                current = next
                starting_group_node = next
            else:
                current = current.next

        if (count > 0):
            tail.next = starting_group_node

        return dummy.next
