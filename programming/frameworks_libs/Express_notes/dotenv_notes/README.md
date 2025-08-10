# Dotenv:

- Package for managing environment variables. Environment variables are named values that are used to affect the way processes are running. The process in this case is our web applications.

1. Managing secrets: We use environment variables to store sensitive information such as API keys, database credentials, etc. Things that we need to run the app, but don't want to expose. Developers can store their sensitive info on .env files, and exclude them from version control and being put into the codebase.

2. Cross-platform compatibillity/integration: Works with various programming languages and platforms, so it helps manage environment variables on many different types of projects. As well, it easily integrates with build systems and deployment pipelines.

# Why use it over --env-file=.env or similar?

- Portability and easily integrated. Works across platform s and doesn't rely on command line stuff. On windows you can easily import environemnt variables with --env-file=.your_environment_file, but not all platforms and environments will be able to easily do this. In the end dotenv just makes it more uniform and easy not only with the technology it uses, but also with how it's very popular, and everyone's on the same page in regards to how we deal with environemnt variables.


# Project setup:
1. npm i -D dotenv


# Credits: 
1. https://www.youtube.com/watch?v=zwcvXd3kGbw
