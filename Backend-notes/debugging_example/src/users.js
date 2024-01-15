const users = [
	{
		id: 1,
		name: "Dave",
		dateOfBirth: "1/21/2001",
	},
	{
		id: 2,
		name: "Anne",
		dateOfBirth: "7/2/1994",
	},
	{
		id: 3,
		name: "John",
		dateOfBirth: "3/14/1978",
	},
	{
		id: 4,
		name: "Janet",
		dateOfBirth: "6/5/2004",
	},
];

// I put a breakpoint on users, I can now look at the list of users
function setupUserController(app) {
	app.get("/users", (req, res) => {
		res.send(users);
	});

	/*
    + Setting up a dynamic route. However for this demonstration is this actually not 
    working. Let's try to figure out why it returns 404 not found when we try to 
    go to a user's route such as "/users/1".

    - Using console.log:
    1. We'd do console.log(requets.params.id) probably ot see what's happening
    


    - Using javascript terminal:
    1. Set up a breakpoint, then reload your browser for changes to take place.
      Right now since we put a breakpoint, it stops before we actually send a response 
      so a path such as "/users/1" will continually load.

    2. We think our problme is somewhere here, so let's place a breakpoint in one of 
    our codes. Then we refresh the browser

    2. After, going through, you'll see that u.id is a number, but req.params.id is a 
      string, which is why tihngs don't work. So we convert it into a number

    - By setting a breakpoint, you can easily see the state such as the users that 
      were being iterated through at that moment. Or really anything before it.

      Just make sure. Launch your debugging mode. set your breakpoint, and then refresh 
      your browser. Then the line of code your highlighted will appear on your breakpoint.
      This is good as, before you'd use a console.log to log a specific value, but with a breakpoint, you
      can simply see all of the values you're passing and what's happening. Though remember 
      to unpause the application, as everytime you hit a breakpoint the debugger is paused.
      So if you want to change the breakpoint, take it out, set a new one, and unpause the 
      debugger.

    
    
    */
	app.get("/users/:id", (req, res) => {
		const user = users.find((u) => u.id === req.params.id);
		// const user = users.find((u) => u.id === Number(req.params.id));
		if (!user) return res.sendStatus(404);
		return res.send(user);
	});
}

export default setupUserController;
