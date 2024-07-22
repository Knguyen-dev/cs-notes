# Spring Session Notes
Spring Session is an API that is used for managing user session info. However there are different store types such as storing session info on the server, JDBC (Api for connecting to SQL databases), MongoDB, and Redis is one of those stores. Since we have Redis as a dependency we have `spring-session-data-redis` instead of the default `spring-session-core`.

Since we have Spring Security, our application is going to have some default security. So when you try to access any route, you're taken to a login screen first. Spring creates a default user for you with username 'user' and a randomly generated password that appears in the console when the application runs. So go to GET `/` route, fill in the login info, and after logging in you access the route!

In your application cookies, you'll see a cookie named 'JSESSIONID' with a random string value. When you log in, the server creates a session ID and assigns to you cookies. This your client, the user, to remember your actions and identify you. The session ID corresponds to a session object that we store on the backend somewhere, and in this session object we have various data for the user. Such as their theme preferences, user ID, their permissions/roles, etc. So on subsequent requests, the user will have this session ID and our server will check if it's stored on the backend. If it isn't then it's an invalid session ID and we can reject the request, else 
it's valid so we get that session object associated with the session ID. Finally we can start doing stuff relating to the user.

By default, our sessions are stored on the server, so when the server restarts, then all session IDs and session objects stored on the server's end are wiped. So existing session IDs become invalid and the user has to login again. This is a problem when we want to update our application. Also, we have a problem when we want to horizontally scale things because what if we have multiple servers that are helping serve our main application? Sessions are tied to a specific server's storage, so if the user has a session on one server, they're authenticated for that specific server, but not the other ones. Spring Session helps us out here, and Redis in particular. We can now store our session information in Redis, and if we wanted to scale out our application, all of our servers would just need to look at our one redis server. 






## Credits:
1. [Intro to Spring Session](https://www.youtube.com/watch?v=k62bO-W6Sb0&list=PLZV0a2jwt22s5NCKOwSmHVagoDW8nflaC)


### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/3.3.1/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/3.3.1/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/3.3.1/reference/htmlsingle/index.html#web)
* [Spring Security](https://docs.spring.io/spring-boot/docs/3.3.1/reference/htmlsingle/index.html#web.security)
* [Spring Session](https://docs.spring.io/spring-session/reference/)
* [Spring Data Redis (Access+Driver)](https://docs.spring.io/spring-boot/docs/3.3.1/reference/htmlsingle/index.html#data.nosql.redis)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Messaging with Redis](https://spring.io/guides/gs/messaging-redis/)
