# Sorting and Limiting Data
- After we fetch data with .find(), we can actually do method chaining and add on some additional methods to do things such as sorting our fetched data.

# Basic Method Chaining
1. db.books.find({author: "Brandon Sanderson"}).count(); using count method we find the number of documents that was fetched. Here we are outputted the number of books where 'Brandon Sanderson' was the author.

2. db.books.find().limit(3); Limit our fetch to getting only 3 documents back.

3. db.books.find.sort({
  title: 1
})

- NOTE: When sorting, 1 means sort in ascending order so as we go down, our values will get bigger. If -1, descending order, so your larger values will start at the top.