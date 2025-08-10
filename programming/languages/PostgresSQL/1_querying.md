# Querying data

## Select
Here's the setup if you want to use the CLI
```
psql -U postgres
<!--Change the database to dvdrental database-->
\c dvdrental
```

#### Examples using SELECT
Here are some examples with select. Note that if we select more columns, we're increasing the strain on our database. So keep in mind, select only the data you need
```
SELECT first_name FROM customer;
SELECT * FROM customer;
```
Postgres has a concatenation operator `||` that you put in between strings. Here we get a column that's the full name of a person. It's a 'virtual' column, doesn't exist in the database, it doesn't have a good name, so we can give it an alias
```
SELECT first_name || ' ' || last_name AS full_name FROM customer; 
```
You can also omit the 'AS' keyword to make things shorter if you want. Also the 'FROM' keyword is optional in a select statement, so you can completely remove it.
```
<!-- You typically do it like this when calling a function. Here we get the current date and time on the PostgreSQL server.-->
SELECT NOW();
```

## Column aliases
You can modify the names of our columns when we get them with aliases
```
<!-- col_name is replaced with alias_name when we get the column-->
SELECT col_name AS alias_name FROM table_name;

<!-- Without the AS keyword -->
SELECT col_name alias_name FROM table_name;
```

#### Examples using column aliases
```
<!-- We changed the last_name column to have the name 'surname'-->
SELECT first_name, last_name AS surname FROM customer;

<!-- If the alias contains spaces wrap it in double quotes -->
SELECT first_name || ' ' || last_name AS "Full name" FROM custoemr;
```
You can think of the expression as `first_name || ' ' || last_name`

## Order By Clause
Used to sort the rows we're returned. So it evaluates keywords in order FROM => SELECT => ORDER BY. So first it sees the table, selects data from it, and after we have the data we sort it.  
```
SELECT select_list FROM table_name ORDER BY sort_expression1 [ASC | DESC],
sort_expression2 [ASC | DESC],
```

#### Basic example of ORDER BY
```
<!-- Sort the rows so that first_name is in ascending order. So 'A' at the top and 'Z' at the bottom, increasing as we go down the list. Also 'ASC' is the default so you may omit it if you want.-->
SELECT first_name, last_name FROM customer ORDER BY first_names ASC;

<!-- Function takes a string and returns the number of characters. We created a column 'len' with that and sorted by desc. So the rows are sorted by the length of the last names in descending order!-->
SELECT first_name, LENGTH(first_name) AS len FROM customer ORDER BY len DESC;
```
### Order BY and NULL
WHen sorting rows that contain NULL, you can specify the order in which they appear compared to other non-null values. So 'NULLS FIRST' places those rows with NULL in front of all other non-null rows. Then 'NULLS LAST' places them after. 
```
ORDER BY sort_expression [ASC | DESC] [NULLS FIRST | NULLS LAST]
```
#### Example 
```
<!-- Creates 'sort_demo' table and inserts 4 records, one of them being null-->
CREATE TABLE sort_demo(n INT);
INSERT INTO sort_demo(n) VALUES (1), (2), (3), (null);

<!-- Do query. So here we're sorting in ascending order, which is the default. Then it will place all rows with null after the non-null rows. You may omit 'NULLS LAST' as that's the default. -->
SELECT n FROM sort_demo ORDER BY num NULLS LAST
```
As a result, we get 
```
n
____
1
2
3
null
(4 rows)
<!-- Or something similar to this effect-->
```

## Select Distinct
Removes duplicate rows from the result set. 
```
<!-- Ensures no two rows have the same column1 value. -->
SELECT DISTINCT column1 FROM table_name;

<!-- Ensures no two rows have the same combined value of column1 and column2. -->
SELECT DISTINCT column1, column2 FROM table_name;
```
#### Examples with distinct
```
SELECT DISTINCT rental_rate FROM film ORDER BY rental_rate;
```
Here we return rows with unique rental rates, allowing us to see all of the different rental rates.

