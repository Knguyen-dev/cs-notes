It's common to use libraries or ORMs that handle connecting to the database, having extra security (defending against SQL injection), model the relationships, deal with migrations, and other things.

## 

## PG (node-postgres)
A 'PostgresSQL' client. A very old, but tested, and still very popular 'ORM'. It's very light on abstraction, giving you the flexibility to create your own classes to handle managing the database. This allows you to work closer to SQL, which is a plus for most people since the complaint against ORMs is how they take longer and sometimes that's due to unoptimized queries. Of course wriing a SQL string is error prone since you don't have intellisense. However 'node-postgres' supports parameterized queries, which means you'd pass in values to SQL statements as parameters. These parameters are then treated as a single string value, which essentially prevents the value from being executed as SQL code, and as a result it prevents the attack.

Doesn't provide out of the box support for migrations. Migratiosn are changes to your database schema. 'Up' would be changes to your tables, such as creating a new one. And then 'down' would be reverting that change created in 'Up'. So doing migrations will require some work such as altering tables, maybe creating a new table, backing up your old database.

Rows you get back don't have types, so you'd need to create your own type or interface such as 'IUser' when receiving rows from the user table. Of course this isn't directly tied to your database, so if you make changes to your db, you'd then have to adjust the interface.

Remember that pg is also a building block for these other ORMs, as a lot of these other ORMs rely on it. There's not much abstraction here compared to the others.

## Postgres.js
Faster than the previous, however the main difference is that it uses a 'tag', which makes it really easy to put your SQL queries on multiple lines. Making them a lot more readable and easier to write. 

It uses a style similar to template-literals when including parameters, and this also prevents sql injection.

Both of these are pretty low-level, but for most people, they'd like to work with something more abstract and higher level.


## Knex.js
A query builder, meaning it'll give us methods such as .select, .insert, and whatnot, in order to execute our SQL. We would be chaining methods together to do our queries, and it looks cleaner. As a result, it's much more safer as we're less prone to making an SQL related error. 

Has a CLI for managing migrations as well. Allowing us to manage our schema in a more reliable way. 

## Kysely
Inspired by Knex, as it's just Knex but has better type safety. You define your database schema as interfaces, where these interfaces represent individual tables.

However all of these so far aren't full blown orms, as they don't deal with relatiosn. I mean of course, you can create relationships using SQL, but these don't have specialized support for them.


## Sequalize
Maps database tables to objects in your code. This makes it very easy to handle and manage relationships. Of course, there's a high level of abstraction here as your queries won't look anything like raw SQL code.
```
<!-- An example of finding all users-->
cost user = await User.findAll();
````
However, to get TypeScript working it requires a lot of work

## TypeORM
Create entities/classes to map our tables to objects. Also very typescript friendly.

## Prisma
Your schemas are written not in JS, but in Prisma's own language. The CLI is good at managing migrations, and it has tools to take an existing database and convert 

Of course note that the queries have a high level of abstraction over raw SQL. The library itself runs on Rust and other stuff. However in exchange the developer experience is very comfortable, and minimal effort is required on your end.

## Drizzle
A mix of the modern ones


In the end here's a good way of looking at things. While ORMs may slow down performance a bit, developmen speed and experience a lot of the time outweighs those things. And if you're a big company, you could always buy more servers to handle things. In the end a good ORM should have stuff to do the basic queriesm, but then get out of the way when you need to do a very complex raw SQL query. You'd want to do it by hand to make sure things are optimized.

As well as ORMs are pretty good when you are starting out your project. If you're starting out, your schemas may change quite a bit even if you planned things out. So having an ORM to handle migrations isn't so bad. Then when everything's good, you can rip out the ORM and replace it with raw SQL for performance and optimizations if needed.

Also think of whether or not you're working in a team. Having an ORM makes everyone's code a lot easier to read, and it can help your more inexperienced developers do queries.

I will say that query builders look very nice such as they strike a good middle ground of being able to optimize queries, and not 
worry about bad queries created by the ORM for the more complex cases. 

# Credits:
1. [8 Different Postgres ORMs](https://www.youtube.com/watch?v=4QN1BzxF8wM)
