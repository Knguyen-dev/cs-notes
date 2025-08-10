# Joins

## INNER JOIN
```
<!-- Combine and return the rows from both tables, when the values of the 'column_name' columns match. -->
SELECT 
  select_list 
FROM 
  table1
INNER JOIN table2 
  ON table1.column_name = table2.column_name;
  
 <!-- Since both tables have the same column name 'column_name', we can use the USING syntax to do same query -->
SELECT 
    select_list
FROM table1
INNER JOIN table2 USING (column_name);
```
For each row in table1, compare the column_name value of every row in table 2. If values are equal, create a new row that includes all columns from both tables and add it to result set. Else move on to next row to do matching process.

You can think of it as comparing each row from the first table with every row from the second table. In actuality, it's like a Cartesian product, as we do this comparison for each row with table 1 with every row in table 2 until all combinations have been examined. It doesn't stop at the first match. This rule applies to the inner join and then the outer joins (left, right, and full), and all other types of joins. 

```
SELECT 
  c.customer_id, 
  c.first_name || ' ' || c.last_name customer_name, 
  s.first_name || ' ' || s.last_name staff_name, 
  p.amount, 
  p.payment_date 
FROM 
  customer c 
  INNER JOIN payment p USING (customer_id) 
  INNER JOIN staff s using(staff_id) 
ORDER BY 
  payment_date;
```
Double join example, using table aliases. So join the customer and payment tables, ensure that the customer_id matches so we find the appropriate customer-payment rows. Then join the result with staff, which correlates the payment to the staff who orchestrated it.


## Left join
For each row in table 1, compare it aginst  to every row in table2. Compare the column_name values, if the values match, combine the rows into one row (columns from select_list) and put that in the result set.

Else if the values don't match, we'll still return columns in select_list. However, only include column values from the left table (table1), and any column values from the right value are nulled.
```
SELECT 
  select_list 
FROM 
  table1
LEFT JOIN table2 
  ON table1.column_name = table2.column_name;
```
- NOTE: Good when selecting rows from one table that may  any matching rows in another.

## Right Join (Right outer join):
You already get the gist. This time if the column values match, then return the values of both columns (select_list) in a single row.

Else if the columns don't match, only return the values of the right table, whilst columns values of left values would be nulled.

So any columns in select_list involved with table2 (right table) keep their values, then any columns in table1 (left) table, have their values nulled in the result set.
```
SELECT 
  select_list 
FROM 
  table1
LEFT JOIN table2 
  ON table1.column_name = table2.column_name;
```

## Self-Joins
Joining a table with itself. You'd do this when querying hierarchical data or comparing rows within the same table.

For each row in table_name, compare it to every OTHER row in table_name. If the first_name values match, return select_list, keeping values from both tables.

Here we're using table aliases t1 and t2 to achieve the join.
```
SELECT select_list 
FROM 
    table_name t1 
INNER JOIN
    table_name t2
ON t1.first_name = t2.first_name;
```

Do a self-join on the film table. For each film, compare it to every OTHER film, using a self-join and some aliases. If the film_id of the left table (current row) is greater than the film_id (other row) of the right, and the lengths are equal, then return both rows columns.


```
SELECT
    f1.title,
    f2.title,
    f1.length
FROM 
    film f1
INNER JOIN film f2 
ON 
    f1.film_id > f2.film_id AND f1.length = f2.length;
```

## Full Outer Join
Combines inner, left and right join. So get the result set from the inner join, then add on the result set of the left join, and finally add the result set from the right join.

```
SELECT select_list
FROM table1
FULL OUTER JOIN table2
ON table1.col_name = table2.col_name;
```
1. For each row in tabl1 compare it to every row in table2, if the col_name values match, then return select_list and ensure columns from both tables are populated. Eventaully we get the result set of an INNER JOIN.
2. If the col_name match, then return select_list with columns from left table defined, whilst columns from right table are nulled. Here we get the result set from the LEFT Join and add it onto the result set gained by the inner join.
3. You get the gist by now. You get the result set from the right join. In the end you have the result set from all 3 joins: left, right, and inner.

## Cross Join
Combine each row from the first table with every row from the second table, resulting in a complete combination of all rows. Unlike other joins, this doesn't require a join predicate or condition, we just join the rows to get all row combinations.

If table1 has n rows and table2 has m rows, we get a result set with n x m rows. So if table1 has 10 rows, and table2 has 10 rows, the result set has 100 rows.
```
<!-- Cross join -->
SELECT
    select_list
FROM 
    table1
CROSS JOIN table2;

<!-- Equivalent statement -->
SELECT
    select_list
FROM 
    table1, table2;
    
<!-- Let's create a schedule that lists all possible combinations of employees and thier shifts -->
SELECT * FROM employees CROSS JOIN shift;
```

## Natural Join
A natural join is where we let the dbms assume the join condition to join on, rather than letting a programmer decide it. Note that this is not recommended due to the lack of control.

```
<!-- Here we're doing an natural inner join. So it's just an inner join but we'll let the computer infer the common columns to join on.-->
SELECT select_list
FROM table1
NATURAL INNER JOIN table2;
```