package com.serialization;
import java.io.Serializable;


/*
 * If a parent class implements the 'Serializable' interface, then
 * all of its subclasses will be serializable
 *
 * NOTE: The exception to this will be when a class contains
 * (has-a relationship) with an object that isn't serialiable . Then you'd have to make sure that the object
 * you're referencing is serializable. The rule is all fields and objects within the object has to be
 * serializable, in order for it to work.
 */
class Parent implements Serializable {

}

class Child extends Parent {

}


public class Relationships {
}

/**
 * If you don't want a field to be included in the serialization
 * process, then use the 'transient' keyword
 */
class Employee implements Serializable {
    // So this excludes id from the serialization process
    transient int id;
    String name;
    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
