import { Pool } from "pg";

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "mydatabase",
	password: "07032004",
	port: 5432,
});

const runMigrations = async () => {
	const client = await pool.connect();
	try {
		// Start the transaction operation
		await client.query("BEGIN");

		// Example migration: Create 'user' table
		const createTableText = `
      CREATE TABLE IF NOT EXISTS user (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(32) NOT NULL,
      );
    `;

		// Do the operation to create the table
		await client.query(createTableText);

		// If successful, we will commit the transaction, meaning saving the changes of the
		// transaction to our database
		await client.query("COMMIT");
	} catch (error) {
		// If an error occured in the transaction, rollback/unsave any changes
		// made by the transaction
		await client.query("ROLLBACK");
		console.error("Error running migration:", error);
	} finally {
		// Release the client's resources, so it goes back to the pool, making
		// it available for other operations
		client.release();
	}
};

runMigrations()
	.then(() => {
		console.log("Migrations ran successfully");
	})
	.catch((err) => {
		console.error("Error running migrations:", err);
	})
	// Regardless of success or failure, we shut down the pool, ensuring all clients are
	// closed properly, all database connections are closed.
	.finally(() => pool.end());
