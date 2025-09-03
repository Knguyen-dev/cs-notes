# Rate Limiting


## What is Rate Limiting?
A DDOS attack sends a high volume of requests to your API every second. This causes your application to slow down or even force a shutdown of services. When you're handling requests we're consuming memory, storage, and network capacity. This is increased to a crazy level when we're DDOSed.

You can solve this with auto-scaling, which is the idea of having more request handlers (server instances) to handle higher load. However, this can be computationally and financially expensive, and we're using it to serve fake requests.

We'll use a mechanism to limit the rate at which requests are made to the server **(rate limiting)**. We'll apply a restriction to the number of requests a client can make to the API within a set time frame, which helps control the load that's put on the system. This involves throttling clients that attempt to make too many requests. This can involve denying their requests or slowing them down. The API responds with an HTTP 429.

We'll help prevent a user from exhausting system resources. It also makes it harder for a malicious part yto overwhelm the system. 

## Use-Cases for Rate Limiters

**Preventing Brute Force Attacks**
Here the hacker uses automation to send an endless stream of requests to an API, hoping one will be accepted. Rate limiting would massive slow down the attack. 

You'd also want to setup a notification system for any weird behavior like this, so that you can investigate and possibly ban IP if it becomes an issue. 

**Preventing Denial of Service Attacks**
DoS occurs when a user attempts to slow or shut down an app completely. They can do this by flooding the API with requests. This can be done from a single client, or they could have multiple controlled machines that work together to overwhelm the system (DDoS) attack. 

## What is Throttling?
- **Rate Limiting:** A process used to define the rate and speed at which consumers can access the API. 
- **Throttling:** Controlling the usage of the APIs by customers during a given period. You define throttling at the application/API level. Then when a throttle limit is crossed, the server returns HTTP status 429 "Too many requests".

### Types of Rate Limiting (High-Level Strategies)
There are many major types of rate limiting models:
- **User-Level:** Where we uniquely identify a user, say with a IP address, and restrict the number of requests they can make within a time period. For example, if the user is only allowed to make 2 requests per second, the system denies their third request that they make in the same second.
- **Server-Level:** Most API-based services are distributed, meaning a request can be sent to one of many servers. Here your rate limiting strategy focuses on load-sharing. You'd set a restriction on the number of requests a particular server can handle. Then if a server receives requests over this set limit, the requests are dropped or routed to another server. This ensures system availability and prevents DOS towards a particular server.
- **Geography-Based:** The goal is to restrict teh number of service requests from a particular geographic area. You can also restrict requests based on the time as well. For example, in a low traffic location, you can set a rate limiting rule from 1:00 am to 6:00 am.


### Client-side Strategies 

Put in proper input validation to prevent the user from making any unnecessary requests to the server. For example, imagine a sign up form that has no client-side validation. Each validation error now forces the server to send back an error, wasting server resources.

If you can validate data on the client side for your requests, you'll ensure that when they hit the server, they won't result in trivial errors. As a result you're saving server resources.

## Rate Limiting Algorithms
A rate is a count of occurrences over time. However there are different algorithms for measuring and limiting rates. Each one with their own benefits and drawbacks.


## 1. Token-Bucket Algorithm
![Token-Bucket Algorithm Diagram](https://thealgoristsblob.blob.core.windows.net/thealgoristsimages/token_bucket_1.png)

Your token bucket has a pre-defined capacity. Tokens are put in the bucket (at some pre-defined rate), and once the bucket is full, no more tokens are added. Above the bucket has a max-capacity of 4, so it will hold a max of 4 tokens at any given time. The Refiller puts 2 tokens per second into the bucket. If the bucket is full when the refiller tries to add tokens into it, then those extra tokens will overflow.

Here each API request consumes a token:
- When a request arrives, check if there's at least a token in the bucket. 
- If one exists, take it out of the bucket and do the request. 
- Else, the bucket is empty so drop the request.

### Example 1: Simple Setup
![](https://thealgoristsblob.blob.core.windows.net/thealgoristsimages/token-bucket-3.png)

Let's explain the rate limiting ruleset above:
- Limit of 3 requests per minute per user.
- A user makes the first request at `10:00:00` and uses available token 3. The token count is now 2.
- At `10:00:10`, they make a second request, and then the token count is decremented to 1.
- They make their third request, there's only one token left, the request is granted and then the token count is decremented.

Token buckets with customizable refill amounts let you express more complex rates.
- Each user is allowed at max of 10 failed logins per hour, which refill at a rate of 1 login per hour.
- Each geocoded shipping address is allowed a max of 200 dollars worth of purchases per day from the `mail.ru` email address. This refills at 50 dollars per day.

This allows users a lot more freedom on some situations, but we can clamp down on other situations.

### Example 2: Token Bucket Implementation
Token Bucket has a few properties:
- `key`: A unique byte string that identifies the bucket.
- `maxAmount`: The maximum number of tokens the bucket can hold.
- `refillTime`: The amount of time between refills.
- `refillAmount`: The number of tokens that are added to the bucket during a refill.
- `value`: The current number of tokens in the bucket.
- `lastUpdate`: The last time the bucket was updated.

```Python
# if bucket doesn't exist, create it
bucket.value = bucket.maxAmount
bucket.lastUpdate = now()

# Refill the bucket if there are any pending refills
refillCount = floor((now() - bucket.lastUpdate) / bucket.refillTime)
bucket.value = min(
    bucket.maxAmount,
    bucket.value + refillCount * bucket.refillAmount
)
bucket.lastUpdate = min(
    now(), 
    bucket.lastUpdate + refillCount * bucket.refillTime
)

# Check if tokens >= bucket.value, bail out if true.
# Take tokens out of the bucket
```

TODO: Probably not a good example

## Using an In-Memory Cache
Our algorithm needs some data to work:
- Client ID: It could be a user ID, ip address, app key, or even a precise geolocation.
- Number of tokens left for that client in the bucket.
- Timestamp of when the request was sent.

![](https://thealgoristsblob.blob.core.windows.net/thealgoristsimages/rate-limiter-token-bucket-redis-1.png)

We should be prepared to see a burst or spike in traffic, and a database with its slow disk access won't cut it. An in-memory cache is fast and supports time-based expiration. For each user, we'd record their last request's Unix timestamp and available token count within a hash in Redis.



## TODO:
- Distributed rate limiting, lua scripting
- Just cover the algorithms (1 or 2) that are the most used in the real world.




## Credits
- [Designing a Rate Limiter](https://systemsdesign.cloud/SystemDesign/RateLimiter)