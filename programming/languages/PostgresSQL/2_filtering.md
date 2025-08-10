# Filtering data

## WHERE Clause
It goes FROM => WHERE => SELECT => ORDER BY. From a table, get all of the rows where a condition is true. Then select specific columns from those valid rows. Finally sort those rows. You can find the list of logical and comparison operators here: [Where Clause](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/)

```
SELECT first_name, LENGTH(first_name) AS name_length FROM customer WHERE first_name LIKE 'A%' AND LENGTH(first_name) BETWEEN 3 AND 5 ORDER BY name_length;
```
Select the first name, and length of the first name, only from rows where first name started with 'A', and the name contained 3 to 5.

## AND and OR operators
- PostgreSQL truthy values: true, 't', 'true', 'y', 'yes', '1'.
- Falsy values: false, 'f', 'false', 'n', 'no', '0'.
```
<!-- falsy -->
SELECT true AND false AS result;

<!-- null -->
SELECT true AND null AS result;

<!-- null; whenever null is involved, the comparison involves to null it seems-->
SELECT false OR null AS result;

<!-- Other syntax for OR operator -->
SELECT false <> null AS result;
```

## LIMIT and OFFSET
Limit will limit amount of rows fetched. Offset will skip the first 'n' rows.
```
SELECT film_id, title, release_year FROM film ORDER BY film_id LIMIT 4 OFFSET 3;
```
Get the films, order them in ascending order (which they should already be in since it's the film_id PK). After we've selected our rows and ordered them, we'll skip the first 3 rows, then take the next 4 rows.

## Fetch
The idea of limit and offset were really popular and common, so they made an updated limit operator. It has the same functionality as limit, but it's just more modern, and is recommended when using newer systems.
```
<!-- Here's of using offset, put offset before, but the second line is how you use fetch -->
OFFSET row_to_skip { ROW | ROWS }
FETCH { FIRST | NEXT } [ row_count ] { ROW | ROWS } ONLY
```

#### Examples for fetch
```
<!-- Get the first row after we've ordered our data-->
SELECT title FROM film ORDER BY title FETCH FIRST 1 ROW ONLY;

<!-- Equivalent to OFFSET 5 LIMIT 5  -->
SELECT title FROM film ORDER BY title OFFSET 5 ROWS FETCH FIRST 5 ROW ONLY;

<!-- Equivalent to LIMIT 10; first and next mean the same thing.-->
SELECT * FROM film FETCH NEXT 10 ROWS ONLY;
```

## IN Operator
Matches any value in a list of values.
```
SELECT
  film_id, 
  title 
FROM
  film 
WHERE
  film_id in (1, 2, 3);
```
Get all films where the film_id matches one of the values in the list (1,2,3). This is the equivalent of using multiple OR operators.

## BETWEEN
```
<!-- Getting the username from all users who are between 15 and 29 years old inclusive.-->
SELECT username FROM users WHERE age BETWEEN 15 AND 29;

<!-- Equivalent statement using AND operator-->
SELECT username FROM users WHERE age >= 15 AND age <= 29;

<!-- Select payments that are between two dates, and the amount value is greater than 10.-->
SELECT 
    payment_id,
    amount,
    payment_date
FROM 
    payment
WHERE payment_date BETWEEN '2007-02-15' AND '2007-02-20' 
  AND amount > 10 
ORDER BY 
  payment_date;
```


## LIKE Operator
```
<!-- Get all rows where first name starts with 'Jen'-->
SELECT 
  first_name, 
  last_name 
FROM 
  customer 
WHERE 
  first_name LIKE 'Jen%';
  
 <!-- Pattern 'Jen' somewhere in the word -->
first_name LIKE '%Jen%';

<!-- Ends with 'Jen'-->
first_name LIKE '%Jen'

<!-- Using underscore. First character can be anything, but the following characters must be 'her'. After that, there can be any number of characters after the pattern 'her' -->
first_name LIKE '_her%'

<!-- Starts with 'BAR' case insensitive, so something like 'bAr' and any variation works.-->
first_name ILIKE 'BAR%';
```
Okay sometimes the data we want to match will have these '%' or '_' in them such as "The rent was 10% higher than it was last year".


```
<!--Usage-->
string LIKE pattern ESCAPE escape_character;

<!--The escape character is '$', so treat the one '%' following the symbol ($), will now not have any effect on the pattern match. Now it's like %10%.-->
SELECT * FROM table WHERE message LIKE '%10$%%' ESCAPE '$'
```

## IS NULL Operator
Comparisons with NULL always result in null. However the exception is with 'IS NULL' where you can check if a value of something is null or not, and it returns a boolean.
```
<!--Select all rows where address2 column is null.-->
SELECT 
  address, 
  address2 
FROM 
  address 
WHERE 
  address2 IS NULL;
```