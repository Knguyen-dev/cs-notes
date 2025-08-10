package com.testingarena;


import com.OOP.Car;
/**
 * So testing the validity of those access modifiers
 */
// There is a Car class (File Car.java' in package 'OOP' how import?

public class Main {

    public static void main(String[] args) {

        // Yep, the private, protected, and default speed attributes aren't accessible here.
        // the latter 2 due to this being in a different package, and the former literally have private
        Car newCar = new Car();
        System.out.println("newCar.publicSpeed: " + newCar.publicSpeed);
    }

}
