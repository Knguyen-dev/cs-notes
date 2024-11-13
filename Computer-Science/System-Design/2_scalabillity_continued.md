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

### Asynchronism
Let's say we're running a bakery that sells bread. When people buy bread, usually we take their, order, they wait a bit, and then they get their order. There are two ways we can do async:
- **Pre-preparation:** The idea of the bakery baking the bread the night before and selling in the morning. So you'd do the time-consuming work in advance and then serve the finished work with low request time. This is very common in a case where you have a content management system for your website. You update your page using an editor or CMS. Then a script or server-side event is activated that contents the content into static HTML and stored on the web server or even better a content delivery network (CDN). Now when a user visits the website, the pre-rendered html file is served from the CDN or server, without hitting a backend server. This is pretty fast since there are no database queries or any expensive processes. 
- **Tailoring to special users:** Sometimes people come in with a request for a unique birthday cake, which can't be anticipated ahead of time. So a user comes to your web application and starts an intensive task that takes a couple of minutes to do. For example, when you upload a Youtube video it takes a long time, however the platform doesn't just force you to sit whilst it's processing. It allows you to browse around still, and the video is placed in a queue where it undergoes processing.
  1. **The Job Queue:** When a user starts a task that’s expected to take a while, the system places this task in a job queue. This lets other processes continue without being held up by one lengthy task. Think of the queue as a waiting line at the bakery or the list of videos that's being processed on Youtube.
  2. **Workers:** The system has worker servers (like bakers) dedicated to handling these queued jobs. Each worker picks up a job, processes it, and then moves on to the next in line. This setup allows for parallel processing of tasks and prevents the main app from slowing down.
  3. **Notification:** Once a worker finishes the job, it notifies the front end (or the user) that their task is complete, so they can pick up where they left off.



### Example Scenario for message brokering
Imagine you had a house and you wanted to communicate with people using the telephone. Early on, to talk to a specific house, you had to have a direct connection to that. So if you wanted to talk to your entire neighborhood, you had to have a line to every house, and that gets messy. Here's where the message broker comes in. The message broker is the central hub, and it is connected to every house. When you want to send a message to a house, you send it to the message broker, and the message broker handles sending it to the other house. This reduces the complexity and amount of telephone lines. For an application, it doesn't need to be connected to other apps, it just needs to be connected to the one message broker.

### Real World Example for message brokering
Applications used to be built using a 'monolith' architecture, meaning every concern/service, regardless of how different they were, were put all in the same app. So imagine an app with calendar app with push notifications, rest api, emailing service, and then some kind of chat functionality. Not all of these functionalities scale at the same rate. I mean, the rate at which users email each other will probably be a lot higher than people using the calendar itself. Vastly different computing resources for each service. 

This gave rise to a micro-service architecture, so each service had its own server that was dedicated to that service. So you'd have a server for chat functionality, for emailing other people, for push notifications, etc. As a result, your services can scale independently, so you can easily change one service, without affecting the others. But let's say you had a feature that would send an email and push notification to the user, each time they RSVP'ed for an event using the calendar service. How would you achieve this? Let's look at two approaches:

**Using Rest API:** You can just have each service expose a rest API. When a user RSVPs for an event in the calendar service, make HTTP requests to the email and push notification services to handle the corresponding actions.
  - **Advantages:** This is simple as each service has an API. The calendar service directly communicates with other services as needed, so there's that control.
  - **Disadvantages:** If either the email or push notification service is down or slow to respond (synchronous), the UX kind of sucks as you expect that RSVP. Also it leads to tight coupling. It's an issue that the calendar service needs to know about the push email and push notification services. So changing those other services could be more challenging as you're trying to tightrope and think about how the API would be changed, then how would you change the data structure from the calendar service. 

