# Sets

## Sets and Subsets: 1.1
- Set: A unique collection of elements. Such as a set of numbers, letters, etc. Order doesn't matter so the same set could be ordered differently. Sets are denoted by capital letters.
- Subset: A set that's inside another set. If every element in A is also in B, then A is a subset of B, denoted by A ⊆ B. If this isn't true, then A isn't a subset of B so A ⊈ B.
  1. A = B IFF A ⊆ B and B ⊆ A; if they are subsets of each other, then they have the same elements, then they’re equal.
  2. Proper subset: If A is a subset of B, and B has elements that aren't in A, then A is a proper subset of B denoted by  A ⊂ B. Here we know that the sets aren't equal, whilst in the other notation there was the possibility that they were. For example if A = {1,2,3}, a subset of A would just be A itself. So when we want a proper subset, you can't just say something trivial like 'A'. You must be like B = {1,2,3,4}. You could also talk about super sets. If X is a super set of Y, then all members of Y are in members of X.
  3. Empty (null) set: Set with no elements denoted by  ∅ or {}.
  4. Finite set: Either empty or has elements numbered 1 to n; it's countable.
  5. Universal set: Set that contains all elements for a particular context, denoted by U.
  6. N: Set of all natural numbers e.g. $\mathbb{N}=$ {0, 1, 2, 3 ...}. Typically includes 0.
  7. Z: Set of all integers $\mathbb{Z}=${... -2, -1, 0, 1, 2 ...}
  8. Q: Set of all rational (ratio) numbers, or numbers that can be represented by a fraction of integers. E.g. $\mathbb{Q} =$ {0, 0.5, 5.23, -5/3}
  9. R: Set of all real numbers, which is everything on the number line. Denoted by $\mathbb{R}$.
  10. Power set: The power set of A is a set that has all subsets of A, denoted as P(A). An example is A = {1,2,3} and P(A) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}. Also note the 'cardinality of a power set' theorem. A is a finite set with cardinality of n. So the cardinality of P(A) is 2^n.


- Elements: Objects or things that are in a set. So a ∈ A means that 'a is a member of the set A' or the idea that 'a' is contained in the set.
- Cardinality: Number of unique elements in a set. So the cardinality of set A = {1, 2, 3} is denoted by |A|, which is 3.
- Set builder notation: A set defined by specifying that the set includes all 


### Set operations
1. A ∪ B (Union): (x ∈ A) ∨ (x ∈ B), or both
2. A ∩ B (Intersection):  (x ∈ A) ∧ (x ∈ B); if x belongs to the intersection of A and B, then x belongs to both A and B, since an intersection only has elements that are in both.
3. $\bar{A}$ (Complement): $x \notin A$. However sometimes something is obvious, like of course if set A is a set of numbers, then the string 'foo' isn't in it. That's why 'relative complement' exists.
4. $A \backslash B$ (Relative complement): $x \in A \land x\notin B$. All elements that are in A and aren't in B.

#### Proving a rational number? Or prove something is irrational?
Let's say x = 0.121212... ∈ $\mathbb{Q}$. How do you prove that this is a rational number? Well prove that it can be expressed as $\frac{p}{q}$, where p and q are both integers. Well p = 4 and q = 33 works!

How would you prove the sqrt(2) is not rational? You'll need to show that no matter what p or q you pick, x can't be expressed as $\frac{p}{q}$. Usually you'd do the idea of proof of contradiction, but we'd do that later.

F = {4n | n ∈ Z} = {n | $\frac{n}{4} \in \mathbb{Z}$} = {n | n is a multi. of 4}


#### Proving A is not a subset of B?
Give an example of a member of A that is not a member of B.

#### Proving true vs proving false
To prove something is true Usually you'd require to prove it for all answers. Whilst to prove something is false, usually we'd only need to provide one counter example


## Existential Claim/Quantifier
A statement to claims that something exists. It usually starts. Denoted by “∃”. An example, ∃x P(x) claims “there exists an x, such that P(x) which says P(x) is true for at least 1 x value in the domain. This turns it into an existentially quantified statement because the statement is true or false. 

To prove it, provide one example, which is enough. To prove it false, you need to say that all possible answers will result in false and not meet the condition.

## Universal claim/quantifier
A claim about all things in some category. It’s denoted with symbol “∀”. For example, ∀x P(x) claims “P(x) is true for every x in the domain”; ∀x P(x) is now a universally quantified statement, or proposition since we can now try to prove it true or false. The statement is only due if every x value is true for the condition/predicate “P(x)”. 

To prove it, prove that all values in the domain result it true. To disprove, you provide a single counter example.