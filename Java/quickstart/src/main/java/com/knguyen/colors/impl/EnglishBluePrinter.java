package com.knguyen.colors.impl;

import com.knguyen.colors.interfaces.BluePrinter;
import org.springframework.stereotype.Component;


// Declaring EnglishBluePrinter to be a bean/implementation of BluePrinter that should be stored in Spring context

/**
 * The '@Service' is a friend annotation. This does the exact same thing as '@Component', but it's more descriptive to us
 * about what this class actually does. So before we talked about the services layer. So this will still create
 * 'EnglishBluePrinter' as a bean for BluePrinter, but it tells developers that this is a service.
 *
 */
@Component
public class EnglishBluePrinter implements BluePrinter {
    public String print() {
        return "blue";
    }
}
