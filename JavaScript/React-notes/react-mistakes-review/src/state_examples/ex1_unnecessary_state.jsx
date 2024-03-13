/*
+ Unnecessary State: With something such as a login form, we 
don't really need state. We don't need to track the value everytime
the user enters a new one, as we're not doing any real-time input
validation for logging in, unlike how we do for signing up. So
we don't need to cause these unnecessary re-renders. Instead of using
state and controlled components, just get the form fields at 
submission.


*/

export default function Example1() {
  // Don't need these
  //   const [email, setEmail] = useState("");
  //   const [password, password] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    // Then you can send this as data in the body of your request
    // with fetch or axios
    const formData = new FormData(e.currentTarget);

    // Just logging out the values
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  return (
    <div>
      <h1>Example 1</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
