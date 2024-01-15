# Nested Documents

- In a basic document, there are keys and their values could
  be strings, numbers, arrays of primitives. In a nested document, 
  a value could be another document, or an array of nested documents.
  


- For example:
 {
  _id: ObjectId('65a480d20fe76bca945dcfcb'),
  title: 'The Color of Magic',
  author: 'Terry Pratchett',
  pages: 300,
  rating: 7,
  genres: [ 'fantasy', 'magic' ],
  stock: {
    count: 21,
    price: 7.99
  }
  reviews: [
    {title: "Great Read!", body:"Lorem ipsum..."},
    {title: "My fav book!", body:"Lorem ipsum..."},
  ]
}; This is a nested document because 'stock' is another document
  inside of it, and reviews is an array of documents. Remember 
  a document is just a json object.

- Benefits: Nested/embedded documents can improve read performance.
  The alternative in our example, would be having 2 collections, one 
  for books and the other for reviews, and they'd reference each other 
  using foreign keys or IDs. We'd have to make two queries in that case, but here by using nested documents we'd only have to do one.

- Considerations: If there are a lot of reviews, then it's probably better to have a separate collection. Since each time we load in a book, we don't want to also load in the hundreds of reviews it has. 


# How to create nested docs
- We'll be working in our 'newBooks' collection

1. db.newBooks.insertOne({
  title: "The Way of Kings",
  author: "Brandon Sanderson",
  rating: 9,
  pages: 400,
  genres: ["fantasy"],
  reviews: [
    {
      name: "Yoshi",
      body: "Great Book",
    },
    {
      name: "Mario",
      body: "Its an alright book",
    }
  ]
})

- NOTE: These nested documents, the ones in reviews array
  will not have an object ID assigned to them.
