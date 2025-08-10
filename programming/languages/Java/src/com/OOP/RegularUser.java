package com.OOP;


interface User {

    /**
     * Interface that doesn't have a body. This is probably the most common
     * one as the idea is to plan out your class, and obviously you're not going to
     * immediately have the implementation ready.
     * In terms of attributes, interfaces can only declare constants, but not instance/field attributes.
     * So yeah interfaces are very similar to the abstract classes that you've seen.
     */
    void login();
    void logout();
    boolean isActive();

    // You can define default methods that the class will get when we apply or 'implement' this interface
    default void info() {
        System.out.println("I am a user");
    }

}

public class RegularUser implements User {
    private boolean active;

    public RegularUser() {
        this.active = false;
    }


    public void login() {
        this.active = true;
        System.out.println("User logged in!");
    }

    public void logout() {
        this.active = false;
        System.out.println("User has logged out");
    }

    public boolean isActive() {
        return this.active;
    }
}
