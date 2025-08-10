/*
+ Higher Order Components: A higher order component is a function, 
  that returns an inner function. This inner function returns a component.
  Essentially the outer function adds some stuff to the inner function 
  akin to a Python decorator. For example here, in our components for 
  fetching data, we will probably always have things such as the 
  three states, isLoading, data, and error. But also the fetchData 
  function. So instead of repeating that everytime, let's use a higher 
  order component that's more abstract (unfinished), but adds those 
  states to the concrete components that we will actaully use.

- NOTE: 
1. While class components and HOC combined is a somewhat older way to write 
    React applications, you'll still find it in a lot of React projects.
*/

import { Component } from "react";
import withDataFetching from "./withDataFetching";
class Repos extends Component {
  constructor(props) {
    super(props);

    // State properties
    this.state = {
      isLoading: true,
      data: [],
      error: null,
    };
  }

  async fetchData() {
    try {
      const url = "https://api.github.com/users/monsterlessonsacademy/repos";
      const response = await fetch(url);
      const json = await response.json();

      // If we got data, update the 'data' and 'isLoading' attributes
      // Remember this only changes those two, whilst leaving 'error' unchanged
      if (json) {
        this.setState({
          data: json,
          isLoading: false,
        });
      }
    } catch (err) {
      // If error, then loading is still false, but now record the
      // error message in our error state.
      this.setState({
        isLoading: false,
        error: err.message,
      });
    }
  }

  /*
  + On component mount, we call our function to fetch the 
  data. This is basically the idea of running an effect only
  on the first render.
  */
  componentDidMount() {
    this.fetchData();
  }

  // Our function that handles rendering our component
  render() {
    // If loading still, render loading screen
    if (this.state.isLoading) {
      return "Loading...";
    }

    // If an error happened when getting data, render error message
    if (this.state.error) {
      return this.state.error.message;
    }

    return (
      <ul>
        {/* Render out all list items */}
        {this.state.data.map(({ id, html_url, full_name }) => (
          <li key={id}>
            <a href={html_url} target="_blank" rel="noopener noreferrer">
              {full_name}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

/*
- Repos with only render. Then our HOC provides constructo-r, states, data fetch function, and effect.
  The great thing is, Repos2 doesn't have to be a class component, but just a normal
  state-less and less intimidating functional component since all states have been extracted.

+ Rise of Hooks:
- However a more modern way has arrived with react hooks. Since we have react
  hooks, we don't prefer HOCs anymore. The issue with HOCs is that essentially when 
  combining HOCs with each other, it makes things hard to read and see how data is moving 
  into our components. So instead of using a HOC, we'll use a custom hook called
  useDataFetching() that will give us our state values and data fetching functionality.
*/
function Repos2({ isLoading, error, data }) {
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return error.message;
  }
  return (
    <ul>
      {/* Render out all list items */}
      {data.map(({ id, html_url, full_name }) => (
        <li key={id}>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {full_name}
          </a>
        </li>
      ))}
    </ul>
  );
}

// export default Repos;

/*
- This is how you export it, pass in your props to withDataFetching and 
   then pass in wrapper component like you're calling an iife. So the 
   format is:

   withHigherComponent(propsObject)(component_being_wrapped)


*/

export default withDataFetching({
  dataSource: "https://api.github.com/users/monsterlessonsacademy/repos",
})(Repos2);
