/*
+ Ex. 2: If you're updating a state based on its 
previous value, use a state setter. In this example, we 
have our 'badAdjustCount' which updates the state using 
amount, and the current state value in that render. This 
works, but the proper way is to use a state setter like how 
we did in 'goodAdjustCount'. And even though both work, we 
use the latter because then we're working with the latest 
state value, because with a state setter the state does 
update immediately. This can also help if you're doing multiple
update, and prevent clashes with your code down the road.

*/

import { useState } from "react";
export default function Ex2_Counter() {
  const [count, setCount] = useState(0);

  // Don't do this!
  const badAdjustCount = (amount) => {
    setCount(count + amount);
  };

  //   DO This!
  const goodAdjustCount = (amount) => {
    setCount((prev) => prev + amount);
  };

  return (
    <div>
      <h1>Example 2: Remember state setters!</h1>
      <button onClick={() => goodAdjustCount(1)}>Add 1</button>
      <button onClick={() => goodAdjustCount(-1)}>Minus 1</button>
      <span>Count: {count}</span>
    </div>
  );
}
