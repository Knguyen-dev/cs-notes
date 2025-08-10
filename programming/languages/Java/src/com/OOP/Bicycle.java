package com.OOP;

/**
 * Encapsulation: Idea where the attributes ofa class are hidden adn private. They can
 * only be accessed and changed via accessors or mutator functions. This is a fancy way of
 * saying getters or setters.
 *
 * Honestly this is pretty simple and I'm not going to show it, make all of your attributes private, and
 * create functions for returning the attribute and one for setting the attribute in each attribute.
 */
public class Bicycle extends Vehicle{
    int wheels = 2;
    int pedals = 2;


    private String make;
    private String model;
    private String year;

    public Bicycle(String make, String model, String year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Copy attributes of another bicycle and create a brand new bybicle (Copy Constructor)
    public Bicycle(Bicycle bicycle) {
        this.make = bicycle.make;
        this.model = bicycle.model;
        this.year = bicycle.year;
    }

    // Copy the attributes of another bicycle into current one
     public void copy(Bicycle bicycle) {
         this.make = bicycle.make;
         this.model = bicycle.model;
         this.year = bicycle.year;
     }

    public String getMake() {
        return this.make; // 'make' by itself is totally fine as well as Java is smart enough to know
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return this.model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getYear() {
        return this.year;
    }

    public void setYear(String year) {
        this.year = year;
    }





    @Override
    void go() {
        System.out.println("Bike goes go!");
    }

    @Override
    void stop() {
        System.out.println("Bike pedals halt!");
    }
}
