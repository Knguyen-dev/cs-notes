CREATE DATABASE record_company;

USE record_company;

CREATE TABLE bands (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE albums (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  release_year INT,
  band_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (band_id) REFERENCES bands(id)
);

INSERT INTO albums (name, release_year, band_id) VALUES ("PowerSlave", 1984, 2);


/*
+ Join: Allows us to join two different tables together based on a property, which will result
	in a combined table of stuff that match our conditions. It allows us to create powerful queries and make use of relationships.
    

- Now there are three types of JOIN operations:
We have left, inner, and right join. To preface our explanations, just know that the table you write first
is the table on the left and the table you write second is the table on the right. See example 1 for 
an example on it.

1. INNER JOIN: The default join method. You'll see this in our first example.
	Combines data when the specified join condition is true for both tables.
    
    For example, let's join these tables based on their id values.
    SELECT table1.id, table1.name, table2.age FROM table1 INNER JOIN table2 ON table1.id = table2.id;
    We're using inner join, meaning it's going to join both of the 
    rows when the condition is met. So in the end you get this, 
    and you don't see 'Charlie' because there wasn't a resulting 
    row in the table2 that had a pk of '3'. So if the condition
    evaluates to false, the rows from the two tables are discarded.
    | id | name   | age |
	|----|--------|-----|
	| 1  | Alice  | 25  |
	| 2  | Bob    | 30  |

'table1'
| id | name   |
|----|--------|
| 1  | Alice  |
| 2  | Bob    |
| 3  | Charlie|

'table2'
| id | age |
|----|-----|
| 1  | 25  |
| 2  | 30  |
| 4  | 35  |

2. LEFT JOIN: Left join returns all rows from the left table and the matched rows from the right table. 
	If there is no match, the result is NULL on the right side.

3. RIGHT JOIN: Right join returns all rows from the right table and the matched rows from the left table. 
	If there is no match, the result is NULL on the left side.
*/

/*
- Ex. 1: Inner Join
1. Get all columns from the bands table and we want to 'join' it with the albums table. But
	let's specify how this will be joined, so we'll join the rows of the different tables 
    based 'ON' a certain condition.
2. We will join the rows of the tables ON the condition that the 'bands.id' (of a given row) = albums.band_id (of a given)
	row. So only join when bands primary key matches the album's 'band_id' foreign key. 
3. As a result, we should just get a combined table with 'bands', and the the album associated with them.
We should get output like this:

'1', 'Metallica', '1', 'Master of Puppets', '1986', '1'
'2', 'Iron Maiden', '7', 'The Number of the Beast', '1982', '2'
'2', 'Iron Maiden', '3', 'Power Slave', '1984', '2'

- Takeaway: Here we have the 'id' and 'name' (all columns from bands table), and then joined with it are 
all of the columns from the 'albums' table. Now we a table with rows for each band and associated albums.
Again it is simply joining two rows together based on whether or not the ON condition is true, and in this case 
it's when the band id (pk) equals the band_id (fk). You'll notice that since "Iron Maiden' has 2 albums, there 
are two rows for it. So it has to list the band 'Iron Maiden' twice, and then the separate 'albums' associated with 
it. Inner joins are good if the condition is true for both tables.

- NOTE: At least in mySQL 'JOIN' and 'INNER JOIN' are equivalent, as inner join is the default. Note that here the 
table on the left is the 'bands' table, whilst the table on the right is the 'albums' table.

*/
SELECT * FROM bands
JOIN albums ON bands.id = albums.band_id;

/*
- Ex. 2: Left JOIN. For a left join, we return the left table 
	here (bands), and if the join condition then we return the 
    right table as well. Here there's a chance that your right 
    table could be null for some rows. For example, the band 
    'Pink Floyd' from the bands table had a match as its 
    right side is associated with an album. However, notice how 
    the 'Ankor' band doesn't the rows from the right table. This is 
    because for the 'ankor' row, there were no rows in the albums table 
    that evaluated to true for its conditional. It took the 'ankor' row 
    from the 'bands' table and tried to find a row in the 'albums' table to match
    it, but it couldn't so it returned null for the right table.
    
    
'6', 'Pink Floyd', '6', 'The Dark Side of the Moon', '1973', '6'
'7', 'Ankor', NULL, NULL, NULL, NULL

- Ex. 3: Right JOIN, same concept but we always return the right side, and if there's a match we 
	return the left side. So here we just swapped it around, so we always return right table (bands) and 
    potentially return our left table (albums). Here is an example output:
    
    NULL, NULL, NULL, NULL, '7', 'Ankor'

- Takeaway: For the most part you'd normally use inner or left joins. You're probably not going to use right joins alot because 
	they are just LEFT joins but switched which may make things more confusing. Left joins are good if you want to get the entire
    left table, and rows for the right table if they exist based on your condition.
*/

SELECT * FROM bands LEFT JOIN albums ON bands.id = albums.band_id;
SELECT * FROM albums RIGHT JOIN bands ON bands.id = albums.band_id;


/*
+ Aggregate functions:
An aggregate operation, is an operation that's done on all rows or items in your data. 

- Example 4: 
1. So here we're finding the average (mean) value for the 'release_year' column in our albums table. This considers all of the rows in the albums table.
2. Finding the sum of the release_year column when considering all rows
3. Returning how many row have 'id' column. Neat way to see how many records you have in the table, so here we have 
	7 albums in the albums table.
*/
SELECT AVG(release_year) FROM albums; 
SELECT SUM(release_year) FROM albums;
SELECT COUNT(id) FROM albums;

/*
+ Group By: Typically used with aggregate, but we do this to find things such as total sales per category. 
Or number of employees per department.

- Example 5: We want to figure out the number of albums for each band. To do that we 
	will get the rows from the albums table, and group them by band_id. Imagine taking 
    each row and putting them in separate boxes, so all rows that belong to band_id = 3 go 
    into one box. 
1. So yeah we want the 'band_id' column and the count for that band_id (number of albums with the same band_id value).
2. We'll group by band_id, so we'll put our rows in separate boxes based on their band_id. This means that each 
	box/group is filled with rows with the same band_id. It is only after these groups have been formed that our 
    aggregate function then does calculations based on these groups. Finally you'd get output similar to this.

band_id | COUNT(band_id)
1	1
2	2
3	1
4	1
5	1
6	1
*/
SELECT band_id, COUNT(band_id) FROM albums
GROUP BY band_id;


/*
- Ex. 6: Using Group By with JOIN operations.
We want to output a table of band names, and the number of albums they have

1. 'b' is an alias or temp name that we use for the 'bands' table. This makes writing queries a little more simple.
	So we decide we're going to output a table 'band_name | num_albums', and the counts of album IDs, after they've been placed in groups 
    with our group by. We'll come to this later. 
    
    
2. We're doing a left join. So our left table is 'bands' whilst our right table is albums. This means that we'll always return the 
	columns for the 'bands' table (band_name and count(a.id)), but if the join condition is true, we'll return the columns for 
    the album's table as well. We also do 'AS a' so that we can reference the albums table as 'a', so our COUNT(a.id) is legal.
	Finally, we only join ON the condition that a bands row's id equals an album's band_id. So only include the album's row 
    on the condition that the band's id matches the album's band_id, which would mean we include the album if the album was made by the band.
    
	So right now we have this if the condition matches. So these are our rows:
    band_name | COUNT(a.id) | id (PK albums table) | name | release_year | band_id (FK)

3. Now let's use GROUP BY. We want to put our rows in boxes based on the ID of the band. 
	As a result, now all of those rows in step 2 are put into boxes based on the band's id, and 
    now our 'COUNT' aggregate function can perform its count operation on each of those boxes.
    Now this is a little complicated if we have aliasing
*/

SELECT b.name AS band_name, COUNT(a.id) AS num_albums FROM bands AS b
LEFT JOIN albums AS a ON b.id = a.band_id
GROUP BY b.id;

/*
- Here's that query without aliasing to make things a little easier to understand 
	if possible.
1. We're going to output a table with 'bands.name | COUNT(albums.id)'
2. Left join, so we're keeping the bands and only join right side when condition is true.
	Since we referenced albums.id in the first step, we'll need to join the table so that 
    it's defined.
3. Group our combined rows into groups based on the id of the band. So all rows with band.id = 1 are
	in the same box. Now it's like:
    
    Now it's the idea that in each box, we have all of the album rows for that specific 
    band. Then our aggregate function can simply count up the number of rows that 
    have 'album.id', which gets us the number of albums for that band.
    band_id = 1 | .... | album.id = 1 | ...extra columns for album table
    band_id = 1 | .... | album.id = 2
    band_id = 1 | .... | album.id = 3
*/
SELECT bands.name, COUNT(albums.id) FROM bands 
LEFT JOIN albums ON bands.id = albums.band_id
GROUP BY bands.id;

/*
+ Filtering by the aggregate:
So let's say we have our aggregate result a table with 'band_name | num_albums'. We want to only get the 
rows where num_albums is greater than a certain value. Here you'd use the 'HAVING' key word instead of the 
WHERE keywored. This is because WHERE is executed before the group by, which isn't good, we want to filter 
after our groupby and aggregate result. Now "HAVING" works because it executes after the groupby and aggregate
function!

So here, we target our groupby & aggregate table, and get only rows where num_albums is greater than 1.
And the HAVING keyword has the same mechanics/syntax as WHERE, it's just it executes after groupby, which 
allows us to filter an aggregate & groupby combination.

*/

SELECT b.name AS band_name, COUNT(a.id) AS num_albums FROM bands AS b
LEFT JOIN albums AS a ON b.id = a.band_id
GROUP BY b.id
HAVING num_albums > 1