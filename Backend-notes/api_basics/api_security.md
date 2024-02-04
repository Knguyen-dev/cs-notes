# API Security

- In an express app that served view templates, we used PassportJS to authenticate
  a user with their username and password. However, when our express app is an API,
  it's easier to create and pass a secure token between our front and back end
  applications. Essentially, when the user logs in, a secure token is made, and
  for all subsequent requests, that token is passed in the header of the user's
  request object. We already took notes on this in our "auth_notes" so refer to that.
