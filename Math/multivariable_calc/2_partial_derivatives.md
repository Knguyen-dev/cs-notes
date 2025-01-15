# Partial derivatives

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


## But what's a gradient
The gradient of a scalar valued function (often representing some surface or multidimensional scalar field) is a vector that contains all of its partial derivatives. It's denoted as $\nabla f$ and its components are all the partial derivatives of f with respect to each variable.

$\nabla f = (\frac{\delta f}{\delta x_{1}}, ..., \frac{\delta f}{\delta x_{n}})$

Here are some **key properties of the gradient:**
1. **Direction:** The gradient points in the direction of the steepest ascent of the function. Meaning if you move in the direction of $\nabla f$, the value of $f$ increases the most rapidly.
2. **Magnitude:** $||\nabla f||$ represents the rate of change of f in the steepest direction. This is more akin to the interpretation of a derivative in single variable Calculus.


### Distinctions from Single Variable Calculus
In single variable calculus, the derivative is a scalar value that tells us how steeply $f(x)$ is increasing or decreasing at x. It gave us the rate of change, and things are in 1 dimension, as you move left or right on the number line.

In multivariable calculus, the gradient is again a **vector** that tells us two things:
1. **Direction:** The direction in which $f$ increases the fastest. So if you're wanting to find a higher rate of change, so in the direction of the gradient because hte gradient identifies the direction where the rate is maximized.
2. **Magnitude (Steepness):** This is the rate at which $f$ changes, which should be increasing as you move in the direction of the gradient (the direction of steepest ascent).

The **gradient** is just a multidimensional derivative. So it'd just be all of your partial derivatives, that group is the gradient of f, indicated by $\nabla f$. 
One thing about it is that the gradient will point in the direction of steepest ascent, so it'll point in the direction where the rate of change is greatest.


#### Example 1:
Let $f(x,y) = x^{2} + 2y^{2}$. Doing partial diff. the gradient is $\nabla f(x,y) = (\frac{\delta f}{\delta x}, \frac{\delta f}{\delta y}) = (2x, 4y)$. 

Evaluating the gradient at point $(1,1)$, we get $\nabla f(1,1) = (2,4)$. From the input point, $(1,1)$, if you placed a point in the direction of that gradient vector, then you'd be getting a higher rate at which the function's value changes in respect to all your variables. The magnitude, steepness of the hill is $\sqrt{20}=4.47$, So moving to $(3, 5)$, exactly one vector in the direction of the gradient:
  - Calculate the new gradient vector $(6, 20)$, new direction of steepness.
  - Calculate steepness: $20.88$
I put a point down in the direction of the gradient, expecting to yield a higher rate of change for the function f, and it worked. 

