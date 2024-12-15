# Caching

## What is caching
The idea of saving the results of an expensive operation in memory. As a result, if we want to do the same operation again, we can used the saved result and save a lot of time and resources. This is similar to the idea of memoization.

Caching improves response times and can save server or database resources. For example, having a CDN to serve images instead of forcing your server to do it will save a lot of resources such as bandwidth. 

Another common case is saving database resources. An example could be how popular items on Amazon can cause a lot more reads and writes specifically for that item. You can use a cache to save the info of the item, and reduce the amount of times we need to access the database.

## Types of caches
- **CDN caching:** CDNs are a type of cache.
- **Web server caching:** Reverse proxies can act as caches. It allows you to cache the HTTP response to a given http request. As a result, sometimes the request won't even reach your application/origin servers.
- **Database caching:** Databases typically have some level of caching. You can tweak these to help you out. Such as allowing you to cache the results of frequently executed queries.
- **Application caching:** In-memory caches such as Memcached and Redis fit the bill. They are separated from your application and database. Essentially after you get the results from the database, you can cache the results in one of these. Then the next time you're processing this same request, you can ask the cache to return its result instead. It's a lot faster since it's RAM, but also you'll need to balance how fresh your data is.

## Caching strategies
Let's talk about when to update the cache and the strategies for it.

### cache-aside (reading data)
![](https://github.com/donnemartin/system-design-primer/raw/master/images/ONjORqk.png)

The 'client', which is your service in this case, communicates with the cache and database. We'll get a request, and if the data is in the cache, then we'll return that data instead of querying the database. Else we'll do a different flow:
1. Look for entry in cache, but it's a cache miss.
2. Query data from the database.
3. Update cache to include this data.
4. Return data as a response.

- **Disadvantages:** 
  1. There could be a slight delay when there's a cache miss since we dedicate time to checking and writing to the task. 
  2. Also if data is updated in the database, then the cached data is old/stale. If you application prioritizes fresh data, then you'll need to cleverly handle the cache invalidation process.

### write-through (writing data)
![](https://github.com/donnemartin/system-design-primer/raw/master/images/0vBc0hN.png)

The application uses the cache as the main data store. Our cache acts as the middle-man between our service and database. Here's the flow: 
1. Application adds/updates entry in the cache.
2. Cache synchronously writes entry to the database.

- **Disadvantages:** Overall a slow operation, but users are more tolerance of write latency.

### write-behind (write-back, asynchronous writes)
![](https://github.com/donnemartin/system-design-primer/raw/master/images/rgSrvjG.png)

So this setup is for caching and asynchronous writes. Here's how the flow works:
1. API writes to cache.
2. Cache adds an event to a queue.
3. Some event processor will process the event asynchronously. Eventually the data from the event will be persisted into the database.

- **Disadvantages:** You could have data loss if the cache goes down before it's able to enter the queue and eventually be persisted into the store. Also this approach is a lot more complex to implement than others.

### refresh-ahead
![](https://github.com/donnemartin/system-design-primer/raw/master/images/kxtjqgE.png)

You know how data in caches have a TTL (expiration)? The idea of refresh-ahead is to automatically refresh cache data if it was recently accessed. This is only good if it can accurately predict which items are likely needed in the future.

- **Disadvantages:** Maintaining consistency between your cache and database through cache invalidation is going to be tough. Also you'll need to add Redis or Memcached.