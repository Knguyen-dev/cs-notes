## Stored Procedure:
Prepared SQL code that you can save. This is great if there's a query you write often. 

```
// This is pretty long, let's write a procedure called 'get_customers' that executes this sql code.
SELECT DISTINCT first_name, last_name
FORM transactions
INNER JOIN customers
ON transactions.customer_id = customers.customer_id;

// Then we'd call that procedure to execute the SQL statements. As a result it's less to write and reusable.
CALL get_customers();
```

### Ex. 1:
We do 'CREATE PROCEDURE' and then the function signature. Then we put our SQL statements inside our 'BEGIN' and 'END' keywords. Now an issue would be that SQL statements end in ';'. However if we use semi-colons inside, then it looks to mySQL that our SQL statements end inside the BEGIN and END keywords, when we want everything to stop at 'END;'. The solution is to temporarily change the delimiter to a standard such as '//' or '$$', and then change it back to semi-colon once the procedure is done. This ensures your DBMS won't stop the execution at the SQL statment inside our procedure, and ensures to stop your procedure at the 'END' keyword.
```
DELIMITER $$
CREATE PROCEDURE get_customers()
BEGIN
  SELECT * FROM customers;
END $$
DELIMITER ;
```
Then to use the procedure use the "CALL" keyword and call the procedure like a regular function
```
CALL get_customers();
```
You can also delete procedures
```
DROP PROCEDURE get_customers;
```

### Ex.2:
Let's create a procedure that finds a customer when given the customer_id. So to define a parameter you need to have keyword "IN", then the parameter name which is "id', and then the datatype of the parameter, an integer in this case.
```
// Creating stored procedure
DELIMITER $$
CREATE PROCEDURE findCustomerByID(IN id INT)
BEGIN
  SELECT *
  FROM customers
  WHERE customer_id = id;
END $$
DELIMITER ;

// Calling stored procedure and pass in ID
CALL findCustomerByID(1);
```


### Ex. 3
Create a procedure that finds a customer, given the first name and last name.
```
// Create our procedure
DELIMITER $$
CREATE PROCEDURE findCustomerByID(IN fname VARCHAR(50), IN lname VARCHAR(50))
BEGIN
  SELECT * 
  FROM customers
  WHERE first_name = fname AND last_name = lname;
END $$
DELIMITER ;

// Call our procedure and pass in the parameters if the stored procedure
CALL findCustomerByID("Larry", "Bird");

```

# Credits:
- [MySQL: Stored Procedures - Bro Code](https://www.youtube.com/watch?v=oagHZwY9JJY)