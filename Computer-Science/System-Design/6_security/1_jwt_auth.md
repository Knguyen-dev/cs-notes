# JWT Authentication Overview
JWT (JSON Web Token) is a token-based authentication mechanism used for secure data exchange between parties. It allows the server to verify the identity and permissions of a client, without needing to store session data on the server (stateless).

## Anatomy of a JWT Token
A JWT is composed of three parts separated by periods (`.`):
- **Header**: Specifies the algorithm used for 'signing' the JWT (e.g., `HS256`) and the type of token (JWT). 
- **Payload**: Contains the claims or data you want to encode and embed into the JWT. Such as user ID, role, or expiration time (`exp`). You'd put a user ID because your server will want to know the user that's making the request. **NOTE:** The header and payload are then encoded into base64 strings. Base64 is reversible, and that's by design as we'll need to reverse them back into their original data later.
- **Signature**: A string created by hashing the header, payload, and secret key using the specified signing algorithm. This is the jwt signing process.

**Example Structure**: `header.payload.signature`
**How the JWT is created**:
1. Encode the header and payload into base64url format.
2. Concatenate the encoded header and payload with a dot (`.`).
3. Generate the signature using a hashing algorithm (e.g., HMAC-SHA256) with the secret key.
4. Combine the header, payload, and signature to form the complete JWT.

### JWT Validation Process
1. **Client Request**: The client includes the JWT in the `Authorization` header when making a request.`
2. **Server Verification**:
   - Extract the JWT and split it into header, payload, and signature.
   - Recreate the signature using the header and payload with the secret key. Run them through the same hash function to replicate our JWT signing process. 
   - If the recreated signature matches the one in the JWT, it's valid; otherwise, it is rejected. 
3. **Decoding**: If valid, the server decodes the payload (reversing the base64 encoding) to access user data (e.g., ID, role) and authorize access to resources. 

**Security Note**: The secret key (some cryptographic string) must be kept secure. If compromised, an attacker could forge valid tokens. 

### Benefits of JWT
- **Stateless**: The token carries all user data, so no session storage is needed on the server.
- **Scalable**: Can be used across different services and APIs, provided the same secret key is used.
- **Portable**: Suitable for distributed systems and microservices architecture.

## Token-Based Authentication Overview
This form of authentication involves the server issuing a token (access token) to the client after successful login. The client presents this token with each request to access protected resources.

### How Token-Based Authentication Works
1. **User Login**: The client sends credentials to the server.
2. **Token Issuance**: If valid, the server issues an access token (and optionally a refresh token).
3. **Accessing Resources**:
   - The client sends the access token in the `Authorization` header of requests.
   - The server verifies the token and grants access if valid.
4. **Token Expiry**: When the access token expires, the client can use the refresh token to request a new one.

### Refresh Tokens
- **Purpose**: To obtain new access tokens without requiring the user to log in again.
- **Storage**: Typically stored securely (e.g., HTTP-only cookies) and only sent to the server when refreshing an access token.
- **Security**: Refresh tokens should be kept secure to prevent interception.

### Best Practices for Secure Token Use
- **Use HTTPS**: Ensure all communications between client and server are encrypted.
- **Limit Lifespan**: Use short-lived access tokens and longer-lived refresh tokens.
- **Secure Storage**: Use secure mechanisms like HTTP-only cookies for storing tokens on the client.
- **Do Not Share Tokens**: Treat tokens like passwords; do not share or expose them.

## Token Types Overview
1. **Connected**: Physical devices (e.g., USB keys) used for authentication.
2. **Contactless**: Wireless communication (e.g., RFID).
3. **Disconnected**: Remote authentication over the internet, like 2FA on mobile apps.

# Credits:
1. [Web Dev Simplified](https://www.youtube.com/watch?v=7Q17ubqLfaM)
2. [Jwt visualized chart](https://roadmap.sh/guides/jwt-authentication.png)
3. [Intro to JWT](https://jwt.io/introduction)
4. [What is token-based authentication](https://www.okta.com/identity-101/what-is-token-based-authentication/)
5. [Access and Refresh tokens](https://www.youtube.com/watch?v=-Z57Ss_uiuc)
6. [More on access and refresh tokens](https://www.youtube.com/watch?v=LowJMwa7LCU)
