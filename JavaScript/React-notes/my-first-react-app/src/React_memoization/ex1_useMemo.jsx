/* eslint-disable react/prop-types */
/*


+ useMemo: Gives us a way to add memoization inside our components. It's used
  to optimize complex/expensive calculations by caching the result of a function call and
  storing it for later use, rather than calling the function again. Memoized value 
  is only recalculated when the dependencies of the hook change.


- For example: Let's say we have a shopping cart component. In our site 
  we made it so every time the user clicked on the cart link in the header or 
  a 'add to cart' button, it redirected the user to the cart page.

- issue: Everytime Cart is loaded, the calculations are done in the rendering. This is 
  done every time the component is rendered/updated all from scratch. This gets 
  more expensive as number of products increases, leading to sluggish UX. Imagine 
  the case where the user didn't even add or remove items from cart but is just switching
  to the Cart Page, we're doing calculations unnecessarily our cart total isn't changing but
  we are still doing the reduce operation for it.

- solution: Utilize useMemo so we can cache and memoize the total. With our dependency array,
  we make it so  we only redo the calculation when our products prop has changed, indicating the cart has changed.
*/

import { useMemo } from "react"

// Without UseMemo
export function BadCart({ products }) {
	const totalPrice = products.reduce(
		(total, product) => total + product.price * product.quantity,
		0
	)
	return (
		<div>
			<p>
				Total: <strong>${totalPrice}</strong>
			</p>
		</div>
	)
}

// With useMemo: On the first render it calculates our total. And only recalculates the total when products has changed.
export function GoodCart({ products }) {
	const totalPrice = useMemo(() => {
		return products.reduce(
			(total, product) => total + product.price * product.quantity,
			0
		)
	}, [products])
	return (
		<div>
			<p>
				Total Price: <strong>${totalPrice}</strong>
			</p>
		</div>
	)
}
