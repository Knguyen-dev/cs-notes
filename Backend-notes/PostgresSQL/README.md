# PostgreSQL
An advanced, enterprise-class, open-source relational database system. Extremely robust, and battle tested. These will simply be notes on how to work with PostgresSQL. Note that these notes may have a lot of overlap if you already read the SQL notes.


- psql: A terminal-based utility that we use to connect to a PostgreSQL server. It's the thing you use to interact wtih an SQL server such as executing SQL statements and managing database objects.
- pgAdmin: Web-based tool used to connect to PostgreSQL server.

## Connect to PostgreSQL server using psql
Enter command into command prompt. We invoke the psql program, and specify the user that connects to the PostgresSQL server.
```
psql -U postgres
```
You'll enter in the password, so that's the super user or other password you created. After entering your password correctly, you're connected to the PostgreSQL server. 
```
postgres=#
```
Here 'postgres' is the default database of the PostgreSQL server. But here are some other basic commands: 
```
SELECT current_database();
```

- NOTE: You may get a warning message that says the 'console code page' is different from the 'windows code page'. To fix this wraning do the command below and match the console code page to the window's one.
```
<!-- Changes console code page -->
chcd <code_page>
```

## Connecting to PostgreSQL server using pgAdmin
1. Use start menu to launch pgAdmin app.
2. Register a serve.
3. Enter the server name, such as "local"
4. Enter the host and password for that server. THen create the server.
5. Now you should have access to the server and database on the side panel.
6. Finally you can tap 'tools' on the toolbar and do 'new queyr' to open a new query/sql file. 

Essentially pgAdmin is just the easy GUI you can use to view database information and make queries like a normal person. It's like using MySQL workbench, or Microsoft SQL server manager.


## Loading a PostgreSQL Sample Database into our SQL server using psql

```
<!-- Start psql terminal-->
psql -U postgres

<!-- Create database named 'dvdrental'-->
CREATE DATABASE dvdrental;

<!-- Shows us a list of databases we have-->
\l

<!--Disconnect from Postgres server and exit the psql CLI-->
exit
```

## Load/restore the sample database from a tar file
For this I recommend using the pgAdmin




## Setting it up
1. [Download PostgreSQL Installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. [Run installer and set up PostgresSQL database server on your local system](https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/)
3. [Connect to PostgrsSQL server](https://www.postgresqltutorial.com/postgresql-getting-started/connect-to-postgresql-database/)
4. [Load our sample database into PostgresSQL server](https://www.postgresqltutorial.com/postgresql-getting-started/load-postgresql-sample-database/)