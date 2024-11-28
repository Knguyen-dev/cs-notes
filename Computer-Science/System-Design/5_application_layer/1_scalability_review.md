# Application Layer

## Review on scalability
Let's review on scalability. Here we're going to review on info we already know and there's some new details as well.

1. **Load balancing:** For distributing http requests across multiple servers, and also multiple queries across multiple databases.
2. **Caching:** Application caching involves checking a cache to ensure we don't always just query the database. There's also database caching where we cache the results of database queries. Of course don't forget in-memory caches like Redis or Memcached.
3. **CDNs:** Caches for serving static content across over the world.
4. **Offline processing:** If we have long running tasks, we can put these tasks in message queues to be done asynchronously. As a result, our system can handle slow processes without blocking the user. Also this is good for scheduling periodic tasks like daily analytics.
5. **Map-Reduce:** A programming framework/paradigm for processing big data. Actual implementations are Hadoop, Apache Spark, etc.

## Platform Layer
Typically web servers interact with the database, maybe there's a load balancer in between, but that's the core idea. A platform layer could be inserted in between, so the web servers would talk to the platform layer, then the platform layer talks to the database. So if you want to add a new API, create some platform servers without adding more to your web server layer. Another benefit is being able to reuse infrastructure across different products or interfaces. Imagine if you web app, API, and mobile apps all used the same platform to interact with databases, caches, or other services. It's product agnostic, meaning teams can work on their own specific products and still use the platform layer to 
connect to.

### Examples from big companies:
- **Netflix's Platform Layer:** Netflix has a platform layer that provides services like user authentication, content recommendation, video encoding, and streaming services. This is because Netflix supports multiple interfaces for their content-streaming platform such as their web apps, mobile apps, smart TVs, and APIs for third party integrations. By centralizing some services into a platform layer, they ensure that all their clients can interact with the same backend systems consistently and efficiently. 
- **Amazon's Platform Layer:** Amazon's platform provides shared services like inventory management, user accounts, payment processing, and delivery tracking. They need it because Amazon has multiple products that share this functionality. Stuff like `Amazon.com`, `AWS`, `Alexa`, etc. All of these uss the authentication service, and probably a bunch of other shared services.
