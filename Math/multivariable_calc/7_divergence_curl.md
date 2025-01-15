# Divergence 

### Introduction: Intuition and Visualization
Let a point in space represent a vector. Let these points represent fluid flow, as each point represents an air or water particle moving. So each particle flows into the direction of a vector, probably only for a brief moment before it's caught by another vector and flows in a different direction.

You'll also encounter positive and negative divergence. Think of positive as flowing outward, particles flowing outside from a pipe. The particles are flowing away from a given point, and the density (number of particles) at the point is less. Negative divergence is when particles converge towards a point, like fluid getting sucked into a sink. Here there's a big increase in density.


- Vector field is our graph of fluid
- Divergence is an "operator" that takes in a function/vector field, and then outputs a number. The function takes in a point and calculates the level of divergence or how much fluid goes away from it.
- div v(x,y) > 0: This is an example of when a point overall has more fluid going away from it. It could still have fluid going in, but the amount going out will counter balance to get a positive value.
- div v (x,y) < 0: The vectors and particles around this point will converge. So of course there could be some fluid particles diverging, but the amount of fluid going in will counterbalance to make the value negative.
- div v (x,y) = 0: The amount of fluid going in and out is equal. 

---
### Divergence Formula 

First focus on a vector field that has only horizontal vectors:$\vec{v}(x,y) = \begin{bmatrix}p(x,y) \\ 0\end{bmatrix}$

At the a given point (x,y), we can say the divergence is calculated by $\frac{\delta p}{\delta x} >0 $. This means as x increases, p increases, meaning the vector goes away from the point. More technically, it means the vector grows stronger in the x-direction, the more you increase x (either in positive or negative direction), it would accordingly grow in that same x direction.

If your divergence is negative, convergence, it's like placing a point around your origin, and the vector points towards it. As you increase your x value (in whatever direction), the corresponding vector associated with the point will grow stronger in the opposite direction. E.g. the more you input a positive x value, the output vector's x component will be increasingly negative, or vice versa.

Now let's focus on a vector field that only has a y component:
$\vec{v}(x,y) = \begin{bmatrix}0 \\ p(x,y)\end{bmatrix}$

So divergence in the y direction is denoted as $\frac{\delta q}{\delta y} > 0$. The same idea as before. Your divergence is positive when you place a point in the y direction, and the vector associated with it grows in the same direction. So you have a positive y, and your vector has a positive y. Or a negative y, with a negative y component. Convergence is when the vector grows in the opposite direction of the input x value.

Essentially divergence $\vec{v}(x,y)=\begin{bmatrix}p(x,y) \\ q(x,y)\end{bmatrix}$. Then the divergence is denote as $div \vec{v}(x,y)=\frac{\delta p}{\delta x}+\frac{\delta q}{\delta y}$.


So this would look like $\nabla \cdot F = \frac{\delta p}{\delta x} + \frac{\delta q}{\delta y}$. Where F can represent the vector containing the functions that calculate each component of your output vector.

#### Divergence Example 1: 
Let $\vec{v}(x,y) = \begin{bmatrix}xy \\ y^{2}-x^{2}\end{bmatrix} = \begin{bmatrix}p(x,y) \\ q(x,y)\end{bmatrix}$

So calculate the general divergence eq. for this vector field by adding up the partial derivatives, which should equal $3y$. So at $y=0$, the divergence is 0, so the fluid flowing in and out is equal. However at $y=2$, the divergence is 6, at this there's fluid going in, but there's a lot more fluid going away.


# Curl

### Introduction 
Again, imagine your vector field is a fluid flow representation. Imagine a region with counter clockwise rotation, that's positive curl. If the fluid is rotating in the clockwise direction, that's negative curl. No rotation is designated at no curl. 

Let $\vec{v}(x,y)=\begin{bmatrix}p(x,y) \\ q(x,y)\end{bmatrix}$.

The curl would be denoted as $\frac{\delta q}{\delta x} - \frac{\delta p}{\delta y}$. The more the vectors around a point are in a perfect counter-clockwise rotation setup, the more positive the curl will be. The more they're like the clockwise rotation setup, the more negative they'll be.