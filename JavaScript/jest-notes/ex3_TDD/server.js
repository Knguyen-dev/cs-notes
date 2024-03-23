const cors = require("cors");
const validatePassword = require("./validatePassword");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/users", (req, res) => {
	/*
  + Validate username, password
  - password: 8 to 32 characters long 1 number and 1 letter.

  + ISSUE: Now how we usually test this is with postman and we manually
    test the cases to be somewhat confident. And if we make a small change 
    we may have broken something, so we have to test it again. This takes a lot of time so 
    let's do this a better way.

  + SOLUTION: We can automate this, but how.
  1. You could definitely write some code that goes to the website, fills
    out the forms, submits, and then gets some results back. That's alright, 
    but there could be network errors, client-side errors, and server-side errors 
    that cause things to break, even if our password validation code is alright. We
    just want to test the password validation code itself.

  2. We'll do automated unit testing. First separate our password validation logic
    into it's own file. 
  
  */

	const { username, password } = req.body;

	const validPassword = validatePassword(password);

	if (validPassword) {
		res.json({ message: "Valid" });
	} else {
		res.json({ message: "Invalid" });
	}
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
