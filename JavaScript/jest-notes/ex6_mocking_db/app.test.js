const createApp = require("./app");
const request = require("supertest");

/*
Our app only uses those two methods, so that object can act as our 
fake database. 

+ Mock functions:
Now we need some fake functions and you want to 
test interactions with the fake versions, so that you can get some 
confidents that things will work with the real versions. Instead of 
creating our own mock functions, we'll use jest.fn().





*/

const createUser = jest.fn();
const getUser = jest.fn();

const app = createApp({
	createUser,
	getUser,
});

describe("POST /users", () => {
	describe("Given a username and password", () => {
		/*
    - Our test cases for this user registration route
     1. Should save username and password to database
		 2. Should respond with json object containing user ID
		 3. Respond with 200 status code and the server should
		 have content-type header as json to let client know json data
		 is being sent.
    */
		test("should respond wtih 200 status code", async () => {
			const response = await request(app).post("/users").send({
				username: "username",
				password: "password",
			});
			expect(response.statusCode).toBe(200);
		});

		test("should specify json as content type header", async () => {
			const response = await request(app).post("/users").send({
				username: "username",
				password: "password",
			});
			expect(response.headers["content-type"]).toEqual(
				expect.stringContaining("json")
			);
		});

		test("respones has userId", async () => {
			const response = await request(app).post("/users").send({
				username: "username",
				password: "password",
			});
			expect(response.body.userId).toBeDefined();
		});
	});

	/*
  - Since these tests are kind of testing the same thing, we 
    just put the different variations of req.body and iterate over.
    The idea is the route handler should reject the request wiht status 400
    when any field is missing.
  */
	describe("when username and password are missing", () => {
		test("should respond wtih status code 400", async () => {
			const bodyData = [
				{ username: "username" }, // only username
				{ password: "password" }, // only password
				{}, // neither
			];

			for (const body of bodyData) {
				const response = await request(app).post("/users").send(body);
				expect(response.statusCode).toBe(400);
			}
		});
	});
});
