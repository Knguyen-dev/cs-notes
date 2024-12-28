# Coordinate systems

## Eigenvectors & Eigenvalues

### Def. (Eigenvector and Eigenvalue) 
Let $A_{n \times n}$. A vector $\vec{x}$ is an eigenvector if it satisfies two conditions:
1. $\vec{x} \neq 0$
2. $A\vec{x} = \lambda \vec{x}$, where  $\lambda \in \mathbb{R}$

So an eigenvector is just a vector S.T. when putting it through a linear transformation, it's the same as scaling that vector by some scalar. Here $\lambda$ is called an eigenvalue.

---
### Def. (Characteristic Polynomial)
The characteristic polynomial of $A_{n \times n}$ is denoted as $p(t) = det(A-t \lambda )$. So you'd solve for $p(t)=0$ in order to get the eigenvalues.

---
### Def. (Eigenspace)
An eigenspace corresponding to an eigenvalue $\lambda$ of $A_{n \times n}$ is the set of all eigenvectors associated with $lambda$, including the zero vector. Formally it's denoted as $E_{\lambda} = \{v \in \mathbb{R^n}| Av=\lambda v\}$.

Mechanically, this is equivalent ot $E_{\lambda} = Nul(A-\lambda I)$. Then you'd row reduce, which would allow you to find the basis for the null space. The vectors in said basis are your eigenvectors.

---
### Def. (Diagonalizable Matrix): 
A square matrix $A_{n \times n}$ is diagonalizable if it is similar to a diagonal matrix. That is, if there exists an invertible matrix $P$ and diagonal matrix $D$ S.T: $A = PDP^{-1}$.

Here, $D$ contains the eigenvalues of $A$ on its diagonals. Then the columns of $P$ are the respective eigenvalues of A.

---
### Theorem. (Diagonalizability)
Matrix $A_{n \times n}$ is diagonalizable if and only if: 
- $A$ has n linearly independent eigenvectors. Also the algebraic multiplicity of each eigenvalue should be equal to the geometric multiplicity.
  1. **Algebraic multiplicity:** Number of times an eigenvalues appear as the root of the characteristic polynomial.
  2. **Geometric multiplicity:** The dimension of the eigenspace associated with that eigenvalue. So you'd have to row reduce $Nul(A-\lambda I)$, get the basis, which yields the dimension of the eigenspace.

### Theorem. (Nth power of A)
When a matrix $A$ is diagonalizable, you can compute powers of A efficiently: $A^{k} = PD^{k}P^{-1}$. 


---
### Def. (Eigenbasis)
An eigenbasis of a square matrix A is a set of eigenvectors that form a basis for the vector space $R^{n}$. This is only possible if:
1. Matrix $A$ is diagonalizable.
2. The eigenvectors correspond to the eigenvalues of $A$.

## Change of basis
We are always in standard basis, meaning our vectors are scaled off of the standard 'basis vectors' ${e_{1}, e_{2}, ..., e_{n}}$. So if you had a vector $\vec{x}=\begin{bmatrix}5 \\ 7 \\ 4 \end{bmatrix}$, it's denoted as $\vec{x} = 5*\vec{e_{1}} + 7*\vec{e_{2}} + 4*\vec{e_{3}}$. This is in $\mathbb{R^3}$.

If we have a different basis for $\mathbb{R^{3}}$, we can still represent that same vector x, but we scale its constants using different basis vectors. This is why "basis" is often called a coordinate system. Changing the basis means we represent the same vector x within a different coordinate system.

---
### Theorem. (Representation of a vector in a basis)
If $B=\{b_{1}, ..., b_{n}\}$ is a basis for vector space $V$, then $\forall v \in V$, can be written as : $v=c_{1}b_{1}+...+c_{n}b_{n}$, where $c_{1},...,c_{n} \in \mathbb{R}$. The scalars form the coordinates of $v$ relative to the basis $B$, denoted by $[v]_{B} = \begin{bmatrix} c_{1} \\ \vdots \\ c_{n} \end{bmatrix}$

---
### Theorem. (Change of basis formula and methods)
To switch from one basis $B = \{ b_{1}, ..., b_{n}\}$ to another basis $C= \{ c_{1}, ..., c_{n}\}$, we'd use a **change of basis matrix**:

1. $P_{B \rightarrow C} = [[b_{1}]_{C} ... [b_{k}]_{C}]$
2. $ [x]_C = P_{B \rightarrow C}  [x]_B$

Mechanically, to find $P_{C \leftarrow B} = \begin{bmatrix} c_{1} & ... & c_{n} & | & b_{1} & ... & b_{n} \end{bmatrix} \rightarrow \begin{bmatrix}I & | & P_{C \leftarrow B}\end{bmatrix}$. Yeah just setup the matrices for row reduction, then row reduce.

Note that $(P_{C \leftarrow B})^{-1} = P_{B \leftarrow C}$, which makes things pretty easy in that regard.