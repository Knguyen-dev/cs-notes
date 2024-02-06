# API Security

- In an express app that served view templates, we used PassportJS to authenticate
  a user with their username and password. However, when our express app is an API,
  it's easier to create and pass a secure token between our front and back end
  applications. This is called a JWT token and it's used to determine whether the
  requester, usually the front end client, is authorized to get the resources
  from the server. Essentially, when the user logs in, a secure token is made, and
  for all subsequent requests, that token is passed in the header of the user's
  request object. We already took notes on this in our "auth_notes" so refer to that,
  but also we have a 'jwt_security' example that showcases how we can secure our api
  routes so that only authorized users can access them.

- NOTE: Of course there are ways to get past jwt, but of course in a real world application
  there are so many layers of security in place and so many considerations to note. These
  notes are just a simple demonstration of jwt and how to secure api routes.
