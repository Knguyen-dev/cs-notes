# Queries

## Creating items:
Use 'INSERT INTO' and specify the table and also the columns you're modifying. Then use the 'VALUES' keyword to specify the values you're putting into that column.
```
INSERT INTO bands(name)
VALUES ('Iron Maiden');
```
You can also insert multiple items, just keep the values comma separated.
```
INSERT INTO bands (name)
VALUES ('Deuce'), ('Avenged Sevenfold'), ('Ankor');
```

## Reading/Querying with SELECT:
Use 'SELECT' and 'FROM' keywords to indicate the columns you're getting, and the table you're targetting. Here I put a '*' to indicate we want all columns. In our second query we get all of the rows, but only get the 'name' column.
```
SELECT * FROM bands;

SELECT name FROM bands;
```
Limiting our query to get the first two rows.
```
SELECT * FROM bands LIMIT 2;
```
Sorting our results with 'ORDER BY'. Here when we get back our results, we sort them in alphabetical order because we ordered by name, which is a string.
```
<!-- Ascending order (alphabetical) -->
SELECT * FROM bands ORDER BY name;

<!-- Also ascending order -->
SELECT * FROM bands ORDER BY name ASC

<!-- Descending order -->
SELECT * FROM bands ORDER BY name DESC;
```
### Using AS keyword:
You can also modify the column names we get back from the query.
So here we want only the id and name columns, but when we get them back they will be returned as 'ID' and 'Band Name' respectively. 
```
SELECT id AS 'ID', name AS 'Band Name' from bands;
```

Gives us all of the unique names. Really just gets all names and removes duplicates and gives us back the results 
```
SELECT DISTINCT name FROM albums
```

## Updating rows in our tables
Now this is wrong, this would update all rows to have release_year = 1982. 
To do conditional queries, use the WHERE keyword.
```
<!-- Updates all rows -->
UPDATE albums SET release_year = 1982;

<!-- Updates row with id of 1 -->
UPDATE albums SET release_year = 1982 WHERE id = 1;
```

## Conditional Queries
Get all rows where the release_year is less than 2000
```
SELECT * FROM albums WHERE release_year < 2000;
```
You can also match patterns using 'LIKE' keyword. So here get all rows where the name matches '%er%'. So any amount of characters before and after percent symbols, but somewhere in the string it must have the letter sequence 'er'.
```
SELECT * FROM albums WHERE name LIKE '%er%';
```
Using OR operator so that the result is returned either condition is met. So here we return the result when the band's name as 'er' in it, or if the id of the band is 2.
```
SELECT * FROM albums WHERE name LIKE '%er%' OR band_id = 2;
```
Using AND operator so that rows are returned when they meet both conditions. 
```
SELECT * FROM albums WHERE release_year = 1984 AND band_id = 1;
```
You can use 'BETWEEN' to select a range a values a numerical field has to be under. So here we want all albums that were released between 2000 and 2018 inclusive.
```
SELECT * FROM albums WHERE release_year BETWEEN 2000 AND 2018;
```
You could also look for when the field is null. So here we want all albums where the release_year property is null.
```
SELECT * FROM albums WHERE release_year IS NULL
```

## Deleting rows 
Delete the row from albums table that had an id of 5
```
DELETE FROM albums WHERE id =5;
```