# SQL Tuning
Let's see some tips and general ideas.

## Tighten up the schema
- Use `CHAR` instead of `VARCHAR` for fixed-length fields. `CHAR` effectively allows for fast, random access, whereas with `VARCHAR`, you must find the end of a string before moving onto the next one. 

- Use `TEXT` for large blocks of text such as blog posts. `TEXT` also allows for boolean searches. This is just the idea you can search a `TEXT` column to see if it has a certain word or whatnot.
- Use `INT` for larger numbers up to 2^32 or 4 billion.
- Use `DECIMAL` for currency to avoid floating point representation errors.
- Avoid storing large `BLOBS` (Binary large objects). Blobs are usually used to store large binary data such as images, videos, or files directly in the database. Since these are very large, they typically aren't stored in the database, instead just store a reference (e.g. file path, or URL) to the actual location of the binary data.
- `VARCHAR(255)` is the largest number of characters that can be counted in an 8 bit number, often maximizing the use of a byte in some RDBMS.
- Set the NOT NULL constraint where applicable to improve search performance.

## Use good indices
Columns that you're querying (`SELECT`, `GROUP BY`, `ORDER BY`, `JOIN`) could be faster with indices. 

### When to not use indices
1. **Low cardinality columns:** However don't use indices on low cardinality columns such as `gender`, which could be value `M` or `F`. The database handles this easily so an index isn't needed.
2. **Write intensive tables:** Indices slow modifying operations like `INSERT`, `UPDATE`, and `DELETE` since the database needs to update the index with each change.
3. **Small Tables:** Tables with a few rows don't need indices. A full table scan will be easy!
4. **Rarely queried columns:** If a column is rarely used in queries, don't use an index on it.


## Denormalize to avoid expensive joins
Once data becomes distributed with things such as federation and sharding, managing joins across data centers increases complexity. So denormalization is on the table.

## Partition Tables
Partitioning can be really useful. You can start with simple ones such as partitioning rows based on geographic location, that's a common one. Then you may go on to do more advanced techniques.


## Optimize your queries
- **Avoid NOT:** Whenever possible try to avoid the use of NOT logical operator.
- **Optimize Conditionals:** When using multiple AND conditions, write the condition most likely to be false first. When using multiple OR conditions put the condition most likely to be true first. Also with `WHERE` clauses, if you have 
```SQL
-- Efficient; since AND, we put the most likely to be false first.
WHERE department_id = 5 AND salary > 50000;

-- Less efficient
WHERE salary > 50000 AND department_id = 5;

-- Efficient, since OR, we put the most likely to be true first.
WHERE department_id = 5 OR location = 'New York';

-- Less efficient 
WHERE location = 'New York' OR department_id = 5;
```
- **Avoid `SELECT *`**: Essentially fetch the columns you need.
```SQL
-- Less efficient
SELECT * FROM employees;

-- More efficient
SELECT first_name, last_name, department_id FROM employees;
```
- **Use `LIMIT` with larger datasets:** If you only need a subset of results, use `LIMIT` to reduce the number of rows returned.
- **Remember how wildcards affect indices:**
```SQL
-- Indices start from the beginning of a string. By using a wildcard at the start 
-- you're looking for a substring at any position, therefore an index won't be useful.

-- Not useful
WHERE title LIKE '%cake%';
WHERE title LIKE '%cake';

-- Index works here
WHERE title LIKE 'cake%';
```
- **Use appropriate data types:** Use the smallest data type that cna hold your data. For example use `TINYINT` instead of `INT` for small integers. Use `VARCHAR(50)` instead of `TEXT` for shorter text fields.
- **Optimize JOINs:** Use `INNER JOIN` when only matching rows are needed. Also filter early, so apply filters in the `WHERE` clause to limit rows before performing the join.
- **Optimize subqueries:** Replace subqueries with JOINs when possible. 
```SQL
-- Less efficient
SELECT name FROM employees WHERE department_id = (SELECT id FROM departments WHERE name = 'HR');

-- More efficient
SELECT e.name FROM employees e 
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'HR';
```
- **Use Batch updates and inserts:** I mean one query is more efficient than multiple.
```SQL
INSERT INTO orders (id, customer_id) 
VALUES (1,101), (2, 102), (3, 103);
```
