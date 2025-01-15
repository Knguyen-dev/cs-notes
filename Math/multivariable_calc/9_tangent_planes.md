
# Local Linearization

### What Are We Talking About?  
In single-variable calculus, a tangent line touches a curve at a point $(x_0)$. In multivariable calculus, the concept generalizes to a **tangent plane** for a 3D graph at a point $(x_0, y_0)$. The tangent plane is a flat surface that "grazes" the graph at that point.

---
### Example  
For a point $(1, 2, 3)$, many planes can pass through it, but the tangent plane is unique because it depends on the function $f(x, y)$.  

Suppose the tangent plane is:  
$L(x, y) = a(x - x_0) + b(y - y_0) + z_0$  

Here, $a$ and $b$ are the partial derivatives of $f(x, y)$ with respect to $x$ and $y$.  

For $L(x, y) = 2x + y + C$ tangent at $(1, 2, 3)$:  
1. Set $L(x, y) = 2(x - 1) + 1(y - 2) + C$.  
2. Plug in the point: $2(1 - 1) + 1(2 - 2) + C = C$.  
3. Since $L(1, 2) = 3$, $C = 3$.  

---

### General Formula  
The tangent plane at $(x_0, y_0, z_0)$ is:  

$
L(x, y) = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0) + f(x_0, y_0)
$

This ensures the plane passes through $(x_0, y_0, z_0)$ and its slopes match the graph's slopes. Also $f_{x}$ just means I'm talking about a partial derivative at a given point $(x_{0},y_{0})$, which are just the points we're plugging in.

---

### Local Linearization  
The tangent plane is a **linear approximation** of $f(x, y)$ near $(x_0, y_0)$.  

In vector form:  

$
L_f(\mathbb{X}) = f(\mathbb{X_0}) + \nabla f(\mathbb{X_0}) \cdot (\mathbb{X} - \mathbb{X_0})
$

Here:  
- $\mathbb{X} = \begin{bmatrix} x \\ y \end{bmatrix}$ and $\mathbb{X_0} = \begin{bmatrix} x_0 \\ y_0 \end{bmatrix}$.  
- $\nabla f(\mathbb{X_0}) = \begin{bmatrix} f_x(\mathbb{X_0}) \\ f_y(\mathbb{X_0}) \end{bmatrix}$ (gradient).  
- This expresses $L(x, y)$ as a dot product, combining the gradient (slopes) and displacement $(\mathbb{X} - \mathbb{X_0})$.  

---
### Key Idea  
The tangent plane approximates $f(x, y)$ near $(x_0, y_0)$, giving a simpler, linear function that matches the value and slopes at the point.  
