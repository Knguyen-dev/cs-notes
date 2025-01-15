## Directional Derivative

The directional derivative builds on the concept of partial derivatives. It measures how a function changes as we nudge in the direction of a specific vector. Let’s illustrate this with an example:

Suppose we have a function: $f(x, y) = x^2y$

We want to compute the directional derivative at the point $(1, 2)$, in the direction of the vector:  $\vec{v} = \begin{bmatrix} -1 \\ 2 \end{bmatrix}$

---
### Intuition: What are we asking?  
We’re asking:  
- "If we take a small step in the direction of $\vec{v}$, how does that affect the output of $f$?"
- More formally, "What is the rate of change of $f$ in the direction of $\vec{v}$?"

---
### Formal Representation  
A step in the direction of $\vec{v}$ can be written as $h\vec{v}$:  

$h\vec{v} = \begin{bmatrix} -h \\ 2h \end{bmatrix}$

where h is a very small number (e.g., $h = 0.001$).

The directional derivative along $\vec{v}$ is then the ratio of the change in f to the size of the step h as h approaches 0. This is mathematically represented as:  

$
\frac{\delta f}{\delta \vec{v}} = \lim_{h \to 0} \frac{f((1, 2) + h\vec{v}) - f(1, 2)}{h}.
$

---
### Connection to the Gradient  
There’s a more efficient way to compute this without relying on limits. We can use the **gradient** of f, which is:  

$
\nabla f = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \end{bmatrix}.
$

At $(1, 2)$, the partial derivatives are:  

$
\frac{\partial f}{\partial x} = 2xy \quad \text{and} \quad \frac{\partial f}{\partial y} = x^2.
$

So,  

$
\nabla f(1, 2) = \begin{bmatrix} 2(1)(2) \\ (1)^2 \end{bmatrix} = \begin{bmatrix} 4 \\ 1 \end{bmatrix}.
$

The directional derivative is the **dot product** of the gradient $\nabla f$ and the vector $\vec{v}$:  

$
\frac{\delta f}{\delta \vec{v}} = \nabla f \cdot \vec{v} = \begin{bmatrix} 4 \\ 1 \end{bmatrix} \cdot \begin{bmatrix} -1 \\ 2 \end{bmatrix}
$

---
### Computation and interpretation  
Performing the dot product:  
$
\frac{\delta f}{\delta \vec{v}} = (4)(-1) + (1)(2) = -4 + 2 = -2.
$


The directional derivative $-2$ tells us that if we take a small step in the direction of $\vec{v}$, the function $f$ decreases at a rate of $2$ units per unit step.

---
### Why the gradient points in the direction of steepest ascent
Mathematically the directional derivative $\frac{df}{dv} = \nabla f \cdot \vec{v}$. We know this represents the rate of change of f in the direction of v.

Mathematically the dot product is maximum when v points in the same direction as the gradient. Hence the gradient gives the direction where the change is maximized!

