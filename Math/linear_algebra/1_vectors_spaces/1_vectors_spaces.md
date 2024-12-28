# Vectors and spans


## Vectors and operations
### Introducing $\mathbb{R^n}$
If something is6 in $\mathbb{R^1}$, there's only one dimension. If something is in $\mathbb{R^2}$, then it has 2 components. It's a vector $\vec{x} \in \mathbb{R^2}$. If it's in $\mathbb{R^3}$, then our vector is in 3d space.

$\mathbb{R^n}$ is a vector space with $n$ dimensions. A vector $\vec{x} \in \mathbb{R^n}$ would be in form $\vec{x}= \begin{bmatrix}\alpha_{1} \\ \alpha_{2} \\ ... \\ \alpha_{n}\end{bmatrix}$. 

---
### Vector addition
Given two vectors u and v in n-dimensional space, addition is performed by summing their respective components:

$\vec{u}+\vec{v} = \begin{bmatrix}u_{1} \\ u_{2} \\ ... \\ u_{n}\end{bmatrix} + \begin{bmatrix}v_{1} \\ v_{2} \\ ... \\ v_{n}\end{bmatrix} = \begin{bmatrix}u_{1} + v_{1} \\ u_{2} + v_{2} \\ ... \\ u_{n} + v_{n}\end{bmatrix}$

#### Properties of vector addition:
Let $u,v,w \in \mathbb{R^n}$ and $\vec{0}$ be the zero vector.
1. Commutative: $u+v=v+u$
2. Associative: $(u+v) + w = u (v+w)$, 
3. Additive identity: $u+0=u$
4. Additive inverse: $u + (-u) = 0$

---
### Scalar Multiplication
Given $\vec{u} \in \mathbb{R^n}$ and $c \in \mathbb{R}$. Then scalar multiplication just multiplies the scalar by each individual vector component:

$c\vec{u} = \begin{bmatrix}cu_{1} \\ cu_{2} \\ ... \\ cu_{n}\end{bmatrix}$

#### Properties of scalar multiplication
Let $c,d \in \mathbb{R}$ and $u,v \in \mathbb{R^n}$. Then:
1. Distributive: $c(u+v)=cu+cv$ and $(c+d)u = cu+du$
2. Associative: $c(du) = (cd)u$
3. Multiplicative Identity: $1*u=u$
4. Zero Scalar: $0*u=0$

---
### Dot (Scalar) Product
The scalar product is just the multiplication of respective components, and summing the individual products up. 

$u*v=u_{1}+v_{1} + ... + u_{n} + v_{n}$ 

It can also be represented as $u*v=|u||v|cos \theta$. Where $|u|, |v|$ the magnitudes of the vectors, and $\theta$ is the angle between the vectors. In physics we used it to find the component of force in the direction of displacement. That's correct, as we're just calculating how much one vector projects onto another.

NOTE: This is also known as the inner product as it's equivalent to $u^{T}v$

### Cross Product
The cross product of two vectors u and v in 3D space results in a vector orthogonal (perpendicular) both u and v. 

First do, $\vec{u} \times \vec{v} = \begin{vmatrix}i & j & k \\ u_{1} & u_{2} & u_{3} \\ v_{1} & v_{2} & v_{3}\end{vmatrix}$.

Then do $\vec{u} \times \vec{v} = i*det(\begin{bmatrix}u_{2} & u_{3} \\ v_{2} & v_{3}\end{bmatrix}) - j*det(\begin{bmatrix}u_{1} & u_{3} \\ v_{1} & v_{3}\end{bmatrix}) + k*det(\begin{bmatrix}u_{1} & u_{2} \\ v_{1} & v_{2}\end{bmatrix})$. 

This is equivalent to $\vec{u} \times \vec{v} = \begin{bmatrix}u_{2}v_{3} - u_{3}v_{2} \\ u_{3}v_{1} - u_{1}v_{3} \\ u_{1}v_{2} - u_{2}v_{1}\end{bmatrix}$

