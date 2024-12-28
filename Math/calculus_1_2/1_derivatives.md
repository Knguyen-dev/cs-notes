# Differentiation

## Definition of the Derivative
The derivative of a function $f(x)$ at a point $x = a$ is defined as:

$f'(x) = lim_{h \rightarrow 0}\frac{f(x+h) - f(x)}{h}$

Alternatively, the derivative measures the rate of change of $f(x)$ with respect to x, or the slope 
of the tangent line to the curve $y=f(x)$ at a point. In english, let $f(x)$ be the position of a traveling car.
The derivative $f'(x)$ would be the rate at which the position changes, the velocity function. The derivative 
is just the rate of change of something.


## Rules of Differentiation

### Power Rule
For $f(x)=x^{n}$, the derivative is $f'(x) = n*x^{n-1}$. Note that n is a real number.

### Product Rule
$\frac{d}{dx}(uv) = uv'+vu'$

### Quotient Rule
$\frac{d}{dx}(\frac{u}{v}) = \frac{vu'-uv'}{v^{2}}$

### Chain Rule
$\frac{d}{dx}(f(u)) = f'(u)\frac{du}{dx}$

**Example:** If $f(x)=sin(x^{2})$, then $f'(x)=cos(x^{2})(2x)$. 
The outer part and that 'inner piece' is how I remember it.

## Implicit Differentiation
What we've been doing so far is 'explicit' differentiation. This is when we're deriving a function
where the x and y variables are on opposite sides (e.g. $y=x^{2}+2$). However we're 
also able to differentiate equations where the x and y variables are on the same side (e.g. $x^2+3y=2$)
using implicit differentiation.

1. Differentiate: $x^2 + y^{2}=1$
2. $2x + 2y\frac{dy}{dx} = 0$; differentiate both sides in respect to x.
3. $\frac{dy}{dx}=-\frac{x}{y}$; solve for $\frac{dy}{dx}$.

## Applications of Derivatives

### Tangent and Normal Lines
- **Tangent Line**: The equation is $y-y_{1} = f'(x_{1})(x-x_{1})$.
- **Normal Line**: Perpendicular to the tangent, slope $=-\frac{1}{f'(x_{1})}$.

**Example**: For $f(x)=x^{2}$ and $x=1$, calculate the line tangent to $f(x=1)$ and the line 
that's perpendicular to that particular tangent line.
You know that $f'(x)=2x, f'(1)=2$. 
- Tangent line: $y-1=2(x-1)$
- Normal line: $y-1= -\frac{1}{2}(x-1)$, or $y=-\frac{1}{2}x+\frac{3}{2}$


## Optimization Problems

### First Derivative Test
The first derivative test determines whether a critical point $c$ of a function $f(x)$ is a local maximum, minimum, or neither:
- If $f'(x)$ changes from positive to negative at $c$, $f(c)$ is a local maximum.
- If  $f'(x)$ changes from negative to positive at \( c \), \( f(c) \) is a local minimum.
- If $f'(x)$ does not change sign at $c$, $f(c)$ is neither a maximum nor a minimum.

NOTE: A maximum is a peak, a minimum is a trough.

---

### Second Derivative Test
The second derivative test analyzes the concavity of a function at a critical point $c$ to classify it:
- If $f''(c) > 0$, the graph of $f(x)$ is concave up at $c$, and $f(c)$ is a local minimum.
- If $f''(c) < 0$, the graph of $f(x)$ is concave down at $c$, and $f(c)$ is a local maximum.
- If $f''(c) = 0$, the test is inconclusive. Check using other methods (e.g., the first derivative test). 

NOTE: Concavity just determines whether the $f'(x)$ is increasing or decreasing, which was probably already obvious.

---
### Procedure for optimization
1. Identify the function to maximize or minimize.
2. Find its derivative and set $f'(x) = 0$ to locate critical points. If we're able to know the critical points, we can easily map out when the function is either increasing or decreasing. Using this we can see the peaks and troughs of $f(x)$.
3. Use the second derivative test or analyze intervals to determine the nature of each critical point.

**Example 1: Basic Optimization** Find the dimensions and area of the largest rectangle that can be inscribed in $f(x) =12-x^{2}$
1. $A = bh$. Let $b=2x$, which includes the positive and negative side. Then let $h=(12-x^{2})$. This is our area function.
2. Now we need to find the maximum area. Do $\frac{d}{dx}(bh)$, and find critical point. 
3. As a result, x at the critical point should be a maximum, and you'd get the dimensions and area for the maximum rectangle.

**Example 2: Forest Problem**
A forest ranger is in the woods 2 miles from a straight road. His truck is parked another 10 miles right, down the road. He can walk 3 mph in the woods and 4mph on the road. Which direction should he walk to minimize walking time back to the truck? What's the minimum time? How far did he walk?

- Setup: Setup a right triangle with the length of the adjacent as 2 and length of the opposite side as $x-10$. The hypotenuse connects the ranger to his truck. 
1. Draw a new line $a=\sqrt{x^{2}+4}$. Depending on how far down the road the ranger walks, we now a distance function to said straight road, and a distance function from that arrival point to the truck.
2. Now we need to solve for time, so consider the two speeds he can walk. $T(x)= \frac{\sqrt{x^{2}+4}}{3} + \frac{x-10}{4}$. Alright, so depending on how far down the road they aim to travel from the woods, we have a function that calculates the amount of time it takes for them. 
3. To find the minimum time it takes, we just need to differentiate the function, and then find the critical point associated with a local minimum. We get a couple of critical points, $x=0,2.268,10$, but we see that $x=2.268$ yields the smallest time value.
4. So to minimize the time towards the truck, walk towards a point 2.268 miles down the road. The minimum time is about 2.941 hours, and the distance you'll walk is about 10.756 hours

## Related Rates

### What are related rates?
Related rate problems involve finding the rate of change of one quantity in relation to another quantity. So the two quantities are related by an equation. In english, how does one rate change, when this other rate changes. **Here's how you solve them:**
1. You need to identify the given info, so first determine relevant variables.
2. Write an equation to relates the variables. You'd use geometric formulas, physical principles, or any relationships provided in the problem. One of the harder parts.
3. Differentiate both sides with respect to time $t$. This uses implicit differentiation, so remember chain rule.
4. Then you're probably going to substitute given values to solve for the unknown rate.

#### Example 1: Ballon Rising
A hot air balloon is rising straight up at a constant rate of 5ft/sec. A man is standing 40 ft away from the point on the ground directly below the balloon. How fast is the distance between the man and the balloon increasing when the ballon is 30ft above the ground?

1. **Given:**
  - $\frac{dy}{dt}=5$ft/sec.
  - Man is standing 40ft away from the point on the ground directly below the balloon. This is an x value.
  - Target height is 30ft, and we're solving for $\frac{dz}{dt}$.
  - You can easily visualize the triangle that's formed by this problem.
2. Equation: $x^{2}+y^{2}=z^{2}$
3. Differentiate with respect to time: $2x\frac{dx}{dt}+2y\frac{dy}{dt}=2z\frac{dz}{dt}$. We can say that $\frac{dx}{dt} =0$ since the horizontal distance is never changing.
4. So $z\frac{dz}{dt} = y\frac{dy}{dt}$. Then solve for $\frac{dz}{dt}=\frac{y}{z}\frac{dy}{dt}$. We just need $z$ when $y=30$, which is just $z=50$. We found this out by using our original equation.
5. *Substitute known values:* $\frac{dz}{dt}=3$ft/sec. So when the balloon is 30 ft high, the distance between the man and ballon is increasing at 3ft/sec.


