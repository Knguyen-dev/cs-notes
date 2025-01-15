# Multi-variable Chain Rule

## Intro and example 
Let $f(x,y)=x^{2}y$ be our multi-variable function. Then we have $x(t)=cos(t)$ and $y(t)=sin(t)$ be our single variable functions. Now let's think about the composition of them $f(x(t),y(t))$. 
You can think of it as taking a point in t, then linking it to the xy-plane. Then our multi-variable function takes it back to a single point. To find $\frac{d}{dt}f(x(t),y(t))$ you can do the "multi-variable chain rule", but 
that's not always needed. 

### Intuitive Pattern 1
1. $\frac{d}{dt}f(cos(t),sin(t))) = \frac{d}{dt}(cos(t))^{2}sin(t)$
2. Do product rule: $cos(t)^{2}cos(t) \cdot sin(t) * 2cos(t)(-sin(t))$

### Intuitive Pattern 2:
1. $\frac{\delta f}{\delta x}=2xy$ and $\frac{\delta f}{\delta y}=x^{2}$; our partial derivative
2. $\frac{dx}{dt}=-sin(t)$ and $\frac{dy}{dt}=cos(t)$; deriving the single variable functions.

Our first pattern can be expressed as: $\frac{\delta f}{\delta y} \cdot \frac{dy}{dt} + \frac{\delta f}{\delta x} \cdot \frac{dx}{dt}$. And this pattern is called the multi-variable chain rule.

### Multi-variable chain rule (Simple Version)
$\frac{d}{dt}f(x(t),y(t))=\frac{\delta f}{\delta x}\cdot\frac{dx}{dt} + \frac{\delta f}{\delta y}\cdot\frac{dy}{dt}$

So this is when we're moving from one dimension to two dimensions, and then back to one dimension. But let's think about the intuition. That tiny change in 
t will have some change in x and y in our xy-plane. Then that change in x and y is going to correspond to some change in f. 

### Multi-variable chain rule (Vector Form)
Notice how in the previous section, the chain rule almost seemed like a linear combination or like a dot product of two vectors? Well here we go:

1. $\vec{v}(t) = \begin{bmatrix}x(t) \\ y(t)\end{bmatrix}$
2. $\frac{d\vec{v}}{dt} = \begin{bmatrix}\frac{dx}{dt} \\ \frac{dy}{dt}\end{bmatrix}$
3. $\frac{d}{dt}f(x(t),y(t))=\begin{bmatrix}\frac{\delta f}{\delta x} \\ \frac{\delta f}{\delta y}\end{bmatrix} \cdot \begin{bmatrix}\frac{dx}{dt} \\ \frac{dy}{dt}\end{bmatrix} = \nabla f \cdot \vec{v'}(t) = \nabla f(\vec{v}(t)) \cdot \vec{v'}(t)$

This is very similar to our single-variable chain rule. Take the derivative of the outside (gradient), the multiply by the derivative of that inner piece.