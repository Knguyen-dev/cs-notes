# How Express Session Middleware Works:

# express-session:

1. Cookies:

- Data storage: Store small pieces of data, cookies are actually key-value pairs.
- Purpose: For tracking the state of a client, such as preferneces, tracking info, and managing client-side state.
- Persistence: Depend on things such as expiration date settings, whether or not they're session cookies or
  persistent cookies. The former lasting until the user closes their browser, and the latter lasting until
  you delete it or it expires on its own. For example, the latter is probably why
- Size limits: Suitable for storing small data.

- Note about secret value: When user goes on a site, it initiates a session and the server creates a unique session ID to identify the user's session. This ID is 'signed', which basically means it's hashed using the 'secret' value, and the hash is called the signature. Then the session ID and signature is sent within a cookie. That cookie is now stored on the client-side so each request made has that cookie. The server looks at that cookie, takes the session ID and hashes it with the key. If the resulting hash matches the signature in the cookie, then the server knows the session ID hasn't been messed with, and the client is who they say they are.

2. Session:

- Data storage: Stores data server-side. A session ID is sent to and stored in the client via a cookie while the server associates this ID with corresponding session data.
- Purpose: For server-side state management. Can store large amounts of data, and it's hidden since it's server-side. Good for storing secrets such as user credentials and whatnot.
- Persistence: Duration depends on how long the user's session lasts, which is just how long the user is on the site for.

# Project Setup:

1. npm i express express-session mongoose connect-mongo
2. npm i -D nodemon

# What is a session store?:

- Deciding what kind of persistent memory that we're going to
  store the user's session data in. So this is usually going to
  be a database. So with an in-memory session store, your app will create
  a session for a user with that sessionID, however once that server
  is terminated, that session and its data stored on the server is gone.
  So even if the user has the cookie with the sessionID, it's not
  going to match any session on the server, so no authentication,
  login again dude. However, by creating a collection for storing
  sessions, even if our server goes down, we still have data
  about past sessions, and can still map a sessionID to a session.
  As a result, server goes down, but once back up, we're still
  authenticated.

- How it works:

1. When we load our app. Session middleware fires, creates a session
   id, and stores that in the form of a cookie (key-value pair). Again
   that cookie that we're sending is going to be equal that session id.
2. This cookie that has the session ID is put into the set-cookie header
   of the response. So when the user receives this response, they're going
   to store it in their own cookies header.
3. Then for every request after, this cookie containing the user's session ID
   will be within those requests. Our server gets that and updates the corresponding
   docuemnt representing that session.

- NOTE: By default express-session stores that stuff in
  memory which isn't a scalable solution when our app
  gets bigger.

# Credits:

1. express-session docs: https://www.npmjs.com/package/express-session


# Project setup:
- Here passport-local is just the localstrategy. You can obviously
  do without this. 'express-flash' is for showing your error messages.
1. npm i express ejs passport passport-local express-session express-flash
2. npm i -D nodemon dotenv

# Credits:
- Web dev simplified: https://www.youtube.com/watch?v=xMEOT9J0IvI&t=463s