There's also this formula: $u \times v = |a||b|sin(\theta)n$. 

Here i, j, and k are the unit vectors along the x-,y-, and z-axes respectively. So $\vec{x} = \begin{bmatrix}3 \\ 1 \\ 2 \end{bmatrix}$, would indicate 3i, 1j, and 2k.

### Def. (Unit Vector)
A unit vector is a vector with magnitude of 1. So a vector v is a unit vector IFF $|v|=1$.

To convert any vector v to a unit vector (known as normalizing the vector), you'd divide it by its own magnitude. This is denoted has $\hat{v} = \frac{v}{|v|}$

## Lines
--- 
### Def. (Line)
Let $\vec{u} \in \mathbb{R^n}$, and $\vec{u} \neq 0$. A line can be defined as $L_{\vec{u}} = {c\mathbb{u} | c \in \mathbb{R}}$. So a line can be seen as a set of vectors, and each vector can be treated as a point. The line $L_{\vec{u}}$ the set of all multiples of $\vec{u}$.

---
### Def. (Linear Combination)
A linear combination of vectors is an expression formed by multiplying vectors by scalars and then adding them together. This results in another vector. We do this because we wonder, "Hey we have some vectors. If we scale them and add them, can we use their resultant vector to represent other vectors in our dimension?". 

Given vectors $v_{1}, v_{2}, ..., v_{n}$, a linear combination of these vectors is a vector of the form:

$\vec{b} = c_{1}v_{1} + c_{2}v_{2} + ... + c_{n}v_{n}$. Where $c_{1}, ..., c_{n} \in \mathbb{R}$.

This can also be represented by setting up a matrix equation: $A\vec{x}=\vec{b}$. Where A is the coefficient coefficient matrix, a matrix whose columns represent the vectors making up the linear combination. Then $\vec{x} = \begin{bmatrix}\alpha_{1} \\ \alpha_{2} \\ ... \\ \alpha_{n}\end{bmatrix}$, where the components of $\vec{x}$ are the scalars in the linear combination. Then b, the augmented part of the matrix, is the resulting vector. Then you'd row reduce, solving for $\vec{x}$.

---
### Def. (Span)
Given $v_{1}, v_{2}, ..., v_{n}$, the span of these vectors is the set of all their linear combinations. 

${c_{1}v_{1} + c_{2}v_{2} + ... + c_{n}v_{n} | c_{1},c_{2},...,c_{n} \in \mathbb{R}}$

---
### Def. (Linear Independence)
A set of vectors $\{v_1,...,v_k\}$ in a vector space are linearly independent if the only solution to the equation:

$c_{1}v_{1} + ... c_{k}v_{k} = 0$, is $\vec{c} = 0$. If there exists any non-trivial solution (any solution S.T. $\vec{c} \neq 0$), then the vectors are linearly dependent.

This just means that you can't represent a given vector using a linear combination of the vectors.

So each of the vectors represents a new direction in the span, and aren't redundant. Mechanically, to solve whether a set of vectors is linearly independent, do $A\vec{x}=0$, where $A$'s column vectors are the vectors in your set. Then you need to row reduce and if you get $x_{1} = ... = x_{k} = 0$ is the only solution, then it's linearly independent.

---
### Theorem. (Spanning Set) 
Let $S = \{v_{1}, ... , v_{k}\}$ be a set in vector space $V$. Let $H = Span(S)$.
If one of the vectors in S can be expressed as a linear combination of the other vectors in S, 
then we can remove that vector from the spanning set, and still span H.

## Vector space, subspace and basis

### Def. (Vector Space)
A non-empty set of vectors V, is a vector space when it satisfies two main properties:
1. Closed on addition: Let $u,v \in V$, then $u+v \in V$.
2. Closed on scalar multiplication: Let $u \in V, c \in \mathbb{R}$, then $cu \in V$

