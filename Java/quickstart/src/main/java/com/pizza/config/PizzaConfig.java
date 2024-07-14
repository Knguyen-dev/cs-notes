package com.pizza.config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Objects;


/**
 *
 * '@Configuration': tell spring to look at this class to find beans, nad in this case a configuration property
 * '@ConfigurationProperties': This prefix is the prefix of a key that spring will look for in a yaml, .env, or whatever config file.
 *
 *
 * Now so far, it'll only hit the no argument constructor. To set up the values, go to your 'application.properties' file, or in this case
 * the application.yml, and then type out your properties
 *
 * pizza.sauce
 * pizza.topping
 * pizza.crust
 *
 * We match our 'pizza' prefix, and match the variable names inside the PizzaConfig class. As a result your bean should be
 * created and your configurations are done.
 */

@Configuration
@ConfigurationProperties(prefix="pizza")
public class PizzaConfig {
    private String sauce;
    private String topping;
    private String crust;

    public PizzaConfig(String sauce, String topping, String crust) {
        this.sauce = sauce;
        this.topping = topping;
        this.crust = crust;
    }

    public PizzaConfig() {
    }

    public String getSauce() {
        return sauce;
    }

    public void setSauce(String sauce) {
        this.sauce = sauce;
    }

    public String getTopping() {
        return topping;
    }

    public void setTopping(String topping) {
        this.topping = topping;
    }

    public String getCrust() {
        return crust;
    }

    public void setCrust(String crust) {
        this.crust = crust;
    }


    /**
     * Used to compare two objects for equality. By default we'd check for reference equality, however in most cases we'd want to compare the data inside those
     * objects . This is why we ovveride it.
     *
     *
     *
     */
    @Override
    public boolean equals(Object o) {

        // If the references are the same, you know the object is the same
        if (this == o) return true;

        // If null or the classes being compared are different , then return false.
        if (o == null || getClass() != o.getClass()) return false;
        PizzaConfig that = (PizzaConfig) o;

        /*
         * - Compares the fields of both values, if all are the same, then they are equal.
         * Java differentiates the current object with 'this', and the object
         * being compared with 'that' keywords.
         */
        return Objects.equals(sauce, that.sauce) && Objects.equals(topping, that.topping) && Objects.equals(crust, that.crust);
    }

    /**
     * Returns a 'hash code', which is just an integer we get from hashing the values
     * of some fields. The idea is that if two objects are equal according to the equals() method,
     * then they must have the same hash code.
     *
     *
     */
    @Override
    public int hashCode() {
        return Objects.hash(sauce, topping, crust);
    }

    @Override
    public String toString() {
        return "PizzaConfig{" +
                "sauce='" + sauce + '\'' +
                ", topping='" + topping + '\'' +
                ", crust='" + crust + '\'' +
                '}';
    }
}