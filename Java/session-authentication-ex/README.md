# Restful Session Authentication and Authorization using java 17, Spring Boot 3.1.0 and Redis

## Prerequisite
- Docker

## Quickstart
To use this project, you'll need docker to get the latest versions of MySQL and Redis and Java IDE with Maven support. 
Clone the repository and import the project into your IDE. 

```bash
git clone git@github.com:emmanuelU17/restful-session-authentication.git

'To get the application running' 
* docker compose up -d
* ./mvnw clean spring-boot:run

```

## Description
This project implements session authentication for a web application using Spring Security and Redis as the session 
storage. Users can register and log in using their email and password, and access different parts of the application 
based on their role.

## Features
* Register, Login and Logout using restful APIs.
* Email and password authentication
* Role based authorization
* Redis for storing key value pair
* Testing using test containers

## Explaining Spring Security Architecture
There are several components in the Spring Security in the request-response cycle that do things such as process requests, store information of authenticated users or users making the request, responsible for fetching users from the database, and various other things required in the security process. Here are a list of components that you get you some knowledge on the situation.
- `Security Filter Chain`: A series of filters (middleware) that processes incoming HTTP requests, and communicates with the next layer the `Authenticaiton Manager` for 'validating' requests. So it's going to do things such related to authentication, authorization, session management, and other things. There are many builtin interfaces and filters that help you manage common use cases such as logging out, remembering the user, etc.
- `Authentication Manager`: Main thing that verifies a user's identify. It controls nad communicates with `Authentication Providers`, where each provider allows us to handle different types of authentication for different parts in our app.
- `Authentication Providers`: The workers managed by the `Authentication Manager`, and these are actually responsible for doing the authentication logic. There are several types of authentication providers, so here are the common types:
1. DaoAuthenticationProvider: Here we'd use a `UserDetailsService` to retrieve user details from a database and compare credentials. So this is when you somehow get a userId or some information associated with the user request, and query your database to ensure that an actual user exists with that id (similar to session-based).
2. LdapAuthenticationProvider: Used when you authenticate using LDAP servers.
3. JwtAuthenticationProvider: Used for validating the jwt tokens for the user.
4. Custom authentication provider: Now this would be when you have some custom or very specific authentication process.
- `UserDetailsService`: So this service would be used with one of your `Authentication Providers`, and it would be used to fetch a user from the database given some identifying information in the authentication process. So Spring Security provides the interface for this service, and then you'll provide the implementation.
- `PasswordEncoder`: This component is used to hash and compare passwords. An example of a popular password encoder is `BCryptPasswordEncoder`.
- `SecurityContextHolder`: This class stores information about the currently authenticated user that's making the request in our request-response lifecycle, also known as the 'security context'. So this would have things such as the user's roles and other security-related data. We can get more specific about the data if we talk about the `Authentication Object` and the `Principal`.
- `Authentication Object`: So when a user successfully authenticates, Spring Security creates an `Authentication` object within the security context. This object holds all information about the authenticated user and other user-related info. Here are some of the things it contains:
1. Principal: A field and also a specific concept within the `Authentication` object. Whatever this information is, be it a username, `UserDetails` object, or any other user information, it represents the identity of the user and is often retrieved via the `getPrincipal()` method.
2. Credentials: Typically this is the password or other security credentials needed to authenticate/prove the identity of the user.
3. Authorities: This would be any roles or permissions that were granted to the user.
4. Details: Additional details about the authenticated request such as an IP address or session ID.
- `Principal`: Again this object represents the identity of the authenticated. Here are some common things it can be:
1. String: Often used to represent the username of a user. And of course 'username' is just the thing identifying the user when logging in, so you could also use something like an 'email' as well if your users login with email.
2. `UserDetails`: If you're using the `UserDetailsService`, then the principal can be an instantiation of a `UserDetails` implementation.
3. Custom object: If you have a custom authentication mechanism, the principal could be any custom object that you use to represent and identify the authenticated user!
 
