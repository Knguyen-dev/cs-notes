# Laplacian

### What is it?
Just a mathematical operator, in the same way that finding the divergence or gradient was. 

Let f(x,y), so the input is 2D and the output is 1D, just the height of the graph. The laplacian is defined as the divergence of the function's gradient, denoted 
by $\triangle f(x,y) = \nabla \cdot \nabla f$. Since f is a scalar valued function (outputs numbers), the gradient of f would give you a vector field. Then the divergence of a vector field is just a scalar. It's like a second derivative.

Gradient gives us a vector in the direction of steepest ascent, the direction where the function increases the most. Visualizing it as a hilly surface, when you're at the top of the hill (local maximum), all the vectors around it will point to you. If you're at the bottom of a hill (local minimum), in a valley, the gradient vectors will point away from the valley, and to the hills.

Visualize the gradient field, just a vector field but at each input point, the vector associated with it is just the gradient vector at that point. If you were imagining things as fluid flow, the areas of divergence (positive divergence) is when the arrows are spreading out. This is indicates that it's a local minimum. If the point has negative divergence, convergence, then it's a local maximum.

So to review, the Laplacian is kind of a measure of whether something is a minimum or maximum:
  - If the Laplacian is positive (divergence), then we're at a local minimum since the gradient vectors are pointing away from us.
  - If the Laplacian is negative (convergence), then we're at a local maximum since the gradient vectors are pointing towards us. 
Since we're getting a scalar back, some values are higher than others. The Laplacian a measure of how much of a min or max the value of $f$ is at the point $(x,y)$. 

This is similar to the second derivative. Back in single-variable calculus, we'd use the derivative to get critical points, but we'd use the second derivative to compare those critical points.

### Explicit Definition of Laplacian
Let $f(x_{1},...,x_{n})$ be a scalar valued function. Then the laplacian is $\nabla \cdot \nabla f$. 

We already know $\nabla f = \begin{bmatrix} \frac{\delta}{\delta x_{1}} \\ \vdots \\ \frac{\delta}{\delta x_{n}}\end{bmatrix} \cdot f = \begin{bmatrix} \frac{\delta f}{\delta x_{1}} \\ \vdots \\ \frac{\delta f}{\delta x_{n}}\end{bmatrix}$. Kind of like scalar multiplication on a vector.

Then $\triangle f = \begin{bmatrix} \frac{\delta}{\delta x_{1}} \\ \vdots \\ \frac{\delta}{\delta x_{n}}\end{bmatrix} \cdot \begin{bmatrix} \frac{\delta f}{\delta x_{1}} \\ \vdots \\ \frac{\delta f}{\delta x_{n}}\end{bmatrix} = \frac{\delta^{2}f}{\delta x_{1}^{2}} + ... + \frac{\delta^{2}f}{\delta x_{n}^{2}} = \sum_{i=1}^{n}{\frac{\delta^{2}f}{\delta x_{i}^{2}}}$. This aligns with classic dot product antics. But yeah this is a more formulaic way of doing the Laplacian.

# Jacobian

### Local linearity for a multi-variable function
Let $f(\begin{bmatrix}x \\ y\end{bmatrix}) = \begin{bmatrix}x+sin(y) \\ y+sin(x)\end{bmatrix}$ be a transformation. This is not a linear transformation as 
things become curvy lines. For the point vector $\begin{bmatrix}\frac{\pi}{2}\end{bmatrix}$, it's transformed to $\begin{bmatrix}\frac{\pi}{2} \\ 1\end{bmatrix}$. So at this point,
the point is moved vertically by 1 unit. All points are being transformed and curved. You'd need a lot more than a 2 by 2 matrix to represent 
this non-linear transformation.

However the transformation does have a property called **local linearity**. At every point in a differentiable transformation, if you zoom in enough, 
the behavior of the transformation becomes approximately similar. The **Jacobian matrix** is just the matrix that represents that linear transformation
at that specific point. 

### Jacobian Matrix
The Jacobian matrix looks like this: $\begin{bmatrix}\frac{df_{1}}{dx} & \frac{df_{1}}{dy}\\ \frac{df_{2}}{dx} & \frac{df_{1}}{dy}\end{bmatrix}$

The first column vector representing the x and y motion when changing the x component. The second column vector representing the x and y motion caused by a small change in the y component.



