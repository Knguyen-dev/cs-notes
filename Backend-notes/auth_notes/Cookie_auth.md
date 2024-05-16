## Cookie-Based Authentication
Akin to how jwt and token-based authentication are related, session-based and cookie-based authentication are similar. It's essentially when we store authentication related information, such as session IDs or tokens, in the cookies of the client's browser. You can see this in various authentication mechanisms such as session IDs as cookies, or even storing an refresh token in a secure http cookie.

### How it works
1. User enters credentials. On success, we generate an access token, which acts as our session ID in this case, but it could also be something else. We store this in our database (using persistent storage) associated with our user, and then attach the token as a cookie to the response. 
2. Now every request the user sends will have that cookike. We'd check the database everytime to ensure that it's valid and links to an actual user. 
3. Then on logout you'd delete the cookie in the request header, and also you'd delete the reference of the access token in the database. As a result your user is now unauthenticated.