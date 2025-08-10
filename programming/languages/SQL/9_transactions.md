# Transactions:
A group of commands that affect the database. The catch is, if all commands inside our transaction 'block' or unit complete successfully, only then will we actually commit our changes to the database. However if one of the commands fail, then we stop our entire operation and rollback any changes that our transaction made. This ensures that either all of the commands succeed, or none of them do, and by putting our stuff in a transaction we can rollback stuff if we want.

## Ex. 1
```
// Here we create a transaction where we are updating the age value for an employee. 
BEGIN TRANSACTION
UPDATE employee SET e_age = 30 WHERE e_name = "Sam";

// After we run the transaction, we can also choose to revert the changes and rollback its changes
ROLLBACK TRANSACTION;


// However, after running the transaction we can choose to commit it. Now the changes are saved and there are 
// no ways of rolling it back.
COMMIT TRANSACTION;
```

## Ex. 2
Here we have a try/catch, it works how you expect. We have a transaction that will update the salaries of employees, based on their gender. If the transaction succeeds, we'll commit the changes of the transaction to the database, but if there was something wrong with the transaction, we roll it back. In this case, when we do 19/0, that is an error ,that's thrown, and caught in our catch block. We rollback any change made, which here would be the first update statement that completed before we tried our second one.
```
BEGIN TRY
	BEGIN TRANSACTION
	UPDATE employee set e_salary=50 WHERE e_gender = "Male"
	UPDATE employee set e_salary=19/0 WHERE e_gender = Female"
	COMMIT TRANSACTION
	Print "transaction committed"
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION
	Print "transaction rollback"
END CATCH
```


# Credits:
1. [Transactions in SQL](https://www.youtube.com/watch?v=20SXjcg6EIw)