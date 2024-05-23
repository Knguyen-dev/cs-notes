# Postgres with Node Tutorial
Taking notes on how to use node-postgres. 


## Package setup
```
npm i express pg cors
npm i -D nodemon typescript ts-node @types/express @types/pg 
```

## Database Setup
Essentially using the postgres CLI, we'll paste in the sql statements from our db.sql to create the database and table. Here are some common commands you should take note of:
1. \l: List all databases 
2. \c: Move inside a database; selecting one for targeting
3. \dt: Show tables in a database

```
1. Open powershell
2. psql -U postgres
3. Enter your password.
4. Copy and paste statements from db.sql into those 
```

## Migrations
Migrations are a way to incrementally update your database schema over time, allowing you to apply changes such as creating a new table, modify existing ones, etc. in an organized and version-controlled way.
'node-postgres' doesn't have built-in tools for managing migrations.

There are many altnerative ways of writing sql:
1. Knex.js: A SQL query uilder that includes a powerful migraiton tool.
2. Sequelize: An ORM that includes built-in support for migrations.

However, we can simply do migrations by executing sql statements. Let's create a migrate.js to handle this.

# Credits: 
1. [Pern Stack Tutorial - freeCodeCamp](https://youtu.be/ldYcgPKEZC8?si=5-oidN4rRHO_6YXU)i