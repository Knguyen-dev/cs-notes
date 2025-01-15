# Quadratic Approximation

### Local linearization vs Quadratic thing?
With local linearization, if we wanted approximate the value of a curvy 3D function, we'd just insert in a plane that's tangent to the target point. This is pretty good, we can find the value at that point by using that plane. Though if you go a bit out, our approximately can get pretty inaccurate. 

With the quadratic approximation, we basically create a quadratically shaped surface that hugs the target function more closely, not only touching the target point, but more accurately touching the points around it. With this, you can even rely on the approximation a couple of values out, more-so than your regular local linearization

### Quadratic Approximation Formula
Very similar to our local linearization formula, but for it to be quadratic, it has to have $x^{2}$, $y^{2}$, or $xy$. Just needs two variables being multiplied by each other. Fo the first four terms are from the local linearization formula, and the last 3 terms are for the quadratic part:
$
Q(x, y) = f(x_0, y_0) + f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0) + a(x-x_{0})^{2} + b(x-x_{0})(y-y_{0}) + c(y-y_{0})^{2}
$

We second to make it so, the second partial derivatives for the functions Q and F are equal:
1. $\frac{\delta^{2}Q}{\delta x^{2}} = \frac{\delta}{\delta x}(f_{x}(x_{0},y_{0}) + 2a(x-x_{0}) + b(y-y_{0})) = 2a$. You want it to match the second partial derivative, $2a = f_{xx}(x_{0}, y_{0})$, $a=\frac{1}{2}f_{xx}(x_{0},y_{0})$
2. $\frac{\delta^{2}Q}{\delta y \delta x} = \frac{\delta }{\delta y}(...) = b$. So you want $b=f_{xy}(x_{0},y_{0})$
3. Then $c=\frac{1}{2}f_{yy}(x_{0},y_{0})$


#### Example 1
Let $f(x,y)=e^{\frac{x}{2}}sin(y)$. Approximate this function by finding the formula to a parabolic surface 
that approximates this function at point $0, \frac{\pi}{2}$:

1. $f(x,y)=e^{\frac{x}{2}}sin(y)=1$
2. $f_{x}(x,y)=\frac{1}{2}e^{\frac{x}{2}}sin(y) = \frac{1}{2}$
3. $f_{y}(x,y)=e^{\frac{x}{2}}cos(y) = 0$
4. $f_{xx}(x,y)=\frac{1}{4}e^{\frac{x}{2}}sin(y) = \frac{1}{4}$
5. $f_{xy}(x,y)=\frac{1}{2}e^{\frac{x}{2}}cos(y) = 0$
6. $f_{yy}(x,y)=-e^{\frac{x}{2}}sin(y) = -1$

Then I evaluated these 6 different functions at our target point. Now plug it back into our quadratic function:

$Q(x,y) = 1 + \frac{1}{2}(x-0) + 0(y-\frac{\pi}{2}) + \frac{1}{2} \cdot \frac{1}{4}(x-0)^{2} + 0(x-0)(y-\frac{\pi}{2}) + \frac{1}{2}(-1)(y-\frac{\pi}{2})^{2}$

This is in its full abstract form, but it simplifies down to this:

$Q(x,y)= 1+\frac{x}{2} + \frac{x^{2}}{8} - \frac{1}{2}(y-\frac{\pi}{2})^{2}$


# Hessian Matrix

### What is it?
Basically a compact way to store all the second partial derivatives of f, the function 
you're approximation. So let's say we wanted to make a Hessian matrix for $f(x,y)=e^{\frac{x}{2}}sin(y)$.

$H_{f} = \begin{bmatrix}\frac{\delta^{2}f}{\delta x^{2}} & \frac{\delta^{2} f}{\delta x \delta y} \\ \frac{\delta^{2}f}{\delta y \delta x} & \frac{\delta^{2} f}{\delta y^{2}}\end{bmatrix} = \begin{bmatrix} \frac{1}{4}e^{\frac{x}{2}}sin(y) & \frac{1}{2}e^{\frac{x}{2}}cos(y) \\ \frac{1}{2}e^{\frac{x}{2}}cos(y) & -e^{\frac{x}{2}}sin(y) \end{bmatrix}$.

Of course, you can scale this up to have $n$ variables, so the form would be: 

![](https://machinelearningmastery.com/wp-content/uploads/2021/07/hessian1-1.png)

Where column $x_{n}$ will contain all the partial derivatives of that column with all other columns.

---
### Review of quadratic form
This is the "quadratic form", $ax^{2} + bxy + cy^{2}$, which means the only terms in the expression are quadratic. You can express this 3 term expression with the 
dot product of 2 vectors in $\mathbb{R}^{3}$, where one vector has the constants and the other vector has the variables. Now we just need to be able to scale this up to 
$n$ number of terms.

### Vector form for quadratic form
Let the quadratic form be $ax^{2} + 2bxy + cy^{2}$. We have $2bxy$, which doesn't change much, but 
it'll make it easier to calculate later.

1. $\begin{bmatrix}x & y\end{bmatrix} \begin{bmatrix}a & b \\ b & c\end{bmatrix} \begin{bmatrix}x \\ y\end{bmatrix}$
2. $x(ax+by)+y(bx+cy) = ax^{2}+2bxy+cy^{2}$

This yields us the original quadratic form that we were aiming for. So let $\vec{x}=\begin{bmatrix}x \\ y\end{bmatrix}$ and $M = \begin{bmatrix}a & b \\ b & c\end{bmatrix}$. You should note that $M$ stays symmetric 

---
### Using vector form to do quadratic approximation
Let $\vec{x} = \begin{bmatrix}x \\ y\end{bmatrix}, \vec{x_{0}} = \begin{bmatrix}x_{0} \\ y_{0}\end{bmatrix}$

1. Linear portion: $f(\vec{x}_{0}) + \nabla f(\vec{x_{0}}) \cdot (\vec{x} - \vec{x_{0}})$
2. Quadratic portion: $\frac{1}{2} (\vec{x}-\vec{x_{0}})^{T} \cdot H_{f}(\vec{x_{0}})(\vec{x} - \vec{x_{0}})$
3. Finally: $Q_{f}(\vec{x}) = f(\vec{x}_{0}) + \nabla f(x_{0}) \cdot (\vec{x}-\vec{x_{0}})+\frac{1}{2}(\vec{x}-\vec{x_{0}})^{T} H_{f}(\vec{x_{0}})(\vec{x}-\vec{x_{0}})$

### Connection to Taylor-series Approximations
1. A zero-order term is just a plane that approximates the function's value. It's called zero-order since it doesn't have any variables being multiplied.
2. First order (linear) means there are terms with one variable being multiplied.
3. Quadratic means there are terms with two variables being multiplied.

These are basically Taylor series terms, but using multi-variable functions. If you do a cubic function, that's going to be more accurate, and so on. However 
However there's no need to go too high a lot of the times since the optimizations are so very miniscule for the computations it takes to get there. In the next section we'll
see how we can use these to optimize multi-variable functions.