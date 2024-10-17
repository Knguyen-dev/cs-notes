# Propositional Logic

## Claims (Existential vs Universal)
### Existential Claim/Quantifier
A statement to claims that something exists, at least one meets a condition. It usually starts. Denoted by “∃”. An example, ∃x P(x) claims “there exists an x, such that P(x) which says P(x) is true for at least 1 x value in the domain. This turns it into an existentially quantified statement because the statement is true or false. 

To prove it, provide one example, which is enough. To prove it false, you need to say that all possible answers will result in false and not meet the condition.

### Universal claim/quantifier
A claim about all things in some category, all of them meet some condition. It’s denoted with symbol “∀”. For example, ∀x P(x) claims “P(x) is true for every x in the domain”; ∀x P(x) is now a universally quantified statement, or proposition since we can now try to prove it true or false. The statement is only due if every x value is true for the condition/predicate “P(x)”. 

To prove it, prove that all values in the domain result it true. To disprove, you provide a single counter example.

### Propositional Logic
- Proposition: A statement that is either true or false. Such as "It is Sunday!"
- Compound proposition: A proposition that can be broken down into one or more pieces. For example, "It is Sunday and it's raining!"
- Atomic proposition: A proposition that can't be broken down.

### Bi-conditional logic
"If and only if" or IFF is sometimes indicated by "necessary and sufficient". This is the idea that the bi-conditional statement is true when either both statements are true, or both statements are false.

So using it $p \iff q$. Assuming that this statement is true, then p and q will always have the same boolean values. So if premise and conclusion have different values then the statement evaluates to false.

#### Example 1: Tv and conditionals/implications
If tv is on, then it's plugged in. If p then q.

