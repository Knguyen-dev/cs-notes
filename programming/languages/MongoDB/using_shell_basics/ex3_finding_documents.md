# How to find and fetch certain documents
- If we're making an api, we'd make an endpoint and at that endpoint
  we'd provide books from the database. We'd have logic to fetch books from
  our database, sometimes based on some parameters that will filter out the books. To fetch books, we'll use the find method. Assume we're already on the 'bookstore' database which means 'db' references 'bookstore'.


# Finding with no filters
1. db.books.find(); references 'books' collection and outputs first 20 documents it finds in this collection.
2. 'it'; if you type 'it' for 'iterate' it gets the next 20, and so on.

# Finding documents with filters 
1. db.books.find({
  author: "Terry Pratchett"
}); Pass our filter object in our find method. Here we're finding all of the books where the author is 'Terry Pratchette". However, we can pass in multiple parametesr as well.

2. db.books.find({
  author: "Terry Pratchett",
  rating: 7
}); Find all books where author is Terry Pratchette and the rating is 7. Here we're using more than one parameter.

# Omitting certain fields when fetching documents
- When fetching documents, sometimes you don't need all of the fields. On a specific website, maybe we just need to data for the title and author, and we don't need the other stuff. Do db.books.find(filterObj, fieldObj), where fieldObj defines what fields you want. By passing in a fieldObj, it gives you the specified fields and omits the rest.

1. db.books.find({
  author: "Brandon Sanderson"
}, {
  title: 1,
  author: 1,
}); Getting books only from Brandon Sanderson, but we only get back the 'title' and 'author' fields. You set those to 1, which indicates 'true' as in you want those fields. Note it always gives you back the id of the document regardless.


2. db.books.find({}, {
  title: 1
}); What if we wanted all books (no filter), max 20 documents, but you wanted omitted fields as well. Then just pass in an empty object as the filter, won't filter anything and allows us to access the second parameter that is the field object.


# Fetching a book based on its ID:
- You can also fetch a single document.

1. db.books.findOne({_id: ObjectId('65a45c21ac162fb813895cb4')}); Finding a single document from 'books' collection and filtering by ID.


2. db.books.findOne({author: "Terry Pratchette"}); Here we're finding one document using 'author' which isn't unique as there are currently multiple books in our database with that author. In some versions of Mongo it returns the one it finds first. However in our version (6.0) if there are duplicates, it will return null.