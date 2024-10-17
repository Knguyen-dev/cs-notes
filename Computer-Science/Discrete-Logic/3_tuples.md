- Tuples 
- Cartesian Product: A x B = {(a,b) | a belongs to A and b belongs to B}. The set of ordered pairs whose first component 
is a member of A and the second component is a member of B. It's the biggest possible relation from A to B. 
You should note that 'A' (the first component) is called the domain whilst 'B' is called the range.
You should know that for the cardinalities, $|A \times B| = |A| \times |B|$.

- Relation: A relation, let's call it 'R', from set A to a set B is a set of pairs whose first components are members of A and whose second components are a member of B. 
We can say that R relates to values a and b, if the pair (a,b) is a member of R. This can be done with $(a,b) \in R$ or $R(a,b)$.


Examples of relations:
1. {(x,y) | x >= y}
2. {(s,t) | s is a substring of __}
3. {(A,B) | A n B is not the null set}
4. {(p,q) | p and q are siblings}
5. {(a,A) | a belongs to A}
6. {(x,y) | x belongs to A and y belongs to B.}

A function from A to B is a relation from A to B where a value from A must correspond to a value from B. So it has to be one-to-one 
(each output is mapped by only one input). If the domain and co-domain are the same set A, we say it is a relation on A.


### Relations on strings:
In each, there's a function, a rule, that makes one input correspond to exactly one output.

1. {(s,t) | s is a substring of t}
2. {('foo','bar'), ('a','b'), ('123','123')}
3. {(s,t) | for strings where (last char in s) === (first char in t)}
4. {(s, t) | s = t^2} = {(s,t) | s = tt}; function is f(s) = t^2
5. {(s, t) | s = t}; called the identity relation.
6. {(s,t) | s is a suffix of t}; function is f(s) = suffix of t
7. {(s,t) | s = reverse of t}; the function here is f(s) = t

- One-To-One: A function F: A -> B is one-to-one IFF for any $x_1$, $x_2$ belongs to A, if f(x1) = f(x2), 
then x1 = x2. For every b, there's exactly one a  such that f(a) = b. Every output corresponds to at most 
one input. So two different inputs can't go to one output. More mathematically: IFF for any
x1, x2 in the domain if f(x1) == f(x2) then x1=x2.

- Onto: A function f: A -> B is onto IFF for every b in B, there's 
at least one a in A with f(a) = b. More simply "Every output has at least one input"


#### Example 1
- Define: $f: \mathbb{R} \implies \mathbb{R}$ by f(x) = $3x-5$.
- Claim: f is one-to-one
- Proof:
  1. Let a and b be real numbers, and assume that f(a) = f(b).
  2. $3a-5=3b-5$
  3. $3a = 3b$
  4. $a = b$, therefore showing that the domain values are the same. 

#### Example 2
Define $f: \mathbb{R} \implies \mathbb{R}$ by $f(x) = 2^{x}$. Is this a one-to-one function?

Yes, because it'll pass the horizontal line test. So since it passes this, every output has at most one input. But let's prove this.

- Goal: $x_1$ = $x_2$
1. Let x1, x2 belong to R, and assume f(x1) = f(x2).
2. $2^{x_1} = 2^{x_2}$.
3. $log_{2}(2^{x_1}) = log_{2}(2^{x_2})$; Take the log base 2 of both sides.
4. $x_1 = x_2$, therefore proven. SO the function is one-to-one.

Does f have an inverse function? Is $log_{2}(x)$ the inverse of $2^x$

## Inverse functions
f and g are inverse functions iff f: A -> B, g: B -> A: for every x belonging to A g(f(x)) = x. Then for every y belonging to B f(g(y)) = y.

Going back to the problem $f(g(x)) = f(log_{2}(y)) = 2^{log_{2}(y)} = y$? Almost, but not for negative numbers. As $log_{2}(-1) = $ undefined.

## Definition of 'onto' functions
A function $f: A \implies B$ is onto iff for every $y \in B$, there exists an $x \in A$ with $f(x) = y$.

In English, a function is onto if every output at least one input. Everything in the co-domain has at least one value in the domain that it maps to.

#### Example 1
f2 = R -> R+ defined by f(x) = 2^x. This is onto because for every output, there's an input that maps to it. 

### Rule
A function f: A -> B has an inverse function $f^{-1}: B \implies A$ IFF f is one-to-one and onto. 

- NOTE: A function that's one-to-one and onto is called a bijection. Another definition is that a bijection is just a function that has an inverse.


#### Example 2
l: str -> integers, where str is the set of all strings.Then l(s) = |s| (the length of s).

Is l one-to-one? Is l onto?

A: Answering, I don't think it's one-to-one. This is because an output could have multiple inputs. l('a') = 1 and l('b') = 1. Remember that onto and one-to-one are both universal claims.

Not onto because there's no strings in the set of strings, such that l(s) = -1.

#### Example 3
l: str -> natural numbers, where l(s) = |s|.

This is onto because every natural number has a string with that length.

Doing a proof:
- claim: l is onto?
- goal: There exists a string in the domain such that l(s) = |s| = n 
1. Let n be a natural number.


## Symmetric and proof
A relation R form A to A is symmetric iff for all a1, a2 in A (domain), if (a1, a2) in R, then (a2, a1) in R.

T is a relation on real numbers defined by T = {(x,y) | x+y = 10}. For example (2,8) belongs to T. (0, 10) is in T, etc.

- Claim: T is symmetric.
- Premise: Assume (x,y) in T.
- Goal (Our conclusion): (y, x) in T
- Proof:
1. Let x, y belong in R, where (x,y) in T.
2. So $x + y = 10$. Then we can reason $y+x=10$ since addition is communicative.
3. THen we can say (y,x) belongs to T, therefore proven.

### Not symmetric proof
S is a relation on strings. Such that S = {(s,t) | first char in s = last char in T}
- Claim: S is not symmetric. Since this is a universal claim/theorem, just provide a counter example such that (s,t) in T and (t,s) not in T.

So let ('tepid', 'beet) in T. This is because 'T' the first char in s is last char in t. However ('beet','tepid') is not in t, since the first char in s 'b' is not the last char in t.


## Some examples 
