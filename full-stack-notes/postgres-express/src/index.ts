import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db";

const app = express();

app.use(cors());
app.use(express.json());

// Interface for the todo
interface ITodo {
	todo_id: number;
	description: string;
}

// ********* Routes *********

// Create a todo
app.post("/todos", async (req: Request, res: Response) => {
	try {
		const { description } = req.body;

		/*
        + Executing an SQL statement with query parameterization
        Basically '$1' acts as a placeholder, and it'll refer to the first value
        we place inside our array of 'values'. So here the first value inside our 
        array of values is 'description', so $1 = description.

        This is just an implementation of query parameterization, and it simply 
        prevents SQL injection.

        Then we'll use 'RETURNING *' so we'll return the new row or todo that we've 
        just inserted into the database. Allowing us be able to return that todo 
        as json later on.

        PG returns a lot more data than you realize, such as the command used to for the 
        query, and other meta data. However the important data is the result.rows 
        which contains an array of rows that were inserted or affected. Here instead of sending back that 
        entire reuslt object, we'll just send back the object at result.rows[0] to 
        send back the newly created todo
        result = {
          command: ...,
          rowCount: ...,
          'rows': [
            {
              'todo_id': 1,
              'description' : "Some description"
            }
            
          ],
          ...
        }
        */
		const result = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		);

		res.json(result.rows[0]);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server Error!");
	}
});

app.get("/todos", async (req, res) => {
	try {
		/*
    - Select all todos. Of course 'allTodos' will be a query result object 
    or something like that. We will access the allTodos.rows, which will be an array 
    of objects (todos) that we got back
    */
		const result = await pool.query("SELECT * FROM todo");

		res.json(result.rows);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
			id,
		]);

		// Handle cases where the todo in question wasn't found
		if (result.rows.length === 0) {
			return res.status(404).send("Todo not found!");
		}

		// result.rows should be an array of one todo item since we're getting by id
		// So index it and return the todo object
		res.json(result.rows[0]);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error!");
	}
});

app.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;

		// So $1 will be the first element in our values array so 'description
		// whilst $2 will be the second element 'id'.
		const result = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
			[description, id]
		);

		// Handle cases where the todo in question wasn't found
		if (result.rows.length === 0) {
			return res.status(404).send("Todo not found!");
		}

		// Return the updated todo right?
		res.json(result.rows[0]);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error!");
	}
});

app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await pool.query(
			"DELETE FROM todo WHERE todo_id = $1 RETURNING *",
			[id]
		);

		// Handle cases where the todo in question wasn't found
		if (result.rows.length === 0) {
			return res.status(404).send("Todo not found!");
		}

		// Return the deleted todo right?
		res.json(result.rows[0]);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error!");
	}
});

app.listen(5000, () => {
	console.log("Server listening on port 5000!");
});
