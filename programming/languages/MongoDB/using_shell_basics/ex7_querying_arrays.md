# Querying Arrays
- Querying documents based on their arrays. In our database we have books with an array of 'reviews' which is an array of nested documents, and an array of 'genres' which is just strings.


# Simple filtering
1. db.books.find({genres: "fantasy"}); Get all books with genre of  fantasy. Because 'genre' an array in our database, MongoDB is smart enough to looks inside the array to see if any element matches 'fantasy', and if it does, it returns the document.

2. db.books.find({genres: ["fantasy"]}); Here we do an exact match and get all books where the only genre is fantasy. To do exact matches we specify an array, and as a result, MongoDB will look at 'genres' and see if any document has an array that matches the specified one.

3. db.books.find({genres: ["fantasy", "dystopian"]}); Another exact match where we find all books where genres are only fantasy and dystopian. Again MongoDB looks at all documents to only returns the ones where the 'genres' array exactly matches the specified one. Note that 
if you had a document with genre ["dystopian", "fantasy"] it wouldn't show up because its elements are switched around, it isn't an exact match. However to solve this, we would use operators

4. db.newBooks.find({
  genres: {$all: ["dystopian", "sci-fi"]}
}); Return all books where the genres array has all of the elements specified in our array. So as long as it has those two genres, that book will be returned to us. It doesn't matter if a document has the genres swapped, as long as it has those values it will be returned.

# Querying with an array of nested documents
- In our books, we have reviews and those 'review' documents have name and body, so we'll probably use those to query. When querying with nested documents we use dot notation.

1. db.newBooks.find({
  "reviews.name": "luigi" 
}); We use the name of the array 'reviews' to indicate the array, and then use dot notation to indicate the property we're looking to filter out with. So inside our reviews array, filter documents by the 'name' property. As a result, we return all documents where there was a review with name 'luigi'.


