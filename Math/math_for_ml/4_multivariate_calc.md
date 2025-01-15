# Multivariate Calculus

### How is multi-variable calculus different?
In univariate calculus we had two variables sale price (y) and area (x).

In multivariate calculus, we would deal with multiple variables area (x) and city distribution (y), and then sale price (z). Now your graph would look more like a surface. You're not only studying how sale price is affected when you change area (one derivative), but then you're also looking at another side to see how it changes when you change the city's population distribution.

Earlier it was f(x) = y = mx+b, but now it's more like f(x,y) = x^{2} + y^{2}. To take the derivative of a function with multiple inputs, just take the derivative of the function W.R.T each variable, these are your partial derivatives that when used together allow you to see the whole picture. For example, let $f(x,y) = e^{x^{2}+y^{2}}$. To do a derivative, you take the derivative of the function W.R.T. x and y:
  1. $\frac{d}{dx}(e^{x^{2}+y^{2}})=e^{x^{2}+y^{2}}2x$
  2. $\frac{d}{dy}(e^{x^{2}+y^{2}})=e^{x^{2}+y^{2}}2y$


## Intro to partial derivatives
Let $f(x)=x^{2}$. The derivative $\frac{\delta f}{\delta x}$ is just asking, how does a tiny change in the input affect the output.
You can do the same thing in the multivariable world, even with $f(x,y) = x^{2}y + sin(y)$. You could ask $\frac{\delta f}{\delta x}$, okay how does the tiny change in the x input, affect the output?
But now we can also ask about $\frac{\delta f}{\delta y}$, how much does a change in y affect the output. And a tiny change in y could have a much bigger or smaller change on the output, than a tiny change in x.

A couple things to note:
  1. With derivatives in multi-variable calculus, we use the symbol $\frac{\delta}{\delta x}$, instead of just $\frac{d}{dx}$ in order to emphasize the multi-variable nature of the problem we're solving.
  2. Also the reason we call them partial derivatives is because, the derivative in respect to x, just tells part of the story. The derivative with respect to y only examines the y aspect of the function, not the entire thing.
  So like to fully understand what's happening with the function, you're going to look at derivatives that show different parts of the function. 

So $\frac{\delta f}{\delta x}(1,2)$ is like taking the derivative, but x varies and y is fixed. This derivative only cares about the movement of x:
  1. $\frac{\delta f}{\delta x}(1,2) = \frac{\delta f}{\delta x}(x^{2} \cdot 2 + sin(2))$; plug in y as a constant whilst keeping x varied
  2. $\frac{\delta f}{\delta x}=4x+0$; It's been derived, now find the value at $x=1$
  3. $\frac{\delta f}{\delta x}(1,2) = 4$

Now find $\frac{\delta f}{\delta y}(1,2)$:
  1. $\frac{\delta f}{\delta y}(1,2) = \frac{\delta f}{\delta y}(1^{2}y+sin(y))$; plug in constants
  2. $\frac{\delta f}{\delta y} = 1+cos(y)|$; derivative 
  3. $\frac{\delta f}{\delta y}(1,2)=1+cos(2)$; plug in at $y=2$

Okay so that's the derivatives at a point, but most of the time, you'd want to get the partial derivatives in the form of a formula. So now when doing partial derivatives, you'll need to pretend and treat some variables 
like they are constants. First calculate $\frac{\delta f}{\delta x}(x,y)$:
  1. $\frac{\delta f}{\delta x}(x,y) = \frac{\delta}{\delta x}(x^{2}y+sin(y))$; so here just pretend that y is a constant. This means that $x^{2}$ is just being multiplied by some scalar, and sin(y) is just a number.
  2. $\frac{\delta f}{\delta x}(x,y) = 2xy+0$
  3. $\frac{\delta f}{\delta y}(x,y) = x^{2}+cos(y)$

You can also try to understand it through a graph. But of course with higher number of variables, it gets pretty hard. In the end, one of the easier ways to understand it is "If I change variable x, how does that affect the function's output value".

### Second Derivatives (and Higher-Order Derivatives)

The first derivative $f'(x)$ gives us critical points, which help identify where the function has potential maxima, minima, or points of inflection. However, to confirm whether a critical point is a **local minimum** or **local maximum**, we use the **second derivative** $f''(x)$, which provides information about the concavity of the function.
Before we stop optimizing, it'd be a good idea to ensure that we truly have the parameters for a minimum loss, right?

#### Concavity and Second Derivative Test
- A function is **concave up** at a point if $f''(x) > 0$. This indicates that the slope of \( f'(x) \) is increasing, and the critical point is likely a **local minimum**.
- A function is **concave down** at a point if $f''(x) < 0$. This indicates that the slope of \( f'(x) \) is decreasing, and the critical point is likely a **local maximum**.
- If $f''(x) = 0$, the test is inconclusive. Higher-order derivatives or other methods may be needed to analyze the behavior of the function at that point.

#### Why This Matters in Machine Learning
Understanding concavity and higher-order derivatives is essential in machine learning, especially when working with optimization problems. For example:
- **Loss functions**: Machine learning models often minimize a loss function. Knowing whether a critical point is a global or local minimum can ensure better optimization.
- **Gradient Descent**: The behavior of the gradient (first derivative) is influenced by concavity, which can affect the efficiency of optimization algorithms.

## Directional Derivative

## Differentiating Parametric curves and vector valued functions

## Ideas of Divergence and Curl

## Laplacians and Jacobians


## Matrix Calculus
In our original prediction equation, we had to deal with one independent variable, the area in square feet of the house denoted by x. This equation is expressed as $\hat{y}=mx+b$. To represent more independent variables, we just have to add more terms. So let's say we wanted to represent area, number of bathrooms, and the number of floors on the property. This would be represented as $\hat{y}=m_{1}x_{1}+m_{2}x_{2}+m_{3}x_{3}$. This is in the same form as a linear combination, so we can express this as a dot product.
  1. $\hat{y}=\vec{m} \cdot \vec{x}$
  2. $\vec{m}={m_{0}, ..., m_{3}}$
  3. $\vec{x}={1, ..., x_{3}}$
**NOTE:** Here $m_{0}$ is our y-intercept b, so it's just included in the m vector, and we have $x_{0}=1$ to get around this and make sure the dot product still works.

Then the derivative is denoted as $\frac{\delta \hat{y}}{\delta x_{i}}$. Here the idea is to take the derivative at each ith value. E.g. for i=1, we would treat everything not i=1 as constants, which would be zeroed. Then add all these terms up which would create our derivative. Of course there is a pattern, and easy formula:

$\frac{\delta \hat{y}}{\delta x_{i}}(\vec{m} \cdot \vec{x}) = \vec{m}^{T}$




they're talking about jacobian matrices here. I feel like it'd be probably good to at least do the math chapter on khan academy before this