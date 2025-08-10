# Php

## What is it?
Php (Php hypertext recursive processor) is a server-side scripting language that was designed primarily for 
web development. It's widely used to create dynamic and interactive web pages. It's also used for content management systems 
like WordPress, Drupal, Joomla, all of which are built on PHP, allowing users to manage content easily without extensive technical knowledge. 
Also many E-Commerce platforms such as Magento and WooCommerce are built on PHP. Php has several frameworks like Laravel, which provide tools and
libraries for common tasks, increasing your productivity.

## Why use it?
- **Easy to Learn:** PHP has a simple syntax and is easy for beginners to pick up.
- **Cross-Platform:** It runs on various operating systems, including Windows, macOS, and Linux.
- **Large Community and Ecosystem:**  A vast community provides extensive documentation, tutorials, and frameworks to support developers.
- **Cost-Effective:** Many hosting services support PHP, often at lower costs than other technologies.

## How does it work?
With Php you can create do server-side rendering (SSR), or send over JSON data and let the client render use the data to render the page 
instead. So it works like any normal language. In these notes we're going to be focusing on SSR, and the idea of creating the HTML file 
on the server, and sending it over to the client.


## Setting up php development environment
What we need:
1. **Php compiler:** So our computer understands the PHP code.
2. **Database (MySQL):** A database to store and persist data. We're going to use MariaDB which is like a fork of MySQL.
3. **A local dev server (Apache):** A development server to run such that it can actually deliver us the dynamic html files.

You could download all of these separately, but we're going to download 'XAMPP', which is a popular cross-platform PHP development environment that contains everything you need. It has the Apache Server, MariaDB, PHP, and Perl. Perl is an old general purpose programming language that was known for its text processing capabilities, and it's been used for stuff like web dev, sys admin, network programming, and a lot more. You'd see it more with legacy systems now, and you probably won't use it outside of rare occurrences.

Download [XAMPP](https://www.apachefriends.org/index.html)

## How does XXAMP work
On the XAMPP control panel we can start the apache server and click `admin` for it to take us to the server on our browser. Our pages are being served from a folder called `htdocs` 

So if you created a file `htdocs/test/index.html`, then you've created a page. So going to url `/test/` would render that `index.html` page.


## Setting Up a MySQL Database 
From the XXAMP control panel, you can simple just start the MySQL database server. then click admin to be redirected to the PHP
my admin page. This page just provides you with a web page, making it easier to interact with database related things.

A lot of software has this type administrator page as we know, but we're going to interact with our database, mainly 
through the PHP code. You can create the database, tables, insert rows.

Let's create an account:
1. username: shaun
2. hostname: localhost
3. password: test123
4. Then check "allow global privileges" which allows this user to access any database and do anything.


## Connecting to SQL Database from PHP
You just need to provide credentials for a database user, of course making sure that user has accessed to the database. Now you have two implementations or options:
1. **MySQLI (MySQL Improved):** Right now we'll use this since it's a more procedural object.
2. **PDO (PHP Data Object):** This is worth learning as it seems ot allow for object oriented programming.


## Book Mark: Part 39