# Trees

## Definition (Tree):
A tree consists of a root node with 0 or more child nodes connected by edges to the root. Each noe has 0 or more child nodes.
Trees are finite, so they don't just keep spanning to infinity. The node that's connected and one layer above a given node 
will be the parent node.

## Definition (Full Binary Tree)
There are two things that count as a full binary tree:
1. A single node tree with a root node and no edges.
2. T1 and T2. So there are two subtrees that are connected to a root node. As a result the roots of T1 and T2 are children of the 
node above them. For this definition, we'll just say that every node has exactly 2 or 0 children. 

Here's some binary tree notation:
1. T = [t1, t2], so there's the root node, the list. And two child nodes.
2. T = [ 
    [], 
    [., [., .]] 
  ]

## Linking Recursion to Induction


### Recursion
1. Base case: Defines a to be a type of x
2. Recursive ase: Refer to n existing X's. Defines a new x by combining existing x's.

### Induction
1. Show the claim holds for a.
2. Induction step: Inductive hypothesis assumes the claim is true for n existing x's. Rule is to prove the claim for a new x.

#### Example 1:
- Claim: Every FBT has an odd number of nodes.
1. Let T be a FBT.
2. Base Case: T = .; single root node.
3. Inductive Step: Now T = [T1, T2], assume T1 and T2 are FBTs with an odd number of nodes. 
4. Nodes([T1,T2]) = nodes(T1) + nodesT2. Odd + odd = even.
5. Then counting the root node even + 1 = odd. Therefore proven!

## Lists
A finite sequence of x values in a particular order. 

### Array Lists
Easy to index, and they're in structure [L0, L1, ..., Ln]. However insertions 
and deletions are a little more costly since you have to rearrange stuff most of the time.

### LinkedList
Each node has data and a pointer to the next element. So let's 
look at stuff.
[] = []
[3, *[]] = [3];
[2, *[]] = [2];
[47, *[3, *[]]] = [47, *[3]] = [47, 4]

#### Example 2: A function on linked lists.
So len(L) = {
  0, if L = []
  1 + len(*rest), if [first, *rest], where first is a value and rest is a list. 
}

#### Example 3: Concatenation function
Define a concatenation function for lists "L*K", which just means L concatenated with K.
L * K = {
  K, if L = []
  [first, (rest * K)], if L = [first, *rest]
}
For example, let L = [1,2,3] and K = [4,5] so our goal is L*K = [1,2,3,4,5]
So L =[1, *[2,3]], with first = 1 and rest =[2,3]. So for this function, the idea 
is that we're pulling out the first node, and then calling it after and pull the new first
node and put it after the previous one. And so we keep pulling out the first node.

#### Example 4: Linked List Proof
- Claim: For Any linked list L and K, len(L * K) = len(L) + len(K)

1. We're proving by induction, and we're inducting on L. 
2. Base Case: L = []. So len([] * K) = len(K). Len([] + len(K) = 0 + len(K). So len([] * K) = len([]) + len(K). So claim holds for the base case.
3. Inductive step: Assume that L [first, *rest] for some value and some list rest, where len(rest + k) = len(res) + len(k).
4. len([first, *rest] * K) = len([first, *(rest *K)]) by definition of *.
5. So len([first, *rest] *k) = 1 + len(rest*k) by def of len.
6. len([first, *rest]) + len(k) = 1 + len(rest) + len(k)