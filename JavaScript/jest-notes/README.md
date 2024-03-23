# Jest Notes
Popular library for testing javascript code and unit testing. Good for unit testing, which is just the idea of testing small parts of the code. These notes will go from beginner to more advanced use cases. 


## Automated tests:
With jest we can automate the testing process by writing these test files and running them to check if everything is good. If we ever make changes to some units of our code, we can run our script to test that unit to see what cases it passed or failed.

## Test Driven Development:
The idea of writing our tests before writing our functions. We think up of some test cases. Then write our functions to handle those cases. Then we keep thinking of cases to cover, and as a result it's a secure way of problem solving. In the beginning it'll feel weird, but it's worth it when we have an entire test suite at the end that we can run at any time to test our code.

## Using Jest and Supertest:
Allows us to write and execute automated tests for our http server itself.

## Mocking db:
There are a couple of ways you could do this:
1. Create an automated test to an http server to create a user. Then write another test that queries the database to verify that the newly created acccount was in the database. Or you could write a test to tries to login with that new user's credentials. Here we'd be testing all of the components of our app, the route handling, validation, and database.
2. However, you may just want to test each piece of our app separately, so keeping the route logic, password validation, and database stuff isolated. So if a http server calls the correct methods on our fake database, with the correct data, then we can be somewhat confident that it's going to do the same when we put in a real database.



## Project setup
Package setup
```
npm i -D jest
npm i -D supertest
npm i mysql2
```


# Credits:
1. [FreeCodeCamp - 'JavaScript Testing with Jest'](https://www.youtube.com/watch?v=IPiUDhwnZxA)
2. [Writing Automated Tests With Jest](https://www.youtube.com/watch?v=hz0_q1MJa2k)
3. [TDD in JavaScript](https://www.youtube.com/watch?v=89Pl2Uok8xc)
4. [Testing backend server with jest and supertest](https://www.youtube.com/watch?v=FKnzS_icp20)
5. [Dependency Injection in JavaScript](https://www.youtube.com/watch?v=yOC0e0NMZ-E&t=0s)
6. [Mocking database]()