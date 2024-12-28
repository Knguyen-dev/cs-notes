# Parametric Equations and Polar Coordinate

### Pre-requisites
You don't really need any pre-requisites except for maybe Pre-Calculus/Algebra 2. 

## Defining and diff. parametric eq.

### What is a parametric equation?
A parametric equation represents the set of equations where the functions are expressed in terms of one or more independent 'parameters'. In english, instead describing a relationship between x and y directly (e.g. y=f(x) or x=f(y)), we can define the functions in terms of a third variable. This is typically denoted as t.

#### Car example/introduction
We have a 50m high cliff and a car is driving 5m/s. At t=0, the car is at x=10 (edge of cliff).

- X-Pos function: $x(t) = +v_{0}+s_{0}=5t+10$
- Y-Pos function: $y(t)=y_{0}+v_{0}t+\frac{1}{2}at^{2}=50-5t^{2}$
1. t=0, x=10, y=50
2. t=1, x=15, y=45
3. t=2, x=20, y=30
4. t=3, x=25, y=5
This is a parametric equation, as the x and y position functions are written in terms of time t. It's pretty useful and a lot less complex than trying the functions in terms of each other. This is a perfect example where we can input the time and see the curve created by the parametric equations.  This can be scaled up too, as sometimes we have to describe the motion of something in 3d space, and having to just input time t for a point's coordinates is pretty easy.

### Parametric eq. diff.
Let $x(t)=2sin(1+3t)$ and $y(t)=2t^{3}$ be our parametric equations. We need to find $\frac{dy}{dx}$ when $t=-\frac{1}{3}$. The key is knowing that $\frac{dy}{dx}=\frac{\frac{dy}{dt}}{\frac{dx}{dt}}$.
1. $\frac{dx}{dt}=6cos(1+3t)$
2. $\frac{dy}{dt}=6t^{2}$
3. $\frac{dy}{dx}=\frac{\frac{dy}{dt}}{\frac{dx}{dt}}= \frac{6t^{2}}{6cos(1+3t)} = \frac{t^{2}}{cos(1+3t)}$.
4. At $t=-\frac{1}{3}, \frac{dy}{dx}=\frac{1}{9}$. So at that t value, the slope of the graph is $\frac{1}{9}$.

### Second derivative of parametric functions
Let $x(t)=3e^{2t}$ and $y(t)=e^{3t}-1$. Find $\frac{d^{2}y}{dx^{2}}$.
1. $\frac{dx}{dt} = 3e^{2t} \cdot 2$
2. $\frac{dy}{dt} = 3e^{3t}$
3. $\frac{dy}{dx} = \frac{\frac{d}{dt}[y]}{dx} = \frac{1}{2}e^{t}$
4. $\frac{d^{2}y}{dx^{2}} = \frac{\frac{d}{dt}[\frac{dy}{dx}]}{\frac{dx}{dt}} = \frac{1}{12e^{t}}$

## Finding arc lengths of curves given by parametric eq.

### Theory and steps
Let $x(t)$ and $y(t)$ be the position functions. From $t=a$ to $t=b$, it's going to trace some kind of some arc. How do we find the length of this arc?

