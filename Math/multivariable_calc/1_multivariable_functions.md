# Introduction to Multi-variable Calculus

### Pre-requisites
- Single variable calculus (AP Calc AB or BC)
- Vectors and Matrices 

## What is multi-variable calculus?
- Single variable functions: $f(x) = x^{2}$. This handles one input and one output.
- Multi variable functions: A function whose input or output is made up of multiple numbers.
  - $f(x,y) = x^{2}+y$. It has multiple inputs and a single output. It associates a point in xy-space to a point on the number line.
  - $f(x,y)= \begin{bmatrix}3x \\ 2y\end{bmatrix}$. Has multiple inputs and outputs. Associates a point in 3d space to another point in 3d space. 

While it's called 'multi-variable' calculus, but it's more like 'multi-dimensional' calculus. We're seeing graphs 2 dimensions, but more analytically. In 3 dimension space as well!

## Visualizing 

### Graphs
For $f(x)=-x^{2}+3x+2$, we'd graph the point (x, f(x)). 

How about a for a multiple with a 2D input and 1D output? For something like $f(x,y) = (x-2)^{2}+(y-2)^{2}+2$, we can plot the association as $(x,y, f(x,y)))$. So for a given point $(x,y)$, you can think of $f(x,y)$ as the distance away from that point on the z-axis. 

However there are limitations. If you wanted to graph $f(x,y) = (x^{2}, y^{2})$, you would need to graph a point $(x,y,x^{2},y^{2})$. This is in four dimensions, which is a lot more difficult than one can comfortably visualize.

### Contour Maps

#### What are they?
A way to depict functions with a 2D input and 1D output. While you can plot $x,y, f(x,y)$, rendering 3D graphs can be sometimes difficult. Use contour maps to represent the function while only drawing on 2D space.

#### Step by step
1. Start with 3D graph
2. Slice the map into evenly cut planes.
3. Then plot these planes on the xy plane, obviously marking their relative heights (z-axis values).

### Parametric Curves
The goal is ot have a parametric functions describe the path (a line or curve) in 2D or 3D space. The parameter t serves as the input and controls how far along the curve we are, and the output represents points on the curve in a chosen space.

For example, $f(t)=(tcos(t),tsin(t))$:
  - t is the input/parameter (1D input)
  - (x,y) is the output that's a point in 2D space.
  - As t varies, these points trace out a curve.

**Key Idea:** The curve is determined by how t maps to the points, but different parameterizations (functions) can produce the same curve, just traversed differently (e.g., faster, slower, or in reverse).

### Parametric surfaces
This concept extends to surfaces. A parametric surface is defined by a function with two parameters (inputs) and a point in 3D space (output): $f(t,s)=(x(t,s), y(t,s), z(t,s))$


For example, $f(t,s) = \begin{bmatrix}3cos(t)+cos(t)cos(s) \\ 2sin(t)+sin(t)cos(s) \\ sin(s)\end{bmatrix}$. 
  - t and s are inputs on a 2d grid.
  - The outputs represent points on a 3D surface. 

### Vector fields
A way of visualizing functions with the same number of inputs and outputs. We'd map the maps on the graph, but have a vector that goes in the direction of the output

For example, $f(x,y)= \begin{bmatrix}y^{3}-9y \\ x^{3} -9x\end{bmatrix}$. Basically for $f(1,2) = \begin{bmatrix}-10 \\ -8 \end{bmatrix}$, you'd have a point at (1,2). Then at that point, you'd have a vector that has the same direction as the output vector. This allows you to see a given input (point on your graph), and know the direction of the vector outputted by it. But yeah this is used in fluid flow and physics a lot.

The only thing that's misleading about vector fields, is that all of your vectors are drawn equal length, but in reality a given vector can be vastly longer or shorter than its counterparts. A lot of software have the option of coloring the vectors so you have an estimate of its magnitude.

#### Vector fields and fluid flow 
To describe fluid particles, you may use a vector field. And of course the velocities of a particle could vary, but this is a good way of seeing the direction of the velocity at a given point.

#### 3d vector fields
So there'd be a function $f(x,y,z) = (?, ?, ?)$. So we'd plot the input points, and then at that input point, we'd show the direction of the output vector. Same idea as before, but now in 3d space. 

Let's say $f(x,y,z) = (y, 1, 2)$. So if we look at our y-axes, we're going to have smaller magnitude vectors at points closer to y, and then larger magnitude vectors when they're further away from the y-axis.

Say $f(x,y,z) = (x,y,z)$, so at a given point $(x,y,z)$ we want to output a vector $\begin{bmatrix}x \\ y \\ z\end{bmatrix}$. This outputs a position vector (stems from origin), but since we're doing vector fields it's going to stem from the point (x,y,z). All of your vectors are going to point away from that point, and away from the origin.

And it doesn't have to just be fluid flow. Other topics like electromagnetic fields or the direction of wind particles can be visualized with 3d vector fields as well.