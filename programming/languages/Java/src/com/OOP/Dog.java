package com.OOP;

public class Dog extends Animal {

    // Private class variable that's constant
    private static final String species = "Dog";

    // Instance attribute
    String name;

    public Dog(String name) {
        super(species);
        this.name = name;
    }

    // Default constructor for dog
    public Dog() {
        super(species);
        this.name = "Default Dog Name";
    }

    // Copy constructor; if no dog is passed, it'll just create one using default constructor
    public Dog(Dog otherDog) {
        super(species);
        this.name = otherDog.name;
    }

    // this 'Override is just annotation to indicate that 'speak' from the parent class
    // is being overwritten by  the speak method from the child class. This doesn't have any
    // effect on the overwrite process, but is just here for documentation purposes
    @Override
    public void speak() {
        System.out.println("The dog speaks well!");
    }

    @Override
    public String toString() {
        return "Dog(" + "name='" + this.name + "')";
    }
}
