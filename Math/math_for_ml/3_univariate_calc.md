
### Maximum Likelihood Estimation

I flip a coin 11 times: HTHHTTTHHTT. Generally we can calculate the practical probability or heads or tails $\frac{5}{11}$. But how can we derive some technique, pattern, or equation here? What is the equation that this sequence of data is being generated?

If a events are independent, then we can calculate the probability of both happening through multiplying their probabilities.

With this equation $P_{p}(D)=p^{5}(1-p)^{6}$.

1. Assume we didn't get heads p=0. Well this isn't going to be correct since we got 5 heads.
2. Assume P=1, we're assuming that we only got heads. Well (1-p) = 0, so the expression goes to zero.
3. Let p=0.1. Essentially if you keep raising up to p=1, you're going to get a normal distribution, akin to the gaussian curve. 
4. Suppose p = 0.3, if you move a little bit to the right, your value will increase. You'll reach the highest point on the probability distribution. Then after going right enough, things will start decreasing, etc.
5. Let's use derivatives to find our maximum more easily. If the derivative of our probability function is 0, we know we're at the maximum. More technically, you'd need a critical point with positive on the left and negative on the right.

Then $p'(D)=p^{4}(1-p)^{5}(5-11p)=0$. Let's go through the cases:
    1. p=0? P is the probability of getting heads, but we saw from our data we got some heads. Discard this option.
    2. p=1? Well this would mean we got all heads, which isn't true so let's discard this possibility.
    3. $p=\frac{5}{11}$, well this was true. 

#### Maximum Likelihood Estimation Example 2
Let's do an example involving schools and probabilities of picking male or female students:
1. school 1: 50m 50f
2. school 2: 70m 130f
3. school 3: 180m 120f
What school are we likely to pick this pattern of students: (m, m, m, f, f)? Let's assume we are selecting with replacement, so the events are independent. The probability can be represented as $P(m)^{3}*P(F)^{2}$. You can simplify this by letting the probability of picking a male be p. Then we can say $p^{3}(1-p)^{2}$

Now let's plug in the values for each school
1. school 1: $(\frac{1}{2})^{3}(\frac{1}{2})^{2}=0.03125$
2. school 2: $(\frac{7}{20})^{3}(\frac{13}{20})^{2}=0.01811$
3. school 3: $(\frac{3}{5})^{3}(\frac{2}{5})^{2}=0.03456$. So school 3 has the highest chance of this combination happening.

Now let's do the simpler way of calculating the maximum value of p, using derivatives. So the $f'(p) = (1-p)p^{2}(3-5p)=0$. Okay let's go through the scenarios and solve for valid critical points:
1. p = 1, this would mean you can only get male students, which isn't possible because there are female students.
2. $p^{2} = 0$, wrong as there are male students in the list.
3. $3-5p=0$, which simplifies to $p=\frac{3}{5}$, so this is our critical value, and our maximum value for p.

Use probability theory to create the model. Then use optimization to improve it. This is what machine learning is!

### Simple Machine Learning Example (Derivatives and Gradient Descent)
Let's have some data:
- Area of House = [1000,1250,1500,1750,2000]
- Sales Price = [200000, 250000, 175000, 225000, 300000]
We want to describe a relationship between the area of a house and the sale price.

#### Approach 1 (Using Min)
We can say maybe a house is about 175000, which is the minimum. Of course there is some error here as not all houses are around this price. The error amount or how wrong we are is called a cost/loss function. For example, we're wrong by 25000, 75000, then 0 since it's 175k, 50k, and finally 125000 wrong. Do Total Error 0=$\sqrt{\sum_{i}^{n}{x_{i}}}=156000$. So if you follow your friend's advice to predict house pricing, you'd be off by about 156000 dollars. Let's model our assumptions or solutions with lines. So m = 0 (didn't calculate yet), b=175000, error=156000. 

#### Approach 2 (Using Mean)
So our other approach was to take the average of all sale prices, which is 230000. Calculating the total error for this would be 96176. That's quite a good improvement as our error was basically cut in half. However we still think that there is a better approximation!

#### Approach 3 (Linear Regression)
Let's include the area of the house. So far we've only been using sale price. Let's have a prediction line of $\hat{y}=100(area)+75000$. If you plug in all of the areas into this equation, you'll see that the total sale price error is 83000, which is still an improvement. Though there is the possibility of further reducing the error, and this is called optimization.

#### Approach 4 (3D Space)
Doing trial and error and trying out every combination of m and b is honestly not possible. The idea is to come up with a cost function. Let's review the prediction lines we've created:
  1. m=0, b=175000, e=156000
  2. m=0, b=230000, e=96000
  3. m=100, b=75000, e=83000
Our cost function was $\sqrt{\sum_{i}^{n}{x_{i} - m}}$, and this is what we used to calculate the error. This is also known as the root mean square error, which gives us an idea of how wrong we are. 
So the idea is that we want to minimize the value we get from this function. Naively, you'd plot this on a 3d graph, m and b being the xy plane, with e being the z-plane. Then we'd 
try to plug in some values and hope it'd be a minimum value. Due to being in 3D space, we have so many different combinations for our line, trial and error is simply not feasible. 

We'll use derivatives to help us out. So the steps are about the same in every ML project:
  1. Build model 
  2. Build cost function
  3. Optimize things that minimizing cost function.

