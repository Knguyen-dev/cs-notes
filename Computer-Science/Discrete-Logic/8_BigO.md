# Graphs

## Ex1
which is bigger: 3x or x^3?

For a sufficiently large x, x^3 > 3x. There is a point at which x^2>3x and 
x^2 stays bigger than 3x for all larger x. This is what we mean by 'sufficiently' large.
So for this case, no there isn't an x value S.T. this is met.

## Ex2
- Claim: There exists a real number y S.T., for every x > y, x^2 > 3x
1. Define y = 5. Pick some x >= y. So x = 5
2. $x^{2} \geq 5x > 3x$; this works since $x \geq 5 > 0$.
3. Therefore proven.


## Runtime Complexity
Computer Scientists often care about how long it takes for an algorithm to execute.
In theory, we want to talk about the runtime independent of hardware or programming language. We care about 
how the runtime increases as the input size increases. For a particular 

For a sufficiently large n, $4n^{2+5} > n^{2} + 100$. We want to ignore constant terms and constant coefficients.
- **Def Big-O:** $\forall$ functions $f: \mathbb{R} \rightarrow \mathbb{R}$ and $g: \mathbb{R} \rightarrow \mathbb{R}$ we can say $f(n) \in O(g(n))$ if and only if there exists $N_{0},c$ such that for all $n \geq N_{0}$, then $f(n) \leq c*g(n)$

#### Explained more simply:
1. There's a threshold $n_{0}$ and constant $c>0$.
2. For all $n \geq n_{0}$: Beyond this threshold the inequality $T(n) \leq c*f(n)$ holds true.
3. What this implies or shows us:
  - Shows that the growth of $T(n)$ for some large n value, is bounded above by $c*f(n)$. So at some n-value, $c*f(n)$ is going to be bigger than $%(n)$.
  - Shows $T(n)$ belong to the set of functions denoted by $O(f(n))$, which represents all functions that grow no faster than $f(n)$ up to a certain factor.



## Proof with O(n)
- Claim: $n^{2} \in O(2n^{2}+1)$ and $2n^{2}+1 \in O(n^{2}$
- **Goal:** Show $n^{2} \in O(2n^{2}+1)$
1. Define $N_{0} = 0$ and $c=1$. Let $n \geq N_{0}$. 
2. You reason that $n^{2} \leq 2n^{2} < 2n^{2}+1$. Now show that $2n^{2}+1 \subset O(n^{2})$. Now what c could we pick so that $2n^{2}+1 \leq c*n^{2}$?

3. Let $N_{0} = 2$ and $c=3$. We can say $3n^{2} = 2n^{2} + n^{2}$. So we can reason $3n^{2} \geq 2n^{2} + 4$, and $3n^{2} > 2n^{2}+1$. 
4. $\therefore 3n^{2} \geq 2n^{2}+1$ proven!

## Some definitions

- Intuition: $O(f)$ is the set of all functions that are eventually $\leq f$, ignoring added terms or factors.
- Def: $f \in O(g)$ if and only if  $\exists N_{0},c$ such that  $\forall n \geq N_{0}, f(n) \leq c*g(n)$ 
- Fact: $f \in O(g)$ IFF $O(f) < O(g)$

## Proposition
Proposition: $\forall f, g: \mathbb{R} \rightarrow \mathbb{R}$ and any $ a,b,c,d \in \mathbb{R}$.
- Assume we have functions $f, g: \mathbb{R} \rightarrow \mathbb{R}$, and a,b,c,d $\in \mathbb{R}$. Also assume $f \in O(g)$. 
1. There exists $N_0$ and $k$ S.T. $\forall n \geq N_0$, then $$
- Obs 1: $f \in O(g)$ IFF $O(f) \leq O(g)$. We need to show that $\exists N_{0}', k'$ S.T. $\forall n \geq N_{0}'$. We can set $N_{0}' \geq N_{0}$, so we can have $n \geq N_{0}$
- Obs 2: So now we can say $f(n) \leq k*g(n)$. Multiply by `a` and add `b` to both sides. Now the equation is $a(fn)+b = ak*g(n)+b$. 
- Obs 3: Essentially let $a(fn)+b \leq \frac{ak}{c} * cg(n)$ + b. But ak over c is equivalent to k'. So our final equation


#### Definition: Total function
$f: A \rightarrow B$ assigns every member of A (domain), to one output from B (range). 


#### Definition: Partial function
A partial function $f: A \rightarrow B$ assigns to some members of A, to one output from B (not necessarily to all members of A).
So an example of this is maybe a function bounded on real numbers, defined by $f(x)=\frac{1}{x}$. Here almost every x value is linked to a y value, however x = 0 results in undefined. This makes it an undefined function.

#### Example 1
$h: \mathbb{N} \rightarrow \mathbb{N}$ defined by $h(n)=\frac{n}{2}$.

h is a partial function but not a total function. An example is $h(1) = \frac{1}{2}$ is not in the co-domain of $\mathbb{N}$. So for x = 1 in the domain, there isn't a $h(x) = b$. However for $h(2) = 1$

Is it one-to-one? Yes, for a b in the co-domain, there exist at most 1 x S.T. h(x) = b.

Is it onto? Yes, for any b in the co-domain, there exists an x S.T. h(x) = b.
