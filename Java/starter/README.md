# AutoConfiguration
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
Sometimes the sensible defaults 