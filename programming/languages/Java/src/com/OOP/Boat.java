package com.OOP;

public class Boat extends Vehicle {

    public int boatAge;

    public Boat(int boatAge) {
        this.boatAge = boatAge;
    }

    void go() {
        System.out.println("Boat swims across the Atlantic!");
    }

    void stop() {
        System.out.println("Boat stops momentarily!");
    }



}
