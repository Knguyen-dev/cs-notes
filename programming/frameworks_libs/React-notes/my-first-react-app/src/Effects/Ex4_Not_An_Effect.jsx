/*
- Here are just some examples of things that are not effects


    1. Initializing the application: Logic that should only run once the application starts, shouldn't be 
        put into an effect. Just put that outside of your components.

    if (typeof window !== "undefined") {
        checkAuthToken();
        loadDataFromLocalStorage()
    }

    2. Buying a product: An effect should be code that runs after a component appears.
        The act of buying is not a side-effect, but an event that happens due to user interaction.
        In development, it will fire the effect twice to show the problem of buying a product twice
        as well. Instead of using an effect, just create an event handler for a buy button.      



    useEffect(() => {
        fetch("/api/buy, {method: 'POST'}")
    }, [])

*/
