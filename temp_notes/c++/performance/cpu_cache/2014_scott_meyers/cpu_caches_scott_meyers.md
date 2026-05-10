
For example:
- L1 Cache: 32KB per core.
- L2: 256 KB per core. Holds instructions and data.
- L3: 8MB shared by all cores. Individual photos nowadays are pushing this size.

Your program doesn't run at a reasonable speed if it goes to main memory. 
If you're writing code for a high performance application, you might as well treat main memory as if it doesn't exist due to how slow it is. Most program profilers count a CPU as busy when it's waiting for an instruction or data to be delivered from main memory. Meaning your profile could say you have 100% CPU utilization when your CPU is spending 99% of its time as idle.

So what do we know:
- Compact code that fits well in cache is faster.
- Compact data structures that fit in cache is fastest
- Data structure traversals that only touch cache is fastest.

## Cache lines 
If you ask for one byte, you'll read an entire cache line from memory. On a Core i7, cache lines hold 64 bytes, and a 64-byte cache line is common for Intel and AMD processors. To put this into perspective, 64-bytes is only 16 32-bit integers.
- Reading a byte that's not in cache means reading a full cache line from RAM.
- Writing a byte means writing a full cache line into RAM eventually.

You want to be using as much of the cache line as possible. Wtih a row major traversal, when fetching the first element, we load in a cache line that contains all elements in that row. Iterating through the row is really fast as you're running right down the cache line. But with a column major traversal, to read the next element, you're fetching a new cache line from RAM. You're always having cache misses.

## Hardware Prefetching
The hardware is designed to speculatively prefetch cache lines:
- Forward traversals through a cache line n will prefetch n+1
- Backwards traversals through a cache line n will prefetch n-1.

So going linearly through memory in either direction is the best thing you can do.

## Small N vs Big-O 
- If we have Reads/writes at address A, it means the contents near A are already cached. Either on the same cache line or on a nearby cache line that was prefetched.
- Linear predictable access patterns are very cache friendly.
- Linear array traversals are very cache friendly. 
  - Linear array search can beat log(n) heap-based BST. You can search through a lot of cache lines whilst dereferencing a single pointer.
  - A log(n) binary search of a sorted array can beat a O(1) heap-based hashmap lookup.
  - **Note:** Big-O still wins on large amounts of data. However at the smaller scale, caches and locality wins.

## Cache Coherency
Assume we have two cores that have cached a virtual address A. Then Core 0 writes to address A whilst Core 1 reads from A. 

What if you have multiple copies of the same data on two different cores? 


29:00