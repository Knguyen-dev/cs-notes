/*
+ Mocks and spies:

1. Mocks: Our fake versions/implemntations of real functions.
2. Spies: Tools that track the behavior of those mock/fake functions. Allowing us to be able to
learn what arguments the mock was called with, how many times, etc. 
In the end, we use both mocks and spies together.

- Situation: Let's say you have a function such as signupUser 
  that uses a database call. Well testing this would take some 
  time since it involves the database, and database setup. 

- Solution: The better way to do this is to 'fake' the database functions you use, so that 
  you can test the behavior of the signupUser function in a more 
  controlled way. To do this, we use jest.fn to create mock functions. Then with these
  functions we can configure them to return and do different things.
*/
