import heapq
from collections import Counter, deque
from typing import List


class Solution:

  def leastInterval(self, tasks: List[str], n: int) -> int:
    # Store negative counts to simulate max-heap
    counts = Counter(tasks)
    max_heap = [-cnt for cnt in counts.values()]
    heapq.heapify(max_heap)

    # Stores tuples of (neg_remaining_count, ready_time)
    cooldown_queue = deque()
    time = 0

    while max_heap or cooldown_queue:
      time += 1

      if max_heap:
        cnt = heapq.heappop(max_heap) + 1  # Decrement task count
        if cnt < 0:
          cooldown_queue.append((cnt, time + n))

      # Check if any task in cooldown is ready to be re-added to the heap
      if cooldown_queue and cooldown_queue[0][1] == time:
        heapq.heappush(max_heap, cooldown_queue.popleft()[0])

    return time