# Design Pastebin

## Introduction
Pastebin is an online platform where users can share plain text to other people. You can create a "paste" (a text snippet) and then make it private or public, and share the link with others. It's been used for a lot of thing such as sharing code, literature, etc. 

## Step 1: Outline use cases and constraints

### Handle use-cases and other issues
Let's handle the problem for the following **use-cases**:
- User enters a paste's url and can view the content. 
- User can do this and be anonymous (not logged in).
- Service tracks analytics of pages such as monthly visit statistics. Service deletes expired paste. This service has high availability.
- User enters a block of text and gets a randomly generated link. By default the link won't expire, but you can set an expiration time.

Here are some out-of-scope issues that should be eventually handled:
1. User registration. User also needs to do email verification.
2. User logs in and can now edit document.
3. User can set visibility and create a shortened link.

### Handle constraints and assumptions:
- Traffic isn't evenly distributed.
- Following a short link should be fast.
- Pastes are only in plain-text.
- Page view analytics don't need to be in realtime.
- Assume we'll have 10 million users. Also we'll have 10 million writes and 100 million reads per month. So a 10:1 read to write ratio!

#### Handle back of the envelope calculations

- **Size per paste:**
  1. 1 KB of content per paste.
  2. `shortlink` - 7 bytes
  3. `expiration time (minutes)` - 4 bytes 
  4. `created_at` - 5 bytes
  5. `paste_path` - 255 bytes
  6. total = ~1.27 KB of data for each paste.
- With 10 million pastes per month, that's 12.7 GB of new paste data per month. Could be around 450 GB of new data in 3 years. All assuming that most are new pastes rather than updates to existing ones. 
- You could be seeing about 4 writes and 40 reads per second.


## Step 2: High level architecture and diagram
![](https://camo.githubusercontent.com/8b808c2316ffb00a8f9534b39677b4e7b0a578397da95983d7c318ef4c95f7dc/687474703a2f2f692e696d6775722e636f6d2f424b73426e6d472e706e67)

So here it's just a simple client-server. On the backend we 3 separate services/APIs to handle different operations. Using microservices is a good idea since your traffic isn't evenly distributed. You're using two separate databases, one an SQL and the other an 'object-store', which is specialized for handling unstructured data such as media.

However, note that every service is connected to both databases.

## Step 3: Deep dive into the design

### Use-case: Enter block of text and get a randomly generated link

You could use a SQL database in conjunction with having the paste file on your server. Here the file name would be stored in the database, and when we'd read it we would fetch the file name from the database and construct the path to it on the server.

An alternative is using an object-store such as AWS S3 or a NoSQL document store. If you're going to use AWS S3, you'd be storing the actual Paste files, probably `txt` files on Amazon servers. Using a document store such as MongoDB could also be a good idea as you could store the paste content and other data as a record in the database. 

Let's use a relational database approach:
1. Client sends write to web server (reverse proxy). 
2. Write API generates a unique url and saves it to pastes table in the SQL database.
3. The actual paste data (content) is stored in the object store.

Extra things to note is you can set the primary key as the unique `shortlink` that's generated for each paste. This creates an index for it.

### Use-case: User enters url and views content
So we go from client to web server to read API server. Check SQL database for url, if it exists get the paste contents from the object store. Else return an error message. 

### Use-case: Analytics Service
Since we don't need realtime updates, we'd probably periodically export data from the database using in CSV or JSON format. These are then fed to MapReduce.

If you don't know MapReduce is a paradigm mfor processing large datasets and splitting it over multiple machines. The goal is to do things like filtering, and then aggregate or summarization data analytics.

### Use-case: Delete expired pastes
You could have a service that occassionally does a scan for all entries whose expiration timestamps are older than the current timestamp.

## Step 4: Scale the design
We can add a DNS for routing. This is especially useful if we have clusters of servers, and so DNS acts as the first layer, routing the request to one of many clusters.

In each cluster there will be a load balancer that will distribute the request to one of many web servers. 

Your CDN would be good for caching media. The Memory cache would be good for caching query results as well. That could reduce the number of times we have to access the database for read requests. 

In the database layer we're doing a master-slave architecture. We want multiple read databases to accommodate for the large amounts of read requests.This should be good enough to handle a peak of 40 reads per second, whilst a single master is adequate for 4 writes per second. You may also employ sharding, federation, denormalization, or SQL tuning.  Or even moving some data to a NoSQL database.