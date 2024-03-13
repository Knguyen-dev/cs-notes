/*
+ Convention: Higher order components always start with 
'with' for their names.




*/

import { Component } from "react";

const withDataFetching = (props) => (WrapperComponent) => {
  class WithDataFetching extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: [],
        error: null,
      };
    }

    async fetchData() {
      try {
        // Url of our fetch reequest passed through props
        const response = await fetch(props.dataSource);
        const json = await response.json();

        if (json) {
          this.setState({
            data: json,
            isLoading: false,
          });
        }
      } catch (err) {
        this.setState({
          isLoading: false,
          error: err.message,
        });
      }
    }

    // Same componentDidMount
    componentDidMount() {
      this.fetchData();
    }

    render() {
      const { data, isLoading, error } = this.state;
      /*
      - Essentially it's a decorator. Now we can use this 
      withDataFetching HOC, to add data-fetching functionality to it.
      Now the 'WrapperComponent', which is more like 'wrapped' component 
      will now have the additional data fetching states and effect.
      
      - So essentially the component look like this since we're rendering
      the wrapper inside WithDataFetching, and then returning WithDataFetching.
        <WithDataFetching>
            <WrapperComponent/>
        </WithDataFetching>

      */

      return (
        <WrapperComponent
          data={data} // Pass in the state values from outer component to inner
          isLoading={isLoading}
          error={error}
          {...props} // of course pass in the props needed for inner component
        />
      );
    }
  }

  // Finally return the With component
  return WithDataFetching;
};

export default withDataFetching;
