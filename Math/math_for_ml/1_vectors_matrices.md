
### Intro and motivation
Data comes in csv, we need a way to feed that into machine. We use an n-tuple to represent a row, where each component is a column.
Then a matrix will be a collection of data rows.

After we'll multiply and add on them. To do 'feature selection and engineering'. After we know hte features, we can ML models. For that 
we need to use probability theory, distribution, and different types of norms to calculate the distance between two points. After we can create
different models and see which one is as close as possible. Then vector calculus to optimize and make each model reach its fullest potential 


## Vectors
Let's say e have titanic data. If we wanted to represent the column data of the csv, you'd have a column vector with all of the series data.
Then a row weights = [w1, ..., wn]. Row vectors are typically used to store weights, which indicates which column is more or less important. If you have column vector, then 
tranposing it makes it a row vector, and vice versa.

Of course we can do addition on vectors and matrices, but let's see something useful. Look at the house pricing data `1stFlrSF`, `2ndFlrSF`, and `GrLivArea`. If you add these you get the total square feet of the house, and by intuition the bigger the house, the higher the sale price. So instead of keeping things separate, do **feature engineering** by creating a new column vector (new column) called `totalSF`=`1stFlrSF+2ndFlrSF+GrLivArea`, which makes it easier for you to work with the data.

Now let's say you have `BmstFullBath`, `BmstHalfBath`, `FullBath`, and `HalfBath`. The number of bathrooms they have. A full bath is 1, but we need to treat a half bath as 0.5. Calculate `totalBath=BmstFullBath + 0.5*BmstHalfBath + FullBath + 0.5*HalfBath`. We just used **scalar multiplication**.

### Geometry using vector
Direction of vectors. Let's say we had an a vector of ages = [x1, ..., xn]. It's easy to visualize the direction up to 3d, but after we'd have n axes. The visualization is easy and obviously you know that adding vectors is just adding their components. Then you know scalar multiplication is just scaling up or down, and then sometimes doing a 180 with negation.  

### Magnitude (Norm) of a vector 
- All distances are non-negative. You can't drive -5 miles, so always doing absolute values.
- Distances increase or decrease with scalar multiplication
- Triangle inequality: (|A|+|B| <= |A+B|). The sum of components is at most the sum of the resultant vector.

### Different Types of Norm
Boring for now, but this becomes really important in the future
- **Lp norm:** $|x|=(\sum_{i}^{n}{|x_{i}|^{p}})^{\frac{1}{p}}$ for $p \geq 1$.
- **L2 norm (Euclidean Distance):** $|x|=\sqrt{(x_{1})^{2},...,(x_{n})^{2}}$. Calculates that shortest distance/straight line. There are limitations. Imagine we have a situation where we're in New York and the roads to places are like a grid. This norm calculates the path through those roads, which isn't going to be possible. 
 - **L1 norm (Manhattan distance):** $|x|_{1}=\sum_{i=1}^{n}{|x_{i}|}$. This calculates the distance you'd travel in a grid-like city. Imagine starting at (0,0) and ending at (3,4). Plug v=(3,4) into formula to get the total distance traveled, which is just the sum of the components, rather than getting the hypotenuse/straight line.
- **L-inf norm (max/chebyshev norm):** $|x|_{\inf}=max(x_{i})$. Basically it calculates the maximum component inside the vector. This is useful for finding the worse case scenario. 
- **L-0 norm:** Not a norm, but the "L-0" norm is informally used to count the number of non-zero components in a vector.

## Matrix Multiplication
- Ale: $2
- Lager: $3
- Stout: $4
You sell 4 ale, 2 lager, and 2 stout. This is u = [4, 2, 2]. Your friend sells 3, 2, and 4 respectively, which is u =[3,2,4]. You can represent this in $\begin{bmatrix}4 & 2 & \\ 3 & 2 & 4\end{bmatrix}$, and multiply it by the vector $\begin{bmatrix} 2 \\ 3 \\ 4\end{bmatrix}$. This calculates the solution vector $\vec{b}$ to the sys. of lin. eq., where $b_{1}$ is the amount of money you made and $b_{2}$ is the money you friend made.

### Angle between vectors (Dot Product)
The reason I care about the angle between vectors, is that it helps us reduce the number of dimensions in our dataset. Helps us determine whether we want to retain a column or not. Anyways you can calculate the angle using the dot product formula $|a||b|cos(\theta)$ and solve for $\theta$.

If $\vec{v} \cdot \vec{w} = 0$, then $\theta=90$. If age and ticketPrice vectors are perpendicular, then they vary independently from each other. If the angle between them was small, then it would mean that they have a high correlation with each other, like they're not really giving us any new information. 

#### Hyperplane
A plane that's perpendicular to the vector. In a 2d graph, the hyper plane is just a line perpendicular to the vector. In 3d space it really is a plane orthogonal to your vector in r3. In 4d space, it's a 3d plane that's orthogonal to that 4d vector. The reason we care about hyperplanes is because it can be used to slice through a dataset and separate things out. Okay let's say we have a scatter plot. There are tw noticeable clusters for cats and dogs, pretend it's a classification problem. This plane, would separate the dots on the scatter plot, allowing us to indicate which are cats or dogs. This idea can be used for a scatter plot for spam mail and not spam mail. Now the question is, how do we best calculate this plane, the decision boundary/where to slice the data.

- w = [w1, ..., wn], fixed values.
- v = $\begin{bmatrix}v_{1} \\ ... \\ v_{n}\end{bmatrix}$.
If the $w \cdot v > a$, where a is some threshold value. If the length of v's projection onto w is longer than the threshold, then it has the property $w \cdot v > a$

### Determinant and inverse 
Determinant gives information on how a linear transformation (in matrix form) affects a vector. If a vector is really deformed by a linear transformation, it's going to be really hard to get back that original shape/vector, and getting back that original vector is pretty important. Imagine if the determinant was 0, which would mean that the vector, and all space would be squeezed onto a line. If this is the case, there's no amount of reverse engineering that would get us that original shape. This is very helpful for things such as logistic regression. So if determinant isn't 0, then it's fine. Else, you note that you cannot go back to the original vector.

Inverse matrices are very useful for when we're going to calculate things like loss.

### Linear dependency and dimensionality reduction
With linearly dependence, it means that a given vector is a multiple of the other vectors. Meaning that a given column can be represented by the other columns. For example `miles` and `km`, they are multiples of each other, so you can definitely do some dimensionality reduction as those columns are redundant and don't provide any new information!

