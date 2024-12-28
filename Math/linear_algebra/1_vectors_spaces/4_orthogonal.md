
## Orthogonal Vectors

### Def. (Length/norm of a vector)
The length (or norm) of $\vec{v} \in \mathbb{R^n}$ is denoted as $|v| = \sqrt{v*v} = \sqrt{c_{}^{2} + ... + v_{n}^{2}}$

---
### Def. (Distance between 2 vectors)
Let vectors $u,v \in \mathbb{R^n}$. The distance between u and v is just the length of the vector $u-v$. So $dist(u,v) = |u-v|$.

---
### Def. (Orthogonal vectors)
Two vectors u and v are orthogonal if their dot product is zero: $u * v =0$.

Geometrically, this means that the vectors are at a 90 degree angle to each other in the vector space.

---
### Def. (Orthogonal complement)
Let V be some subspace of $\mathbb{R^n}$. Then the orthogonal complement of V is denoted as $V^{\perp} = \{ \vec{x} \in \mathbb{R^n} | \vec{x} * \vec{v} = 0, \forall \vec{v} \in V\}$.

So if a vector x is orthogonal to every vector in V, then it is orthogonal to V, and so $x \in V^{\perp}$.

--- 
### Theorem. (Orthogonality with row and column spaces)
Let $A_{m \times n}$. Then two things are true:
1. $(Row(A))^{\perp} = Nul(A)$
2. $(Col(A))^{\perp} = Nul(A^{T})$

- Understanding first statement: If $Ax = 0$, then by matrix-vector multiplication, we did the dot product will every row on x, and we got zero. So if $x \in Nul(A)$, then it's orthogonal to every row vector. So $Nul(A)$ is just the set of all vectors that are orthogonal to the row vectors.
- Understanding the second statement: Note that the rows of A are the columns of $A^{T}$. So if you're in the null space of this, it means the $A^{T}x = 0$. So the rows of $A^{T}$, the original columns of A, doing the dot product on each one with vector x is 0. So the vector is orthogonal to the original columns of A.

---
### Def. (Orthogonal Set)
A set of vectors $\{ v_{1},...,v_{k}\} \subset \mathbb{R}^{n}$ is orthogonal if each pair of distinct vectors is orthogonal. That is, if $u_{i} * u_{j} = 0$ when $i \neq j$.

In english, assuming it's an orthogonal set, given any vector in the set, it is orthogonal to all others in the set.


---
#### Theorem. (Orthogonal Set and Linear Independence)
If $S= \{ v_{1},...,v_{k}\} \subset \mathbb{R}^{n}$ is an orthogonal set of nonzero vectors, then S is a linearly independent set of vectors. 

Since linearly independent, S is also a basis for the subspace spanned by S.

#### Def. (Orthogonal basis)
A basis but it's also an orthogonal set.

#### Theorem. (Orthogonal Basis)
Let $\{ u_{1},...,u_{k} }\$ be an orthogonal basis for subspace W of $\mathbb{R}^{n}$. 
  1. $y = c_{1}u_{1}+...+c_{n}u_{n}$.
  2. $c_{i}=\frac{y*u_{i}}{u_{i} * u_{i}}$
Basically we're able to find the weights for a given linear combination with this mathematical formula.


---
### Def. (Orthogonal Projections)
Let $u \in \mathbb{R}^{n}$. We can decompose $y \in \mathbb{R}^{n}$ to the sum of two vectors:
1. Parallel to u: $\hat{y}=\alpha u$, where $\alpha = \frac{y*u}{u*u}$
2. Orthogonal to u: $z=y-\hat{y}$.

Then $\hat{y}=proj_{u}y=\frac{y*u}{u*u}u$. 

You can also let $L=Span(u)$. You get the same answer with $\hat{y}=proj_{L}y=\frac{y*u}{u*u}u$
So z is orthogonal to u IFF $\alpha = \frac{y*u}{u*u}$ and $\hat{y}=\frac{y*u}{u*u}u$.

---
#### Intuition
1. $\hat{y}$ is the shadow or component of y that's aligned with the direction of u ($L=Span(u)$). It's called the 'orthogonal projection of y onto L', but it refers to the vector in the same direction as L that is closest to y.
2. $z$ is the part of $y$ that's orthogonal to $u$.
3. Scaling u doesn't change $proj_{u}y$.

In english, let's say you have u and v. You can find the components of u that are aligned or perpendicular to vector v, and vice versa. I mean in Physics, you had to know the angle and do trig. Now we just need the coordinates for things to work.

---
### Def. (Orthonormal Set)
A set $S=\{ u_{1}, ..., u_{p}\}$ is an orthonormal set, if it's an orthogonal set of unit vectors.

---
#### Def. (Orthonormal Basis)
If $W = Span(S)$, then S is an orthonormal basis for W. Remember that it meets the linearly independence condition since it's a set of orthogonal non zero vectors.

---
### Theorem. (Orthogonal Decomposition)  
Let $W$ be a subspace of $\mathbb{R}^{n}$. $\forall y \in \mathbb{R}^{n}$, we can decompose it as $y=\hat{y}+z$, where:
  - $\hat{y} \in W$ is the 'orthogonal projection of y onto w'. Again the vector in the same direction as W, but closest to y.
  - $z \in W^{\perp}$.

If $\{ u_{1},...,u_{p} \}$ is an orthogonal basis for W, then: 
$\hat{y} = \frac{y*u_{1}}{u_{1}^{2}} + ... + \frac{y*u_{p}}{u_{p}^{2}}$

and $z=y-\hat{y} \in W^{\perp}$.

#### Understanding This:
Since $\hat{y} \in W$, and $W$ has a orthogonal basis, any vector in $W$ can be written as a linear combination of the basis vectors. So $\hat{y} = c_1u_{1} +...+c_{p}u_{p}$, where $c_{i} = \frac{y*u}{u_{i}^{2}}$

---
### Theorem. (Least Squares Approximation) 
Let's say there's no solution to $Ax=b$. So there's no $x$ or set of weights that let us scale the basis vectors to reach $b$. Instead, let's find a $\vec{x^{*}}$ where $\vec{v}=A\vec{x}$ is as close to $\vec{b}$ as possible. This minimizes $|\vec{b}-\vec{v}| = (b_{1}-v_{1})^{2} + ... + (b_{n}-v_{n})^{2}$, hence the name least squares approximation.

Well to minimize $|b-v|$, you just need to find $v=proj_{Col(A)}b$. Essentially you'd just need to calculate $A^{T}A\vec{x}^{*}=A^{T}\vec{b}$.

