# OAuth
An open protocol for authorization. It's not an api or service, so anyone can implement it. It helps services authorize against each other on a user's behalf, often referred to as access delegation. It's an open standard, as all of these services on the web will follow certain specifications to communicate and understand each other.

### Examples
You have a photo-printing website, and users want to be able to access their photos from their google drive and import them to your website as well. So to do this, we just need to connect to the user's google drive on the behalf of the users. This can be done by asking for the user's google account credentials, and then logging in on their behalf. But how can the user trust the website to not save google account credentials. We can promise to throw it away after, but we can never fully trust websites and malicious actors to not store this info. Also even if we giev the website our google info to log in on our behalf, how can we guarantee that the website is only using it to access our photos, and not using it to look and do other things. So how can a third party service (google in this case) authorize that we can use their specific photos service, on behalf of that user?
 
 Here's another example. A rich person goes to a valet and tells them to park their fancy car. How can the rich person, ensure that the valet won't be able to do things such as open the trunk, search the glove compartment, etc? Some cars come with a master key which allows you to do those things, but also a valet key that allows you to start the car, but not open things such as the trunk or glove compartment. With this special key that restricts access ot the car, the rich person can be more assured that the valet won't be able to do anything malicious or outside of certain scopes. So the valet 'service', is given restricted access to the car 'service' so that it's only able to do what it's intended to.
 
 ### Typical OAuth Flow 
 This is typically the flow or steps taken for OAuth to work and for services to be authorized. Now going back to the example, the two services don't trust each other, but they do trust you, and let's say they both have OAuth implementation.
 1. User wants to use their photos from google drive. So they click on some button to connect them. The photo-making website sends google a request.
 2. This triggers Google to pop up with a window asking for credentials, and probably showing the service that is asking for authorization or access, and the various things that they can do or will get access to if you accept. 
 3. On acceptance, the google drive service sees that you have authorized the photo-making service. Google drive sends a jwt authorization/access token (with limited access/permissions) to the photo-making service. It's limited permissions to ensure the photo-making website can only access the allowed resources.
4. Then when the photo-making website makes a request for files in the google drive, we will check the access token, and since it's valid we let the service access those files. As a result, when entering credentials we ensure that only google receives the google-related credentials, and the photo-making app can only access what we wanted it to access, and not our entire google account.

## OAuth terminologies 
- Resource (or protected resource): The thing being sought in this OAuth flow, the thing that needs to be accessed. In our example, it is the photos on the Google drive service, that our photo website wants to access. We want to allow access to that resource.
- Resource owner: Person who has access to that resource. Here it's the user that has the google drive account. They are the entity able to grant access to the protected resource. 
- Resource server: The server that's hosting or holding the protected resource. Here it's Google drive because it's holding our resources. 
- Client: A client here, would be the application that's requesting access to those requested resource on the behalf of the user. The resource owner, the user, would need to authorize the client, so that the client can access those resources. So here the client is the photo website, since it's requesting access to the google drive app.
- Authorization server: A server, associated with the resource server, that checks whether or not requests for resources are authorized. In this case, the google drive server (resource), would rely on google's authorization server to ensure that requests made are authorized. This server issues access tokens to the client.
- NOTE: The resource and authorization server could be simply a single server, as maybe authorization is done on the same server.


## OAuth flows
There are many types OAuth flows and implementations for them, again they're just standards and steps, letting developers implement them by following a blueprint. We'll talk about some of the more important or common ones. OAuth flows are also known as grant types, so the naem 'Authorization Code Grant Flow' and 'Authorization Code Flow' are talking about the same thing.

### Authorization Code Flow
This is considered the golden standard or the safest code flow of the OAuth 2.0 code flows. 


1. **Client Request to Authorization Server**: The user logs into the photo printing website and wants to import images from Google Drive. The photo printing website (client) initiates the OAuth 2.0 authorization process by redirecting the user to Google's authorization server. This redirection includes a request for specific permissions (scopes).

    - **Request URL Example**:
      ```
      https://accounts.google.com/o/oauth2/v2/auth?
        client_id=YOUR_CLIENT_ID&
        redirect_uri=YOUR_REDIRECT_URI&
        response_type=code&
        scope=drive.readonly&
        state=YOUR_STATE_VALUE
      ```

2. **User Authorization**: Google's authorization server prompts the user to log in (if not already logged in) and asks the user to grant the requested permissions to the photo printing website. The user reviews and grants permission.

3. **Authorization Code Issued**: After the user grants permission, Google's authorization server redirects the user back to the photo printing website's specified redirect URI with an authorization code.

    - **Redirect URL Example**:
      ```
      https://your-redirect-uri.com/callback?code=AUTHORIZATION_CODE&state=YOUR_STATE_VALUE
      ```

