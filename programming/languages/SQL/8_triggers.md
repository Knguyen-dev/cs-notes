# Triggers
Event listeners for your database. When an event happens such as inserting, updating, and deleting, we can have a trigger to do things such as checking data, handling errors, etc.

'employees' table
------------------------------------------------
employee_id | first_name | last_name | hourly_pay | salary | job | hire_date | supervisor_id


### Ex 1:
Let's create a trigger that calculates an employee's salary, whenever the hourly_pay is updated. So before hourly pay is updated, the SQL code in this trigger should execute.

```
CREATE TRIGGER before_hourly_pay_update 
BEFORE UPDATE ON employees 
FOR EACH ROW
SET NEW.salary = (NEW.hourly_pay * 2080)
```
So before there's an update on the employee's table, update each row. We set the salary to the (hourly pay * 2080). We use the 'NEW.' keywords so that SQL knows to use the new values, rather than the old values. Now after running this, in MySQL, we've created the trigger.

```
// After running this statement, our trigger will run. Taking the new hourly_pay defined in this 
// statement and updating the salary column.
UPDATE employees
SET hourly_pay = 50
WHERE employee_id = 1
SELECT * FROM employees;

```

### Ex. 2:
Before we insert an employee, let's calculate their salary. Of course we assume salaries isn't passed on the insert statement. So here we're creating the trigger
```
CREATE TRIGGER before_hourly_pay_insert
BEFORE INSERT ON employees
FOR EACH ROW
SET NEW.salary = (NEW.hourly_pay * 2080)
```

```
// Then after insertion, the salary should be calculated.
INSERT INTO employees
VALUES(6, "Sheldon", "Plankton", 10, NULL, "janitor", "202301-07", 5);
```


### Ex. 3
'expenses' table
------------------------------------------------
expense_id | expense_name | expense_total
1             salaries      100000

```
// Let's say that now we have this table as well
CREATE TRIGGER after_salary_delete
AFTER DELETE ON employees
FOR EACH ROW
UPDATE expenses
SET expense_total = expense_total - OLD.salary
WHERRE expense_name = "salaries";
```
Now when you delete a row from the employees table, we update 
the expenses table. More specifically we update the 'salaries'
expense and modify its expense_total. Here 'OLD.salary' refers to 
the deleted employee's salary attribute. Of course when deleting there's no new 'salary' value we pass in, so using 'OLD.' makes sense. So we subtract their salary
from our 'salaries' expenses.



# Credits:
- [MySQL: Triggers - Bro Code](https://youtu.be/jVbj72YO-8s?si=9D23wtQDcXEVXvOm)