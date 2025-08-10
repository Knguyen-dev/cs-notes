# Replacing documents and different ways to update

- Situation: Imagine you have a bunch of unreleased books. They 
  are still in the database, but they have missing data such as 
  temporary titles, genres, etc. because they aren't finished yet.
  We want to be able to update the book information when it's released,
  but also keep the objectID we had for it. Here the, the number of 
  pages, rating, and genres are all empty, and assume it's already in the database. When using replaceOne, we are replacing the entire document with a new given document. So to properly do this you need to pass an appropriate new document that has all of the data. As if we do replaceOne, with {title: "New title"} that's replacing our entire document with a document that only has one field.

- replaceOne(filter, replacementDocument)

{
  title: "Demonstration of the Arts",
  author: "NightOwl",
  pages: 0,
  rating: 0,
  genres: [],
}

# How to update via replacement
1. db.books.replaceOne({
  _id: ObjectId('65a5b71dd6a9db190f9146eb'),
}, {
  title: "Demonstration of the Arts",
  author: "NightOwl",
  pages: 300,
  rating: 7,
  genres: ["Magic", "Mystery", "Fantasy"]
}); Replaces old document with indicated ID, with the document we passed. Now this new document gets the ID of the old one. Again
remember you can verify by doing db.books.findOne({_id: ObjectId('65a5b71dd6a9db190f9146eb')})



# Using findAndModify()
- Returns the document that has just been updated. 
  In form findAndModify(query, update, new). query accepts our 
  query document (our filter really). 'update' is the fields we are updating, and new is a boolean. By default this function doesn't 
  include the modifications made when we return it, so you 
  set new to true so you are returned the latest one.

- Situation: We have an app that tracks the number of times users download a podcast. 

1. We could do updateOne()and findOne() to return the document and get the number of downloads. updateOne() used to increment the downloads field and findOne to return the document with _id. However this is two queries, when findAndModify is 1 query. As well as this another user could have modified the document before we call findOne, and so we aren't getting the version of the document that we just updated.

2. With findAndModify we guarantee that we get the version of the document that we just updated, so not the version that is considered the 'latest' where it'd be updated due to other queries. Let the object below denote our collection and document shape.

db.podcasts.insertOne({
  title: "The Atlas Podcast",
  platforms: ["Apple Podcasts", "Spotify"],
  downloads: 6012
})

1. db.podcasts.findAndModify({
  query: {_id: ObjectId('65a5bb99d6a9db190f9146ec'), },
  update: {$inc: {downloads: 1}},
  new: true
}); We're querying for any podcast that matches that id, will only be one. We increment the downloads by 1, and we set new to true so that the function returns the updated version of that document after this update.