Now let's talk about the entire sequence for making a request, whilst happens in each step and how the components we were talking about fit in.
1. Request is received by our server and processed by our `Security Filter Chain`. Each filter has some specific security-related task to perform on the request.
2. If the user isn't unauthenticated yet, then the filters in the chain will trigger `Authentication Manager` component. If the credentials match, the `Authentication Manager` should generate a `Authentication Object` to be stored in the security context. So now the `Authentication` object is being managed by the `SecurityContextHolder` component. This indicates a successful authentication, however let's go a little deeper into components controlled by the `Authentication Manager`.
3. The `Authentication Manager` uses any configured `Authentication Providers` to verify the user's credentials.
4. Your `Authentication Providers` will use the `PasswordEncoder` to store and compare passwords. They may also use a `UserDetailsService` to fetch user details and data from the database.    
5. Now at the end of our authentication process we either were successful in authenticating the user, or we failed. So we have to send the status of the authentication response to the client for the response.

### Authentication Architecture (little more indepth)
- `AuthenticationEntryPoint`: Used to send an HTTP response that requests credentials from a client. If a client includes their credentials (username and password) we don't need to make use of this and send a response asking for those credentials. However when they make a request to a protected resource, this component may redirect them to a login page, or ask for stuff from them.
- `AbstractAuthenticationProcessingFilter`: A base filter in your `SecurityFilterChain` that's used for authenticating a user's credentials. Okay now let's see the sequence on how the authentication process works.
1. User sends credentials, which causes the `AbstractAuthenticationProcessingFilter` to create an `Authentication` object from the request object. This authentication object needs to be then be authenticated/verified.
2. It's passed to that `Authentication Manager`, which will now verify the user's credentials. 
3. If fails, then the `SecurityContextHolder` is cleared, so our spring security context is a blank slate now because there's no authenticated user associated with our request anymore. This also triggers functions such as `RememberMeServices.loginFail` (if you have it setup) and also `AuthenticationFailureHandler`.
4. If it succeeds then the now verified `Authentication` object is stored in the `SecurityContext` so now our app knows the details of who is authenticated for this request.

## Persisting Authentication
When user logs in and gets authenticated we give me a new session id, which will be set as a cookie for them. Then on
subsequent requests, we check that session id to continue to re-authenticate the user. Now let's talk about the main 
components we should be knowing:

- SecurityContextRepository: Responsible for storing and retrieving the `SecurityContext` (which includes the `Authentication` object) between requests. It seems to not actually store anything directly, but it acts as the leader in communicating between components that handle the storing and whatnot. However, it's just an interface, and one of its implementations is called the `HttpSessionSecurityContextRepository`. 
- SecurityContextPersistenceFilter: Ensures that the `SecurityContext` is loaded at the beginning of each request and saved at the end.
- SecurityContextHolderFilter: Works similar to the `SecurityContextPersistenceFilter` but has different specifics and requirements.

-  `HttpSessionSecurityContextRepository`: It uses an HTTP session to store the `SecurityContext`, between requests?
1. When a request is received, we'll try to get HTTP session information from the session ID provided in the request. If we find something, it's set in the `SecurityContextHolder`, which stores the currently authenticated user.
2. At the end of the request, we need to save our `SecurityContext` into a session, this just keeps user sessions updated and tracks any changes. If the `SecurityContext` was empty (no user was authenticated), we remove it from the session. 

## Spring Session and using it with redis

### What is Spring Session and what does it try to do?
Spring Session provides an API and implementations for managing a user's session related information, whilst also making 
it easy to support 'clustered' sessions more easily. Clustered sessions just refers to when a user's session data is replicated across multiple servers in a cluster or region. This ensures that if one server fails, then another server will still contain that user's session data and will still be able to authenticate them. Just a big idea in distributed applications.
- HttpSession: Allows replacing the HttpSession (Java implementation of sessions) in an application container-neutral way, with support for providing session IDs in headers to work with RESTful APIs.
- WebSocket: Provides the ability to keep the HttpSession alive when receiving WebSocket messages
- WebSession: Allows replacing the Spring WebFlux’s WebSession in an application container-neutral way.