The only way to make this result in false is by making p = true (the tv is on) and q = false (however the tv isn't plugged in). So show the premise is true, and the conclusion is false. The notation for this is $p \rightarrow q$.

#### Example 2: Truth assignment 
Does p=T, Q=F, and R = F satisfy $P \rightarrow \neg Q \vee R$? So in order for a statement to be 'satisfied' you have to come up with some boolean values for P and Q so that the boolean expression evaluates to true.

1. T -> (-F or F)
2. T -> (T or F)
3. T -> T = T; So yeah it's good?

#### Example 3: Tautology
In all cases it's always true/satisfied (to be evaluated as true), 

$p \implies p$

#### Example 4: Contradiction
In all cases it's always evaluated to false, regardless of truth variables. 
$p \wedge \neg p$


- Contingency: A formula that's neither always true nor always false. So if there's always a mix of true and false evaluations, then it's a contingency. So a tautology can't be a contingency.

Tautologies and contradictions aren't really useful in real life. "If it happens, then it happens". Whilst contingencies aren't weird, as they're more normal. Like it's normal for a certain set of conditions to satisfy something.


## Introduction to proofs
There are a couple of aspects of mathematical proofs:
1. Logical parts. This depends on the context of the problem, but it's the steps of how things work.
2. How we communicate things, adn the importance of doing it clearly.

### Main types of proofs in mathematics in general
- Formal proof: A sequence of statements following a very sepcific set of rules. This can be very rigid, it doesn't skip any steps, uses definitions to help solve steps, etc. This doesn't rely on intuition, and an example you may recognize are two-column proofs in geometry. Other than that, it's higher level mathematics that will deal with this.
- Informal proof: Any logical argument that you might find in a textbook, published article, conference talk. Not all of the steps are shown, some intution is used, not as rigid. You use sets of rules that you think your audience can understand.

### Specific types of proofs
- Direct Proof: Hypothesis p is assumed to be true, and you need to prove q. To prove a universal claim of the form 'Every x is a p(x)'. Assume you already have a arbitrary x value, and then proceed to try to prove it's a p(x).
- Modus Ponens (Applying): If you already know a universla fact of the form 'every x is a p(x), and you have a x, then you know it's a p(x).
- Transitive property: If $A < B$ and $B < C$, then $A < C$.

##### Example 1: Direct Proof
- Claim: if (x - 3) < 9, then (x/4) < 5?
- Goal: We want to manipulate this 

1. Assume that the if part is true. Consider an $x \in \mathbb{R}$ such that $x-3 \lt 9$.
2. $x < 12$, add 3 to both sides.
3. $\frac{x}{4} < \frac{12}{4}$
4. $\frac{x}{4} \lt 3$
5. This is stronger than the condition.


or you could do

1. So if $x<12$, then $\frac{x}{4} < 5$. 
2. Then $\frac{x}{4} < \frac{12}{4}$. 
3. Apply the definition: If $A<B$, then $\frac{A}{x} < \frac{B}{x}$ for any $x>0$. Also if $A<B$ , then $Ax<Bx$ for any $x>0$.
4. At this point simplify to $\frac{x}{4} < 5$

#### Example 2: Direct proofs with sets 
- Claim: For any set A and B and C and D. If $A \cup B \subset C$, then $A \backslash B \subset C \backslash D$. 

1. Then take an arbitrary element $x \in A \backslash D$. By the definition of relative complement: 
  - $x \in A$
  - $x \notin D$
2. Assuming that the premise is true. Since $x \in A$, then $x \in A \cup B$. Then $A \cup B \subset C$ also means:
  - $x \in C$, since all elements of $A \cup B$.
3. Now we know:
  - $x \in C$, gathered from step 2.
  - $x \notin D$, gathered from step 1.
  - By the definition of set difference (relative complement), we can conclude that $x \in C \backslash D$.
4. Since $x \in C \backslash D$ and $x$ was an arbitrary element of $A \backslash D$, we've shown that any member of $A \backslash D$ is also a member of $C \backslash D$. As a result the claim $A \backslash D \subset C \backslash D$ is proven!

#### Example 3: Direct proof for integers
- Theorem: The square of every odd integer is also odd. So "if n is an odd integer, then $n^2$ is also an odd integer".
1. Let n be an odd integer (name an arbitrary object in our domain).
2. Since n is odd, n = 2k + 1, for some integer k (Definition of odd integers).
3. The square of an odd integer can be re-written as: $n^2 = (2k+1)^2 = 2(2k^{2} + 2k) + 1$.
4. Since k is an integer, the expression $2k^{2}+2k$ is also an integer. This is because we know the addition, subtraction, and multiplication of integers will result in another integer.
5. Our expression for $n^2$ can now be written as $n^2 = 2m + 1$, where $m=2k^{2}+2k$ is an integer. This shows that $n^2$, is an odd integer as it can be written in the form of $n = 2k+1$, which is the definition of odd integers.

#### Example 4: Ridiculous Proof 
If $x^2 < -5$, then $x^{2}+5 < 0$. Well this is a true statement, since the premise can never be true. In a $p \implies q$ statement, if the premise is false, then the statement evaluates to true.

So you can view this as a universal claim. In general, the way to find the counter example is to find an x value that meets the premise and fails the conclusion.


#### Example 5: Composite number
A number is composite IFF there exists integers a and b with 1 < a < n and b 1 < b < n, and ab = n.
- Claim: 259 is composite.

## Proof by contradiction (Indirect Proof)
Here you assume that the theorem is false, and then show some logical fallacy that happens due to the assumption. Based on the idea of showing the conclusion cannot be true, so theorem must be true.

### Rules of integers 
If the operations are done by integers, then the result is an integer.

1. Addition
2. Subtraction
3. Multiplication

#### Example 6 (Indirect Proof): Pair of positive real numbers
For every pair of positive real numbers, a and b, then $\sqrt{a} + \sqrt{b} \neq \sqrt{(a+b)}$.

1. Assume that the theorem is false so well assume: There exists a pair of positive real numbers, a and b, such that $\sqrt{a} + \sqrt{b} = \sqrt{(a+b)}$. 
2. Start simplifying the equation: $(\sqrt{a} + \sqrt{b})^2 = a + b$
3. $a + 2\sqrt{ab} + b = a + b$
4. $2\sqrt{ab} = 0$
5. $ab=0$
6. Since $ab=0$, then $a=0$ or $b=0$. This is inconsistent with the assumption that $a>0$ and $b>0$, which proves the theorem is true by indirect proof.

#### Example 7 (Indirect Proof): Irrational numbers:
Prove that $\sqrt{2}$ is an irrational number

1. Assume the theorem is false, so assume that $\sqrt{2}$ is a rational number. This means it can be expressed as a ratio of two integers p and q, and $q \neq 0$. 
2. $\frac{p^2}{q^2} = 2$, square both sides for the equation
3. $p^2 = 2q^2$
4. $p^2$ is even since it is 2 times some integer. Since $p^2$ is even, then $p$ must also be even. 
5. $(2k^2) = 2q^2$
6. $2k^2 = q^2$. This implies $q^2$ is even since it is 2 times some integer. This means that q must be even as well. 
7. We've shown that both p and q are even. However, if both are even, they share a common factor of 2, which contradicts the assumption that $\frac{p}{q}$ is expressed in its lowest terms. As a result, the assumption must be false, and the theorem is actually true. Proving that $\sqrt{2}$ must be true.

## Proof by cases (exhaustion):
When we try to prove something by dividing the scenarios into a finite number of distinct cases. As a result we demonstrate that the statement holds true in each of those cases. By covering all of the scenarios like this, we can prove the statement true.

#### Example 8 (Even and odd integers by cases):
- Theorem: For every integer x, $x^{2} -x$ is an even integer. (Here the two cases we need to cover is when x is an odd integer, and when it's an even integer. Covering all possible inputs)
- **Case 1 x is even**:
  1. Since x is even, we can rewrite it as $x=2k$, for some integer k.
  2. Then we can rewrite $x^{2}-x$ as $(2k)^{2} - 2k$.
  3. The square of an even integer, is still even. As well, the subtraction of an even integer by another even integer will still be even.
- **Case 2 x is odd**:
  1. Since x is odd, we can re-write it as $x=2k+1$.
  2. Re-writing the expression, $(2k+1)^{2}-(2k+1)$. 
  3. An odd integer squared will remain odd. As well as this an odd integer minus an odd integer will become even. Proving the claim.


#### Example 9 (Digits Problem):
- Claim: Any number that ends in 0 or 5 in decimal, is a multiple of 5.

1. Assumption: Let $x$ be a number in decimal representation that ends in either 0 or 5. This means that the last digit $d_0$ of x is either 0 or 5.
2. The number x can be expressed as $x=d_{n}*10^{n} + d_{n-1}*10^{n-1} + .. . + d_{0}*10^0$
3. Since $d_0$ can be either 0 or 5, we'll handle two cases:
  - Case 1: If $d_0=0$, then x is a multiple of 10, and 10 is a multiple of 5, therefore x is a multiple of 5.
  - Case 2: If $d_0=5$, $x=d_{n}*10^{n} + d_{n-1}*10^{n-1} + .. . + d_{1}*10^1 + 5$. Adding 5 to multiple of 10, would also result in a number of 5.  
