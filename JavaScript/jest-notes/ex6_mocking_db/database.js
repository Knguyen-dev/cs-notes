/*
- Connect to the databaes

- NOTE: We're going to be using mysql for this example, but 
  
+ Separation:
Let's separate the server route logic and the database logic.
This not only helps make things more readable, but it enables us 
to be able to test the database stuff and route stuff separately.

*/
import mysql from "mysql2";

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "some_database",
});

export async function getUser(username) {
	const [rows] = await connection.promise().query(
		`SELECT * 
      FROM users 
      WHERE username = ?`,
		[username]
	);

	return rows[0];
}

export async function createUser(username, password) {
	const { insertId } = await connection.promise().query(
		`INSERT INTO users (username, password) 
      VALUES (?, ?)`,
		[username, password]
	);

	return insertId;
}
