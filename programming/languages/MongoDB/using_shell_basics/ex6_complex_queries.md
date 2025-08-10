# Using complex queries and operators
- So far our method of querying (find method) only finds exact matches such as "find all books with rating 7". However, to query for things like, "find books with ratings 7 or greater". To
do these we do operators, which are denoted by '$' symbol.

# How to use operators:

1. db.newBooks.find(
  {
    rating: {$gt: 7}
  }
); To use operator insert another object, then our key used 'gt' which means 'greater than'. Then insert the value for that operator. As a result we find all books with a rating greater than 7.

2. db.newBooks.find(
  {
    rating: {$lte: 7}
  }
); Get all books with ratings less than or equal to 7

3. db.newBooks.find({
  rating: {$gt: 7},
  author: "Patrick Rothfuss"
}); Putting it all together, we get all books from Patrick Rothfuss that have a rating greater than 7.


# OR operator 
- The OR operator to help find documents where a field is either 
  one value or another value. For example, find all books with rating
  of 10, or author Brandon Sanderson. Here OR is a key of the filter object as we could be looking at various different fields, which makes 
  it different from the regular '$' operators. It will be an array 
  of filter objects, and if any of them match then it gives us that 
  document back.

1. db.newBooks.find(
  {
    $or: [
      {
        rating: 7
      },
      {
        rating: 9,
      }
    ]
  }
); Find all books with rating 7, or a rating of 9. Again it's an array of filter objects or conditions.

2. db.newBooks.find({
  $or: [
    {
      rating: 7
    },
    {
      author: "Terry Pratchette"
    }
  ]
}); Find all books where rating is 7 or author is Terry Pratchette.

3. db.newBooks.find({
  $or: [
    {
      pages: {$lt: 300}
    },
    {
      pages: {$gt: 400}
    }
  ]
}); Now using OR and $ operators, we find all books that have less than 300 pages or more than 400 pages.



# in and not in operators:
- Used to see if a particular field matches any value from array of values we define. For example, find all books by 'Orwell', "JK Rowling"
or "William Golding". You could use OR, but you can also use 'in' to make things more concise.


1. db.newBooks.find({
  rating: {$in: [7,8,9]}
}); Find all books where the rating matches one of the values in this list of values. So all books whether rating is 7, 8, or 9. If you 
used '$or' you'd just use an array of 3 filter objects, which works but it's a little longer to write.

2. db.newBooks.find({
  rating: {$nin: [7,8]}
}); Find all books with ratings that don't match any value in that array. So find all books where rating isn't 7 or 8.





# List of comparison operators
1. $eq: Matches values equal to specified value
2. $gt: Matches values greater than specified value
3. $gte: Matches values greater than or equal to specified value
4. $lt: Matches values less than specified value
5. $lte: Matches values less than or equal to specified value
6. $ne: Matches values that don't equal to a specific value.
7. $in: Matches values that are in a specified array of values
8. $nin: Matches values that are not in a specified array of values.

# List of Logical Operators
1. $and: Returns all documents that matches all of the specified expressions.
2. $not: Returns all documents that don't match the expression. 
3. $nor: Returns all documetns that fail all of the expressions, meaning they don't match any of them.
4. $or: Returns all documents that matches at least one expression. Note that you don't just have to have 2 clauses, you can have N amount.
