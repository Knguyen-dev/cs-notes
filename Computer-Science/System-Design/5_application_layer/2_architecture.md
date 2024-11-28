# Software Architecture


## What do we mean by software architecture?
What we mean is how we setup different components of our system to talk to each other. This means like not only how are the servers set up? Are we using load balancers? Or a proxy? Are we using database replication? How about N-Tiered-Architecture? But we also ask things like: Is the code for the calendar service and the chat service in the same app? Or are they separated into their separate modules/servers that communicate with each other? How do your backend services communicate with each other? Are you using HTTP-style communication, or are you using message brokers? 

**A service** is a self-contained module/component within an app that focuses on a specific area of functionality or business logic. It handles a distinct set of requirements, typically reusable, and can operate independently of other services to support the broader application.

## Monolithic Apps
An architecture that combines all of the services in one app, server, runtime, whatever you want to call it. It's all in one container/component. For example, you're building an e-commerce app that takes orders from customers, verifies inventory and available credit, and ships them. It also has a frontend UI component. You would stick all of those component into one app.

**Advantages:**
1. Really beginner friendly and easy to develop, deploy, and debugging. It's the thing most people start off with, and it's pretty nice to know you only have to worry about one repo, workflow, CI/CD pipeline.

**Disadvantages:**
1. App tends to get really big and bloated if it gets a lot of services over time. Like imagine onboarding someone and knowing that they have to learn about the 7+ different major services associated with the application. Here's the chat functionality, here's the emailing service, also here's the authentication service, oh the payment service is over here, etc. 
2. Release process is going to be a lot longer. There's going to be a lot more tests, and releasing is going to take a little longer.
3. Scaling up the application is lot harder. If you need to scale up your shipping services, you're going to be spinning up more instances of your entire app. This is wasted resources such as CPU memory, and infrastructure costs. This is where microservices come in as they allow you to scale a given service whilst not affecting others.

## SOA (Service Oriented Architecture)
Where we define software components as 'services'. Each service provides a feature, or satisfies some business requirement that the app needs to have. Services should be able to communicate each other across platforms and languages. One of the main ideas here is the idea of being able to reuse services in different systems or combine several services to perform a complex task. Things should be loosely coupled.

## Microservices
An evolution of SOA. An architecture that separates all of the services into their own modules/component. Each component has a single responsibility. For example, Netflix could have a component for search, recommendations, authentication, etc. Each of your microservices is its own application, and can operate independently of others. So it's common to have a microservice architecture, where your microservices are all at different API versions and whatnot. 

### Communication within microservices
1. API: This is good for synchronous communication between your services. 
2. Message brokers: Good for asynchronous communication. 
3. Service Mesh 

**Advantages:**
1. **Easier to maintain:** As they only have one responsibility. I mean, you aren't going to change the email service as much, and when you do, it's not going to break other parts of your system. Also having different teams of people work on the application independently, through working on the microservices, is huge!
2. **Technological Flexibility:** Each microservice can have its own technology stack. The ideal way to handle this is to make sure your microservices use the same tech stack, but you should deviate when it really makes sense. As a result, you're keeping flexibility, but avoiding the case where all of your microservices are different.
3. **Scalability:** It's easier to scale. If you want to scale one service, you can scale it without affecting other services. This is optimal resource usage 

**Disadvantages:**
1. **Testing is a little harder:** Like if your microservice depends on other microservices to work, then doing tests between them is going to be a little hard since you're going to have to spin up containers every time and whatnot. Or mock it out.
2. **Debugging is harder:** You have to look to see where the issue came from, and it could have been a bug that happened due to some cross communication.
3. **More complexity:** Your infrastructure is more complex. Every microservice should have a layer of monitoring, alerting, logging, deployment, etc. It's worth it, but you should expect to see this level of complexity going in.

### Microservices vs Monolith (Suggestion):
Even Netflix started off as a monolith. If you're just getting started, it's probably better to start with a Monolith, as you're just trying to get your product to market. You can worry about scaling to a million users when you get there. The only exception to this is if you know that your backend is going to get a lot of requests right off the bat. This usually happens when you're integrating with an already popular system. In that case, yeah probably use microservices.

### Service Discovery 
If you're planning on a microservice architecture, we use 'service discovery systems' to help services find each other. Systems such as 'ZooKeeper' help services find each other by keeping track of registered names, addresses, and ports. They also provide health checks to verify service integrity.

## Serverless
The idea of using servers provided by a **cloud service provider** (CSP) instead of your own. So the idea is that developers can focus on writing application code, and deploying it to containers managed by the CSP. So the CSP handles scaling as needed, infrastructure maintenance, OS updates/patches, security, system monitoring and more. As well, you only pay for the time your servers are running.

Examples of serverless services are AWS Lambda, Azure Functions, or Google Cloud Functions. 


# Credits
1. [Monolithic Architecture](https://microservices.io/patterns/monolithic.html)
2. [Monolithic vs Microservice Architecture](https://youtu.be/NdeTGlZ__Do?si=ShYkjeHQFC8iio4P)
3. [Service Oriented Architecture](https://aws.amazon.com/what-is/service-oriented-architecture/#:~:text=you%20implement%20microservices%3F-,What%20is%20service%2Doriented%20architecture%3F,other%20across%20platforms%20and%20languages.)
4. [What is serverless computing? - IBM](https://www.ibm.com/topics/serverless)
5. [Service Mesh](https://aws.amazon.com/what-is/service-mesh/)

