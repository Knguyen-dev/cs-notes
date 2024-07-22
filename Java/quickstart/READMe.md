# Basic Hello World API

## Crash Course to Maven
Maven is a 'build tool' and it basically helps programmers manage their projects and the dependencies needed to create their projects. 
Maven handles downloading the dependencies for our projects, and whatnot.

```
[//]: # (Regular maven command structure)
mvnw [options] [<goal(s)>] [<phase(s)>] 

[//]: # (Maven wrapper command, essentially the regular command but apparently you don't have to install Maven locally or something)
./mvnw [options] [<goal(s)>] [<phase(s)>]
```

#### Maven Life cycles
Maven has 3 default phases or lifecycle stages. 

- clean: Remove temporary directories and files. In maven our build compiles are put in a directory called 'target' by default. So executing 'clean' will remove this directory.
1. pre-clean: Here you may specify what you can do before cleaning.
2. clean: Does the actual cleaning and removing of temp directory.
3. post-clean: Here you can specify what to do after cleaning.
- default: where the most useful goals live. Where we do building, testing, etc. So here are the goals that are present in the default 
phase, and know that these are in order. So if you run a goal, it runs all of the goals before it. For example, doing `mvnw verify` will run compile, test, and package.
1. compile: Compiles your code into bytecode.
2. test: Runs our unit tests
3. package: Creates the jar or war file, effectively packaging our code for distribution. Again this finished product is called an 'artifact'
4. verify: Runs various checks and integration tests.
- site: Where code documentation is generated

#### Quick review on Maven folder structure
Maven is opinionated and forces you to put specific stuff in specific places, or your project won't work. This is to enforce uniformity across 
all Maven projects. 

1. `/src/main/java`: Where your main app's code is going to be.  
2. `/src/main/resources`: Extra stuff such as static files, templates/HTML files, and also an `application.properties` file that you can use to configure extra info about your project.
3. `/src/test/java`: Where your tests go. The pattern here is that in your main code you'll have a class, and then in the test file, you'll have a corresponding test class. And the test class is basically for any tests involving code from the corresponding class in your main source code.
4. `/src/test/resources`: You can have static or template files that are used only in your tests. You could also have a file configuring your tests.

#### Typical Maven Workflow
Here's a basic, but also effective Maven workflow that some people use:
```
[//]: # (IDE is pretty good at catching errors, but sometimes you may do a quick compile to see if your feature works )
mvn compile

[//]: # (Assuming you've written some tests, you'll want to test out your feature)
mvn clean test

[//]: # (we'll create an artifact to run our project as it is in production, you could also do verify)
mvn clean package

[//]: # (Run the artifact, launches our api in this case, should say it started on port 8080)
java -jar ./target/quickstart-0.0.1-SNAPSHOT.jar

[//]: # (Before pushes these changes to github we'll run verify and see if everything is working)
mvn clean verify
```

#### How to run our project (With Maven Spring-Boot Plugin)
There are many ways of running your application locally:
1. Running it with the IDE.
2. Creating a .jar file and running that with `java -jar`
3. Or you can use the 'Maven Spring-Boot Plugin', which allows us to do it via the command line.

```
[//]: # (Runs our spring boot web application)
mvn spring-boot:run

[//]: # (Then you can stop your application with a keyboard shortcut)
CTRL + C
```

## Spring vs SpringBoot
- Framework: Chunk of code written on top of a language's core library to solve common problems. Complex tasks such as connect to a database or exposing a rest API. 
- Spring: A popular Java framework that does complex work. It's highly configurable, but it takes a lot of effort to configure it.
- Spring-Boot: A framework or layer that's built on top of the Spring framework. It helps by doing a lot of the configuration for you, using opinionated conventions. It allows us to make use of the Spring framework with a lot of ease.

