# Curvature

### Introduction: Geometric Example
When driving a car in a circle, you can trace out a turning circle. A car with a bad turning circle would trace out a circle with a larger radius, and we consider it bad because it takes more distance to turn. If you have a good turning circle, the circle has a short radius, not taking as much work or distance to turn. The curvature is measured $\kappa=\frac{1}{R}$, where $R$ is the radius of the circle.

So as R decreases, you have a higher curvature value, which makes sense as you can curve/turn more. As R increases, you have a small curvature value, which also makes sense since you can't curve/turn as much.

### Introduction: Mathematical
A curve is typically a parametric function, such as $\vec{s}(t)=\begin{bmatrix}x(t) \\ y(t)\end{bmatrix} = \begin{bmatrix}t-sin(t) \\ 1-cos(t)\end{bmatrix}$. Here each value of t gives you a certain vector from the origin, whose tip lands on the curve. So as you draw these vectors out, their tips trace the curve.

Also let a vector be tangent to the curve. The curvature is looking at the rate at which the vector tangent to the curve is changing directions. So we're taking the rate of change with respect to the arc length. So calculating $\frac{dT}{ds}$, how much does a unit tangent vector changes when we change the arc length. If we travel a distance of 0.5, does the vector change a lot or a little?  You really care about the magnitude of the $|\frac{dT}{ds}| = \frac{x'(t)y''(t)-y'(t)x''(t)}{(x'(t)^{2}+y'(t)^{2})^{\frac{3}{2}}}$.

#### Example: Theory
We have our parametric function: $\vec{s}(t) = \begin{bmatrix}x(t) \\ y(t)\end{bmatrix}$; 

Need to find vectors tangent to the curve. Do the derivative, which is just deriving the components by t.

$\vec{s}'(t) = \begin{bmatrix}x'(t) \\ y'(t)\end{bmatrix}$

We need these to be unit vectors. So we're creating a function that calculates the unit tangent vectors:

$T(t) = \frac{\vec{s'}(t)}{|\vec{s'}(t)|} = \begin{bmatrix} \frac{x'(t)}{|\vec{s'}(t)|} \\ \frac{y'(t)}{|\vec{s'}(t)|} \end{bmatrix}$.

Where the magnitude is $|\vec{s'}(t)| = \sqrt{x'(t)^{2} + y'(t)^{2}}$.

Now that we have a function that gets us unit tangent vectors for the curve, we want to calculate how the vectors change with respect to arc length. So that's another derivative:

$|\frac{dT}{ds}| = \frac{|\frac{dT}{dt}|}{|\frac{d\vec{s}}{dt}|}$

