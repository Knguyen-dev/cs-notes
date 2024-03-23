const database = require("database");
const createApp = require("./app");

/*
- Create the app and pass in the real database. We are injecting
  it's dependency, so that we can decide how the thing should behave
  in different situations. So in a production environment the dependency
  is the real database object. Whilst in tests, we have a fake 
  database. As a result, this makes a specific kind of testing called
  'mocking' a lot easier to do.

*/

const app = createApp(database);

app.listen(3000);
