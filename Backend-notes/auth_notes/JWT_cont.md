# What are tokens:

- Pieces of data with just enough info to determine a user's
  identity, or authorize a user to do a certain task. They
  help out perform authorization and authentication processes.

# ID token:

- Token that front end, client, apps can use to identify a user. Can contain info such as name, email, or profile picture. Then your front end app can customize the user's experience based off of this info. It identifies authenticated users, and are mostly used by single-paged-apps and mobile apps.

# Access tokens:

- When the user logs in, our server gives them an access token. This token is used by the client side app to make secure calls to an API backend. When the client needs 'access' to protected server resources, the access token lets the server determine if the client has the 'authorization to access' certain resources. However once it expires, the client app could ask the user to login again to get a new access token.Or the alternative would be giving the client a refresh token to replace their expired token with.

- NOTE:

1. Issue: Access tokens are bearer tokens, meaning those who hold it can use it. It proves whether you can get a resource, rather than who you are. So malicious users can take access tokens to access a resource by presenting them to a server, and it only matters if the access token is valid because it doesn't care about the identify of said users. So how would we mitigate this problem?
2. Solution: One solution is to make access tokens with very short lifespan. As a result the malicious actor would have very little time to do stuff.

# Refresh Tokens:

- An access token with a short life span is good security. Then when it expires, the client app can use a long-lived refresh token to give the user a new access token. However, the refresh token just has to be valid and unexpired, but as a result the user wouldn't have to login again.

1. User logs in, the authorization server gives the client app an access token and refresh token.
2. The client app sends the access token over the network to the server when making API requests. Then the server sends back that the protected resource.
3. When our access token expires, we send the refresh token to the auth server, and then the auth server sends us back a new access token.

- NOTE: Refresh tokens can be a little more secure since they're also stored on the client, and aren't sent over with every api request like access tokens. But of course there's a chance refresh tokens can be intercepted. Refresh tokens are also bearer tokens so we need ways to secure this.

# Refresh token rotation:

- Guarantees that everytime an application exchanges a refresh token to get a new access token, we give the client a new refresh token. As a result, if malicious actors somehow get a refresh token, it's short lived.

# Credits:

1. Access and Refresh tokens: https://www.youtube.com/watch?v=-Z57Ss_uiuc
2. More on access and refresh tokens: https://www.youtube.com/watch?v=LowJMwa7LCU
