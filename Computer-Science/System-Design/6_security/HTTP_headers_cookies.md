# Http Headers and Cookies

# What is a http header:
- Http headers let client and server pass additional information about a request or response. The important ones today are the request and repsonse headers.

- request header: Holds information about the request. Such as the resource being fetched or the client requesting it. Essentially metadata about the http request. Here are some of them: 
1. Data-Type: The types of data the request is accepting or looking for. Whether we're wanting to get JSON, html page, etc.
2. User Agent: What kind of browser made this request.
3. Cookies: Where all of your data for that site is stored.

- response header: Holds additional information about the response such as its location or about the server providing it. Here are some things:
1. content-type: The type of data that was sent in the response. 
2. set-cookies: Assigns a information to a client in a key-value pair, referred to as a cookie.

# Set cookie header and cookies:
- HTTP protocol is stateless, meaning it's going to constantly forget what the user has done, unless we have a way to keep track of that. set-cookie and cookie headers are used. 

- cookies header: Lives in the request, it's where all of the cookies for the client are stored.
- set-cookie: Lives in response header and assigns/updates a cookie to the client. The user requests a page from Google, Google sends back that page, however in their response they send a cookie. Now when the user receives the response, the client's browser takes that cookie and stores it. Now each time the user sends a request to that same domain, each request will contain that cookie in the request header. This is important because now, depending on what type of information we pass, we can differentiate the user. Let's say if in the request, we see the client has a certain cookie, then we know they've been authenticated and we can render out
user tailored content to them. As long as the cookie is in their browser, we can keep them authenticated on our 
domain, of course until the cookie expires, which is defined by the website that sent the cookie.


