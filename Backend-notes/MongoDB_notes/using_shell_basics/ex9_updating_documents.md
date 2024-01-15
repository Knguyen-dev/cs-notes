# How to update documents
- We can update one or update many documents at the same time.
  When updating one document, just use the object id. With
  updateOne you pass in our filter object with our id, and in 
  the second argument we will indicate which fields we want to 
  update with a special operator called set. 


# Basic updating of fields using set operator
1. db.newBooks.updateOne(
  {
    _id: ObjectId('65a5638c7c61f60ec3ac6f32'),
  },
  {
    $set: {
      rating: 8,
      pages: 360
    }
  }
); We update a book with a certain id. Specifically we only updated 
  the fields 'rating' and 'pages'. After, you'll see the request was 
  acknowledged and 'modifiedCount' indicates how many documents were updated.


2. db.newBookd.updateMany(
  {
    author: "Terry Pratchett"
  }, {
    $set: {
      author: "Terry Pratchet"
    }
  }
); Update every document where author is 'Terry Pratchett' and update those documents so that the author is 'Terry Pratchet'. This demonstrates a use case where you could have a mistype or a company updated their name, you'd update the their name for all of the products they represent.


# Increment Operator to add or subtract
- By using the increment operator, we can increase the number of something, without us having to get the original value from the database or do anything complex.

1. db.newBooks.updateOne(
  {
   _id: ObjectId('65a5638c7c61f60ec3ac6f32')
  },
  {
    $inc: {
      pages: 40
    }
  }
); Use '$inc' operator and specify the fields you want to increment and by how much.

2. db.newBooks.updateOne(
  {
   _id: ObjectId('65a5638c7c61f60ec3ac6f32')
  },
  {
    $inc: {
      pages: -20
    }
  }
); To decrement, just use the increment operator but put 
  a minus sign to subtract. Here we're decrementing 20 from the pages field.



# Using push, pull, and each operators to update the arrays of a document
- We use push to add to a document's arrays, and a pull operator to take away from a document's arrays.

1. db.newBooks.updateOne(
  {
    _id: ObjectId('65a5638c7c61f60ec3ac6f2f')
  },
  {
    $pull: {
      genres: "Education"
    }
  }
); Here we get a book, and take out the 'Education' element from its 'genres' array using '$pull'.

2. db.newBooks.updateOne(
  {
    _id: ObjectId('65a5638c7c61f60ec3ac6f2f')
  },
  {
    $push: {
      genres: "Education"
    }
  }
); Update a document with that id, push/add the 'Education' value into that document's 'genres' array.

3. db.newBooks.updateOne(
  {
    _id: ObjectId('65a5638c7c61f60ec3ac6f2f')
  },
  {
    $push: {
      genres: {$each: ["Science", "Mathematics"]}
    }
  }
); You can use the $each operator when you want to add or remove multiple elements from the array. Here we're adding 'Science' and 'Mathematics' to the genres array. Note you can't use $each with pull.


4. db.newBooks.updateOne(
  {
    _id: ObjectId('65a5638c7c61f60ec3ac6f32'),
    genres: "dystopian"
  },
  {
    $set: {"genres.$": "dystopia"}
  }, 
); To update a specific element inside an array, when querying we
  specify the 'dystopian' element inside 'genres'. Then we use $set operator and the '$' (position operator) to update it. This is when you don't know the index position and if you combine this with our lesson on querying arrays, you could definitely make the query more specific if dealing with a nested array of documents.

5. db.newBooks.updateOne(
  {
    _id: ObjectId('65a5638c7c61f60ec3ac6f32'),
  },
  {
    $set: {"genres.1": "dystopian"}
  }, 
); Here we're modifying the array element by index. We're modifying index 1 of the genres array.

