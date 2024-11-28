# Scalability Continued

## Clones 
- **Load Balancer:**Servers are hidden behind a load balancer, which distributes requests across the group/cluster of servers. So if you make a request, you may be served by server 9 the first time, server 2 the second, and server 5 the third. 

- **Independent data/same code:** A request should yield the same results independent of what server is serving the request. So if you want to see a social media post, you should be able to see that same post regardless of what server we're on.

- **Shared Session State:** Sessions should be stored in a centralized data store that is accessible to all application servers. this This could be an external database or an external persistent cache, like Redis. Of course a cache would be faster than a database, but the idea is that this data store shouldn't reside in a particular server. If your data store is on a server, and that particular server goes down, then your other servers won't be able to get the session stuff. Have it separate!

## Databases 
Let's say you have a growing number of DB requests. 

- **Normalization, Replication (Path 1):** Use master-slave replication, master databases for writing, and slave databases for reading. Here you're probably going to be adding more RAM to the master database. Also down the line you may need to do sharding, database de-normalization, or query optimizations.
- **De-normalize your database (Path 2):** You can still use MySQL, or use a noSQL database such as MongoDB or CouchDB. Your joins are down in your application code. So you can store a lot more stuff more easily now, as you're nesting stuff, not taking as much data, etc. However, soon your requests will get slow after a large dataset, so you'll introduce a cache.

## Caches 
There are two types of feasible caching these days: Redis and Memcached.

- **Cache:** A simple key-value store that can store data. 
  1. When your app wants to read data, try to retrieve it from the cache first. If it's not in the cache, retrieve it from the database. 
  2. Record that fresh data in the cache. Then you can send back the data to the user.
  3. Now when the a user wants to get that same data again, instead of using the database (which takes longer), use the cache (which is a lot quicker).
  - **NOTE:** Not always sunshines and rainbows with caches. You need to figure out stuff like when you should fetch fresh data again. I mean, showing someone a Youtube channel, where the videos haven't been updated in 7 days is pretty outrageous. We want to see that fresh feed. So a balance and some logic must be determined. 

### Two types of caching patterns:
- **Cached Database Queries:** When you do a DB query, store the result in a cache. A hashed version of your query is the key. Then the next time we run the query, check if it's already in the cache. If so, return that data, else query your database. This is the solution I talked about earlier, of course the issue we need to handle is data freshness. If the user changed their username, showing a cached result with their old username for a few days is kind of strange, so you need to delete that cached result when that happens.
- **Cached Objects:** This is the idea of seeing your data as an object or class. We assemble the class from the database fetched data and then store a complete instance of the class in the cache. Okay let's see an example.

### Types of caches:
Both Memcached and Redis are in-memory caching systems. In-memory meaning they run on ram, so if they somehow get shutdown, the data they're holding is lost. So that doesn't make them good for long term data store, I mean that's why we have databases. However, they're good for quickly grabbing data, and saving database resources.

- **Memcached:** A simple, distributed memory caching system. It's a simple key-value store, however Memcached can spread data across multiple servers, making it easy to horizontally scale for high-traffic applications. 
- **Redis:** A caching system that is still key-value, but it provides more data types and more complex features.

### Example: Cached Objects 
Imagine you have a e-commerce site with a `Product` class. Each product has multiple attributes: price, description, images, and customer reviews. In a real-world
app, each attribute may come from a different database table or a different service (especially in a microservices architecture). Fetching each piece of data 
individually would require several database calls, which is not only time-consuming, but also hard to cache since each component might change at different rates. Here's the idea:
  1. **Assemble Data:** So your `Product` class should have stuff like `fetchPrice()`, `fetchDescription()`, `fetchImages()`, and `fetchReviews()` that each make a database call to gather that data.
  2. **Store data in a property:** Combine all this data into a single property like `data`. This property should be an array or object that contains all hte product's information.
  3. **Cache the completed object:** Cache the entire `Product` instance or at least its `data` property as one object. For example you'd store the key as `Product:{productId}` and the value as the `data` object or Product instance. Then when needed, you can retrieve it from the cache in one go.
  4. **Invalidate or update the cache:** When something changes, such as the price or a new customer review, invalidate the cache entry for that product. So the next time the user requests that product, re-query and reassemble. 

So now imagine you change something simple like the price or description. Let's say you have product 5 in the cache, and you do a write operation to update it in the database. If that operation is successful, you don't have to invalidate product 5 in the cache because something as simple as the title changed. You can just update that entry in the cache, so that the product has the new title. However, there are scenarios where this reassembly technique can be more complex and unnecessary. Imagine a product, review, and user. If the review is deleted you may decide to invalidate the cache and this could affect other caches as well.
  
## Asynchronism and message brokers
View the section about message brokering. Essentially, our application may have some tasks or features where it takes a few minutes or several hours to complete a task. Such as the innate nature of uploading a video, sending a mass email, creating a social media post. To keep your application responsive, we'll put these tasks in a queue and process them asynchronously. This allows for the application to stay responsive whilst these tasks happen in the background.


## Performance vs Scalability
A service is scalable if it results in increased performance in a manner proportional to resources added. Typically, increasing performance means being able to do more things (serve more units of work), but it can also be to handle larger datasets. Here's another way of looking at things:
- **Performance issue:** System is slow for a single user.
- **Scalability issue:** System is fast for a single user, but it becomes slow under a heavy load. So when multiple users are using it or a lot of data, then it's slower.

## Credits:
1. [RabbitMQ in 100 Seconds - Fireship](https://www.youtube.com/watch?v=NQ3fZtyXji0)
2. [Message Brokering - IBM](https://www.ibm.com/topics/message-brokers)