Now let's use gradient descent with our data. Let x axis be the area (sqr. feet) and y axis be the sale price. Now we can start drawing lines, of varying b-intercept 
and slope. Well $y=mx+b$, we're going to have a cost function. Our cost function is going to be sum of squared error $\sum_{i}^{n}{x-\hat{x}}^{2}$, so actual minus prediction.
So we're going to draw lines and calculate the cost for each line. In between, we're seeing if the cost has increased or decreased. So the question is how do we change m and b, 
are we changing both? Just one, and which one? To find this out, we're going to use the idea of derivatives. Eventually we want to get a combination of m and b S.T. our cost value 
is at its smallest value. Now let's look at the data we've created:
1. Area = [1000,1250,1500,1750,2000]
2. SalePrice = [200000,250000,175000,225000,300000]
3. x (standardized) = [0,0.25,0.50,0.75,1]
4. y (standardized) = [0.2,0.6,0,0.4,1]
5. predicted y ($\hat{y}$, for m=0.45 and b=0.75) = [0.75,0.86,0.98,1.09,1.2] 
6. squared errors ((original-predicted)^2)= [0.3,0.07,0.95,0.47,0.04]. SSE = 1.835.

**NOTE:** Here we simply just assumed an m and b value rather than some calculation. So $SSE = (y_{0}-\hat{y})^{2} = y_{0}-(mx+b))^{2}$ What you want to know is what happens to the SSE when you change the slope m or b. 
Also there are various different ways to calculate the sum of squared error. Previously we used root mean square error, but here we used something different.

7. So let $z=y_{0}-(mx+b)$, so loss function is $z^{2}$ and $\frac{d(SSE)}{dm} = 2z\frac{dz}{dm} = -2(y_{0}-\hat{y})x$ 

8. $\frac{d(SSE)}{dm} =-2(y_{0}-\hat{y})x$
    - The derivative tell us how SSE changes with respect to changes in m.
    - If ($y_{0}-\hat{y}$), error is positive, then our derivatives are negative.
    - If the derivative is negative, this means increasing m will increase SSE. As 
    m increases, the chance of a negative error increases. If error is negative, then 
    our derivative is positive, and a positive derivative means as m increases SSE increases.
    We don't want increase our loss, which is why we're reducing m.
9. $\frac{d(SSE)}{db} = -2(y_{0}-\hat{y})$. 
    - The derivative tells us how SSE changes with respect to b.
    - Similarly, if error is positive the derivative is negative.
    - So if derivative is negative, it would mean increasing b will increase SSE. As b 
    increases, the chances of a negative error increases, and therefore the chances for a negative derivative.
    That is why we reduce b.

Essentially the key idea moving your variables in the opposite direction of the gradient. 
    - When the derivative is negative, increasing the parameter will increase the SSE, so you reduce the parameter to minimize SSE.
    - When the derivative is positive, increasing the parameter will decrease the SSE, so you increase the parameter to minimize SSE.

10. So the **gradient** will point in the direction of the steepest increase of the cost function. To minimize cost you're going into the **opposite direction of the gradient**, which is the direction of the descent. Then the size of the steps we take to go down is called the **learning rate**. The idea is to not take too small steps as that is too slow, but not take too long as we could potentially miss the minimum. Here are the formulas for the new m and b values:
    - $m_{new} = m_{old}-\alpha \cdot \frac{\delta f}{\delta m}$
    - $b_{new} = b_{old}-\alpha \cdot \frac{\delta f}{\delta b}$
    - Where f is the loss function, $\alpha$ is the learning rate. Here we do subtraction since we saw our derivatives (our gradient) was negative.
11. Okay let's plug in some values:
    - $m_{new}=0.45 - n \cdot \frac{\delta SSE}{\delta m}$
    - $b_{new}=0.45 - n \cdot \frac{\delta SSE}{\delta b}$
    - Right now we haven't plugged in anything for the learning rate, but just know that the learning rate can be thought of as the size of the step you take in your descent.
12. After this we'd plug in our formula to get the new values of m and b. Let our learning rate $\alpha = 0.01$. 
    - $m_{new} = 0.4246$
    - $b_{new} = 0.6964$
    - new line $\hat{y}=0.4246x+0.6964$
    - new predictions ($\hat{y}$) = [0.6964,0.80255,0.9087,1.01485, 1.121]
    - new square errors = [0.246,0.041,0.825,0.378,0.01], so new SSE = 1.506. This is less than our old SSE so we're on the right track at least.
13. At this point the process should be pretty easy:
    1. We're using our $m_{new}$ and $b_{new}$ equations to get new m and b values. This gets our new line.
    2. Then then calculate the new SSE value.  
    3. The last thing we should note is that our $\frac{\delta SSE}{\delta m}$ and $\frac{\delta SSE}{\delta b}$ have changed since we have new m and b values. So
    you'd have to re-calculate those values, and then you're able to get the new m and b values.
14. Now you could definitely do this by hand, but nowadays we write code to automate this process. We've only been focusing on the error of one column (sales price), imagine focusing on 2 or three. The calculations would be too burdensome to do by hand. The reason we even learn this in the first place is to get an idea of what's actually happening, and to understand the operations we're doing. 

**NOTE (When to stop optimizing?):** The iterative optimization process continues until the SSE (your error value) stops decreasing significantly, indicating that we've reached the minimum or a point close to it (the convergence). This ensures that we don't perform unnecessary computations once the line is optimized. 



https://www.youtube.com/watch?v=tB3SAan9PeQ&list=PLcQCwsZDEzFmlSc6levE3UV9rZ8yY-D_7&index=41