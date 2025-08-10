# Extra about SQL
Just some extra info about SQL.


## Common data types:
1. Numeric/Number(L,D): The declaration Numeric/Number (7,2) Indicates numbers will be stored with TWO decimals places and may be up to SEVEN digits
2. INTEGER/INT: Stores integers.
3. SMALLINT: Stores integer values but only up ot 6 digits. So if you have relatively small integers, use small int
4. Decimal(L,D): Stores decimals
5. CHAR(L): Stores fixed-length character data, maximum of 255 characters. Remaining spaces are left unused. 
6. Varchar(L): Variable length character data. So Varchar(25) lets you store up to 25 characters, but it won't leave unused spaces.
7. Date: Stores dates in Julian format.

## Common SQL Constraints:
1. FOREIGN KEY: Lets you set a foreign key and reference it
2. NOT NULL: Ensures column doesn't accept null.
3. UNIQUE: Ensures all values in a column are unique.
4. DEFAULT: Assigns a default value to an attribute when a new row is added.
5. CHECK: Used to validate data when an attribute is entered. Commonly used to limit the values that can appear in an attribute. It enforces/establishes a domain of values.

## Virtual Tables:
A view is a virtual table, or output table that doesn't exist in the database. For example, let's say we had a customers table:

'customers' table
--------------------------------
customer_id | first_name | last_name | email | balance | subscription_tier | ... etc ...

Our SQL query below, when executed will return us a virtual table or view that just has the first and last names of the customers. It's still a table, but it's not a table that exists in our database, but rather a table that was a result of a query. 
```
SELECT first_name, last_name FROM customers;
```

## Auto Increment, Identity, and sequences
1. Identity in Microsoft SQL Server: The IDENTITY property in Microsoft SQL Server is used to automatically generate unique numeric values for a column. When defining a column with the IDENTITY property, you can specify the starting value (a) and the increment value (b). For example, IDENTITY(1,1) means the column will start at 1 and increment by 1 for each new row. It's a convenient way to ensure uniqueness in primary key columns without explicitly specifying values.

2. Auto Increment in MySQL: In MySQL, the AUTO_INCREMENT attribute is used for a similar purpose as IDENTITY in Microsoft SQL Server. When a column is defined with AUTO_INCREMENT, MySQL automatically generates a unique numeric value for each new row inserted into the table. By default, the column starts at 1 and increments by 1 for each new row.

3. Sequences: Database objects that are used to generate unique sequential values. Sequences aren't directly related to a specific column (such as the primary key column). Think of them as separate objects that are used to generate unique values for any column, for any table, within the database.

## Procedural SQL
An extension of SQL that adds programming capabilities such as functions/procedures, variables, and control flow. The main 3 concepts we should know: 
1. Stored Procedures
2. Triggers
3. Procedural SQL Functions
