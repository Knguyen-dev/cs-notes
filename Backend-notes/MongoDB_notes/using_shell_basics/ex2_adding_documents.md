# Adding documents

- Let's add documents to our 'bookstore' database

1. use bookstore; go to the bookstore database, now we need to select the collection we're adding the document to.

2. db.books.insertOne({
   title: "The Color of Magic",
   author: "Terry Pratchett",
   pages: 300,
   rating: 7,
   genres: ["fantasy", "magic"]
   }); Select the 'books' collection and insert one document, and we create the document object inside. If it's a good, it'll
   say it's acknowledged the request and its given the id of the
   document.

- Even if a collection doesn't exist we can still insert documents in it, and as a result MongoDB will create that collection.

1. db.authors.insertOne({
   name: "Brandon Sanderson",
   age: 60,
   }); If this collection doesn't exist, it will create
   the collection.

# Insert multiple documents

1. db.books.insertMany([
   {
   title: "The Light Fantastic",
   author: "Terry Pratchett",
   pages: 250,
   rating: 6,
   genres: ["fantasy"],
   },
   {
   title: "Dune",
   author: "Frank Herbert",
   pages: 500,
   rating: 10,
   genres: ["sci-fi", "dystopian"],
   }
]); Use the insertMany method and pass an array of documents. 
  Here we're just inserting those documents into the 'books' collection.
