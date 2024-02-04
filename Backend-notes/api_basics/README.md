# API Basics:

- Rather than having a server that handles database and view templates, another popular way is to separate these into separate projects. Our front end project or application does with the rendering. However it fetches the data it wnats to render from our backend. Then our backend application acts as an API, as we fetch data from here. Here we can let our backend server respond back with JSON data that our front end can render. This makes up a 'full-stack' application.

# REST (Representational State Transfer) API:

- APIs can take many forms and organize their routes or endpoint URIs differently, and REST is one way. Here your API endpoints correspond with CRUD actions. So our endpoints are 'resource based', so we directly refer to the resource. We would usually have 2 URIs for each resource, one for getting a list of items '/posts' and one for getting a specific one which is '/posts/:postid'.

1. "/posts": Typical URI for getting a list of items from a collection, so here a list of posts.
2. "/posts/:postid": For getting a specific post from the 'posts' collection.
3. "/posts/:postid/comments": You can also nest collections. Here we're getting all of the comments from a specific post.
4. "/posts/:postid/comments/:commentid": Looking for specific comment on a post.

- NOTE: Every URI here targets a specific resource, whether it be a list of stuff or just one item. Here the '/posts/' or '/comments' targets
  the list of items, whilst their ":id" counterparts target a specific post or comment via ID.

# REST API best practices:

1. Accept/Respond with JSON: Json is just standard and common for transferring data so don't deviate from it.
2. Use nouns instead of verbs in endpoints: We use nouns to represent the thing we're getting. So don't use '/getComments'
   to get a list of comments. Instead use '/comments', where we just include the noun. Remember following CRUD, we
   know GET, POST, PUT, and DELETE.
3. Use logical nesting: Group stuff that make sense together. If your object contains another object, then cover that endpoint.
   So a post contains comments, so do '/posts/:postid/comments/:commentid'. However, don't nest too far, as if you're
   2 or 3 levels in, you may want to return a URL to those resources. So if you want to return a user who made a comment, you
   could do "/posts/:postid/comments/:commentid" and return that, or you could send a json response such as
   "author": "/users/:userid".

# Error handling and returning error codes:

- When an error occurs, we need to respond with the proper HTTP repsonse codes to indicate what
  kind of error it was.

1. 400 Bad Request: Client side input failed our serverside validation
2. 401 Unauthorized: User isn't authorized to access resource. Usually when user isn't authenticated.
3. 403 Forbidden: They're authenticated, but they're just not allwoed to access a resource.
4. 404 Not Found: Resource wasn't found
5. 500 Internal server error: A generic server error. Probably shouldn't use it too much since it doesn't
   really provide much information.
6. 502 Bad Gateway: Invalid response from an upstream server
7. 503 Service Unavailable: Something unexpected happened serverside. Could be a server overload, or some
   parts of the system failed.

# Filtering Sorting and Pagination:

- For pagination, we return a few results at a time, say 10 results per call. Typically
  the api would have a 'next' url in the json to get the next page of results. For filtering,
  allow search parameters to affect what they get from the database. Sorting of course allows
  them to sort. So with "http://example.com/articles?sort=+author,-datepublished", + indicates
  ascending order whilst - indicates descending order.

# Security practices:

- Use SSL/TLS security so that most communication between client and server is private.
- Have good authorization, so users shouldn't be able to access more information than they're
  supposed to. We'd assign roles to users, and the admins could change their roles.

# Caching data:

- Improve performance by returning data from the server's memory isntead of querying
  the everytime. We'd be able to get their data faster. Of course the user could get
  outdated data. One solution is setting an expiry time:

1. Set an expiry: Set a time in which we consider the data as outdated, and so if it is we
   fetch new data from database.

# Versioning the APIs

- Have different versions of your API so that even if you make major changes, it'll be on
  a different API version than the ones that clients access. As a result, your changes won't break
  stuff for the clients since they're not using your newest version. This lets us gradually phase out
  old API versions, while not forcing everyone to use the newest versions all at the same time.
  We indicate versions by prefixing "/v1" or "/v2", which mean version 1 or version 2 at the start of
  our API paths. For example "/v1/employees" and "/v2/employees" both get a list of employees but are
  different API versions!


  # Credits:

  1. Rest API design: https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design
