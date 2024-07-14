package com.knguyendev.quickstart;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * + Basic Web API in Spring
 * Now the spring web framework that we use as a dependency essentially is doing most of the magic for us here, allowing
 * us to create a simple API with next to no code
 */

/**
 * Create a Rest API controller; So using this 'RestController' annotation, you are telling SpringBoot that this 'HelloWorldController'
 * class is a controller, or class that sets up some api routes.
 */
@RestController
public class HelloWorldController {

    /**
     * Create an API endpoint GET '/hello'.
     *
     * Here we create a controller function, which is just a function that executes some code when a user hits an endpoint.
     * Here we do 'GetMapping' to create a route for a GET request, and the endpoint is '/hello'. Then in this endpoint
     * we just return back the string HelloWorld.
     *
     *
     * NOTE: There are other 'binds' or 'annotations' such as 'PostMapping', which allows you to do POST requests.
     * The pattern is very easy to see.
     */
    @GetMapping(path="/hello")
    public String helloWorld() {
        return "Hello World!";
    }

}