Well we can reason some things:
  1. $dy = \frac{dy}{dt} \cdot dt=y'(t)dt$
  2. $dx=\frac{dx}{dt} \cdot dt=x'(t)dt$
  3. We've calculated the sides of the right triangle formed that the infinitesimal line that aligns with the arc. Then the infinitesimally small change in arc length the hypotenuse: $\sqrt{(x'(t)dt)^{2}+(y'(t)dt)^{2}} = \sqrt{(x'(t))^{2}+(y'(t))^{2}}dt$.

Finally Then we need to add up all of these infinitesimally small arc lengths, and we use integration to do that: $\int_{t=a}^{t=b}{\sqrt{x'(t)^{2}+y'(t)^{2}}dt}$.

#### Example: Calculating parametric arc length
Let $x(t)=cos(t)$ and $y(t)=sin(t)$. Then find length of curve from $t=0$ to $t=\frac{\pi}{2}$

1. $\frac{dx}{dt}=-sin(t)$ 
2. $\frac{dy}{dt}=cos(t)$
3. Arc length = $\int_{a}^{b}{\sqrt{(\frac{dx}{dt})^{2}+(\frac{dy}{dt})^{2}}}dt$
4. $\int_{0}^{\frac{\pi}{2}}{\sqrt{(-sin(t))^{2}+(cos(t))^{2}}dt = \frac{\pi}{2}}$

## Defining and diff. vector-valued functions

### Vector Value Functions
1. Scalar-valued function: $x = x(t)$ and $y = y(t)$, so here we have some parametric functions in terms of t.
2. Vector-valued function: $\vec{r}(t)=x(t)\hat{i}+y(t)\hat{j}$. This yields a position vector that will point in the direction of where/how the graph is shaped. So if you keep graphing these position vectors, you should be able to see the shape of the original graph. 

### Derivative of a vector value function
Essentially we're going to get a vector that's tangential to the curve. So the derivative's direction is going to be dependent on the curve. This isn't new. 

#### Example 1
Let $f(t)=(ln(4t), 3log_{2}(t))$. Then find the $f'(t)$:
1. Differentiate x-pos function: $\frac{1}{t}$
2. Differentiate y-pos function: $\frac{3}{tln(2)}$
3. Then $f'(x)=(\frac{1}{t},\frac{3}{tln(2)})$

## Solving motion problems

#### Example 1: XY Particle Motion
Let $\vec{h}(t) = (-t^{5}-6,4t^{4}+2t+1) = (-t^{5}-6)\hat{i}+(4t^{4}+2t+1)\hat{j}$ define the motion of a particle on the xy-plane at any time $t \geq 0$.

1. Do $h'(t) = \vec{v}(t) = (-5t^{4},16t^{3}+2)$, which calculates the velocity of the particle.
2. Then do $h''(t) = \vec{a}(t) = (-20t^{3},48t^{2})$. This function can be used to calculate the acceleration of the components at a given time.

#### Example 2: Motion along a curve
A particle moves along the curve $x^{2}y^{2}=16$ S.T. the x-coordinate is changing at a constant rate of -2 units per minute. Find the rate of change of the particle's y coordinate when the particle is at point (1,4).

- X-Position: $\frac{dx}{dt}=-2$
1. $\frac{d}{dt}[x^{2}y^{2} = 16]$, is $2x\frac{dx}{dt}y^{2} +x^{2}2y\frac{dy}{dt}$
2. Then plug in the derivative at point (1,4), leverage given info of $\frac{dx}{dt}=-2$.
3. $\frac{dy}{dt}=8$ units per minute. 

#### Example 3: Finding velocity magnitude
A particle moves along the curve $xy=16$, and the y-coordinate is increasing at a constant rate of 2 units per minute. Find the magnitude of the velocity vector when particle is at (4,4).

1. $\vec{v}(t) = (\frac{dx}{dt},\frac{dy}{dt})$. 
2. Do derivative of curve: $\frac{dx}{dt}y + \frac{dy}{dt}x = 0$
3. Solve for $\frac{dx}{dt}=-2$
4. Then do $|\vec{v}(t)| = \sqrt{(\frac{dx}{dt})^{2}+(\frac{dy}{dt})^{2}} = \sqrt{8}$ units per minute.

#### Example 4: Calculating displacement
A particle moving in the xy-plane has velocity vector $v(t)=(\frac{1}{t+7}, t^{4})$ for $t \geq 0$. At $t=1$, the particle is at point (3,4). Calculate the displacement of the particle between $t=1$ and $t=3$. Also calculate the particle's position at $t=3$.

1. Well to calculate the magnitude of displacement you just need to do $displacement = \sqrt{(\delta{x})^{2}+(\delta{y})^{2}}$. This is because with the x and y components of change, we can calculate the hypotenuse/resultant change. So integrate the x and y velocities from 1 to 3. 
  - $\delta{x}=\int_{1}^{3}{\frac{1}{t+7}dt} = ln(1.25) = 0.22$
  - $\delta{y}=\int_{1}^{3}{t^{4}dt} = 48.4$
  - displacement: Approx. 48.4
2. Particle's position is just the initial point (1,3) with our change in x and y added. So (3+0.22,3+48.4) = (3.22, 52.4) is the position at $t=3$.




## Defining polar coordinates

### Learning Polar Coordinates
In polar coordinates, a point on a graph is defined by two values: a magnitude ($r$) and an angle ($\theta$). The magnitude $r$ represents the distance from the origin (pole) and $\theta$ is the angle between the positive $x$-axis (polar axis) and the line connecting the origin to the point. More simply, given a point on a graph, we can reach it with a vector of magnitude $r$ (from the origin), and an angle $\theta$ from the x-axis.

Unlike the rectangular coordinate system, which uses (x,y) to describe positions, polar coordinates uses magnitudes and directions. By varying $\theta$ and $r$, we can sketch out curves and patterns, such as spirals, or roses, which are naturally expressed in this system.

### Derivatives of polar functions 
Let $r(\theta)=sin(2\theta)$. Then $r'(\theta) = 2cos(2\theta)$. Now let's see a more rectangular version of this:
  - $x = rcos(\theta) = sin(2\theta)cos(\theta)$
  - $y = rsin(\theta) = sin(2\theta)sin(\theta)$. Just getting the x and y components of r, so visualize r as the hypotenuse of a right triangle. Then we're getting rid of r.

The derivatives are:
  - $x'(\theta)=2cos(2\theta)cos(\theta)-sin(2\theta)sin(\theta)$
  - $y'(\theta) = 2cos(2\theta)sin(\theta)+sin(2\theta)cos(\theta)$

Then $x'(\frac{\pi}{4}) = \frac{\sqrt{2}}{2}$ and $y'(\frac{\pi}{4})=\frac{-\sqrt{2}}{2}$. This makes sense since if we increase $\theta$ our y-coordinate continues to increase. But the x coordinate will continue to be negative. The slope of the tangent line can then be calculated as $\frac{dy}{dx}=\frac{\frac{dy}{d\theta}}{\frac{dx}{d\theta}} = -1$
