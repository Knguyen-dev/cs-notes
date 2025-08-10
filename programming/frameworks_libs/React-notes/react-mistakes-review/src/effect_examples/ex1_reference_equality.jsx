import { useState, useMemo } from "react";

export default function Ex1_Reference() {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  //   const person = { age, name };

  /*
    - Solution 1: One solution is memoizing. Create the 
    object. Now throughout your renders you'll have the 
    same object and the same reference. Then we only
    create a new object with new reference when 
    either name or age change.
    
     */
  const person = useMemo(() => {
    return { age, name };
  }, [name, age]);

  /*
  - Issue: Why is this bad? Well on every render, this effect will
    run, regardless of the values of 'age' and 'name'. This is 
    because when comparing objects instead of primitives (numbers, string, etc.)
    we compare by reference rather than value. And guess what, on every render, we are 
    're-creating' the person object and it's going to have a different reference.
    As a result, the effect, which compares based on reference, will run.
    In JavaScript as well, even if two objects have the same value, they have different
    references. Again this is just the standard idea of 'referential equality' in
    software development.
  */
  useEffect(() => {
    console.log("Person: ", person);
  }, [person]);

  /*
  - Solution 2: If you want to only make it run when the attributes of 
    an object are different, just pass in its primitive values into the dependency 
    array. As a result, React will be able to compare by value, and only show changes 
    when the name or age of the person has changed.
  */
  //   useEffect(() => {
  //     console.log("Person: ", person);
  //   }, [name, age]);

  return (
    <div style={{ background: darkMode ? "#333" : "#FFF" }}>
      <label htmlFor="age">Age</label>
      <input type="number" name="age" id="age" />
      <br />
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
    </div>
  );
}
