

## Matrices 

### Def. (Matrix Algebra)
Let $A$ and $B$ be $k \times n$ matrices. Addition is expressed as just adding their respective components together. 

#### Properties of Matrix Algebra 
1. Associative: $A(BC)=(AB)C$
2. Distributive: $A(B+C)=AB+AC$
3. Associative rule with scalar multiplication: $\alpha \beta (A) = (\alpha \beta)A$
4. Identity: $A_{k \times n} * I_{n^{2}} = A_{k \times n} = I_{n^{2}} * A_{k \times n}$
---
### Def. (Matrix Multiplication)
Let $A_{\mathbb{l} \times k}$ and $B_{k \times n}$. Then $AB = \begin{bmatrix} Ab_{1} & Ab_{2} & ... & Ab_{n}\end{bmatrix}$. 

This results in a $\mathbb{l} \times n$ matrix. The theory behind the operation is that every row from A, does a dot product with every column vector from B. 

NOTE: For $A_{p \times q}$ and $B_{r \times s}$, in order to multiply $AB$, $q$ and $r$ must be equal. In matrix multiplication, order will typically matter. So $AB \neq BA$ is true most of the time. 

---
### Properties of Addition and Scalar Multiplication
Let $c,a \in \mathbb{R}$ and $A,B \in Mat_{k \times n}$.
1. $A+B=B+A$, where $A,B$ are $k \times n$ matrices.
2. $A+(B+C)=(A+B)+C$
3. $A + 0 = A$
4. $c(A+B) = cA + cB$
5. $(c+a)B = cB + aB$
6. $c(aA) = (ca)(A)$

---
### Def. (Identity Matrix)
An identity matrix is a square matrix, which can be expressed as $A_{k \times k} = \begin{bmatrix} e_{1} & ... & e_{k}\end{bmatrix}$. Essentially it's a square matrix, where all diagonals are 1s.

---
### Def. (Transpose of a Matrix)
Let $A_{k \times n}=[a_{ij}]$. The tranpose of $A_{k \times n}$ is $A_{n \times k} = [a_{ji}]$.

#### Properties of a transpose matrix
1. $((A)^{T})^{T} = A$
2. $(A+B)^{T} = A^{T} + B^{T}$
3. $(cA)^{T}=cA^{T}$
4. $(AB)^{T}=B^{T}A^{T}$

---
### Def. (Inverse of a Matrix)
Let $A_{n \times n}$. Then $B_{n \times n}$ is an inverse of $A_{n \times n}$ if $AB = I = BA$.

In english, for a matrix to be invertible it needs to be a square matrix. And the inverse of matrix $A$, is another matrix (of same dimensions) S.T. their multiplications results in the identity matrix.

To calculate the inverse of a matrix, do $[A | I] \rightarrow [I | A^{-1}]$. So just set up the matrices, and row reduce.

#### Properties of inverse matrices
1. $(A^{-1})^{-1} = A$
2. $(AB)^{-1} = B^{-1}A^{-1}$

---
### Theorem. (Matrix Inverse)
Let $A_{n \times n}$, then the following statements are logically equivalent:
1. A is invertible
2. A row-reduces to the identity matrix
3. A has n-pivots in every row and column
4. $Ax=0$ has only one solution $x=0$.
5. The column vectors of A are linearly independent.
6. The linear transformation $T: \mathbb{R^n} \rightarrow \mathbb{R^k}$ by $T(x)=Ax$ is 1-1. Also $Ax=b$ is onto, so at least one solution $\forall b \in \mathbb{R^k}$. So T is both one-to-one and onto, so $T(x) = b$ has exactly one solution $\forall b$
7. $span(\{ a_{1}, ..., a_{n} \}) = \mathbb{R^{n}}$

## Functions and Linear Transformations

### Def. (Function)
A function receives an input and an output. An example is $f: X \rightarrow Y$ is defined by $f(x)=3x+1$. Here $X$, is the set of all inputs (domain), and Y is the set of all outputs (co-domain)

So if a function is $f: \mathbb{R} \rightarrow \mathbb{Z}$, then you at least know that it takes in a real number, and will output an integer. 

---
### Def. (Linear Transformation)
A function $T: \mathbb{R^n} \rightarrow \mathbb{R^k}$ is a linear transformation if: 
  1. Additivity: $T(u+v)=T(u)+T(v)$, where $\forall \vec{u},\vec{v} \in \mathbb{R^n}$.
  2. Homogeneity: $T(cv) = cT(v)$, where $c \in \mathbb{R}, v \in \mathbb{R^n}$.

---
### Theorem. (Matrix of a Linear Transfomration)
A linear transformation $T: \mathbb{R^n} \rightarrow \mathbb{R^k}$ can be represented through matrix multiplication. That is, the operation can be represented as $T(x)=Ax$, $\forall x \in \mathbb{R^n}$.

Construct the matrix representing $T$, via $A_{k \times n}=\begin{bmatrix}T(e_{1}) & ... & T(e_{n})\end{bmatrix}$

In english, a linear transformation can be represented by a matrix. Then applying a linear transformation on a vector, can be expressed by matrix multiplication.

---
### Def. (Onto)
A function $f: X \rightarrow Y$ is onto if $\forall b \in Y, \exists x \in X$ S.T. $f(x) = y$.

In english, a function is onto if for every value in the co-domain, there exists at least one input in the domain that produces it.

---
### Def. (One-to-one)
A function $f: X \rightarrow Y$ is one-to-one if $\forall b \in Y$, there exist at most 1 $x \in X$, S.T. $f(x)=b$ 

---
### Def. (Inverse Function)
Let $f: X \rightarrow Y$ be a function. Then $g: Y \rightarrow X$ is an inverse if it satisfies the following conditions:
1. $f(g(y)) = y, \forall y \in Y$
2. $g(f(x)) = x, \forall x \in X$


## Determinants

### Def. (Determinant)
A scalar value associated with a square matrix that provides crucial information about a matrix. More specifically though, it's kind of like a scalar that measures how the space is changed as a result of the linear transformation.

### Def. (Minor of a matrix)
Let $A_{n \times n}$, then the $A_{i \times j}$ minor is the $(n - 1) \times (n-1)$ matrix obtained by removing the ith row and jth column from A. 

### Def. (Determinant of a 2 by 2)
Let matrix $A=\begin{bmatrix} a & b \\ c & d \end{bmatrix}$. Then the determinant is denoted by: $det(A) = ad-bc$.

### Def. (Determinant of a 3 by 3, using co-factor expansion)
Here's a [co-factor expansion tutorial](https://www.youtube.com/watch?v=ZAECu1mkFY8)

### Theorem. (How row operations affect a matrix's determinant)
1. Swapping two rows: Negates determinant
2. Row Scaling: Multiplying a row by a scalar will multiply the determinant by said scalar.
3. Row addition: Adding a multiple of one row to another doesn't change the determinant.

### Def. (Triangular matrices)
A $A_{n \times n}$ is considered triangular if either:
  1. Upper triangular: If $a_{ij} = 0, \forall i > 0$. 
  2. Lower Triangular: If $a_{ij} = 0, \forall i < 0$. 

#### Theorem. (Determinant of a triangular matrix)
The determinant of a triangular matrix can be calculated by multiplying the diagonal entries. So $det(A) = a_{11} * ... * a_{nn}$