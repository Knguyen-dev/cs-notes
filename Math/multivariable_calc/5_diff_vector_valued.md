# Differentiating Vector Valued Functions

### Partial Derivatives of Vector Valued Functions 

Let $\vec{v}(t,s) = \begin{bmatrix}t^{2}-s^{2} \\ st \\ ts^{2}-st^{2} \end{bmatrix}$. So we have a multi-variable function with a 2D input and 3D output. So to derivate, we'll need to do a partial derivative, but component wise.

$\frac{\delta \vec{v}}{\delta t} = \begin{bmatrix}2t \\ s \\ s^{2}-2st\end{bmatrix}$

Here we differentiated with respect to t, so we treated $s$ as a constant. We did the derivative of each component in the vector. Of course, calculating the partial derivative in respect to $s$ is the same procedure.

#### Intuition 
First think of the ts-plane and think of how each point is going to map into the 3D plane, a vector in $\mathbb{R}^{3}$. This is what's happening with our function alone. So this function creates this sort of 3D curve or plane (parametric surface), which contains all of the output vectors, as vector points.

The derivative is just a vector that will be tangent to the point on that curve, a vector that also kind of follows that curve. As you do a small change in t, what's the rate of change of the output vector. An example is doing $\vec{v}(1,1)$. This outputs a vector $\begin{bmatrix}0 \\ 1 \\ 0\end{bmatrix}$. The derivative at $t=1$ is $\begin{bmatrix}2 \\ 1 \\ -1\end{bmatrix}$. So at this point, our function's value is going in the positive i and j directions, but in a negative z direction. So you can say, for what it looks like the function is going to keep outputting vectors in the positive i and j directions, but a negative k direction.

