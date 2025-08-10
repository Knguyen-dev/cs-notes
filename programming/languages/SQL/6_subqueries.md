# Subqueries
A subquery is just a query located inside another query. Like in the form query(subquery). The result of the subquery is used then in the main query


### Ex. 1
Let's say we have an employees table:
'employees' table
--------------------------------------------------------------------------
id | first_name | last_name | hourly_pay | job | hire_date | supervisor_id

Let's create a result set that compares the hourly pay of every employee versus the average. First we'll find the average pay. Then we'll display employee info such as first and last names, hourly pay, and their job. Notice in the below example we're getting columns for the names and hourly pay, but we created a subquery that will get the average pay for us. We then we show that column as 'Average Hourly Pay' with the alias. Notice how we wrapped the subquery in parantheses.

```
SELECT 
  first_name, 
  last_name, 
  hourly_pay, 
  (SELECT AVG(hourly_pay) FROM employees) as "Average Hourly Pay"
FROM employees;
```
- NOTE: The subqueries execute first, and imagine that subquery returning a number, like "14.5" or something. Then once subqueries are 
  executed, SQL uses the result of the subquery (a number in this case) to do the main query.

### Ex. 2
Find every employee with an hourly pay that's greater than the average pay. This time you just need to display first_name, last_name, and hourly_pay of each employee that meets this condition. 
```
SELECT
  first_name,
  last_name,
  hourly_pay
FROM employees WHERE employees.hourly_pay > (SELECT AVG(hourly_pay) FROM employees);
```

Here we use a subquery with our WHERE clause. That subquery is going to execute first and return a number for the hourly pay. After we can imagine our subquery like this. Then we execute this SQL query right here, our outer query, and we get all of the employees whose hourly_pay is greater than the average.
```
SELECT
  first_name,
  last_name,
  hourly_pay
FROM employees WHERE employees.hourly_pay > 15.45;
```


### Ex. 3
'transactions' table
-------------------------------------
transaction_id | amount | customer_id
1000              4.99    3
1001              11.65   5
1002 11.          13.54   null
... etc ...

- Problem: Let's find the first and last names of every customer that has ever placed an order.

- Solution:
```
// Gets all customer_id from transactions, so these are the IDS of all customers that have placed an order.
1. SELECT customer_id FROM transactions WHERE customer_id IS NOT NULL;

// However there could be repeats such as customer_id 3 appearing multiple times as they may have had multiple transactions
// In this case use distinct to make sure all customer_id values are unique
2. SELECT DISTINCT customer_id FROM transactions WHERE customer_id IS NOT NULL;

/*
3. Now use that previous query as the subquery. Now select all customers only if their customer_id value matches one 
  of the values we got from our subquery.
*/
SELECT first_name, last_name 
FROM customers 
WHERE customer_id IN (SELECT ;DISTINCT customer_id FROM transactions WHERE customer_id IS NOT NULL)

/*
4. Our subquery is executed first and we're returned a list of customer_id, such as (1,2,3). So our 
  outer query can be imagined something like this. Then our outer query executes.
*/
SELECT first_name, last_name 
FROM customers 
WHERE customer_id IN (1,2,3);
```

## Benefits and drawbacks
The benefit is that if you have queries that you write a lot, then using stored procedures helps reduce repetition when querying. However the drawback is the memory and resources that are taken up in your db connection to actually store the procedure for future use.


# Credits:
- [MySQL: Subqueries - Bro Code](https://www.youtube.com/watch?v=i5acg3Hvu6g)