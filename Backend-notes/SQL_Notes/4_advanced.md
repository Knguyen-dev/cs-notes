
## Join statement
By using the JOIN keyword, get back results where we join or add
columns from two tables. So when a band's id matches the album's band_id, we join those two rows. As a result you get the band row which has the columns for the name of the band and id, but to the right of it, you get a corresponding album row that matched the condition.
```

<!-- INNER JOIN by default: If the condition matches, join both rows from the tables and return the result -->
SELECT * FROM bands JOIN albums ON bands.id = albums.band_id


<!-- Left join: get everything from left side table, and if it matches condition then join the row on the right table. If it doesn't match condition then we still return the left row, but the right row will be blank. -->
SELECT * FROM bands LEFT JOIN albums ON bands.id = albums.band_id
```

## Aggregate functions
Takes all of the data returned from the SELECT, and runs a function on it to get the aggregate/whole info about something. So you can do functions like 'AVG' to get the average, SUM, COUNT, etc.

In the albums table, get the average value for the release_year property when considering the aggregate, or all albums.
```
SELECT AVG(release_year) FROM albums;
```

## Group By
Used to group rows with identical values into summary rows. Such as finding the total sales per category, or the number of employees in each department. It's usually used with aggregate functions, so that we can perform operations on that entire group.

Here's an example, let'ss say below was is a table called 'sales'. Let's say we wanted see the total amount of 'amount' each category got. 

1. We would use group by to GROUP each row together by category. So we got a group where all rows have category A, and a group where all rows are category B. 
2. Then we would use an aggregate function, meaning we'd do an operation on each time we got. So for each group, get the sum of the 'amount' values from all of the rows in each group.
| category | amount |
|----------|--------|
| A        | 100    |
| B        | 150    |
| A        | 200    |
| B        | 120    |
| B        | 170    |
```
SELECT category, SUM(AMOUNT) AS total_sales FROM sales GROUP BY category;
```
We first select 'category', we want to show show that column as our first column. Then we create a 'total_sales' column. Here we  SUM up the AMOUNT properties of each row in 'sales' when we put those rows in groups of the same category. We get the resulting table below, and our dbms is smart enough to condense our categories since we used 'GROUP BY' as well.
| category | total_sales |
|----------|-------------|
| A        | 300         |
| B        | 270         |