#### Vector Properties
Let $u,v,w \in V$ and scalars $c,d \in \mathbb{R}$:
- **Vector Addition Properties:**
  1. Commutativity: $u+v=v+u$
  2. Associativity: $(u+v)+w = u + (v+w)$
  3. Additive Identity: $\exists 0 \in V$ S.T. $v + 0 = v$
  4. Additive Inverse: $\forall v \in V, \exists -v \in V$ S.T. $v + (-v) = 0$.
- **Scalar multiplication properties:**
  5. Scalar Identity: $1*u=u$
  6. Associativity of scalar multiplication: $c(dv)=(cd)v$
- **Distributive Properties ():**
  7. $c(u+v) = cu+cv$
  8. $(c+d)u = cu+du$

---
### Def. (Subspace)
Let $A$ be a set of vectors S.T. $A \subset V$, where $V$ is a vector space. $A$ is a subspace of $V$ if it meets the following conditions:
1. Closed under addition: $u,v \in A$, then $u+v \in A$
2. Closed under scalar multiplication: $u \in A, c \in \mathbb{R}$, then $cu \in A$
3. Zero vector is in A: $\exists 0 \in A$

NOTE: Every subspace is also a vector space as it inherits the vector space properties of $V$.

---
### Def. (Basis)
Let $V$ be a vector space. A basis for $V$ is:
  1. The null set if $V=\{0\}$
  2. If $V \neq \{0\}$, then a basis is a set B = $\{v_{1}, ..., v_{k}\} \in V$ S.T. 
  the vector set $B$ is linearly independent and $Span(B) = V$

To find the basis mechanically, just row reduce the column vectors of A. Note the column positions of the leading ones. Then the vector in the original matrix associated with those columns form the basis, meaning they're linearly independent. For the columns with the free variables, those form the basis for the null space.


#### Theorem. (Dimension)
The dimension refers to the number of vectors in a basis of a vector space. This signifies the number of 'directions' that are needed to fully describe all vectors within that vector space. Note that every basis of $V$ has the same number of vectors.

---
### Def. (Null Space/Kernel)
Let $A_{k \times n}$, the null space of this is denoted as $Nul(A) = {\vec{x} | A\vec{x} = 0} \in \mathbb{R^n}$

Basically the set of all vectors in the domain that are linked to 0 vector in the co-domain.

---
### Def. (Column Space)
Let $A_{k \times n}. $The column space (or range) of a matrix $A$ is the set of all linear combinations of the column vectors of A. This is denoted as $Col(A) = Span(\{a_1, ..., a_{n}\}) \subset \mathbb{R^{k}}$

#### Properties
1. The dimension/rank is the number of linearly independent columns. The amount of directions that are in the set spanned by the column space. 
2. The column space consists of all possible outputs of the linear transformation defined by A.

### Def. (Row Space):
The set of all linear combinations of its row vectors, and this set is a subset of $\mathbb{R^{n}}$. For example, let $A = \begin{bmatrix} -2 & 2 & 6 & 0 \\ 0 & 6 & 7 & 5 \\ 1 & 5 & 4 & 5 \end{bmatrix}$, then $Row(A) = span(\{\begin{bmatrix} -2 \\ 2 \\ 6 \\ 0\end{bmatrix}, \begin{bmatrix} 0 \\ 6 \\ 7 \\ 5\end{bmatrix}, \begin{bmatrix} 1 \\ 5 \\ 4 \\ 5\end{bmatrix} \})$. 

So $Row(A) = span(\{ r_{1}, ..., r_{k} \})$. To even calculate this in the first place, you're going to row-reduce the matrix like normal, but you're just going to select the non-zero rows to be in the basis. You remember how when calculating the column space, we selected the column vectors with the leading 1s? Well here we'd select the row vectors that are non-zero, as those are the linearly independent row vectors.

---
### Theorem. (Dimension)
- **Dimension:** Number of vectors in the basis for a given space.
- **Rank:** Dimension of your column space.
- **Nullity:** Dimension of your null space. 
