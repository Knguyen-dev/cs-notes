# Using MongoDB Compass:

- For the most part we work with MongoDB in the shell or through the application,
  however the compass is useful for learning and visualizing our data.

1. Connect with the default connection string which is localhost to connect to
   your own computer. For the first time you'll see that there are some databases
   already there, MongoDB created these by default for you.
2. For our example, create a database called "bookstore" and a collection called
   'books' to store data about books. To create data for a book, we add a
   document to our 'books' collection, and this document will contain data
   about our book.
3. The compass already creates the id field for us, but we can remove it
   in the editor if we want, and it will still create an id for it after
   we insert.
4. However, the compass allows us to insert multiple documents at the same
   time. For this to work you just have to have your documents in an array.
5. Filtering: You can filter based on a field name. Basically doing
   {rating: 9} would get us all of the documents with the rating of 9. You'll
   do more of this filter programmatically or using the shell.

# Using the shell (in compass):

- We can use the interactive shell in the compass. Or you can use the
  command prompt, which you activate by typing "mongosh". In the end it's
  the same.For "Atlas atlas-vd2mtc-shard-0 [primary] test", where
  'test' is the default database we're currently working with.
- Note how the 'test' database doesn't exist, but you're on it. In the shell you can switch to a database that doesn't exist. Then that database is created after you do something. If you ran a command that creates a collection with documents on a non-existent database, MongoDB will create that database first, and then create those collections you specified.

1. 'use bookstore'; to switch to using the 'bookstore' database
2. show dbs; shows all of the databases

# Using the shell (in another terminal) 1:

1. Open a terminal, type "mongosh"; activate mongoshell
2. 'cls'; to clear the terminal
3. 'db'; prints out the
4. 'show collections'; finds all collections for current database
5. 'var name = "yoshi"; creates a variable. Then you can do "name" to output that variable. You can also reassign the variable value, and this stuff is something we'll
   be doing later.
6. 'help'; shows the list of commands you can use.
7. 'exit' or 'quit' for exiting our shell

- Going forward we'll be using the shell but in another.
