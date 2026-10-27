from typing import List, Dict
from collections import deque

class Solution:
  def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
    # NOTE: We observed the beginWord is not in the wordList whilst 
    # the endWord is. To include 'beginWord' in the graph, we 
    # have to add it to the wordList

    wordList.append(beginWord)
    num_letters: int = len(beginWord)
    num_words: int = len(wordList)
    adj_list: Dict[str, set[str]] = {}
    
    for i in range(num_words):
      for j in range(num_words):
        # If the same word, skip to avoid comparison
        if i == j:
          continue

        # Iterate through all characters to get all mismatches
        numErrors: int = 0
        for char_index in range(num_letters):
          if wordList[i][char_index] != wordList[j][char_index]:
            numErrors += 1

        # If one mismatch, then create an edge between two nodes
        # NOTE: Since distinct, reason that you can't have 
        # duplicate words (i.e., numErrors==0). Therefore if 
        # two words differ by more than 1 error, then that entry
        # won't even exist. Therefore for a node with no edges
        # it won't even be in the adjacency list.
        if numErrors == 1:
          word_a = wordList[i]
          word_b = wordList[j]

          if word_a not in adj_list:
            adj_list[word_a] = set()
          if word_b not in adj_list:
            adj_list[word_b] = set()
          
          adj_list[word_a].add(word_b)
          adj_list[word_b].add(word_a)
    
    # Create queue with initial pending node    
    q: deque[str] = deque()
    visited: set[str] = set()
    parent_map: Dict[str] = {}

    parent_map[beginWord] = None
    q.append(beginWord)
    visited.add(beginWord)

    while q:
      curr: str = q.popleft()

      # Goal was found;
      # NOTE: Reason that since it's in the queue, it should 
      # already have an entry in the parent map.
      if curr == endWord:
        break

      if curr in adj_list:
        for neighbor in adj_list[curr]:
          if neighbor not in visited:
            parent_map[neighbor] = curr
            visited.add(neighbor)
            q.append(neighbor)

    # After BFS, if endWord was never visited,
    # then there was no sequence!
    if endWord not in visited:
      return 0

    # Otherwise, a path exists, so iterate through the parent map
    # NOTE: Our loop counts edges, so to correct this to represent 
    # the number of nodes, do a plus one at the end
    res: int = 0
    curr: str = endWord
    while parent_map[curr]:
      res += 1
      curr = parent_map[curr]
    res += 1

    return res