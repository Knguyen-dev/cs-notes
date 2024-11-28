# Session-based Authentication

After logging in, a user is assigned a unique session ID, which is stored on the server (in-memory or persistent storage) and sent to the client as a cookie. For subsequent requests, the client includes this cookie, allowing the server to identify the user.

### How It Works
1. **Login Request**: The client sends credentials for validation.
2. **Session Creation**: If valid, a session ID is generated, and user details are stored (e.g., in-memory or a database).
3. **Client Cookie**: The session ID is sent to the client as a cookie.
4. **Session Verification**: For subsequent requests, the server checks if the session ID exists and retrieves user data if valid.
5. **Logout**: The server deletes the session, and the client cookie is removed.

**Note**: In-memory storage means sessions are lost if the server restarts. For persistence, sessions can be stored in a database.

### Sessions vs JWT
- **Stateful (Sessions)**: Sessions are stored server-side, maintaining user state across requests. They can be invalidated by deleting the session, making logout and session management straightforward. However, sessions require storage and can impact performance.
- **Stateless (JWTs)**: JWTs are client-side and don’t require server storage, improving performance. However, they are difficult to revoke before expiration, potentially risking security. 

**Summary**: Sessions offer better security and control (e.g., session invalidation), while JWTs provide better scalability without server-side storage but come with more challenges in revocation.


# Credits:
1. [Session-based authentication visual chart](https://roadmap.sh/guides/session-authentication.png)