#### Spring App Layers 
A spring application can be thought about in terms of layers. Here they are from top to bottom:
- Presentation: This is where our API is, so in this case our controllers since we're using a rest API. Regardless of the API style, the presentation layer is always an API. This layer talks to the services layer, those services gets the data and sends it back to the presentation layer, and the presentation layer is responsible for showing that or sending that back to the user. However, it should be noted that even if we change our API style from rest API to GraphQL API, our service layer wouldn't change. The only thing that would change is our presentation layer and how we present or send back our data. 
- Services: Interacts with the functions exposed by the persistence layer. It can be very complicated logic, or simply a simple call to the persistence layer. But the idea is that the service classes and methods must be the only ones communicating with the persistence layer. 
- Persistence: Handle database stuff. Here we define 'entities' which model the database. There are two patterns which are the 'repository' and the DAOs (Database Access Objects). This layer just handles interactions with the database, and you can create interfaces to make sure even if you change the implementation of how we store data, it'll work the same.
Sometimes if a layer changes, the other layers shouldn't change. 

#### Modularity:

- Situation: If you wanted to interact with your database using Java Objects (Orm) you'd have to create a lot of 'beans' such as entity manager, transaction manager, etc. Then you'd need to download dependencies as well. This is a lot of work before we even write our code.
- Solution: With Spring Boot, just need dependencies, and some configurations, and Spring-Boot creates these beans for us. It does this using 'sensible defaults'.

#### Dependency Injection
- Without dependency injection: You are creating a class (A) that relies on other classes. We can create those other classes inside our main class. However, the issue arises when we want to change one of our dependencies, and swap out one of our classes for another. To do this, you'd find that you may have to change the code of the green class to make sure it works with the new class. This is kind of bad. We want to be able to swap out our dependencies and not have to change the main class interacting with those dependencies.
- With dependency injection: Instead of creating those concrete classes in the main class, create interfaces that those classes (our dependencies) will have to implement/meet. Then the a framework, the spring framework, will inject in and provide the concrete classes when needed. Then when we need to swap our dependencies, maybe we created a better class, then we can just swap out the concrete classes that are being used. As a result, the new class still implements/meets the interface, so you don't have to change your code in the main class.

- Bean: Objects that are managed by the Spring IoC (Inversion of Control) container. This container is a core aspect of the Spring Framework that's responsible for managing lifecycle and configuration of application objects.

- Connecting things together: Dependency Injection is when an object's dependencies are injected by an external entity (the IoC container in this case), rather than being created in the object itself. 
Your beans are objects created and managed by the Spring IoC, some external container or framework in this case.    

So the takeaway is that you code with the interfaces instead of your concrete classes, as that's the way to do things. Then the framework injects/provides those concrete classes


1. We can define a `/config/SomeConfig.java` class that defines our beans.
2. We can use @Component or @Service annotation to declare an implementation of an interface a bean.
3. Component scanning: Spring looks through our project to look for beans and where beans are needed. So for our `EnglishBluePrinter`, it 
   sees our `@Component` declaration or maybe a `@Bean` declaration in a config file to know it's a bean. It first sees if 
   the implementation needs any dependencies, usually these are decided in the constructor. Since that componnet doesn't require any 
   dependencies, it'll create an instance of that EnglishBluePrinter and store it in the Spring context as a bean that implements 
   the interface BluePrinter. Let's look at the case a bean needs dependencies. Our ColorPrinterImpl is a bean, indicated by the `@Component`
   and it requires dependencies for the interfaces `RedPrinter`, `GreenPrinter`, and `BluePrinter`. So Spring will look for 
   any beans in its Spring Context that meets these requirements. In this case it does have those beans and it uses those
   in the constructor. This is called dependency injection, or 'AutoWiring'. So if Spring finds all the beans it needs
   then the app starts perfectly. Else Spring will give you an error message of the bean that we're missing. Component scanning starts at a 
   particular point, and works its way down. In the olden days you used a `@ComponentScan` to tell boot when to start searching for 
   components. Now you use the `@SpringBootApplication` annotation, which calls the ComponentScan annotation for us. Now when looking 
   for beans, we start in our ColorsApp directory and all the packages below it. 

