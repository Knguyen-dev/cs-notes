USE record_company;

/*
1. Create song table
*/
CREATE TABLE songs (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    length FLOAT NOT NULL,
    album_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREiGN KEY (album_id) REFERENCES albums(id)
);

/*
2. Select only the names of all the bands. Also change the name of the column
	we return to 'Band Name'
*/
SELECT name AS 'Band Name' FROM bands;


/*
3. Select the oldest album. We want only one result. The idea is 
	sorting the results from highest to lowest using "ORDER BY", then getting the 
    first result by using 'LIMIT'.
*/
SELECT * from albums ORDER BY release_year DESC LIMIT 1;

/*
4. Get all bands that have albums. Here you'll use join because now we're needing to reference 
	two tables. We'll probably use INNER JOIN because we only want bands when they have 
    an album, so both left and right table need to exist or be true.
- We get the naem from the bands table, display it as 'Band Name'. This is our output table
- We'll use inner join. For every row in bands (for every band), get the PK and 
	try to find a row in albums in which the band_id (FK) matches our pk. This condition
    makes it so we only return a combined row when a band has an album. So as a result 
    we get those rows, and we only return the 'bands.name' attribute of those rows.
*/

SELECT bands.name as "Band Name" FROM bands 
JOIN albums ON bands.id = albums.band_id;


/*
5. Get all bands that have no albums. So this involves a join since we're 
	talking about bands and albums, but we will probably need to involve
    an aggregate function. I'm guessing we'll need a LEFT JOIN so we 
    get the bands by default, but the albums table could be null for a given
    row.
1. Define 'Band Name' as output column.
2. Join the bands and albums tables. For every band, include the albums table
	if we find an album associated with it. We do left join because we 
    there's a chance a band doesn't have a single album associated with them
	which would look like this. We still want to include this band 
    in our group by at least. Happens when a band's primary key doesn't 
    match with any album's band id. 
    
    3 Some Band ... null | null
    
    
3. Then for each row, we'll put them in separate groups/boxes based 
	on the bands.id PK, which we know will always we defined. So at this point:
    
    Given a group with band_id = 1
    id | name | ... | name | band_id
    1. Cool band ...  good song 1 | 1
    1. Cool band .... good song 2 | 1
4. So each box has rows that have the same band id, now 
	we just do an aggregate function on each box counting 
    the albums.id. This is because when albums.id exists, we 
    know there's a song for that certain band in the box.
    For example, this is a group for bands.id = 3, and we 
    can see that there was no associated album where band_id 
    matched its primary key. So for this group the count 
    should be zero, as we count by albums.id.
    
	3 Some Band ... null | null
    
    However, for this group for bands.id = 4, we can see that there
    are two entries for albums created by band with bands.id = 4.
    As a result, by counting with albums.id, we can correct put 0 for the 
    groups where the right table didn't exist, and then correctly count 
    rows for tables where the right side did exist!
    
    4 Some Band ... 1 | Good song | 4
    4 Some Other Band ... 2 | Good song 2 | 4
*/
SELECT bands.name AS 'Band Name'
FROM bands
LEFT JOIN albums ON bands.id = albums.band_id
GROUP BY bands.id
HAVING COUNT(albums.id) = 0;

/*
- 6: Return album name, release year, and the total duration 
	of the album. Get the album with the longest duration

1. Here we define our output 'Name', 'Releaes Year', and 'Duration'.
2. We're going to reference the songs table, so JOIN it. For every 
	given album, find a song where its album_id matches the id (PK). If 
    so return both tables. We're only given rows where it's an album and 
    an associated song.
3. We used an aggregate function earlier, so now we should be using group by.
	Let's group together these rows so the album id, so album_id is fine.
    Now all of the rows (songs in this case) with the same album_id are in the same groups. The aggregate 
    function should now be able to take their sum.
    
    Our combined row in each group should look like this:
    id | name | release_year | band_id | ... | id | name | length | album_id

4. Now we need to sort these and then limit by 1.
*/
SELECT 
	albums.name AS "Name", 
	albums.release_year AS "Release Year",
    SUM(songs.length) AS "Duration" FROM albums 
JOIN songs ON albums.id = songs.album_id
GROUP BY songs.album_id
ORDER BY Duration DESC 
LIMIT 1;

/*
- 7: Let's say we have an album with release_year = null
	on album with id 7. Let's update that so release_year=1984
1. The first part isn't needed but it allows us to query when a column is a null value.
2. Indicate we're updating the albums table, setting the release_year column value to 1984. 
	We only do this for the row that has an id of 7.
*/

