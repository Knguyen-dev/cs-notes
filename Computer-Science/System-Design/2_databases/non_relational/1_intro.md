# NoSQL

## What is it
A collection of data items represented in a key-value store, document store, wide column store, or a graph database. So data is denormalized, meaning if they're related, they're not really separated by tables. So joins are at the application level, rather than the database. Alright let's review all of them

## Key-Value Store 
Like a hash table. They store data as a collection of key-value pairs, in which a key serves as a unique identifier. So like maybe we have a collection of products
```
{
  {1, bookID}: {book title, author, date, etc.},
  {2, albumID}: {album title, band name, release year, genre}
}
```
I mean it's very scalable and follows object oriented design, like every developer is comfortable with a hashmap. As well as this read and writes are O(1), which is a lot faster than relational databases. So examples of a key-value store are Memcached or Redis. Your use-cases are storing sessions, caching etc.

Key-value stores don't support complex queries though, so there are limitations. Typically though, you'd use a RDBMS or persistent database for main storage. This is because you can have ACID compliance, complex queries, and relationships between data. Then you'd use a key-value store as a cache or temporary storage. Remember that key-value stores don't enforce a set schema, so things are kind of loose. So a team has to have a plan to standardize and let everyone know what kind of schema they want.

## Document Store
Centered the idea of storing 'documents' (XML, JSON, binary, etc.) where a document stores all information for a given object. Very similar to a key-value store. For example, let's say you have a Blog application and you're using MongoDB:
```JSON
post = {
  authorId: 1,
  title: "My First Post",
  content: "This is a great blog",
  tags: ["Comedy", "Fantasy", "SCI-FI"]
}
```



## Why is NoSQL is better for horizontal scaling?
Let's look at MongoDB. Replication is the idea of spreading database requests across different databases (nodes) within a cluster. As a result, our system can handle a higher volume of queries.

In MongoDB, a set of replicated nodes is called a replica set. A group of replica sets is a cluster. One of the nodes in the set is the primary whilst the rest are secondaries, so it's the same idea as SQL. Also MongoDB has built-in/native sharding, whereas in regular SQL, you'd have to create another database or table to shard (manual setup). At this point, you should be able to tell that they created this DBMS with distributed systems in mind. 

# Credits:
1. [Key-Value Database](https://aws.amazon.com/nosql/key-value/)
2. [Database Scaling - MongoDB ](https://www.mongodb.com/resources/basics/scaling#:~:text=Horizontal%20scaling%2C%20also%20known%20as,resources%20always%20meet%20your%20needs.)