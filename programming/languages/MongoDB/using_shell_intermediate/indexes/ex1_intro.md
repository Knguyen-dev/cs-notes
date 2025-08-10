# Indexes in MongoDB
- Ordered data-structures that allow for fast data retrieval.
  Querying is a lot more efficiently when MongoDB doesn't have to 
  examine the entire collection of documents. Indexes support 
  equality matches and ranged based queries, and return sorted results.

  1. Without Indexes: MongoDB has to read all documents 
    in collection before returnnig our result.
  2. With Indexes: MongoDB only fetches documents recorded
    by the index. As a result, MongoDB becomes somewhat faster.

# Costs of Indexing:
- The drawback is write performance. If you update the collection, be sure 
  to update the indexes as well. And when you have a lot of stuff in the collection, it's going to be 
  quite a bit of work updating the indexes. So when using indexes, we improve
  read/query performance at the cost of write performance.

# Types of indexes:
1. Single field: Indexes that track one field only
2. Compound: Indexes that track multiple fields
3. Multikey: Name for when there are indexes that operate on an 
  array field.





- Situation: When doing db.collection("books").find({"rating":10}), 
  MongoDB has to check every document. Now this can get a little inefficient 
  if you have thousands of documents. 

- Solution: Make an index for whatever field you need to query. This 
  lists out everything you need to look up. You'd have a list 
  called "book_rating" index, which would be a list of book ratings. However
  each entry in that list, would also have a pointer to the book (in the 'books' collection)
  to the book the rating is associated with. 

  So now when the query is based on rating, MongoDB scansthe book_rating
  index instead of looking through all of those documents, 
  to find all 10s in a much faster way. Then it would link back and return
  the documents associated with those 10s.

  book_rating index = [1,5,10,10,9]; We have two 10 ratings here, and essentially 
  these 10 ratings would have pointers back to the book documents they're associated 
  with.

NOTE: Indexes are based on one field value only.

# When to use indexes:
- Drawbacks: You don't always need to use indexes. I mean you're probably not going to 
  create an index for something like 'number of pages'. Also it's somewhat 
  difficult to maintain as if you change your collection, the indexes must match 
  as well. And when you have a lot of stuff in the collection, it's going to be 
  quite a bit of work updating the indexes.
- Use cases: Where you need a specific query that only return a subset of documents.
  Or when you have a very large amount of documents in a collection, where you need
  to sort when you query them.

# Viewing Execution Statistics
1. db.newBooks.find({rating: 8}).explain("executionStats");
- We see some output, and we go to the 'executionStats' field. 
  Here it tells us the total number of documents it looked at and 
  the number of documents returned. In my case it returned 3 docs, 
  and looked at 8 (the total number of docs in my collection). This
  makes sense, as MongoDB is examining every last document to ensure 
  it isn't missing any that meet our 'rating'.


# How to make indices (in the shell)
- Lets create an index based on the rating value. 
1. db.newBooks.createIndex({rating: 8}); We created an index
  for the rating of 8. MongoDB scanned our newBooks collection
  and indexed/recorded all of the documents with the rating of 8.
  Now when we want to find documents in newBooks, with a rating of 8,
  it's going to do it much quicker via that index. For example,
  let's say there were only two books with a rating=8, now when
  it uses the index we made, the query only examines 2 documents
  instead of querying the entire database like before. That's because
  it only looked at the documents listed in our index.

2. db.newBooks.getIndexes(); Get the indexes created for the newBooks
  collection. You'll see there's an "_id_" one that was auto-created by
  MongoDB, but now there's that "rating_8" index we created.

3. db.books.dropIndex("rating_8"); deletes an index, so here
  we delete that "rating_8" index that we created.

