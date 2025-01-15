# Gradient Descent

### What is it?
Take a line in linear regression. Gradient descent is the method to optimize this line to make sure, that it is the most accurate as possible. With problems like linear regression, our parameters are the things that affect the prediction. So with $\hat{y}=mx+b$, linear regression will give us the m and b values S.T. it leads to the most accurate predictions, least amount of errors.

### Example 1 (linear regression, optimizing $b$ example)
Let's say we have variables weight (x-axis) and height (y-axis) and we have a linear regression plan. First we'll use gradient descent to find the intercept. For now, assume we already have a least-squares-regression-line, and we know the slope is $=0.64$.

1. Pick a random value for the intercept (b=0). This is just an initial guess that gives gradient descent a thing to prove on.
2. Well calculate the total error by summing up the squared residuals (Sum of Squared Error, or SSE). This process of summing of the squared residuals will be our loss function, the way we calculate the total error for our prediction model. Let SSE=3.1
3. Then you can put that on a graph, SSE vs b-intercept. You'll notice that changing the intercept will change the SSE value. The idea is to find the intercept with the minimum SSE value. Of course you can do this by hand, but the most efficient way is to use gradient descent.
4. Gradient descent will start far away, and take big steps. But once it gets closer to the true minimum, it'll take smaller steps and converge.
5. Calculate SSE with $\sum_{i}^{n}{(y_{i}-\hat{y})^{2}} = \sum_{i}^{n}{(y_{i}-(b+m(x_{i})))^{2}}$. So we're just doing the sum of the squared residuals again. Even without plugging in b, this expression gives you an equation that calculates the SSE, given a b intercept. So if you take the derivative of this expression, and find the minimum, you'd have the point at which the loss function is most optimized. To take the derivative, the only way to do it is to take the derivative of each term.
6. Note that for the loss function, sometimes it isn't possible for the derivative to be zero, which is why gradient descent is used to slowly converge on the minimum slope value. So this is why gradient descent is so flexible in many situations.
7. The size of the step (learning rate) should be related to the slope. We know that the closer we get to the optimal value, the slope of the loss function gets closer to zero. So here it is:
    - So when we're close we take smaller steps.
    - When far away take bigger steps. But don't step too big as we don't want to end up past the minimum point.
    - step_size = slope * learning rate.
    - b_new = b_old - step_size
8. To take another step, we go back to the $\frac{d}{db}$ and plug in b_new, which calculates the new slope (m value). Calculate predictions, SSE, and then calculate a new intercept. Repeat our process.

#### But when does it stop?
Gradient descent stops when the step size is very close to 0. You know that the step size is close to 0, when the slope is close to 0. In practice, the minimum step size is 0.001, or smaller. Also usually the maximum number of iterations is 1000 or more.


#### Reviewing what we do
1. Use sum of squared residuals as a loss function to evaluate how wrong we are.
2. Take the derivative of the loss function, in respect to b since that's what we're optimizing for. So get the derivative in terms of b, as we'll use it during our iterations.
3. Pick a random intercept (b=0) that the gradient descent can improve upon. Calculate the derivative at b=0, which yields the slope at this given intercept.
4. Plug the slope into the step size calculation. Then calculate the $b_{new}$. 
5. Plug in $b_{new}$ into the derivative to get a new slope value and continue doing the process. Repeat until step size is close to zero.

### Example 2: Optimizing slope and intercept
The goal is to find the values for the intercept and slope that give us the minimum sum of the squared residuals.

1. $\sum_{i}^{n}{(y_{i}-(b+m(x_{i})))^{2}}$, this is our loss function!
2. Take the derivative of the loss function with respect to m and b. When doing $\frac{d}{db}$, you'd take the derivative of each term, and you'd treat m as a constant. The same idea with $\frac{d}{dm}$, treat b as a constant.
3. Since we have two or more derivatives of the same function, it is called a gradient. Then we're descending to the lowest point in the loss function, which is why this is called gradient descent. 
4. Like before, pick a random m and b value. Let m=1 and b=0.
5. Plug these into the derivatives to get the respective slopes for how the loss function changes in respect to b and m. 
6. Calculate step sizes by doing the slope * learning_rate, which is set to 0.01.
7. Calculate $b_{new}$ and $m_{new}$, using $x_{new} = x_{old} - step_size$.
8. Now continue until you reach a step size or iteration limit.

### About loss function and a general review
The loss function, the process or way we determine how off our predictions are, will vary depending on what kind of problem we are solving. So for linear regression, the typical loss function will be the sum of squared errors, but the method for logistic regression, or deep learning will be quite different. In any case, the steps you follow are mostly the same:
  1. Take the derivative of the **loss function** with respect to each parameter in it. Another way to say it is taking the **gradient** of the loss function.
  2. Pick random values for the parameters. This is so that your gradient descent can start with something to improve on.
  3. Plug these parameter values into the derivatives (aka the gradient).
  4. Calculate the step sizes with step size = slope * learning rate
  5. Calculate new parameters with new = old - step size. Now go back to step 3 and repeat until step size is very small or you reach the maximum number of steps.

### About Stochastic Gradient Descent
Even with using programs, calculating gradient descent for a million data points could still be a little time consuming. So there's a version called **stochastic gradient descent** that basically uses a randomly selected subset of the data at every step rather than the full dataset.

This reduces time spent calculating the derivatives of the loss 
function.

### About calculating derivatives 
You may have noticed how I talked about treating some variables as constants when taking the derivative W.R.T another variable. This is a key concept in partial derivatives in multivariable calculus.

## Credit
1. [Gradient Descent, Step-by-Step - StatQuest](https://www.youtube.com/watch?v=sDv4f4s2SB8)