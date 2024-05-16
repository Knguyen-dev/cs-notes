## Session-based Authentication
So after loggging in, the user is assigned an ID, which can be stored on the server in-memory or using some other kind of storage. For subsequent requests, the session id is set in the request as a cookie, and the server uses this to identify the user.

### How it works
1. Client sends a login request.
2. The credentials are validated. We create a session, which consists of a session ID to uniquely identify a client. In your session, we'll store other important information such as a user ID, so that we can identify the user making the request as well. The user ID and other info is encoded/serialized. This is then stored in memory, or a persistent data store. 
3. The server will send the sessionID to the client, and the client will store it as a cookie. Then for subsequent requests the client will have this cookie with the session id. The server will check the session ID to see if it's in our storage. If it isn't, then it's an invalid session ID, so we stop them from accessing resources.
4. However if the sessionID is valid, we can use that session ID to get the session object associated with it. As a result, we can then deserialize the session data and get stuff like the user's ID. Then we can do stuff relating to the user!
5. Finally, when the user logs out, the session is destroyed. We remove the cookie from the request header that contains the session ID, and we also remove the session object that's server-side. 

- NOTE: If you're relying on storing the session data in-memory, then once the server goes down, all of that information is deleted, so your users are unauthenticated at that point. However you can also store your session data in a persistent data-store such as a database. In the latter, we'd just query the database for a sesioin with that session iD, to maintian the authentication for a user.

### Sessions vs JWT
- Stateless: Http is stateless, meaning each request is standalone. So when processing a request, we don't remember any information from the previous one. For stateless, the authentication session can't be removed.
- Stateful: Allows us to remember information from past requests, as that's how the server is able to associate information with a specific client, so that we can treat a specific client as authetnicated. 
 
Sessions are stateful since this our authentication persists across multiple requests. However the good thing about stateful, and sessions, is that sessions can be invalidated. If you want to log a user out or want to prematurely unauthneticate a user, then you can simply delete their session, which is stored on the server. For JWTs, which are stateless, it's actually pretty challenging to revoke a JWT since we aren't storing it on the server somewhere, it's all in the client. A token is valid until it has been expired, so to do this we may have to add some persistent storage to do token-revocation, which takes away an advantage of the statelessness of JWTs.

So yeah, JWTs are more server-performant since they need no extra server-side storage, however there are security risks. With sessions, it's a little more secure, but there is the performance downside of storing the session data somewhere, whether if it's in-memory or in a database.

### Credits:
1. [Session-based authentication visual chart](https://roadmap.sh/guides/session-authentication.png)
