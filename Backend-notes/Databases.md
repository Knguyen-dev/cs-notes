# Databases

- Relation (SQL) Databases: Data is structured in a table.
  How the columns are structured and how the data is organized
  is called a schema.

- Nonrelational (NoSQL) Databases: Means 'not only' SQL.

  1. Document stores: Most popular type, they look most like
     a traditional SQL database. No schema as you just put it
     whatever you want. Adding a new field to an entity is easy,
     but that means some entities have this field, but others don't.
     Document stores don't have field validation, making them a lot
     quicker. These are used in environments with highly dynamic
     data.

     - Examples: MongoDB, DynamoDB, Couchbase, Firebase, and Cosmos DB.

  2. Graph databases: Used in 'people you may know' feature
     on some sites. People are represented as nodes/vertices and
     relations are the edges. Then we'd continue to walk to
     the edges, and then the edges of those adjacents. A regular
     SQL table would be too inefficient for this.

     - Example: Neo4j, ArangoDB, and Cosmos DB.

  3. Key-value stores: Stores collections of key value pairs. Values
     can be anything from a number, to a complex object. Can't be used
     everywhere, but good for caching and storing session data.

  - Examples: Redis, Memchached, and Cosmos DB.

  4. Wide-column data stores: Similar to key-value stores, but
     a key holds access to columns rather than just a single value.
     A "value" can be billions of columns of data. Imagine a document
     database inside a key-value store.

  - Examples: Cassandra, HBase, Bigtable, and Cosmos DB.

# Setting up MongoDB locally:
1. Download MongoDB Community Server; downloads MongoDB locally.
   Also gives you the option of downloading MongoDB compass which is
   the GUI for interacting with the database.
2. Download MongoDB Shell; Shell allows us to write commands to interact wtih the database.
   As a result, regardless of what language you're using you can interact with mongo if you
   learn basics of the shell.
3. Verify installation in command prompt with "mongosh" which should give you
  the MongoDB and Mongo Shell versions.