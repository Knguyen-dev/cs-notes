# Modifying data

## Insert statement
```
<!-- Basic syntax, you define the columns, and then the values you're inserting associated with those columns.-->
INSERT INTO table1(column1, column2, …)
VALUES (value1, value2, …);

<!-- Insert statements return output in the fomr of an oid nad count. The OID is an object idnetifier, and the INSERT statement usually returns a 0. Then count is the number of rows that were inserted successfully.-->

INSERT oid count

<!-- Returning clause: An optional clause that returns the information of the inserted row. So like here, we insert a row, and then we use '*' to return the entire row-->

INSERT INTO table1(column1, column2, …)
VALUES (value1, value2, …)
RETURNING *;

<!-- Insert row into table, and return the primary key after we're done. -->
INSERT INTO table1(column1, column2, …)
VALUES (value1, value2, …)
RETURNING id;
```


#### Examples with insert
```
CREATE TABLE links (
    <!-- Auto-incrementing primary key; NOT NULL is implicit here since we defined it as a PRIMARY KEY' -->
    id serial PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    last_update DATE
);

<!-- Insert a row into the table and get the primary key for it-->
INSERT INTO links (url, name)
VALUES('https://www.postgresqltutorial.com','PostgreSQL Tutorial')
RETURNING id;

<!-- Inserting multiple rows. Insert is atomic, meaning either all rows are inserted or none of them are. Then return the id values of those inserted rows-->
INSER INTO links (url, name)
VALUES
    ('http://link1.com', 'Link 1'),
    ('http://link2.com', 'Link 2'),
    ('http://link3.com', 'Link 3');
RETURNING id;
```

## Update
```
<!-- Update column1 and column2 values for all rows in table 'table_name' that meet the condition. If no condition, then all rows will be updated.-->
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;
```

## Update Join
Updating data in one table based on values in another table. 

For each row in table1, compare it to every row in table 2. If the c2 columns of the rows match, then we'll update the c1 value of the row from table1.
```
UPDATE table1
SET table1.c1 = new_value
FROM table2
WHERE table1.c2 = table2.c2;
```

## Delete
Allows us to delete one or more rows from a table. 
```
<!-- Here we'll delete rows from 'table_name' table, where the condition is true for those rows. We're also returning those deleted rows -->
DELETE FROM table_name
WHERE condition
RETURNING *;
```

## Delete Join
PostgreSQL doesn't support DELETE JOIN like MySQL, but we can achieve this with USING keyword. 

For each row in t1, compare it to every row in t2, if their id values match, delete the row from t1.
```
DELETE FROM t1
USING t2
WHERE t1.id = t2.id;
```