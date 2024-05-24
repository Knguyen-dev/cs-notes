# Caching 

## What is caching?
Technique of storing frequently used data in local memory for a certain time period. So the next time the client requests that information, instead of getting it from the database, we get that info from local memeory. As a result, we reduce the burden on the database for having to get the same exact data everytime they request it, as we use the easy-to-get cached data instead. 

Of course with caching it's not that straight forward, as sometimes we have to decide how long cached data can be considered valid/fresh. When we need to query the database instead, and then update the cached data, etc. Now there are two types of caching: 
1. Client-Side: After the request is sent it is intercepted by some software or service that contains cached data and responds to the client with that cached data. In this case the request is never processed by the server, and is processed by the caching service, which brings faster response time and reduced server AND database burden.
2. Server-Side: The request reaches and is processed by the server. Here the server makes a request to the caching service to get cached data, rather than typically doing a database search for that information. As a result, the data is obtained a lot faster and this reduces strain on the database. Examples of this are Redis and Memcache.

Let's review the caching process:
1. Client makes request to server. Request is intercepted by caching service. Let's say in this case the caching service doesn't have the data we're requesting.
2. Request goes to server, the server responds with the data. This response is sent to the caching service, updating the caching service so that it stores the recently requested data temporarily. Then response goes to the client.
3. Now whenever the client requests that same data, when the request is intercepted by the cache, the caching service responds with that same data. As a result, the request never reaches the server whilst the client still gets their data. 

Caching locations:
1. Browser cache: The browser may cache responses.
2. Proxy cache: You'd have a 'proxy server' that caches information. This most of the time implemented by an ISP or organization you're associated with. A proxy server kind of acts as a middleman, or an in-between server, between the client and the server they're actually getting data from. Here the proxy server would handle caching, and if it's a cache hit, the proxy server has the data, then they can respond to that request and finish it there. Else they'd forward the request to the real server.
3. Reverse Proxy Cache: Just a proxy server that's close to the real server. I mean sometimes the user making the request is actually going to hit the reverse-proxy instead of a regular proxy because the client is physically closer, in any case we have servers in-between to help us deal with requests before resorting to the main server.

Caching terminology:
- Client: Client making the request.
- Origin Server: Server that accesses the database to get content
- Stale content: Cached information that is expired, outdated, not fresh/up to date anymore.
- Fresh content: Cached information that is still recent enough to be considered 'up to date'.
- Cache validation: The idea of checking with the origin-server if cached content is fresh.
- Cache invalidation: Idea of removing any stale content from the cache.

## Web/HTTP Caching
HTTP Headers play a key role in having content cached. 
- Caching headers: Some examples are 'expires' and 'pragma', which are outdated now, so now we use 'cache-control'.
1. expires: Value is the expiration date `MON, 13 Oct 2020 12:22:00 GMT`, deciding when the content is considered stale.
2. pragma: Only value is 'no-cache', as this header is used to prevent caching. 
3. cache-control: Multi-valued header that determines caching behavior. 
    - If set to 'Private', it's only cached for the client that requested the data. 
    - If it's "Public", that means the data in the response could be cached in the proxies. As a result, if you or any other client requests for that same data, the cached version will be sent instead of having the database query that information for every request made by multiple clients. 
    - If 'no-store' then that just means we aren't allowed to cache the response data. 
    - If 'no-cache' just means that while the response can be cached, for any subsequent requests, if we're going to respond with cached data we must validate it with the server.
    - max-age: Content can be cached for a given number of seconds. So `Cache-Control: max-age=3600, private` means that the data received can be cached for 6 minutes privately, so it'll only be cached for the specific client making that request.
    - s-max-age: 'Shared max age', meaning it can be cached at public places, other proxies, for a given number of time.
    - must-revalidate: When the cached data reaches its expiration time, the client must revalidate the data with the origin server before using it.
    - proxy-revalidate: When cached data in the proxy becomes stale, the proxy must revalidate it with the origin server before serving it to the client.
```
Cache-control:
    <!-- Response data is personally/privately cached for the user for 6 minutes. So this data will be marked as stale after 1 hour (for client/browser level caching).-->
    max-age=3600,
    <!-- For proxies, the cached data should be stal after 6 minutes  -->
    s-max-age=600,
    <!-- Cached data can be stored by proxies -->
    public,
    <!-- When the client's cached data becomes expired we won't serve it, we must check with the origin server to see if that data is still 'valid'.-->
    must-revalidate
```
Validation headers: Used by the client to see if cached content is still 'usable'.
- Etag: An entity tag, or just ID associated with a specific resource. When server responds, they often set this header. So following our example, hte client will keep using the cached data for one hour, but after that it has ot make a request to the server with this etag How it works:
1. Client makes request to server with `If-None-Match': <Some_ETag>` 
2. If resource hasn't changed since the ETag was issued, we send back a 304 not modified (Happens when the server finds a resource with matching ETag). Else if the resources was changed, meaning we didn't find a resource with a matching ETag (Everytime resources are changed/created, a new ETag is applied), we respond with the new resource and a new ETag.
- Last-Modified: Indicates the date-time the resource was last modified. A header included in the server's response. Date is in RFC 7231 format and here's how it'd look like: `Last-Modified: Wed, 21 Oct 2020 07:28:00 GMT`
- If-Modified-Since: Used by client to ask the server if the resource has been modified since a specified date and time. Let's see how they both work together:

So the client first requests data, and here we see the server's response. The client will cache this resource and the Last-Modified header.
```
HTTP/1.1 200 OK
Last-Modified: Wed, 21 Oct 2020 07:28:00 GMT
Content-Type: application/json
{
  "name": "Alice",
  "age": 30
}
```
Now the cached resource expired, so the client must revalidate the resource before using it again. Here we pass a if-modified-since. So if the resource hasn't been modified after the specific date, then the server responds with '304' not modified to indicate the data is still valid. However if the resource has been modified after that specific date (we compare the last-modified header on the resource), the cached resource is no longer valid, so the server has to respond with fresh new data:
```
GET /user-profile
If-Modified-Since: Wed, 21 Oct 2020 07:28:00 GMT
```
Of course this new response is then cached, and the cycle continues.

## Server-side caching
Temporarily storing data on the origin server to reuse later. So let's say the user requests a page of products, so then the server responds back with the page of products. Secretly, the server could have also cached the products from the response, caching that info in a server for caching via a service or something. As a result next time the user requests that same page of products, we respond with those products from the cache rather than do a database fetch of them.

### Types of server caching
- Object Caching: Store the results of database queries, so that hte next time the result is needed, we get it from the cache rather than doing the database qurey.
- Opcode Caching: For PHP, it compiles human-readable PHP code to bytecode understood by webservers.
- CDN Caching: A Content Delivery Network is a netwokr of servers that are strategically positioned around the globe to deliver content more efficiently. Desigend to serve static and dynamic content, they improve the performance of websites. So when a user requests content, their request may be routed to the nearest CDN server based on the user's location. Anyways you can do caching with CDN servers, so requests are routed to CDN servers first to see if said server has the data. If so, good, else we go to the origin server, and the rest of the process is self-explanatory.


## Content Delivery Networks (CDNs):


# Credits:
1. [Server-side caching](https://www.naukri.com/code360/library/server-side-caching-and-client-side-caching)
1. [Overview of caching and different typesof caching that developers should know](https://youtu.be/dGAgxozNWFE?si=Z35tAieLP7lA9TWF)