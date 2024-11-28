# Cookie-Based Authentication
Cookie-based authentication is a mechanism where authentication-related information, such as session IDs or tokens, is stored in the cookies of the client's browser. This method is commonly used to persist user authentication across multiple requests and is the backbone of many authentication mechanisms, such as stateful authentication such session-based authentication, and stateless such as storing JWT refresh tokens in secure HTTP cookies.

### **How Cookie-Based Authentication Works**
1. **User Login**:  
   The user enters their credentials. Upon successful authentication:
   - The server generates an authentication token (e.g., a session ID or another token type) and stores it in a database or server-side store.
   - The server attaches this token as a cookie in the HTTP response.
2. **Client Requests**:  
   On every subsequent request, the browser automatically includes the cookie in the request headers. This allows the server to:
   - Look up the session ID in its database to retrieve session information (for session-based authentication).
   - Validate the token if using a stateless approach (e.g., JWTs).
3. **Logout**:  
   Logging out involves:
   - Removing the cookie from the client’s browser (usually by setting it to expire).
   - Deleting or invalidating the token or session ID stored on the server or database. As a result, even if the user somehow still has the cookie, when they hit our API, our server doesn't have a record for that cookie anymore, so it's invalid.

### **Relation to Session-Based Authentication**
Cookie-based authentication is a **subset** of session-based authentication when used in conjunction with server-managed sessions. Here’s the connection:
- **Session-Based Authentication**:  
  The server maintains a session object for each user in a database, or in an in-memory store (like Redis). The session contains user-specific data, such as login status or preferences. That session object should have an ID that uniquely identifies it. We store that session ID in a cookie and send that to the user's client. This is how we can link the user’s browser to their server-side session.
  
- **Cookie-Based Authentication**:  
  Cookies are simply the transport mechanism used to store and send the session ID (or other authentication tokens) between the client and the server. While session-based authentication relies heavily on cookies, cookies can also be used for **stateless authentication**, such as storing JWTs. 

### **Security Considerations**
To ensure secure cookie-based authentication:
- Use **HTTPS** to encrypt cookies during transport.
- Set cookies as `HttpOnly` to prevent access by JavaScript, mitigating XSS risks.
- Use the `Secure` flag to ensure cookies are only sent over secure connections.
- Apply `SameSite` attributes to reduce CSRF risks.