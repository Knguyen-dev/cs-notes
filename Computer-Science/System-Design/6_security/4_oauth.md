# OAuth

### Situation
Let's say I'm on Google Photos, and I want to use a special printing site called "PrintMagic" that'll allow me to print my photos. I want to let PrintMagic access my photos, but I don't want to give them my Google Account Credentials. This is where OAuth comes in, as it allows service PrintMagic to interact with Google Photos, in a secure way that doesn't force you to give you Google Credentials to PrintMagic or some other third party service.

### How it works
The idea is like giving someone a special key that allows them to access the resources of another application with your permission. In this example, you'd be giving PrintMagic a "resource key" that grants them the ability to download your photos, enabling them to print those photos on your behalf. You can revoke this access at any time. The main takeaway is that we can give PrintMagic access to our Google Photos without sharing our Google Account credentials.

This flow can be broken down:
1. **You:** The resource owner, since you own the photos on Google Photos
2. **Google Photos:** The resource server that stores our photos. The authorization server is also Google-affiliated, and is responsible for handling the OAuth process.
3. **PrintMagic:** The client that wants to access our photos.

## A step-by-step OAuth Flow
Yes, this is a great explanation of how OAuth works and its flow. It’s clear and straightforward, with a good breakdown of the steps involved and the key concepts. Here are a few suggestions and points to consider:

### Strengths:
1. **Clear Explanation of OAuth:** The analogy of giving someone a special key is relatable and helps convey the main idea behind OAuth.
2. **Step-by-Step Breakdown:** The step-by-step process you provided covers the core aspects of the OAuth flow well.
3. **Emphasis on Security:** You made it clear that the process allows PrintMagic to access your photos without revealing your Google credentials.

### Suggestions for Improvement:
1. **Clarification of Terminology:**
   - When mentioning "clientid" and "clientsecret," it might be helpful to add a brief explanation that these are unique identifiers assigned to the third-party application (PrintMagic) by Google for tracking and securing access.
   - The term **"authorization server"** could be clarified further. You might say something like, *"The authorization server (Google) is responsible for verifying the user’s identity and issuing tokens."*

2. **Security Note on Authorization Code Exchange:**
   - Emphasize that the exchange of the authorization code for an access token must happen over a secure channel (e.g., HTTPS). This ensures that sensitive information like the client secret is not exposed.

3. **Clarify What Happens After the Access Token Is Obtained:**
   - It could be helpful to briefly mention that access tokens have an expiration time and that PrintMagic would need to use a refresh token (if provided) to request a new access token after it expires.

4. **Scope Explanation:**
   - The use of "scope" in Step 2 could be expanded to briefly explain that it is a string that defines the level of access the client is requesting, such as read-only or read-write permissions.

5. **Illustrating the Benefits:**
   - It might be useful to include a brief mention of how OAuth also protects the user by not sharing sensitive information (like passwords) with third-party services, which further ensures user privacy.

### Suggested Revision (with additions):
---
**How it Works**:
The idea is like giving someone a special key that allows them to access the resources of another application with your permission. In this example, you'd be giving PrintMagic a "resource key" that grants them the ability to download your photos, enabling them to print those photos on your behalf. You can revoke this access at any time. The main takeaway is that we can give PrintMagic access to our Google Photos without sharing our Google Account credentials.

**Step-by-Step OAuth Flow**:
1. **User Action**: You tell PrintMagic to print photos from your Google Photos.
2. **Client Request**: PrintMagic communicates with Google’s authorization server, sending its *client ID* and the *scope* (permissions it needs, such as "read photos").
3. **User Approval**: Google's auth server checks with you to confirm if you authorize PrintMagic to access your photos. If approved, Google issues an *authorization code*.
4. **Code Exchange**: PrintMagic receives the authorization code and sends it, along with the *client ID* and *client secret*, to Google’s auth server over a secure channel (e.g., HTTPS) to get an *access token*.
5. **Access Token**: Google sends an access token back to PrintMagic. PrintMagic can now use this token to make requests to Google Photos and retrieve your photos.

**Important Note**: The client secret is a key known only to PrintMagic and Google, ensuring secure communication. Access tokens are limited in scope and time, meaning PrintMagic can only perform the actions you've authorized and only for a limited period before needing renewal.


## When to use OAuth in your application?
1. **Your app sends user data:** If your app stores user data (e.g. Google Drive, Google Photos) and other services are setup to connect to it, then yes you'll need OAuth for other apps to get resources from your app.
2. **Your app requests user data:** If your app connects to other services in order to get user data, then you need OAuth so that you can access those resources.

# Credits:
1. [OAuth 2 Explained in Simple Terms - ByteByteGo](https://www.youtube.com/watch?v=ZV5yTm4pT8g)
2. [OAuth 2.0 and OpenID Connect - OktaDev](https://www.youtube.com/watch?v=996OiexHze0)
3. [OAuth Visual Diagram](https://roadmap.sh/guides/oauth.png)