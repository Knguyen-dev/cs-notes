# Creating a single-field index:
- Support querying and sorting using a single field.


1. db.newBooks.createIndex({rating: -1});
  Create a single field index to track the ratings of our books. Organize the indexes in descending order, meaning the highest ratings
  should be at the top. As a result, we have "ratings_-1" index, and now
  this index can be used for ratings 
2. db.newBooks.createIndex({author: "William Golding"}); Here's how we create an index when we want one for tracking a specific value.
So we create an index for all of the books whose author is William 
Golding.

# Preventing duplicate values in our collections via indexes
- Let's say you're handling users and emails, and you
  don't want duplicate emails in your users. So each user 
  should have a unique email. Below we create an index
  that tracks the emails of the users, and set unique to true.
  As a result, if we try to insert a document with the same email
  value as an existing document, it will throw a key error and stop the 
  operation.
1. db.users.createIndex({email:1}, {unique: true}); 


# Listing all indexes available:
1. db.newBooks.getIndexes(); Gets all indexes available on the newBooks
  collection.

# Seeing all indexes and viewing Execution Statistics
1. db.newBooks.find({rating:8}).explain(); here you can see 'collscan'
  or 'IXScan'. So if it's collscan or collection scan, that means it didn't use an index, and searched the entire collection. If it's "IXScan", then our query used the help of an index to speed up the process.
2. db.newBooks.find({rating: 8}).explain("executionStats");
- We see some output, and we go to the 'executionStats' field. 
  Here it tells us the total number of documents it looked at and 
  the number of documents returned. In my case it returned 3 docs, 
  and looked at 8 (the total number of docs in my collection). This
  makes sense, as MongoDB is examining every last document to ensure 
  it isn't missing any that meet our 'rating'. So adding that 'rating'
  index saved querying time, and it's justified since we're probably going to use it a lot.
