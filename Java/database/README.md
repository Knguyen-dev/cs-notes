## Spring Data JPA
At this point we've created our own DAOs, the interfaces, the implementations, of course the 'domains' (instances). And the tests as well. It's a lot of work, but there's now a better way to do this.
Spring Data JPA and Hibernate.

1. Delete our schema.sql, our DAOs, and our database config. We're not using bare bones JDBC anymore.
2. Comment out and move our integration tests to 'repositories'
3. `<artifactId>spring-boot-starter-data-jpa</artifactId>`; add this in pom file and remove jdbc.
- We do this thing called 'Hibernate Auto DDL' so when our 'domains' or schemas change, then the next time our app runs those changes will take
  place in our database.

## Jackson and JSON
Jackson is a popular library for handling JSON in Java, and it integrates well with Spring.
1. Jackson takes a Java object and turns it into json. This is called 'marshalling'.
2. Jackson can take JSON and turn it into a Java object; which is called 'unmarshalling'.


## Rest API Design
- Books
1. PUT /books/:isbn; For creating and or updating books. Now typically when creating resources we use 'POST', but since we're essentially providing the ID with the 'isbn', then by convention it's a PUT request. So when creating a bookEntity we give back a status 201 (successful creation)
2. GET /books/:isbn; For getting a specific bookEntity.
3. GET /books; for getting all books
4. PATCH /books/:isbn; only updates the specific fields that you provide.
5. DELETE /books/:isbn; deletes a bookEntity in the database
- Authors: Essentially the same idea
1. POST /authors; use a POST request since for creating an authorEntity we aren't providing some kind of primary key
2. PUT /authors/:id
3. GET /authors/:id
4. GET /authors;
5. PATCH /authors/:id
6. DELETE /authors/:id

## Handling nested objects in Spring Data JPA
So right now we haven't tried creating a book, and also creating a new author associated with that book. And we haven't done the idea of 
updating a book and updated the author. This is because right now, we haven't configured Spring Data JPA to handle that yet.
So in our put request
```
{
  "isbn": "987-1-2345-6789-1",
  "title": "New Book World!",
  "author": {
    "name": "New Author Guy",
    "age": 14
  }
}
```
So we expect that we create the new book, and then create the author associated with that book. Our author should get generated a new id, because it's a brand new author. 

To do this, we must update our mapper in our MapperConfig.

## Pagination
Essentially we don't want to return our entire database, as that would take too long and that amount of data wouldn't be good for the performance of either the client or the server.
1. Extend our BookRepository
2. Update our BookService interface
3. Update our implementation for our BookService and then use our Pageable in the controller we want.



 





# Credits:
1. [Spring boot guide](https://www.youtube.com/watch?v=Nv2DERaMx-4&t=7054s)