SELECT * FROM ablums WHERE release_year IS NULL;
UPDATE albums SET release_year = 1984 WHERE id = 7;

/*
- 8: Here's an easy one. Just insert a new band you like and one of their albums.
	Here we're inserting 'Big Time Rush' as a band, and we're inserting an album
    called 'Best of Season 1'. For band_id, we know that it's just going to be 8.
    In a real application you'd probably be working with an ORM.
*/

INSERT INTO bands (name) VALUES ('Big Time Rush');
INSERT INTO albums (name, release_year, band_id) VALUES ('Best of Seaon 1', 2010, 8);

/*
- 9: Now let's delete the album and band we added in the last exercise. Remember that 
	the order of how we delete them is important since album has 'band_id', which is a foreign
    key to the bands table. You want to delete the albums associated with the band first, and then 
    the bands. This relates to referential integrity in relational databases.
    
    Referential integrity: A foreign key can be null (not in this app, but generally), but if a foreign key is defined it must
	point/reference an existing row in another table. By deleting the band first, all albums that had that band's 
    id as a foreign key will point to a non-existent table. This violates referential integrity. So the solution is to delete
    the albums first, so that there is no foreign key that references the band you're going to delete.


1. Delete all albums with band id of 8. So we're deleting all albums associated with the band we're deleting. 
2. Then delete the band that has an id of 8. Also a good thing is that if you try to delete bands first mySQL will throw 
	an error.
*/

DELETE FROM albums WHERE band_id = 8;
DELETE FROM bands WHERE id = 8;

/*
- 10: Return the average song duration. So we know that songs table has a 'length' attribute. 
	The solution would be taking all of the songs, adding up their durations, and taking the average.
    A simple aggregate function.
*/
SELECT AVG(length) AS "Average Song Duration" FROM sogns;

/*
- 11: Select the longest song off of each album. So our 
	final output should be:
    
    'Album' | 'Release Year' | 'Duration' |
    
    So here we're referencing two tables, so you'll definitely
    see that we're doing a JOIN operation for getting the 
    albums and songs. Then we'll need to probably do a group by
    so that we have groups that contain every song for a given album.
    Then we'd have to use an aggregate function MAX() on each of those groups
    

1. Define our output table
2. Let's join our tables. We should probably do an INNER JOIN. We want to 
	get the combined table of the album and song when the IDs match.
    We want both tables to exist as we're going to parse albums.name and other 
    columns from the albums table and then song.length fro mthe songs table. Both
    need to exist in the JOIN. So here's what a given row in the join should look
    lik: 
	
    id (album table) | name | release_year | ... | id (song table) | name | length | album_id

3. Now, let's group these rows based on the album's id. So each group discusses will contain
	rows (songs I guess) for that specific album. So now our output could be like this.
    Here we have a group based on albums.id = 3, where we have all of the songs for 
    the album 'Cookie Album'
    
    In a single group: 
    3 | Cookie Album | 2014 | ... | 18 | Cream cookies | 3.54 | 3
    3 | Cookie Album | 2014 | ... | 23 | Chocolate Cookies | 2.76 | 3
    3 | Cookie Album | 2014 | ... | 37 | Cookies of Dreams | 4.54 | 3
    
4. Now our aggregate function should work. 
*/

SELECT albums.name AS 'Album', albums.release_year AS 'Release Year', MAX(songs.length) AS 'Duration'
FROM albums INNER JOIN songs ON albums.id = songs.album_id
GROUP BY albums.id;

/*
- 12: Get the number of songs per each band. So this is the toughest one 
	that needs two joins. The final output should be like this:
    
    Band | Number of Songs
    
1. We define our columns 'Band', and we can guess that we're counting something.
2. So we want to do a join with the albums table.
	We want an INNER JOIN we'll want both to be defined.
    Of course join them based on the ids of the bands matching.
	
    id | name | ... | id (album) ...

3. id | name | ... | id (album) | ... | id (song) | album_id

4. Group all of these rows based on the band id. In each group, we're going to have
	rows of songs from that band.
    
    
    1 | Big Time rush| ... | 15 | Some Album | ... | 1  | First Song | album_id

*/

SELECT bands.name AS 'Band', COUNT(songs.id) AS "Number of Songs" FROM bands
JOIN albums ON bands.id = albums.band_id
JOIN songs ON albums.id = songs.album_id
GROUP BY bands.id;
