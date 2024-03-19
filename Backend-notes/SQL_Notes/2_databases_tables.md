## Database commands
Creates a database
```
CREATE DATABASE <database_name>;
```

Deletes a database. Note that you'll probably never use this though, since we usually never delete databases.
```
DROP DATABASE <database_name>;
```

Select a database to be a target for your queries. By doing this, you're letting MySQL know which database you're SQL-statements are directed towards.
```
USE <database_name>;
```

## Table commands:
Use the command to create a table, and when doing this you must specify the columns for that table. Here we created a table called 'test' that has a column called 'column_1' that accepts integers.
```
CREATE TABLE test (
  column_1 INT
)
```
Let's add a column to an existing table. We added a new column 'column_2' that accepts 'VARCHAR', which is just a string. We specified a maximum length of 255 characters on that string. 
- NOTE: Note that this is one command, but we can put line breaks. As long as there's a semi-colon at the end, the command is complete.
```
ALTER TABLE test 
ADD column_2 VARCHAR(255);
ADD column_3 VARCHAR(255) NOT NULL; // ensures column value is required and not null.
```
Let's drop that table
```
DROP TABLE test
```


# Band Example:
Every table needs an id to differentiate each item. Here we make it so id can't be null, and each time we add an item, a band in this case, the DBMS automatically increments the id to create a new unique id. We also have to indicate that 'id' is the primary key, the unique identifier for rows in this table.

- NOTE: Know that querying via ID (primary key) will be much quicker than other columns because, the primary key column is indexed.
```
CREATE TABLE bands (
	id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);
```

Create a table for albums created by bands. Typical stuff, release_year doesn't have 'NOT NULL' because maybe it's an unreleased album or we don't know when it was released. We want to link an album to the band that created the album, so we'll use a foreign key. A foreign key is just a primary key from a different table. So here we'll have a band_id column to contain the id of the band that created the album

So band_id can't be null since each album will need a band. Then we use the foreign key keywords to indicate 'band_id' contains the foreign key. This foreign key is from/references the 'id' column of the 'bands' table. 

Now sql won't let us create an album, if the band_id is invalid, and we won't be able to delete a band that has albums linking to that band. So to delete a band, you must first delete the albums associated with it. So we've created a one-to-many relationship.
```
CREATE TABLE albums (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  release_year INT,
  band_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (band_id) REFERENCES bands(id)
);
```
