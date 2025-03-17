# Combinatorics
- **Cardinality:** Two sets have the same cardinality IFF there is a bijection from A to B. A has cardinality n (for some natural number n) IFF |A| = |{1,2,3,...,n}|.
- **1-1 Rule:** If there's a 1-1 function from A to B, then |A| <= |B|
- **Onto Rule:** If there's an onto function from A to B, then |A| >= |B|.
- **Union adding rules:** |AuB| = |A| + |B| - |AnB|
- **Rule for Combinations:** If there are n ways of doing A and m ways of doing B, then there are n*m ways of doing both things together.

## Permutations
A = {a,b,c,d,e}

Here are some permutations of length 3: [a,e,d], [a,b,c], [c,b,e].

How many permutations of length 3 are there?
1. There are 5 choices for the first position.
2. 4 choices for the second position.
3. 3 choices for the third position.
4. $5*4*3=60$ permutations of length 3. 

So the amount of elements in the set and the length of the permutation, affects the amount of permutations that we have. The formula: $P(n,r)=nPr=\frac{n!}{(n-p)!}$. 


## Combinations 
Let's say we have a club with 50 members and you need to get a 4-member committee. In this case, we'll say (1,2,3,4) and (2,1,3,4) count as the same group of members in the committee. So we want to find all combinations.

Think about the amount of ways to arrange 4 things. So 4! ways of doing it. So 50 permute 4 is 24 times too big. So the number of combinations is: $\frac{nPr}{r!}$

### E.g. 1
The factory makes 10,000 gizmos per day, and 10% are defective. How many ways of selecting 100 gizmos from the 10,000?

1. So you can see that this is a combinations rather an a permutations problem, since the order of the sequence of gizmos doesn't matter. 
2. So n = 10,000 and r = 100, so use nCr = $\frac{10000!}{(10000 - 100)(100!)}$

## Rule of division
If there are n things and you can group them into groups of size r (where no groups overlap and the groups use up all of n things), then there are $\frac{n}{r}$ groups.

## Partitions
A = {a,b,c,d,e,f,g,h,i}

Partitions of A:
1. {{a,b,c,d}, {e,f,g,i}, {h}}, they all add up to the full thing. No overlaps/repeats.
2. {{a,c,e}, {b,i,h}, {d,f,g}}

### Example 1: Coin Flip
You flip a coin 50 times, how many times to get heads everytime? $\frac{1}{2^50}$. So one out of the amount of possibilities.

### Example 2: Coin Flip
You flip a coin 50 times, but how many times get you can heads exactly once? Well you could get heads on the first flip, and then all tails. Or heads on the second flip, all tails the rest of them. When flipping the coins, the order you get heads doesn't matter, it just matters that you only get 

Let n = 50, and let r = 1, since you have 50 coins, and you're choosing 1 to be the heads, now calculate all outcomes or combinations. 

### Example 3: Coin Flip
How many ways to get heads twice out of 50? We'll here the order does matter. You're choosing 2 coins to be heads, out of 50 coins. 
If you do 50 permute 2, then you're over counting. You're counting all possible sequences. Instead think about it as "There are 50 positions, we want to choose 2 of them to be heads". So 50 choose 2 = 1225.

**NOTE:** When someone sees the 50 coin sequences such as "HHT...", "HTH...", etc. they may think it's a permutation problem because we're seeing the position of the heads in the sequence. While that certainly matters, what we're targeting here is the order of the multiple 50 coin sequences.

Breaking it down further:
1. We only care about the amount of heads and their position in the sequence, but we don't care about the specific order these sequences are generated. E.g. A = "HHT..", B = "HTH...". So these are both valid outcomes for getting heads exactly 2 times, and we'd definitely count these as two ways. However it's a combination because it doesn't matter if sequence A or B comes first.
2. Only care about the total number of ways we can choose 2 heads out of 50 coins.

### Example 4:
How many ways of getting 3 or fewer heads?
1. no heads: 1 way
2. one heads: 50 ways, 1 head in each place
3. two heads: 50 choose 2 ways
4. three heads: 50 choose 3 ways?
So the idea is C(50,1) + C(50,2) + C(50,3)

## More combinatorics:
For two finite sets A and B with |A|=|B|=n, there are n! bijections 
from A to B. But let's prove that.

### Example 1:
- Claim: There are n! bijections between two sets with the same cardinality. 
1. Let A, b be sets with |A|=|B|=n. We can express them as A={a_1, ..., a_n}
and B={b_1, ..., b_n}. A bijection from A to B needs to say what f(n_i) is (n choices) and what f(n_2) is (and the choices after).
So f(n_n) has one choice so there are n*(n-1) bijections therefore proven.






## Credits:
1. [Permutations and Combinations Tutorial - Organic Chemistry Tutor](https://www.youtube.com/watch?v=XJnIdRXUi7A)