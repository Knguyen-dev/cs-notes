### Intro
Going to see how probability is used in ML models. Sometimes you're not too sure about the outcome of something. Can a person in a given city get to work  in 45 minutes?. This is a complex probability problem since you have to factor in weather, distance, traffic, road conditions, and even other modes of transportation. The probability is the number of favorable outcomes over all outcomes. Let's review 
- event: Number of scenarios that can happen 
- sample space: Number of trials/outcomes we have.
- outcome: A trial or attempt.

### Rules of probability
- Probability is between 0 and 1 inclusive
- P(u or v) = P(u) + P(v), assuming they're independent of each other (no overlap)
- P(u or v) = P(u) + P(v) - P(u and v), assuming there is some overlap
And of course this can be extended for an n number of events. Let's do one for three events, where they overlap with each other like a class 3 circle venn diagram.

P(a u b u c) = P(a) + P(b) + P(c) - P(a n b) - P(a n c) - P(b n c) + P(a n b n c). So we realized we removed the center twice, so we have to add it back. But of course, there are better ways of doing this.

### Conditional Probability and Bayes Theorem
Probability of U given V has happened. So you're not looking at the entire sample space, but rather you're narrowing down your sample space to V.
- Conditional Probability: $P(U | V) = \frac{P(U) \cap P(V)}{P(V)}$. The formula and concept of conditional probability is also called "Baye's Rule/Theorem", and there a whole other branch of 
statistics called Bayesian statistics, that we won't cover here.

#### Example 1: "Prior" and "Posterior"
1. $\frac{P(E_{1}|D)}{P(E_{2}|D)} = \frac{\frac{P(E_{1}) \cap P(D)}{P(E_{1})}}{\frac{P(E_{2}) \cap P(D)}{P(E_{2})}} \cdot \frac{P(E_{1})}{P(E_{2})}$
2. This equals: $\frac{P(D|E_{1})}{P(D|E_{2})} \cdot \frac{P(E_{1})}{P(E_{2})}$; The former term being the 'Posterior' and the latter being the 'prior'. So what just happened here was that it was switched.

#### Example 2: Simple Hospital problem
10% of patients have liver disease and 5% are alcoholics. Out of patients who have liver disease, 7% are alcoholics.
What's the probability that can alcoholic person has liver disease?
- $P(L)=0.1$
- $P(A)=0.05$
- $P(A|L)=0.07$
- $P(L|A)=?$; This is straight forward as we showed how to do this in the last example.
1. You can reason that $P(L|A) * P(A) = P(A|L) * P(L)$
2. Then you can say that $P(L|A) = \frac{P(L)}{P(A)} \cdot P(A|L)$
3. $P(L|A) = \frac{0.10 * 0.07}{0.05}$. 

### Independence
I mean if you're traveling in Chicago, the weather of New York shouldn't really affect 
the chances of you making it to your job in Chicago. So this is the idea of independent events.

If they're independent events, you can simply multiply their probabilities to calculate the probability of both happening.

### Discrete Random Variables 
We have two coins. Regardless of how you flip it, you can only get heads or tails. There are a distinct, and countable number of outcomes.
Then we can do stuff like $P(X=2)$, which is the probably of our random variable equalling 2. 

### Continuous Random Variables 
This is where you can technically have an infinite number of values or variables. It's very unclean or not distinct such as 50, 50.1, 50.0592, etc. There's a precision amount, which helps you see that this is a continuous value, which makes the variable modeling it continuous.

You should know that one pitfall is that the P(50.2) = 0. If you look at the probability distribution, you're not going to be able to calculate the area here. The rationale they put behind this is that, it is very unlikely to get that exact value. So instead of doing that, change the idea and use a range.
Calculate P(x is between 50.1 and 52), which is actually possible.

### Expected Value of a random variable

#### Expected Value of Restaurant Earnings

You are analyzing the financial performance of restaurants. Based on historical data, the random variable $X $, representing the amount of money a restaurant earns, can take on the following values with their respective probabilities:

1. X = -10,000 (a loss of $10,000 dollars), for 20% of restaurants P(X = -10,000) = 0.2.
2. X = 0 (break-even), for 30% of restaurants P(X = 0) = 0.3.
3. X = $10,000 (a profit of $10,000), for 40% of restaurants P(X = 10,000) = 0.4.
4. X = $50,000 (a profit of $50,000), for 10% of restaurants P(X = 50,000) = 0.1.

The expected value E(X) represents the average amount of money you can expect a restaurant to earn (or lose) based on these probabilities. It is calculated as:

$
E(X) = \sum \text{(Value of X)} \times \text{(Probability of X)} 
$

Substituting the given values:

$ E(X) = (-10,000 \times 0.2) + (0 \times 0.3) + (10,000 \times 0.4) + (50,000 \times 0.1)=7000$

Based on this data, the expected earnings for a restaurant are **$7,000**. This means that, on average, if you were to start a restaurant right now, you could expect to earn a profit of \$7,000. However, individual outcomes may vary significantly, as some restaurants lose money, some break even, and others make substantial profits.

#### Variance and Standard Deviation 
Let's say we had that same data from the previous expected value problem. 

The variance is 261,000,000 which doesn't make that much sense. That's why we square root it and get the standard deviation $16155. Given our probability distribution, the mean is $7000 (expected value from before), and the standard deviation is $16155. 



---
### Gaussian Random Variable
Basically the most random variable for a fixed mean and standard deviation. I mean if you flip a coin, this is a very simple random variable. The restaurant profit is very predictable in its randomness as we only have a couple of outcomes.

This can be represented as $f_{x}(x)=\frac{1}{\sqrt{2\pi}}e^{\frac{x^{2}}{2}}$. If you draw the probability distribution, the mean should be 0 and stdev = 1. This would be a normal gaussian distribution function. Of course you can change $\mu_{x}$ and $\sigma_{x}$.

You can re-write the formula: $f_{x}(x)=\frac{1}{\sqrt{2\pi\sigma^{2}}}e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}}$

There are many variables that contribute to someone's height. The height of their head, torso, legs, etc. These values will vary in a very random way, and the total height is very random as well. This is what makes a Gaussian variable. In machine learning, we will not predict everything about our layer, there will always be something that remains hidden. And we want to make sure that's as random as possible.