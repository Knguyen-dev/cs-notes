# Json Web Tokens (JWT) Notes:

- Commonly used for authentication and authorization.

# How it works:

- Sessions:

1. Gives the client a session ID through a cookie after they login. The session ID
   is stored on the server or in database.
2. Then everytime the client makes a request, they send the cookie with that session ID to the server.
3. The server looks through its memory or database and gets a user corresponding to
   that session ID, and authenticates them.

- JWT:

1. User logs in and server creates a JWT, encoding or serializing it with a secret
   key value. Then the server gives that JWT to the client.
2. Now client sends a request, the request comes with that JWT. The server checks
   the JWT signature. If it's good, the server gets the user with the associated JWT
   and logs them in.

- NOTE: The difference is that with a JWT, nothing is stored on the server, and all
  information about the user is stored on the JWT.

# Anatomy:

- Has a header, payload and verify signature, all portions
  that are separated by periods when it's encoded.

1. Header: Has algorithm and token type
2. Payload: The user's data. So things such as their user ID, name,
   the issue and expiration date of the jwt, etc.
3. Signature, which is used to verify the token by the user. When a user
   logins in, it creates a token. It hashes the header and payload data together with a 'secret key'.
   This process is called signing the token and resulting hash is called the 'signature', our
   third component of the JWT. If the user messes with the jwt and
   changes some info in the payload, then when the server tries to verify
   the jwt, it's going to hash to a different value than expected. And as
   a result, the user isn't going to be authenticated.

- NOTE:

1. JWTs can still be hacked, so don't put any sensitive information about the
   user in the JWT. Such as passwords.
2. Never show the secret key, as it's the thing that makes this all work.
   If you show the secret key, then malicious actors will be able to replicate
   and reverse engineer the token.

# Examples:

- Situation: Let's say there are two servers, one for a banking app, and
  the other is a retirement app, and both are run by the same bank. We want
  it so that if the user logs into the banking site, and they switch over to
  the retirement site, they should still be authenticated, even if those are
  different servers.
- Sessions: If you have a normal session based server, if a user logs in, then
  their session information is only stored for that server, likely in memory.
  As a result, the other server doesn't have that session ID and info for the client
  and the user will need to log in when they use the retirement server.
- JWT: All info is stored on the token in the client, so it doesn't matter what server we're on.
  As long as both the bank and retirement servers have the same secret key, and
  obviously hashing algorithm, then the user just sends their JWT,
  and it should be hashed to the same signature.

# Benefits of JWT:

- Stateless: Server doesn't need to keep track of anything, unlike sessions. This
  reduces the need to use the database, as with sessions you'd have to store the
  session on the database.
- Portable: If two servers have the same secret key, then you can easily have the case
  where if they sign in on one server, they're authenticated for all others.
  In applications that are driven via APIs and microservices you could use the JWT to authenticate
  the client with those various microservices.

# Credits:

1. Web Dev Simplified: https://www.youtube.com/watch?v=7Q17ubqLfaM