Before Spring Session, we had to store session information on the server and in-memory, which wasn't good for the development of distributed web apps. 
Now with Spring Sessions, we're able to store all session-related data in a shared store that all of our servers can access. As a result 
our application is much more distributed because regardless of what server processes a user's request, they just query the 
shared session store to see if that user has a session associated with them. This is what articles are mentioning when they're talking 
about replacing 'HttpSession', as they're more-so talking about moving away from storing session data on an individual server.

### RedisSessionRepository vs RedisIndexedSessionRepository:
You'll likely have to choose between two implementations of the `SessionRepostiory` interface that stores session data in redis. 
Both are different in how they handle indexing and querying.
- `RedisSessionRepository`: Basic/standard implementation that stores session data in Redis without additional indexing. So the session id values are keys, and the serialized session objects/data are the values. However, since it doesn't do any extra indexing, querying based on something other than the session ID.  
- `RedisIndexedSessionRepository`: Advanced implementations that has extra indexing, and introduces additional data structures to efficiently query sessions based on other attributes or criteria. May create indexes based on user ID or last access time. Also it supports the automatic removal of session data from Redis after a specific period. So TTL management is more integrated, so pairs with an expired TTL will be cleaned up automatically. Whilst in the basic implementation you'd need to handle expiration and cleanup manually.

## Authentication via Spring Security Filters vs Manual Authentication
So there are two main options for handling authentication, either doing it manually or relying on Spring Security's built-in filters.
- Using Spring Security Filters: Spring Security gives us a series of built-in filters that handle various aspects of the authentication process. In this case 
the filter chain does all the work, checking credentials, loading user details, and managing sessions.
- Storing Authentication Manually: Here you'll create custom filters or an endpoint POST '/login' to process authentication
requests and manage user sessions or tokens. 

Okay let's go through the options we have:

### Form-Based Authentication ('formLogin()')
Designed for webapps that handle authentication through html forms, but rendered server side. So you'd use this when your Spring 
application directly serves web pages (e.g. Thymeleaf, JSP). It handles login forms via POST requests, and integrates well with 
Spring Security to manage authentication and sessions.

### Custom Authentication Mechanism
Our Spring application is a REST API that communicates with a frontend application. So the frontend handles rendering the 
forms, and then making requests to the backend. Here you could use something like token-based authentication which is 
pretty good if you're planning to do third-party integrations, amongst other things of course. 

However, in our case we're still doing session based authentication. We plan to render a login form on the frontend, and 
hitting our login endpoint on the Spring backend. Though this will take a little more work as we'll have to implement some 
of our own session management logic, among other things that we'll talk about in our `AuthService.java`







# Credits:
1. [Spring Security Architecture](https://medium.com/@rasheed99/introduction-on-spring-security-architecture-eb5d7de75a4f)
2. [Records in Java](https://www.baeldung.com/java-record-keyword)
3. [ControllerAdvice and error handling in Spring-Boot](https://www.bezkoder.com/spring-boot-controlleradvice-exceptionhandler/#:~:text=A%20Controller%20Advice%20is%20a,translate%20them%20to%20HTTP%20responses.)
4. [ControllerAdvice, AuthenticationEntryPoint, and handling security exceptions](https://www.baeldung.com/spring-security-exceptionhandler)
5. [Redis cache in Spring-Boot; cache not implemented, but a good guide](https://premika-17.medium.com/implementing-redis-in-spring-boot-3d2756e5ab69)
6. [Session Management - Spring Docs](https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html)
7. [Standard Redis session store - Spring Docs](https://docs.spring.io/spring-session/reference/http-session.html#httpsession-why)
8. [Redis with index or without - Spring Docs](https://docs.spring.io/spring-session/reference/configuration/redis.html)