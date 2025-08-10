# Deleting Documents
- Before we delete. Inside compass we can export our data. Go 
  to our database and then the collection you want to export. Go 
  to export data and export the full collection. I'm exporting it 
  as JSON. Then later in compass you can import data and use that JSON file to import your collections. 

# How to delete documents
- When deleting documents, most of the time we should be deleting the object id of the document because that is unique and allows us to delete a specific document. If we delete by 'author':"Terry Pratchette" it's only going to delete the first one it finds.


1. db.newBooks.deleteOne({
  _id: ObjectId('65a5638c7c61f60ec3ac6f32'), 
}); Here delete the one book that matches this ID. After, it
  should give you a message that it's acknowledged the request and show how many documents were deleted. Here it should be 1, but if I run it again knowing therer are no objects with that id, it still acknowledges my request, but will show me the deleteCount is 0 as nothing matched to be deleted.


2. db.newBooks.deleteMany(
  {
    author: "Terry Pratchett"
  }
); Delete all books by Terry Pratchett. When we want to delete multiple books, we just pass in a filter and use deleteMany. Now any document where author is "Terry Pratchett" will be deleted.

# Importing back our books.
1. Let's delete our remaining books in our collection to ensure that importing doesn't create duplicates.
2. Then do import data and import your JSON file. As long as your 
  collection is empty, there shouldn't be any real errors involving ids or duplicates.