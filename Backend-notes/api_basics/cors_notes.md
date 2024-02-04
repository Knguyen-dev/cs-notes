# CORS:

- The same origin policy is a browser security measure that makes it so sites can only receive requests from the same origin. It could help prevent a bad website from doing things such as running code to read the user's mail data or data from their company's personalized intranet system. To be from the same origin, they must have the same protocol such as HTTP, port number, and host. Let's work through some examples, and compare them to "http://store.company.com/dir/page.html":

1. http://store.company.com/dir2/other.html
2. http://store.company.com/inner/another.html

- NOTE: Here this is the same origin. Both have the http protocol, same host of store.company.com, remember .com, .edu, etc. indicates
  the end of the hostname. And they're not on different ports.

3. https://store.company.com/dir2/other.html
4. http://store.company.com:81/inner/another.html

- NOTE: Third one uses different protocol 'https' so it's a different origin. Fourth one is
  one a different port. So by default 'http://' is on port 80, while this url specifies
  port 81.

- In our case, we want to enable CORS (Cross origin resource sharing), allowing our server to receive requests from
  different origins, allowing our front end to make requests to it. This is usually done with npm's cors library.

# Cross Origin network access:

- Same-origin policy handles the interactions between two different origins. There are three types of
  said interactions:
  1. Cross-origin writes: Links, redirects, form submissions, etc. Such as when a web app wants to do requests to
     a different origin. Some requests go beyond simple data retrieval, such as requests that modify server-side data
     and ultimately making changes to the database. These require you to send a 'preflight' request before your real request.
     So in your preflight, it'd just indicate what you want to do and the server makes sure everything's good before it responds
     with the ok or a rejection for your client to send your actual request.
  2. Cross-origin embedding: Typically allowed. Javascript and css files. Or html elements such as images, videos, audio, etc.
  3. Cross-origin reads: Typically not allowed, and these involve reading the dimensions of an embedded image, or what the javascript
     file does, etc. Note that this is often leaked due to us having inspect element and seeing this stuff.

# Blocking cross-origin access:

- You may want to block CORS when you know your server doesn't want to receive requests from
  origins outside of its own. To prevent cross-origin writes,use a CSRF (Cross-Site Request Forgery)
  token. Give a client we trust a csrf token. Then later in a request, if it has a csrf token, we accept, else
  we reject the reject.
