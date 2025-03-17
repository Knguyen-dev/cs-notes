# Induction

## Mathematical Induction method of proofs
If you can show that something is true for 0, and you can show that as n gets bigger by 1, it stays true, then 
it must be true for any n. So there are two main parts of induction:
1. **Base Case:** Establishes the theorem is true for the first value in the sequence.
2. **Inductive Step:** Reasons that if the theorem is true for k, then it holds for k+1. So just to review, if 
it's true for k, then it's true for k+1, and then eventually all values beyond k.


#### Example 1:
- Claim: If $n \geq 4$, then $2^{n} \geq 3n$.
1. **Verify the base case:** Check if the statement holds true for the smallest value of n, which is $n=4$. So plugging in  $2^{4} = 16 \geq 3(4)=12$. This aligns with our theorem, so the claim holds true for base case $n=4$.
2. **Inductive Step:** Now assume the claim is true for some arbitrary $k \geq 4$. As a result, we're assuming that $2^{k} \geq 3k$, as $n = k$. This is our inductive hypothesis, as we're assuming this equation holds true. Now we'll show that if the claim holds true for $n=k$, it'll also hold for $n=k+1$. So the equation becomes $2^{k+1} \geq 3(k+1)$. Note that the left side can be seen as $2^{k+1} = 2^{k}*2$. 
4. Now leverage our inductive assumption. We can say $2^{k} * 2 \geq 2 * 3k = 6k$, here we simply just multiplied the equation by 2 on both sides.
5. Now on the right side of our original equation $3(k+1) = 3k+3$. Let's compare the equations and check $6k \geq 3k+3$, which simplifies to $3k \geq 3$. 
6. Chaining them together $2^{k+1} \geq 6k \geq 3(k+1)$

#### Example 2:
- Claim: For any $n \in \mathbb{N}$, the number of binary strings of length n is $2^{n}$.
1. **Verify the base case:** Let $n=0$ be the base case, as there's only one string with 0 characters, which is the empty string. This is shown when we get $2^{0} = 1$, so the number of strings of length 0 is 1. So the claim holds true for $n=0$.
2. **Inductive step:** Assume our inductive hypothesis, the idea that since it holds true for $n=k$. Assume the number of binary strings of length k is $2^{k}$ for $k \geq 0$. We do $k \geq 0$ since we want to prove this is true for all natural numbers.
3. For each string s of length k, we can construct 2 strings of length $k+1$, by either adding a 1 or 0 at the nd. So let this be $s_{0} = 
4. Since each binary string of length $k$ can be extended in exactly two ways, the number of binary strings of length $k+1$ is just twice the number of binary strings of length $k$. This can be represented mathematically as (# strings of len. k+1) = 2 * (# of str of len. k), which is simplified to $2*2^{k} = 2^{k+1}$. Therefore the claim holds for all $n \in \mathbb{N}$.


#### Example 3:
- Claim: For any integer $n>0$, then $\sum_{i=1}^{n} (2i-1) = n^{2}$
1. **Verify the base case (n=1):** Left side is $(2(1) - 1) = 1^{2}$, which is true since they both evaluate to 1. So the claim holds for the base case. 
2. **Inductive Step:** Assume that the claim holds for some $n=k$, which means $\sum_{i=1}^{k} (2i-1) = k^{2}$, where $k \geq 0$. While assuming this inductive hypothesis, show that $\sum_{i=1}^{k+1} (2i-1) = (k+1)^{2}$ (Prove the claim holds for $n=k+1$). 
3. Plug in $n=k+1$, yielding the equation: $\sum_{i=1}^{k+1} (2i-1) = (k+1)^{2}$.
4. Break up the summation: $\sum_{i=1}^{k+1}(2i-1) = \sum_{i=1}^{k}(2i-1) + (2(k+1)-1). By our inductive hypothesis, we can substitute one of the summation expressions with $k^{2}$. This results in $\sum_{i=1}^{k+1}(2i-1) = k^{2}+2k+1 = (k+1)^{2}$. This shows that our claim holds true for all $k>0$.


#### Homework examples

##### Example 1 (4E)
- Claim: For all natural numbers $n \geq 1$,  $\sum_{i=1}^{n}(2^{i-1}) = 2^{n} - 1$.

1. Base case: For n = 1, the expressions both evaluate to 1. So the theorem holds true for the base case.
2. Assume that for some n = k, the theorem evaluates to true (inductive hypothesis), meaning it holds for 
all values of k >= 1 $\sum_{i=1}^{n}(2^{i-1}) = 2^{n}-1$. Now we’ll show this holds true for $n=k+1$.
3. $\sum_{i=1}^{k+1}(2^{i-1}) = 2^{k+1}-1$. 
4. Break down the summation S.T $\sum_{i=1}^{k+1}(2^{i-1}) = \sum_{i=1}^{k}(2^{i-1}) + 2^{k}$. Based on our assumption,
we can simplify to $\sum_{i=1}^{k+1}(2^{i-1}) = 2^{k}-1 + 2^{k}$. 
5. Simplified to $2^{k+1} - 1$. Since we've verified the base case and inductive step, we conclude that the claim holds for all natural numbers $n \geq 1$. 



##### Example 2
- Claim: For all natural numbers (n >= 0), $\sum_{i=0}^{n}(i! * i) = (n+1)! - 1$

1. Base Case: Let n = 1, this causes both to evaluate to 1. The theorem holds for the base case n = 1.
2. Assume the theorem holds for some n = k >= 1, so $\sum_{i=0}^{k}(i! * i) = (k+1)!-1$. We will show this is true for $n=k+1$.
3. The equation is now: $\sum_{i=0}^{k+1}(i! * i) = (k+2)!-1$. This can be written as $\sum_{i=0}^{k+1}(i! * i) = \sum_{i=0}^{k}(i! * i) + (k+1)! * (k+1) + (k+2)!-1$. Based on our assumption, this can be written as $(k+1)!−1 +(k+1)!∗(k+1)+(k+2)!−1$



###### Example 3
- Claim: For all natural numbers (n >= 0), $\sum_{i=0}^{n}(i! * i) = (n+1)! - 1$
1. Base Case: Let n = 0, this causes both to evaluate to 0. The theorem holds for the base case n = 0.
2. Assume the theorem holds for some n = k >= 1, so $\sum_{i=0}^{k}(i! * i) = (k+1)!-1$. We will show this is true for $n=k+1$.
3. The equation is now: $\sum_{i=0}^{k+1}(i! * i) = (k+2)!-1$. 
4. This can be written as $\sum_{i=0}^{k+1}(i! * i) = (k+1)!-1 + ((k+1)! * (k+1)) + (k+2)!-1$. Remember $(k+2)! = (k+2) * (k+1)!$. 
5. Re-writing: (k+1)! + ((k+1)! * (k+1)) + (k+2) * (k+1)! -2$. 


(k+2) * (k+1)! - 1

Based on our assumption, this can be written as $(k+1)!−1 +(k+1)!∗(k+1)+(k+2)!−1$" 



