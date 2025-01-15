# Multivariate Calculus

## How is multi-variable calculus different?
In univariate calculus we had two variables sale price (y) and area (x).

In multivariate calculus, we would deal with multiple variables area (x) and city distribution (y), and then sale price (z). Now your graph would look more like a surface. You're not only studying how sale price is affected when you change area (one derivative), but then you're also looking at another side to see how it changes when you change the city's population distribution.

Earlier it was f(x) = y = mx+b, but now it's more like f(x,y) = x^{2} + y^{2}. To take the derivative of a function with multiple inputs, just take the derivative of the function W.R.T each variable, these are your partial derivatives that when used together allow you to see the whole picture. For example, let $f(x,y) = e^{x^{2}+y^{2}}$. To do a derivative, you take the derivative of the function W.R.T. x and y:
  1. $\frac{d}{dx}(e^{x^{2}+y^{2}})=e^{x^{2}+y^{2}}2x$
  2. $\frac{d}{dy}(e^{x^{2}+y^{2}})=e^{x^{2}+y^{2}}2y$


Here’s a refined and clearer explanation of your notes, focusing on making the connections between dot products, linear combinations, and partial derivatives more intuitive:

---

## Vector Gradient with Multiple Variables  

In our original prediction equation, we had one independent variable: the area of a house in square feet, denoted by $x$. This equation was expressed as:  

$
\hat{y} = mx + b
$

Here, $m$ is the slope, $x$ is the input, and $b$ is the intercept.  

---
#### Extending to Multiple Variables  

To handle multiple independent variables, such as area, number of bathrooms, and number of floors, we add more terms:  

$
\hat{y} = m_1x_1 + m_2x_2 + m_3x_3 + b
$

This is a linear combination of weights ($m_1, m_2, m_3$) and inputs ($x_1, x_2, x_3$), which can also be expressed as a **dot product**:  

1. $\hat{y} = \vec{m} \cdot \vec{x}$, where $\vec{m} = [m_0, m_1, m_2, m_3]$ and $\vec{x} = [1, x_1, x_2, x_3]$.  
2. Here, $m_0$ represents the intercept $b$, and we include it in the weight vector. To ensure the dot product works, we define $x_0 = 1$.  

---
#### Connecting Gradients and Partial Derivatives  

In this setup, the predicted value $\hat{y}$ is the dot product of weights $\vec{m}$ and inputs $\vec{x}$. Just focus on the fact that $\hat{y}$ is a multi-variable function that has multiple inputs and one output. Calculate the partial derivatives of it

When optimizing this model (e.g., using gradient descent), we compute the **partial derivative** of $\hat{y}$ with respect to each input $x_{i}$:  

$
\frac{\partial \hat{y}}{\partial x_i} = m_i
$

So we're calculating how a small change in the input affects the output. This can be written as our slope value for one dimension/column. 


$
\nabla_{\vec{x}} \hat{y} = \frac{\partial \hat{y}}{\partial \vec{x}} = \vec{x}
$

This means the gradient of $\hat{y}$ with respect to the weights is simply the input vector $\vec{x}$. Of course, in the end we're just trying to get the best slope values for predicting the data. After you'd do some optimization magic, and then you're good.

## Hessian Matrix 

### What is it?
A matrix that holds all second order derivatives of the function we are estimating. So we can use this to verify the local minima and maxima. 

### How do I use it?

### Trace of a Hessian Matrix


## Convex Functions 



Let's learn about hte hessian matrix and whatnot.

https://www.youtube.com/watch?v=SYvI741l1cs&list=PLcQCwsZDEzFmlSc6levE3UV9rZ8yY-D_7&index=58