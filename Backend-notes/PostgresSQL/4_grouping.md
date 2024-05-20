# Grouping Data

## Group By
You're dividing rows from your select statement, into gropus or boxes. Then in each group you apply an 'aggregate function' such as SUM(), or COUNT() to do a calculation based on the entire group

The order: FROM => WHERE => GROUP BY => HAVING => SELECT => DISTINCT => ORDER BY => LIMIT

```
<!-- Here's the basic syntax. Essentially you'd use an aggregate function and then a GROUP BY.-->
SELECT 
   column_1, 
   column_2,
   ...,
   aggregate_function(column_3)
FROM 
   table_name
GROUP BY 
   column_1,
   column_2,
   ...;
```

#### Examples with GROUP BY
```
<!-- Separate all rows and group them in boxes based on their customer_id. So in each box, it'll have rows for payments for the same customer_id. Then get the sum of the amounts in all rows. -->
SELECT 
    customer_id,
    SUM(amount)
FROM 
    payment
GROUP BY
    customer_id
    
<!-- Filter rows in the group created by the GROUP BY using 'HAVING'. So when summing up the amounts in the rows, only add to the total when a given row has an amount greater than 200. -->
SELECT 
  customer_id, 
  SUM (amount) total 
FROM 
  payment 
GROUP BY 
  customer_id 
HAVING 
  SUM (amount) > 200 
ORDER BY 
  amount DESC;
```

## Union operator
Combine result sets from two or more select statements into a single result set. You can use 'UNION' which by default removes all duplicate rows from our final data set. To keep duplicate rows, use "UNION ALL"

```
SELECT
    select-list
FROM A
UNION
SELECT
    select_list
FROM B;

SELECT select_list
FROM A
UNION ALL
SELECT select_list
FROM B;
```

## Intersect operator
Returns a result set containing rows that are available in both sets

```
SELECT select_list
FROM A
INTERSECT
SELECT select_list
FROM B;
```

## Except Operator
Return a result set of rows that appear in the first result set but not in the second one.

Note that the number of columns and their orders must be the smae in the two queries. The datat types of the respective columns must be compatible.
```
SELECT select_list
FROM A
EXCEPT
SELECT select_list
FROM B;
```

## More grouping
A 'grouping set' is a set of columns you group together using the GROUP BY clause.

#### Examples
Group the rows based on their brand values. So the rows are put in boxes where the brand value is the same. Then we select the brand, for each group, and then sum the 'quantity' for each group
```
SELECT
    brand,
    SUM (quantity)
FROM
    sales
GROUP BY
    brand;
```
 brand | sum
-------+-----
 ABC   | 300
 XYZ   | 400
(2 rows)

Here the grouping set is (brand, segment). So we'll put the rows in groups based on their brand, and then their segment values. 

So a group could be brand 'XYZ' AND segment is 'Premium'. So this group would contain all rows where brand = "XYZ" and segment = 'Premium'. Then we select the brand and segument, then sum up the quantity for all of those rows.
```
SELECT 
    brand,
    segment,
    SUM (quantity)
FROM 
    sales
GROUP BY
    brand,
    segment;
```
 brand | segment | sum
-------+---------+-----
 XYZ   | Basic   | 300
 ABC   | Premium | 100
 ABC   | Basic   | 200
 XYZ   | Premium | 100
(4 rows)

Of course there's more about grouping, like generating multiple groups, cube, and rollup. 


