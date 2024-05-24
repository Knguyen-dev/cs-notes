# API Security

- In an express app that served view templates, we used PassportJS to authenticate
  a user with their username and password. However, when our express app is an API,
  it's easier to create and pass a secure token between our front and back end
  applications. This is called a JWT token and it's used to determine whether the
  requester, usually the front end client, is authorized to get the resources
  from the server. Essentially, when the user logs in, a secure token is made, and
  for all subsequent requests, that token is passed in the header of the user's
  request object. We already took notes on this in our "auth_notes" so refer to that,
  but also we have a 'jwt_security' example that showcases how we can secure our api
  routes so that only authorized users can access them.

- NOTE: Of course there are ways to get past jwt, but of course in a real world application
  there are so many layers of security in place and so many considerations to note. These
  notes are just a simple demonstration of jwt and how to secure api routes.

# How to generate secret keys for jwt tokens

1. Open up the terminal
2. node; initialize nodejs in the console
3. require("crypto").randomBytes(64).toString("hex"); Use crypto library to create your secret keys
4. This creates a random string, and you can use this as your secret key.

# Another way of handling jwt:

- This example is different in two ways. Here we're making
  it so we can't use refresh tokens to get new refresh tokens.
  So if you only wanted to user to be forced to login once a week, you'd
  make it so the expiration date on the refresh token as 7 days. This
  is approach prioritizes security over

  - More on this: https://www.youtube.com/watch?v=4TtAGhr61VI

- Securely handling access tokens:

1. Sent from backend to front end as json
2. The front end client stores the access token in memory,
   so using a state value. Meaning if client refreshes or closes
   the window, then the application forgets the access token.
3. We aren't going to store it in local storage or cookies. This
   is because if we're able to store it with javascript, a hacker
   can receive it with javascript. If the access tokens are lost,
   due to what we defined in our second bullet, then we'll rely on
   refresh tokens

- Securely handling refresh tokens:

1. Refresh tokens are sent as an httpOnly cookie. So it can't be
   accessed with javascript. Though they still have an expiration
   so that we can prevent indefinite access.
   Here we'll make it so refresh tokens can't be used to get new refresh
   tokens.

   

# Credits:
1. [JWT Explained - Web Dev Simplified](https://www.youtube.com/watch?v=mbsmsi7l3r4)
2. [Implementing JWT and Protecting API Routes](https://www.youtube.com/watch?v=mbsmsi7l3r4)