4. **Client Exchanges Authorization Code for Access Token**: The photo printing website's server receives the authorization code from the redirect URI. The server then makes a secure server-to-server request to Google's authorization server to exchange the authorization code for an access token (and optionally a refresh token).  

    - **Token Request Example**:
      ```
      POST /token HTTP/1.1
      Host: oauth2.googleapis.com
      Content-Type: application/x-www-form-urlencoded

      client_id=YOUR_CLIENT_ID&
      client_secret=YOUR_CLIENT_SECRET&
      code=AUTHORIZATION_CODE&
      redirect_uri=YOUR_REDIRECT_URI&
      grant_type=authorization_code
      ```
- NOTE: If it wasn't obvious, the client_id and client_secret are values generated by Google, or the  authorization service being used, when you register your application with them. Then these credentials are used to verify your app's identity.
 
5. **Access Token Issued**: Google's authorization server validates the authorization code and issues an access token (and possibly a refresh token) to the photo printing website's server.

    - **Token Response Example**:
      ```json
      {
        "access_token": "ACCESS_TOKEN",
        "expires_in": 3600,
        "token_type": "Bearer",
        "scope": "drive.readonly",
        "refresh_token": "REFRESH_TOKEN"
      }
      ```

6. **Client Uses Access Token to Access Resources**: The photo printing website can now use the access token to make API requests to Google's resource server to access the user's photos.

    - **Resource Request Example**:
      ```
      GET /drive/v2/files HTTP/1.1
      Host: www.googleapis.com
      Authorization: Bearer ACCESS_TOKEN
      ```

7. **Resource Server Validates Token**: Google's resource server validates the access token. If valid, the resource server responds with the requested resources (e.g., the user's photos).

    - **Resource Response Example**:
      ```json
      {
        "files": [
          {
            "id": "fileId",
            "name": "photo.jpg",
            // other file details
          }
        ]
      }
      ```

## Implicit Code Flow
1. Resource owner requests to the client to login on the owner's behalf. The client makes a request to the authorization server. The client redirects the resource owner to the authorization server. 
2. Authorization server prompts the resource owner about who is being authroized and the permissions. The owner accepts, and instead of the giving the client an authorization token to use to get an access token, the auth. server just gives the client the access token.
3. Now the client makes requests to the resource server with this access toekn. The token is validated, and if good, the resources are given.

The drawback is that if someone takes the access token, they can access the google drive. In the Authorization Code Flow, it's more secure as with the inclusion of the authorization token, the exchange of the access token can be more secure. So implicit flow is not as secure, which is why the access tokens are short-lived.

## Client Credentials Flow
The Client Credentials Flow is a straightforward OAuth 2.0 flow for server-to-server communications, allowing a client to authenticate itself with an authorization server and obtain an access token to access protected resources. It's designed for scenarios where user authentication is not required, and the client itself needs to act autonomously.

### When to Use Client Credentials Flow
- **Server-to-server communications**: When one server needs to access resources on another server without user intervention.
- **Service accounts**: When applications act on their own behalf rather than on behalf of a user.

### How It Works
1. **Client Registration**:
   - The client (your application) registers with the authorization server (the server granting access to resources).
   - The client obtains a client ID and a client secret from the authorization server. These credentials are used to authenticate the client.

2. **Client Authentication**:
   - The client authenticates with the authorization server using its client ID and client secret.
   - This is typically done by sending a POST request to the token endpoint of the authorization server.

3. **Token Request**:
   - The client sends a request to the token endpoint of the authorization server. The request includes:
     - The grant type (`client_credentials`).
     - The client ID and client secret (usually in the Authorization header or as parameters).
     - Optional: Scopes (specifying the level of access needed).

4. **Token Response**:
   - If the client is successfully authenticated, the authorization server responds with an access token.
   - This access token can then be used to access protected resources on the resource server.

5. **Accessing Resources**:
   - The client includes the access token in the Authorization header of its requests to the resource server.
   - The resource server validates the access token and, if valid, grants access to the requested resources.

### Example

Here’s a simplified example using HTTP requests:

#### Requesting the Token

```http
POST /token HTTP/1.1
Host: authorization-server.com
Authorization: Basic base64(client_id:client_secret)
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&scope=your_scope
```

- **Authorization header**: Contains the client ID and secret encoded in base64.
- **Body**: Contains the grant type (`client_credentials`) and optionally the scope.

#### Token Response
```json
{
  "access_token": "access_token_value",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "your_scope"
}
```

#### Using the Access Token

```http
GET /resource HTTP/1.1
Host: resource-server.com
Authorization: Bearer access_token_value
```



## Password Grant Flow
The user would enter their credentials into the client-side app. Then the client-side app uses the user's credentials for an access token. This requires a lot of trust as the client-side app is collecting your credential information, and we'd have to trust the client-side app to not do malicious stuff with those credentials. This is not a recommended authorization flow, and shouldn't be used.

# Credits:
1. [What is OAuth](https://www.youtube.com/watch?v=t4-416mg6iU)
2. [OAuth terms and deep-dive](https://www.youtube.com/watch?v=3pZ3Nh8tgTE)
3. [Visual  chart of OAuth Code Flows](https://roadmap.sh/guides/oauth.png)