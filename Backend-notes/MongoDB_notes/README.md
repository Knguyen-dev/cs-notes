# MongoDB Notes:

# How MongoDB Stores Data (Collections & Documents):

- Collection: database can contain various 'collections'. For example
  a blog database could have a collection for "Users", "Blog Posts",
  and "Comments". Each collection is in charge of storing its own
  respective data.
- Documents: A document represents a record in the database. For example
  a single document in the 'Users' collection would contain information about
  an individual user. The data for the user would be formatted in a structure
  similar to a JSON object, just a key-value pair. Every document has a
  unique id, similar to primary keys in sql, that are created by MongoDB itself.

- Nested Documents: You could have a one of a document's value be another document,
  which would look like another json object inside, or an array of documents (JSON objects).
  Here "author" is an example of a nested document as its a document (json object) inside our root
  document (json object).

  An example document: {
  "title": "My first blog post",
  "author": {
  "name": "Yoshi",
  "email": "yoshi@ign.com",
  "role": "Game Reviewer",
  },
  "tags": ["video games", "reviews"],
  "upvotes": 20,
  "body": "Lorem Ipsum",
  "id": ObjectId("ai4je9cj")
  }

# Vocabulary

1. Connection String: Special MongoDB url to connect us to a MongoDB cluster. Allowing us to connect to an online database and mess with it.

# Database user info

- Here's the username and password to access the cluster easily
  my_first_user : 8eBt7graaeuHxWIc

For connecting to online via shell: mongosh "mongodb+srv://my-first-cluster.aqyb9om.mongodb.net/" --apiVersion 1 --username my_first_user

For compass : mongodb+srv://my_first_user:8eBt7graaeuHxWIc@my-first-cluster.aqyb9om.mongodb.net/

# Credits:

1. Net Ninja: https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA
2. MongoDB University: https://learn.mongodb.com/learning-paths/introduction-to-mongodb

- NOTE: These notes will take from a combination of sources.