#### @SpringBootApplication
This annotation does three main things:
- @Configuration: Identifies a configuration class, which is a place Spring should look for beans during the component scanning phase.
- @ComponentScan: When it's called, this directory and all directories below it will be included as files we'll look at to see if they have beans.
- @EnableAutoConfiguration: Spring boot provides 'sensible defaults' to configure Spring related tools. Autoconfiguration is a process spring boot uses 
  to provide those default configurations and create those dependencies when the application starts up. Spring boot starters are just a collection of dependencies and tools in the Spring eco-system that helps us solve common problems.   

#### AutoConfiguration
This is one of the starters we have, and this has a lot of its own dependencies. Stuff like tomcat, Spring MVC, etc.
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
However, one of our external libraries is the `spring-boot-autoconfigure`, and this autoconfiguration
will create objects/beans with 'sensible defaults' (some default configurations), and then store those in
Spring's context. Then these will be used in our application. Let's look at `org.springframework.boot.autoconfigure/web/servlet/DispatcherServletAutoConfiguration`
In a Spring framework application, you'd configure these classes on your own, but a spring-boot project will create
the bean for you. Now don't stress to learn this stuff. You don't need to know how a car works in order to drive it, and
and you don't need to really know how this stuff works to work in SpringBoot. It's just something interesting.

```
[//]: # (When this class is created on your class path, the class annotated should be instantiated and run)
@ConditionalOnClass
public class DispatcherServletAutoConfiguration {
    ...
}

[//]: # (When this bean this available a given configuration a part of the configuration should run)
@ConditionalOnBean
... some code ...

```


#### Configuration files
Sometimes the sensible defaults that SpringBoot loads in aren't what we want. For example, what if we want to change the port our application runs on. 
We need to use the `application.properties` file. We need to put in certain keys and values. Those values are documented [here](https://docs.spring.io/spring-boot/appendix/application-properties/index.html).
Okay after searching we can change the port the application runs on with the `server.port` property. You can also use a `.yml` file, which benefits us 
as we don't have to repeat the prefixes such as 'server' everytime, things are done all in indents.

As well as this, you can have a configuration file for your tests. A good case is when you want to connect to an in-memory database for tests, whilst the real one is used
for production.

#### Environment variables
We can load configurations from environment variables as well, which is good since when you're using docker. Okay so to
```
[//]: # (You'd do this in an application.properties file)
server.port=8181

[//]: # (The environment variable verison)
SERVER_PORT=8181
```
There are two ways to load environment variables:
1. At the top right click on your project's name `QuickStartApplication` and do edit configurations. There you can add environment variables or an entire .env file. 
2. Or you could do it via the command line.
```
[//]: # (Standard stuff)
SERVER_PORT=8282 mvn spring-boot:run;
```

#### Configuration properties
Now we know about the ways we can load configurations, but what if we had some custom way we wanted to load in configurations
using 'configuration properties'.


## Databases 


#### Database layers
- Spring Data JPA: Adds repositories and other Spring magic to regular JPA. 
- JPA (Java Persistence API): Allows us to interact with the database via Java objects, and it handles the mapping of objects. The good thing about this is that you may be able to swap the database you're using and not have to swap much of your code. JPA is a specification, whilst the implementation used by Spring is called 'Hibernate'. Hibernate is an ORM.       
- Spring JDBC: Builds on top of regular JDBC, and also gives us templates to make it easier to work with SQL. 
- JDBC: A low-level API that lets Java interact with the database through SQL queries. This gives you basic and fine-grain control. However, handling mapping from and to Java objects is handled manually, which makes it irritating.  
- Database driver: Software that lets a programming language interact with a database.

#### H2 Databases
The goto in-memory database for Spring.



- Database driver







