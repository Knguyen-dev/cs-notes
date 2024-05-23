import { Pool } from "pg";

/*
+ Connecting to the postgres server and database:
With 'pg', we do this by creating a pool object that contains all the information that 
that the pg library needs to connect us to a certain database. Then we'll
import this pool object in our index.js.

Using a pool is common and the recommended way of managing connections in a Postgres database
for a Node.js application. Good in a production environment if there are multiple concurrent connections 
to the database, as maybe you'd split this into various processes/servers. It's more suitable for managing multiple concurrent connections, 
however for simpler uses or quick scripts, you can use pg.Client instead.

+ When to use each:
- pg.Pool: When you have multiple queries or transactions running ocncurrently, or have a high number of db connections.
- Use this for simple scrpits or when you need to run a few queries sequentially and don't want the overhead/resources needed
to manage a pool.

In any case, pg.Pool would be the preferred approach in most production applications. As well as, the idea is 
that with this, pool, or db connection object, you'd be able to do things such as pool.query to execute SQL statements.
 


*/
const pool = new Pool({
	// We want to access postgres
	user: "postgres",

	// Super user password
	password: "07032004",

	// Database is located on local host
	host: "localhost",

	// postgres server is being run at this port, this is the default
	port: 5432,

	// The name of the database that we want to access
	database: "perntodo",
});

export default pool;
