package com.OOP;

/**
 * Abstract Classes: They can't be instantiated by they can have subclasses. An abstract class will likely have
 * abstract methods. These methods have signatures and names, but no implementation.
 *
 * I mean imagine going into a car dealership and buying a 'vehicle'. That's pretty generic, all of them are vehicles.
 * and vehicles are ideas, it's abstract. To prevent someone from instantiating instances of a certain
 * class you can put 'abstract' modifier on it. With an abstract method, every vehicle has its own
 * version of 'go'. We've just made it so the child classes must implement the 'go' method on their own.
 *
 *
 */

public abstract class Vehicle {

    double speed;


    abstract void go();
    abstract void stop();

    // We'll keep this so that it's inherited by subclasses; can't eb public as that
    // indicates it should be accessed in an instance method, but that isn't possible for abstract classes
    protected void vehicleSpeech() {
        System.out.println("Ultimately, I am Vehicle!");
    }



}
