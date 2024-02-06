# JWT with access and refresh tokens

- So with JWT, as long as the secret keys are the same, and obviously the hashing algorithm, the
  token should be able to work on multiple different servers as long as its data isn't changed.
  So we'd typically have an authorization server that handles and manages JWT, and resources
  server that serves things such as posts, comments, and other resources.

# Files:

- server.js: Basic example about what we need to know when using access tokens to protect
  our api routes

- server2.js: Example that uses refresh tokens alongside our access tokens.
- authServer: Separate server that handles managing jwt.

# Why and how to use a refresh token:

- When creating a token, maybe it has an expiration date. Once expired, user
  logs in again. If someone takes that access token, they'll be able to take
  your account, probably for a decent amount of time until it becomes invalid. In that case, the damage will already be done.

- Now with a refresh token, we can refresh the access token when it expires, and we can make the access token have a short life span. As a result even if someone takes an access token they'll have a little amount of time until it becomes invalid. However, what if someone takes a 'refresh' token?

- Yeah our refresh token could get stolen. However, we can make it so we invalidate a refresh token. Delete it and remove it from the list of valid refresh tokens so that the user can no longer use that refresh token to refresh their access tokens. In that case, they'd have to login again, but this is still pretty good.

# One last note:

- The front end client application is rseponsible for handling the process of requesting
  for a new access token with their refresh token. Obviously we're dealing with the backend here
  so that's why we don't see that. As well as this both the access token and refresh tokens can
  be stored on localstorage or cookies for the client, with both having pros and cons
