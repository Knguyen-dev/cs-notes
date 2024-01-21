# Mongoose notes:

- Mongoose is an ODM (Object Document Mapper) for MongoDB. Think of a
  ORM, but for non-relational databases. It lets us work with database
  records as JavaScript objects which reinforces the ideals of OOP while
  it handles the actual logic and queries in MongoDB native query language.

# Mongoose concepts:

1. Schema: A design of the structure of your data. If you're going to have
   a user object, then you're going to have a schema defining what a user is going
   to have. For example, they need a username, first name, last name, email, etc.
2. Model: An object based off of that schema that represents a document from our
   MongoDB database. An example would be an individual user object from the database
   that we can interact with.
3. Query: A query we want to make on our MongoDB database

# Connecting with atlas:

- To connect to a cloud MongoDB database via Atlas, use this connection string or uri
  as your template: uri="mongodb+srv://<username>:<password>@<cluster_name>.4rc4s.mongodb.net/<dbname>?retryWrites=true&w=majority".
  It seems that you must select a database instead of connecting to an entire cluster, so if you wanted to connect
  to multiple databases in the same application you'd probably store them as variables and use separate connection
  strings.

# Project Setup:

1. npm init -y
2. npm install mongoose; Installs Mongoose library
3. npm install --save-dev nodemon

# Credits:

- BOOK MARK: timestamp 03:36

1. Web Dev Simplified: https://www.youtube.com/watch?v=DZBGEVgL2eE
2. Mongoose Docs: https://mongoosejs.com/docs/guides.html
