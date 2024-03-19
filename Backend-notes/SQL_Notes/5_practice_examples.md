# Practice examples
- Credits: [Practice Examples Repos]('https://github.com/WebDevSimplified/Learn-SQL)


### Example 1: Create 'songs' table
```CREATE TABLE songs (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  length FLOAT NOT NULL,
  album_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (album_id) REFERENCES albums(id)
);```

### Example 2: Band names
```
SELECT name AS 'Band Name' FROM bands;
SELECT bands.name AS "Band Name" FROM bands;
```

### Example 3: 
Automatically ascending order, so getting the top one is the highest one.
```
SELECT * FROM albums WHERE release_year is NOT NULL 
ORDER BY release_year LIMIT 1;
```