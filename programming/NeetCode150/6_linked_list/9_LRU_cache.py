class Node:
    def __init__(self, key, val):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # map key to node
        self.left, self.right = Node(0, 0), Node(0, 0)
        self.left.next, self.right.prev = self.right, self.left

    def remove(self, node):
        # Connect adjacents together
        prev, next = node.prev, node.next
        prev.next, next.prev = next, prev

        # Nullify pointers of ndoe being removed
        node.prev = node.next = None

    def insert(self, node):

        # Insert 'node' to the right side of the linked list
        prev, next = self.right.prev, self.right
        prev.next = next.prev = node
        node.next, node.prev = next, prev

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        # a. Remove node from its current position
        # b. Insert it to the right side 
        # c. Return its value
        self.remove(self.cache[key])
        self.insert(self.cache[key])
        return self.cache[key].val

    def put(self, key: int, value: int) -> None:

        # If key already exists, then the node is already at some position
        # in the linked list, remove it fro mits current position
        if key in self.cache:
            self.remove(self.cache[key])

        # Update it in the hash table and insert it to teh right
        self.cache[key] = Node(key, value)
        self.insert(self.cache[key])


        # Remove the LRU node from the list and hash map if 
        # 
        if len(self.cache) > self.capacity:
            lru = self.left.next
            self.remove(lru)
            del self.cache[lru.key]