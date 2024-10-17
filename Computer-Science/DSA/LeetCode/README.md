# LeetCode and DSA Problems


## Common Patterns
While I don't promote memorization, there are some common patterns that you can use to solve leet code problems. This can help you 
at least get started and get a hint on what's needed to solve a problem. Just remember that the important thing is to understand why/how 
the solution works. There are 

 We're here to build that problem/solving and intuition so that we can be confident at solving not only these complex 
programming problems, but also be able to apply them to real problems.

### 1. Two Pointers
Is used to solve problems when you need to iterate through some kind of array. By iterating through the array using the two pointers technique, you'd be able to solve the problem in one iteration.

### 2. Binary Tree BFS (Breadth first search)
Rather than going deep into a branch, and then going back up, the breadth first search is going to search the binary tree or whatever data-structure you have, one layer at a time. Looks at the adjacents, and their adjacents, and it keeps going.

Here it uses a queue, and starts with the root node. Then it gets its adjacent nodes or nodes that are one layer down, and adds them to the queue to be processed on the next iteration.

### 3. Topological Sort
Used to arrange an element in a particular order when they have dependencies. Particularly useful in graph theory when we have a 'directed acyclic graph'. 
  1. Edges on the graph have a direction (one way connection).
  2. No cycle/loop.
A real use-case could be the idea of course scheduling. Each course has a pre-requisite that you need to meet. 

### 4. Binary Tree DFS (Depth first search)
Here we recursively go down into a binary tree. We've seen this before, as we go down to the leaf, and recursively go back up the tree and check the other nodes. So just the idea of traversing a binary tree in this way.

For example, let's find the maximum depth of a binary tree. The idea is that you start traversing the tree, but you're tracking the depth you're at. Then when you hit a leaf node, you update your maxDepth variable.

### 5. Top K Elements
Used to select k elements in a dataset, based on a condition. For example, find the k largest numbers in an array. So if k = 3, then we're finding the 3 largest numbers in the array. We'd store our k most important numbers in a heap. 

### 6. Modified Binary Search
The core idea of binary search is to split the subspace in half. Now for modified binary search, we just need to adjust the algorithm to handle the problem at hand. One thing that helps a lot when solving binary search problems is understanding the core binary search algorithm. Here it is:
```python
def binarySearch(nums: int, x: int):
  low, high = 0, len(nums) - 1
  while low <= high:
    mid = low + (high - low) // 2
    if nums[mid] == x:
      return mid
    elif nums[mid] < x:
      low = mid + 1
    else:
      high = mid - 1
  return -1
```


### 7. Subset
When you need to find all of the possible combinations of elements in a given set. For example given elements {1,2,3}, return all possible permutations. You can think of this problem very iteratively. Start at an empty set, then add a new element and think of all possible ways of adding that new element. 

### 8. Sliding Window
Used when processing a series of data, such as a list. We look at a smaller subset of the list at a time (our window). This slides one step at a time. When a problem asks for a subset of elements in your list that satisfies a given condition, then the sliding window pattern is a plausible suggestion. For example, given a string, print the longest possible substring that has exactly M unique characters.



https://www.youtube.com/watch?v=xo7XrRVxH8Y
