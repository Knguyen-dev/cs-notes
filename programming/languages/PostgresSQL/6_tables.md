# Managing tables

## Create Table
Basic syntax. We also have 'IF NOT EXISTS' to create a table only when it doesn't exist. But the rest is basic stuff: define the column name, the data type, and a constraint for the column.

### Here are some of the common column constraints:
- NOT NULL: Value of the column can't be null.
- UNIQUE: Ensures value in the column can uniquely identifies the row in the table.
- PRIMARY KEY: Defines a primary key; the main identifier for a row in the table.
- CHECK: Ensures the column value must satisfy a boolean expression. For example, the value in the price column should be zero or positive.
- FOREIGN KEY: Defines a foreign key; primary key from another table.
```
<!-- Basic syntax -->
CREATE TABLE [IF NOT EXISTS] table_name (
   column1 datatype(length) column_constraint,
   column2 datatype(length) column_constraint,
   ...
   table_constraints
);
```

#### Examples for creating a table
```
<!-- Create a table of users-->
CREATE TABLE users (
    <!-- Use 'SERIAL' for an auto-incrementing primary key. This is implicitly not null-->
    userId SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_login
)
```

## Select into
Creates a new table and inserts data returned from a given query into said table. Of course the new talbe will have columns with the same name as the columns from the result set.

```
SELECT 
  select_list I
INTO [ TEMPORARY | TEMP ] [ TABLE ] new_table_name 
FROM 
  table_name 
WHERE 
  search_condition;
```
The 'TEMP' or 'TEMPORARY' is an optional keyword that allows us to create a temporary table instead. The keyword 'table' is also optional, but you can include it to make things more readable. Finally the WHERE clause allows us to filter out and include certain rows that we want to include in the new table

NOTE: For PL/pgSQL, the procedural language for postgres, you can't use 'SELECT INTO'. Instead use 'CREATE TABLE AS'.

```
<!-- Create a new table 'film_r' from our select statement. So in this new table we'll include film_id, title, and rental_rate columns from rows in the film table. Then only include the rows with a certian rating AND rental duration.-->
SELECT
    film_id,
    title,
    rental_rate
INTO TABLE film_r
FROM
    film
WHERE 
    rating = 'R'
AND rental_duration = 5
ORDER BY
    title;
```

## Create Table AS
Same as select into as we are just creating a new table and filling it with data returned by a query.

```
<!-- Creating a new table 'action_film' and filling it with rows from our result set. So join film and film category rows when the film_id match. Then for these rows, only include the row with category_id = 1 in the result set. -->
CREATE TABLE action_film
AS
SELECT
    film_id,
    title,
    release_year,
    length,
    rating
FROM 
    film
INNER JOIN film_category USING (film_id)
WHERE
    category_id = 1;
```

## Altering tables 
```
<!-- Basic or general syntax -->
ALTER TABLE table_name action;

<!-- Rename a table, we'll use the 'IF EXISTS' to avoid renaming a table that doesn't exist -->
ALTER table IF EXISTS table_name 
RENAME TO new_table_name;

<!-- Add a column -->
ALTER TABLE table_name 
ADD COLUMN column_name1 data_type constraint;

<!-- Drop a column -->
ALTER TABLE table_name 
DROP COLUMN column_name;

<!-- Alter a particular column. Using 'set data type' and 'type' are the same. -->
ALTER TABLE table_name
ALTER COLUMN column_name
[SET DATA TYPE | TYPE] new_data_type;

<!-- The 'USING' keyword allows you to convert the values of a column to new ones -->
ALTER TABLE table_name
ALTER COLUMN column_name TYPE new_data_type USING expression;

<!-- Renaming a column -->
ALTER TABLE table_name 
RENAME COLUMN column_name TO new_column_name;

<!-- Dropping a table; Our 'CASCADE' will remove the table and its dependent objects, whilst RESTRICT stops the remove if there are objects depending on the table. The latter is the default. -->
DROP TABLE [IF EXISTS] table_name 
[CASCADE | RESTRICT];

```

## Sequences
A database object that allows us to generate a sequence of unique integers. 
```
REATE SEQUENCE [ IF NOT EXISTS ] sequence_name
    [ AS { SMALLINT | INT | BIGINT } ]
    [ INCREMENT [ BY ] increment ]
    [ MINVALUE minvalue | NO MINVALUE ] 
    [ MAXVALUE maxvalue | NO MAXVALUE ]
    [ START [ WITH ] start ] 
    [ CACHE cache ] 
    [ [ NO ] CYCLE ]
    [ OWNED BY { table_name.column_name | NONE } ]
```