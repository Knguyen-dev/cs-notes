# Integrals

### Definition of an Integral
The idea of summing things up, in this case we're summing up the area under a curve. It is the reverse of differentiation:
- **Indefinite Integral:** $\int{f(x)dx}=F(x)+c$. 
- **Definite Integral:** $\int_{a}^{b}{f(x)dx} = F(b) - F(a)$. Calculates the area bounded by the integral. If curve is above the x axis, area value is positive, else negative. Also integrals could be on the y-axis as well.

## Integration Techniques

### Reversing the differentiation
Finding an indefinite integral involves reversing differentiation. Below we're doing the reverse of the power rule. 

- **Example:** $\int{x^{n}}=\frac{x^{n+1}}{n+1}+c$. 

Though if $n=-1$, this won't work, and you'll have to use a different technique. There are many formulas for integration and differentiation that cover logarithmic, exponential, and other things I haven't covered in the notes. You can look these up online as they're actually somewhat easy. Here I'm just reviewing the main need to know techniques.

---
### U-Substitution
This technique is useful for more complex integrals as it allows us to simplify the integral. Use it if your integral is in form: $\int{f(g(x))g'(x)dx} = \int{f(u)du}$

#### Example 1:
1. Calculate: $\int{2xe^{x^{2}}dx}$
2. Let $u=x^{2}$ and $du=2xdx$. Re-write integral as $\int{e^{u}du}=e^{u}+c=e^{x^{2}}+c$.

Of course when doing a definite integral, make sure to convert the bounds.

---
### Integration by Parts
If possible, we'd usually rely on u-sub. You'd use integration by parts when you see your function is the product of two functions. One you can integrate and one you can differentiate. 

$\int{udv}=uv-\int{vdu}$

#### Example:
1. Integrate: $\int{xe^{x}dx}$.
2. Let $u=x$ and $dv=e^{x}$. Choose things you know you can integrate or differentiate. With experience you'll be able to know what to pick such that your integral gets simpler, rather than getting more complex.