**Using a message brokering:** Instead of making direct API calls, the calendar service would publish/send messages to a message broker. Assuming your other services have already subscribed (are listening) for these messages, so they're listening out for these messages/events.
  1. **RSVP and Message Creation:** User send a request to the calendar service via a REST API to RSVP for an event. First the calendar service validate the RSVP request, and if valid, it'll save the RSVP to its database. Now the calendar service creates a 'message' object that contains relevant data about the RSVP (e.g., user ID, event ID, timestamp). The message is sent to an 'exchange', this is just some routing mechanism that directs the message to an appropriate queue. The benefit here is that the calendar service knows that other services will want to know when an RSVP was made, but it doesn't need to know exactly who! It can just send the a message in a standard format, and the other services can take care of the rest.
  2. **Message Routing:** So the message is sent to one or more queues, and these queues correspond to a service such as emails or push notifications. Each service will have software that opens up a queue and allows them to continuously listen for messages. 
  3. **Message Processing:** So the email queue receives a message, reads and processes it, and sends a corresponding email notification to the user. The push notifications queue does something similar. 
  4. **Acknowledgement and Follow-up:** Once RSVP message is processed, we send a message back to the message broker ot indicate things are done. If additional actions are required (e.g. sending a confirmation email for the RSVP), the consumer can publish a follow-up message in another queue, which the corresponding services (like the email service) subscribe to for processing.
  5. **Failure Handling:**
  - **Advantages:**
    1. **Decoupling:** The calendar service doesn't need to know about the email and push notification services directly, which makes it easier to change or replace these services without affecting the calendar service.
    2. **Asynchronous communication:** The calendar service can immediately acknowledge the RSVP without waiting for other services to respond. This can improve performance and user experience.
    3. **Scalability:** Services can scale independently based on their load and message processing needs.
    Disadvantages:
    4. **Complexity:** Setting up and managing a message broker adds additional complexity to the architecture.
    5. **Eventual consistency:** There might be a slight delay in processing the email and push notification, as they operate asynchronously.


### Official Definition of Message Brokering
**Message Brokering** refers to software that facilitates communication and information sharing between different applications, systems, and services. It serves as middleware, allowing services to communicate directly, even if they are developed using different programming languages or run on different platforms. 

The message broker acts as a communications layer, managing the flow of data without requiring developers to worry about the underlying complexities, such as the location of recipients or their online status. Developers can send messages without needing to know specifics about the recipients, streamlining the integration process. Message brokers can:
- Validate, store, route, and deliver messages to various destinations.
- Act as intermediaries, simplifying message handling for senders and receivers.

### Messaging Patterns
Message brokers typically implement two primary messaging patterns:
1. **Point-to-Point Messaging**:
   - In this pattern, each message in the queue is sent to only one recipient and is consumed only once. 
   - **Use Case**: Financial transaction processing, such as payroll systems, where each transaction needs to be processed by a single recipient service.
2. **Publish/Subscribe (Pub/Sub) Messaging**:
   - In this pattern, a service (the publisher) produces a message that can be received by multiple subscribing services. This creates a broadcast-like system, allowing one-to-many distribution.
   - **Use Case**: An airline sending updates about flight landing times or delays to multiple parties (e.g., passengers, ground staff, and connected systems).

### Application Example: Calendar, Email, and Push Notification Microservices
In the calendar application example, the message broker facilitates communication between different microservices. When a user RSVPs for an event, the calendar service acts as the publisher, sending RSVP messages to the message broker. The email and push notification services subscribe to these messages:

- **Point-to-Point**: If the calendar service sends a confirmation of the RSVP to a single service for processing (like updating the database), this could represent a point-to-point interaction.
  
- **Publish/Subscribe**: When the RSVP message is broadcasted to both the email and push notification services, allowing them to process the message independently, this exemplifies the pub/sub model.

## Performance vs Scalability
A service is scalable if it results in increased performance in a manner proportional to resources added. Typically, increasing performance means being able to do more things (serve more units of work), but it can also be to handle larger datasets. Here's another way of looking at things:
- **Performance issue:** System is slow for a single user.
- **Scalability issue:** System is fast for a single user, but it becomes slow under a heavy load. So when multiple users are using it or a lot of data, then it's slower.

## Credits:
1. [RabbitMQ in 100 Seconds - Fireship](https://www.youtube.com/watch?v=NQ3fZtyXji0)
2. [Message Brokering - IBM](https://www.ibm.com/topics/message-brokers)