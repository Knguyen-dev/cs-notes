/*
+ How to set up:
We will create our express app and export it. We import it in one 
file where we'll run it as a server, but the other file will have all of 
our http tests.

+ Organizing the test file:
We'll use describe blocks to organize our test suites.
So here we create an entire block for a single POST request rout

*/

const app = require("./app");
const request = require("supertest");

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

		/*
    - Pass our http server to supertest's request object, which will let supertest
      bind/run that server on whatever port it needs. Then we just indicate what 
      type of request we're doing and at what endpoint. Here 
      we're also sending data in req.body with .send().
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
