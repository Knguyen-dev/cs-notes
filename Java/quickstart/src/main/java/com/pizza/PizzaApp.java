package com.pizza;

import com.pizza.config.PizzaConfig;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Let's do dependency injection and inject the PizzaConfig as a bean
 */

@SpringBootApplication
public class PizzaApp implements CommandLineRunner {

    // 1. Set up private instance
    private final PizzaConfig pizzaConfig;


    // 2. Make constructor that's going to accept a PizzaConfig implementation; Now we just need a bean, or implementation of
    // PizzaConfig that exists in the Spring Context.
    public PizzaApp(PizzaConfig pizzaConfig) {
        this.pizzaConfig = pizzaConfig;
    }




    public static void main(String[] args) { SpringApplication.run(PizzaApp.class, args); }

    @Override
    public void run(final String... args) {
        System.out.println("Pizza: " + pizzaConfig);
    }
}
