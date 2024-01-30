# Authentication basics and notes

- The foundations to having users login and logout of our
  applications. We're going to take notes on authentication and how
  to do it in express.

# passportJS package

- Package for user authentication.

# bcrypt:

- A simple library that helps hash passwords. This was explained in the file sharing
  project ,but we want to hash passwords so that even if a person has access to the database,
  they won't be able to see the real passwords of the people recorded in the database, just
  the hashes of their passwords.

# Terms:

- Strategies: PassportsJS uses various 'strategies' or methods to authenticate users. They have
  many of them, but we're focusing on the 'username-and-password' method or strategy of
  authenticating a user. This is what they call 'LocalStrategy'

# Project setup and info

1. npm i express express-session mongoose passport passport-local ejs bcrypt
2. npm i -D nodemon

# Credits:

- Need to look at some of these videos to get a refresher on
  what cookies, sessions, etc. do. Also should look at some old tutorials on
  passportJS to get a feel on what's happening. Also the passportJS have
  their own docs and tutorials on how to do some of the stuff.

1. passportJS docs: https://www.passportjs.org/docs/
2. Cookies, sessions, and jwt explained: https://www.youtube.com/watch?v=uXDnS5PcjCA
3. Jwt explained: https://www.youtube.com/watch?v=7Q17ubqLfaM
4. Local storage, session storage, and cookies: https://www.youtube.com/watch?v=GihQAC1I39Q
5. Full tutorial on passport js (first 6 videos only): https://www.youtube.com/playlist?list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK
