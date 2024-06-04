# Login and email system

## What we'll be doing:
Today we'll be implementing email verification, password reset, and lastly two factor authentication in NodeJS. 
- email verification: So when a user signs up, we have a field for 'email', which is the email they want their account to be associated with. Then when they confirm their signup, we send a email to the email they signed up with. Here we'll need them to click a link or something to verify that their email is functioning and we can send emails to them.


## Backend setup
```
npm i express mongoose bcrypt
npm i -D nodemon dotenv
```