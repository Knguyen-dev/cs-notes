
from typing import Optional


class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
        if not head: return None

        i = 0
        current = head
        node_arr = []  # Array of new nodes
        node_dict = {} # original node object -> index in list
        while (current):
            # a. Create a new node
            # b. Append it to the new array
            # c. Record original node's index in the list
            # d-e. Increment index and advance `current`
            new_node = Node(current.val, current.next, current.random)
            node_arr.append(new_node)
            node_dict[current] = i
            i += 1
            current = current.next

        len = i
        for x in range(len):
            # If not the last node, let next be node_arr[i+1]
            # Otherwise, next is null since it's the tail anyways
            if (x != len - 1):
                node_arr[x].next = node_arr[x+1]
            else:
                node_arr[x].next = None

            # If random node object is in the dictionary, then obtain its index
            # Otherwise, it must have been a null value for random.
            if node_arr[x].random in node_dict:
                random_index = node_dict[node_arr[x].random]
                node_arr[x].random = node_arr[random_index]
            else:
                node_arr[x].random = None

        # Return head of the linked list 
        return node_arr[0]

                 


        