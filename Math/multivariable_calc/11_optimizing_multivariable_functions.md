# Optimizing Multi-variable Functions

### How it works
Basically imagine you have a tangent plane, a flat one, that hits one of your minima or maxima. You know that you're at an extrema, when all your partial derivatives equal 0. In other words, when $\nabla f = 0$. Then you'd need to analyze stuff with the second-derivatives to know if you're at a local extrema, global extrema or even a "saddle point".

#### Finding crit. points 

##### Example 1
$f(x,y)=x^{2}-3xy-1$

$\frac{\delta f}{\delta x} = 2x-3y, \frac{\delta f}{\delta y} = -3x$

1. $-3x=0, x = 0$. You can set this partial derivative to zero, and quickly see that $x=0$. We can assume that there are no other x values for x points.
2. $2x-3y=0 \rightarrow 2(0)-3y=0 \rightarrow y=0$. We only need to solve for $y$ coordinates now.
3. The only critical point is $(x,y)=(0,0)$.

Of course next you would need to classify it.


#### Example 2
$f(x,y,z) = xz^{2}+e^{x}-yz$

$\frac{\delta f}{\delta x}=z^{2}+e^{x}, \frac{\delta f}{\delta y}=-z, \frac{\delta f}{\delta z}=2xz-y$

1. $\frac{\delta f}{\delta y}=0, z = 0$; You can easily pick off the z-coordinate. 
2. $\frac{\delta f}{\delta x} = 0, (0)^{2}+e^{x}=0$; So you plug in $z=0$ into our partial derivative, and you realize that there are no real solutions for $x$. 
3. Basically the x-component of the gradient will always be greater than zero, so the gradient will never zero equal.

#### Example 3

$f(x,y,z)=sin(z+x)-x^{2}-y^{2}$

$\frac{\delta f}{\delta x}=cos(z+x)-2x, \frac{\delta f}{\delta y}=-2y, \frac{\delta f}{\delta z}=cos(z+x)$

1. $\frac{\delta f}{\delta y} = 0, y=0$; easily picked off.
2. $cos(z+x) = 0, z+x = \frac{\pi}{2} + n\pi, n \in \mathbb{Z}$
3. $cos(z+x)-2x = 0, 0-2x=0, x=0$; We substituted $z+x=\frac{\pi}{2}+n\pi$ into our equation. At this point we know $x=0,y=0$, and the only unknown is $z$. 
4. $z+x=\frac{\pi}{2}+n\pi, z+0=\frac{\pi}{2}+n\pi, z = \frac{\pi}{2}+n\pi$.
5. Our critical points are $(0,0,\frac{\pi}{2}+n\pi)$, where $n \in \mathbb{Z}$.

#### Example 4
$f(x,y) = x^{2}-x+y^{3}-xy$

$\frac{\delta f}{\delta x} = 2x-1-y, \frac{\delta f}{\delta y} = 3y^{2}-x$

1. $\frac{\delta f}{\delta x} \rightarrow y=2x-1$; solve for y, we're planning to create an expression in terms of x. You already noticed there aren't any easy solves, so we plan to utilize the quadratic formula.
2. $12x^{2}-13x+3=0, x=\frac{3}{4}=\frac{1}{3}$; Plug your $y=2x-1$ into $\frac{\delta f}{\delta y}$. 
3. Find $y$ for each $x$, by plugging in $x$ into $y=2x-1$. You get $(\frac{3}{4}, \frac{1}{2})$ and $(\frac{1}{3}, -\frac{1}{3})$ as critical points.


### Saddle points introduction
At a saddle-point, it's neither a local minimum nor maximum, but the gradient is still zero. If you cut the graph up in different ways it can look like a local minimum, and in another it looks like a local minimum.

### Second Partial Derivative Test

#### Reminder of single variable calculus
Here we'd set the derivative to 0 and find the critical points. Then we need to classify whether they're a maximum or minimum. 

You'd use the second derivative, which is the concavity of the function. If the concavity is negative, then it's a local maximum, since you can reason it was going up and now it's going to go down. If the concavity is positive, you can reason it's a minimum as it was going down and now it's going back up.

#### Back to multi variable calculus
Take the second derivative of your partial derivatives. Then you can analyze the concavity from the perspectives of each variable.

Let $f(x,y) = x^{2}+y^{2}+pxy$. 

1. Find critical points (using first derivative): $(0,0)$.
2. Classify them (use second derivatives): However even if we use the second derivatives, we still need to take into account hte mixed derivatives to be fully sure of whether something is a minimum or maximum. Look at $p$, as we adjust p, there's a certain point where it stops being a minimum and turns into a saddle point.

#### Second Partial Derivative Test
First have a point where $\nabla f(x_{0},y_{0})=0$. Then calculate:

$H=f_{xx}(x_{0},y_{0})f_{yy}(x_{0},y_{0})-f_{xy}(x_{0},y_{0})^{2}$

Then there are these cases: 
  1. $H>0$, $(x_{0},y_{0})$ either maxima or minima.
  2. $H<0$, $(x_{0},y_{0})$ is a saddle-point.
  3. $H=0$, $(x_{0},y_{0})$ is unknown.

You'd then use this to calculate and analyze $p$. At the cross over point.




### Finding Maxima
Let's find the input values e.g. $(x,y)$, that give us the maximum $f(x,y)$ value. 



### Finding Minima