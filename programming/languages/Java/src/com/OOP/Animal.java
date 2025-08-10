package com.OOP;


/**
* interface: A template that can be applied to a class. Here it specifies what a class has/must do.
*            Specifying things like methods names that must exist, but not their implementations, etc.
*            Similar to the idea of abstract classes.
 *
* This idea is similar to TypeScript's interfaces as well.
*/





public class Animal {
    String species;

    public Animal(String species) {
        this.species = species;
    }

    public Animal() {
        this.species = "DefaultSpecies";
    }

    public void speak() {
        System.out.println("The animal is speaks!");
    }

    public String toString() {
        return "Animal{" +
                "species='" + species + '\'' +
                '}';
    }
}
