# Getting Started

```
[//]: # (Start database)
docker-compose up

[//]: # (Then start your maven app)
mvn start:spring-boot
```

## DAO (Data Access Object)
- Situation: The relationship between authors and books. A book is associated with only one author whilst an author can have many books. Imagine we have 3 services in our 'service' layer that interacted with our database. The issue here is that each service function would need to know how to manage a specific table and mess with an object representing Authors or books. 
- Solution: Create a 'BookDAO' and 'AuthorDAO' that would know about how to interact with its own table, and handle the mapping of fields and whatnot. Each service can now use a DAO to mess with a table, so if a service needed to interact with the 'Books' table they'd use the 'BookDAO'.


- Our Domains: These are the object instances that are going to get data from our rows, and allow us to work with our rows in an object-oriented fashion.
- DAO interfaces: So these are AuthorDAO and BookDAO. A DAO is the object that we use to manage a specific table in a database. So your AuthorDAO is going to have operations for creating an author, updating an author, deleting an author, etc. This is helpful for planning and setting up standards for our source code and our tests.
- DAO Implementations: Implement those interfaces and write the actual code for interacting with the table.
- Our tests: We have 2 different tests for our dao implementations. We first have a class for the unit tests, e.g. 'AuthorDaoImpTest' which is for unit tests. Here we'll test and verify that our create, update, and other functions are using the correct SQL statements and are functioning correctly. Then we have our integration tests, which will interact with a real in-memory database. With these we'll use both the implementations for the AuthorDao and BookDao, more focus on the AuthorDao though.

## Spring Data JPA 
At this point we've created our own DAOs, the interfaces, the implementations, of course the 'domains' (instances). And the tests as well. It's a lot of work, but there's now a better way to do this.
Spring Data JPA and Hibernate. 






# Credits:
1. [Spring boot guide - right now doing integration testing](https://www.youtube.com/watch?v=Nv2DERaMx-4&t=7054s)