from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:

    # Approach 1: Iteration Approach
    def is_valid(self, lists: List[Optional[ListNode]]) -> bool:
        """Given an array of linked lists, return true if at least one of the heads is still defined"""
        for l in lists:
            if l:
                return True
        return False

    def find_minimum(self, lists: List[Optional[ListNode]]) -> int:
        """Given an array of linked lists, return the index of the linked list with the smallest head"""
        min = float("inf")
        min_index = -1
        for x in range(len(lists)):
            if not lists[x]:
                # If list head is undefined
                continue
            if lists[x].val < min:
                min = lists[x].val
                min_index = x
        return min_index
                
    def mergeKLists_iterate(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        k: int = len(lists)
        dummy: ListNode = ListNode()
        tail: ListNode = dummy
        while (self.is_valid(lists)):
            min_index: int = self.find_minimum(lists)
            tail.next = lists[min_index]
            tail = lists[min_index]
            lists[min_index] = lists[min_index].next
        return dummy.next

    # Approach 2: Recursion-like approach
    def mergeLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy: ListNode = ListNode()
        tail: ListNode = dummy
        while (l1 and l2):
            if l1.val < l2.val:
                tail.next = l1
                tail = l1
                l1 = l1.next
            else:
                tail.next = l2
                tail = l2
                l2 = l2.next
        if l1:
            tail.next = l1
        else:
            tail.next = l2
        return dummy.next

    def mergeKLists_pairs(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if lists is None or len(lists) == 0:
            return None
        while len(lists) > 1:
            mergedLists = []
            for i in range(0, len(lists), 2):
                listA = lists[i]
                listB = lists[i+1] if i+1 < len(lists) else None
                mergedLists.append(self.mergeLists(listA, listB))
            lists = mergedLists
        return lists[0]
        
    


    
