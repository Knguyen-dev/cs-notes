# Equation of a line 

### Premise: In 2D to 3D 
To represent a line in 2D space, we create a point in space, and an orientation for a particular line that goes through that point. This is done through point-slope form. However let's generate this to higher dimensions.

Let's say we have some line $\mathbb{l}$ in $R^{3}$, and we want to find an equation for this line. Imagine this:
- $P_{0}(x_{0},y_{0},z_{0})$: A point in $\mathbb{R}^{3}$ that $l$ goes through.
- $\vec{r}_{0}$: Vector that begins at the origin, and its tip is at $P_{0}$, a position vector.
- $\vec{v}$: Some non-zero vector that lies along $\mathbb{l}$.

The idea is that we hope that knowing $\vec{v}$, acting as our slope/orientation in $R^{3}$, and this point $P_{0}$, we should be able to describe all of the points on this line. Think of a different thing now :
- $P(x,y,z)$: Some other point that lies along line $\mathbb{l}$
- $\vec{r}$: A position vector for $P(x,y,z)$.

We can reason that right now $r_{0} + \vec{v}$ does not reach our point $P(x,y,z)$. However if we do $t\vec{v}$, where $t \in \mathbb{\mathbb{R}}$, the resultant of our 3 vectors together will reach point P.

### Vector Equation of Line in three dimensions
$\vec{r} = \vec{r}_{0} + t\vec{v}$
- $\vec{r}$: The position vector of the point. It's the resultant vector of $r_{0}$ and $t\vec{v}$, allowing us to point to any point on a line.
- $r_{0}$: A position vector that points to $p_{0}$, a point that the line we want to model strikes through.
- $t\vec{v}$: So $\vec{v}$ is just a vector that lies on line $l$. Then together with that scalar, we know the exact orientation of this vector. Just like in $\mathbb{R}$, this is the line that intercepts our point.

By doing this equation, we calculate the position vector of a point on that line. We can then use these position vectors, draw the positions of their tips, and visualize the line $l$ that's being modeled. So by starting at $P_{0}$, we've used $r_{0}$. Now we just add $t\vec{v}$ in order to reach our target point. We've materialized a resultant bectors of the given vector $r_{0}$ and the scaled up vector $t\vec{v}$, we make it to our destination point that lies on the line.


### Upgrading: Equation of a plane
How do we model a plane? We get a point $P_{0}$ that the plane intersects, and we have a normal vector $\vec{n}$. This is a vector that's perpendicular to the surface of the plane and points away from it. If you change the orientation of the plane, the position of that normal vector will change as well. This normal vector is orthogonal with any vector that lies in the plane, so their dot product is 0. Okay let's say out the info:


- $\vec{n}:$ Vector that's normal to the plane.
- $P_{0}(x_{0},y_{0},z_{0})$: A known point lying on the plane. 
- $P(x,y,z)$: Some other point on the plane.
- $\vec{P_{0}P}$ Displacement vector from points $P_{0}$ to $P$. This vector lies on the plane.

Then the equation of the plane is denoted by $\vec{n} \cdot \vec{P_{0}P}=0$. 


## Practice problems

### Example 1:
Find the equation of a plane that passes through point $P_{0}(1,2,3)$ and has a normal vector $\vec{n}=<4,5,6>$.

1. Calculate displacement vector: $\vec{P_{0}P} = \vec{P} - \vec{P_{0}} = <x-1, y-2, z-3>$
2. Do dot product: $\vec{n} \cdot \vec{P_{0}P} = (4x-4) + (5y-10) + (6z-18) = 0$. This is the equation in its **component** form.
3. 4x+5y+6z = 32


## Credits
- [The Vector Equation of Lines](https://youtu.be/iOeGgZIfryg?si=HYG0436GKrzdTz5s)
- [Equations of Planes: Vector & Component Forms](https://www.youtube.com/watch?v=HjJ140TYbXQ)