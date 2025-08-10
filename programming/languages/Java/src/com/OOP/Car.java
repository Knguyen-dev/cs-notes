package com.OOP;

public class Car extends Vehicle {

    /**
     * Review on access modifiers:
     * 1. public: Accessible from any other class
     * 2. protected: Accessible within its own package and by subclasses, so subclasses will inherit it
     * 3. default: Accessible only within its own package
     * 4. private: Only accessible within its own class
     * No modifier on this one, but it's still inherited since the parent and
     * subclass are in the same package.
     */
    public double publicSpeed;
    protected double protectedSpeed;
    double defaultSpeed; // package-private (default access modifier)
    private double privateSpeed;

    public int doors = 4;

    @Override
    void go() {
        System.out.println("Car goes brr!!!");
    }

    @Override
    void stop() {
        System.out.println("Car brakes!");
    }
}
