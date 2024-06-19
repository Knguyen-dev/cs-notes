/**
* + Object Oriented Programming:
* Basically programming but with user-defined classes and objects.
* - Garbage collection:
* Java handles memory management, so objects that are no longer in use are
* automatically cleared by the garbage collector. The 'finalize()' method
* allows an object to cleanup its resources before it's normally expected to be removed.
* So it's a nearly clean up
* - Static vs Non-Static
* Static members belong to the class itself rather than any single instance.
* 1. static method: Available on the class rather than the instance
* 2. Static field: Value is shared across all instances of teh class.
* Regardless of whether or not you modify the static attribute through the
* class or a class instance, the change will be  reflected in all instances and
* all code that accesses said attribute. So the class and its instances always have
* the same value or reference for a given static attribute.
* + Constructors:
* Special function that initializes a newly created object. It needs to have the same name
* as the class to work.
* 1. Default Constructor: A constructor without parameters. If you don't define one,
* Java implicitly creates one for you.
* 2. Parameterized Constructor: A constructor that has parameters. So it accepts arguments, and this
* can be used to initialize different attributes for your objects.
* 3. Constructor Overloading:
* Constructors can be overloaded (same name, but different parameters). So as a result
* a class can have multiple constructors
* + How to write clean constructors:
* Your constructor should just focus on initializing attributes.
* Don't call methods in your constructors, especially overridable methods,
* since it can lead to behavior that's hard to predict. Your constructors should be
* predictable and make sense.
 * + Inheritance:
 * The idea of a parent class passing down its methods and attributes to
 * the child class. Of course if needed the child class may override some of the methods
 * but yeah, that's what inheritance is.
 * - Basic inheritance
 * 1. Parent and subclass: The inheritor (subclass gets all of the accessible attributes and methods from the
 * superclass (parent). This creates that clear relationship. All doctors are humans, but not all humans
 * are doctors.
 * 2. Using attributes and methods: When inheriting from the parent, the child cna use attributes
 * and methods gained from the parent (with some access-level restrictions). So as a result the child
 * doesn't have to rewrite them. Of course, the child can override said properties if needed.
 * - Calling super:
 * Calling super doesn't affect the inheritance of methods and fields. In Java the subclass
 * inherits all non-private fields and methods of the super class.
 * If you don't call super in your default constructor, and the super class's constructor doesn't have any
 * parameters, then Java calls teh super class for you. Else if the superclass' constructor
 * has parameters, and you don't call it with those appropriate arguments, your code won't compile.
 *
*/

package com.OOP;
import java.util.Scanner;



public class Main {

    public static void main(String[] args) {
        methodOverwrite();
        copyConstructor();
        polymorphism();
        dynamicPolymorphism();
    }

    static public void methodOverwrite() {
        Animal animal = new Animal("Bird");
        Dog dog = new Dog("Johannes");

        // Method overwrite
        animal.speak();
        dog.speak();
    }

    static public void copyConstructor() {
        Bicycle originalBike = new Bicycle("Brand", "Model1", "2022");
        Bicycle copiedBike = new Bicycle(originalBike);

        System.out.println("Original Bike: " + originalBike.getMake() + " " + originalBike.getModel() + " " + originalBike.getYear());
        System.out.println("Copied Bike: " + copiedBike.getMake() + " " + copiedBike.getModel() + " " + copiedBike.getYear());

        // Modify the original bike; since we created a new bike (copy constructor, and new keyword literally means we created new memory address)
        // Modifying the original bike doesn't affect the copied one, and vice versa; there are two different bike objects in memory right now
        originalBike.setMake("AnotherBrand");
        originalBike.setModel("AnotherModel");
        originalBike.setYear("2023");

        System.out.println("Original Bike after modification: " + originalBike.getMake() + " " + originalBike.getModel() + " " + originalBike.getYear());
        System.out.println("Copied Bike remains unchanged: " + copiedBike.getMake() + " " + copiedBike.getModel() + " " + copiedBike.getYear());
    }

    /*
     * + Polymorphism - Ability for an object to identify as more than one type
     * A Car can also pass itself off as a Vehicle, since it inherits from it.
     * All three inherit from Vehicle, and we need one data type to define the array
     * as, so we can use 'Vehicle', and all of those vehicles can use the .go method.
     */
    static public void polymorphism() {
        Car car = new Car();
        Boat boat = new Boat(29);
        Bicycle originalBike = new Bicycle("Brand", "Model1", "2022");
        Vehicle[] racers = {car, originalBike, boat};
        for (Vehicle v: racers) {
            v.go();
        }
    }

    /**
     * Dynamic Polymorphism: The ability for it to take many forms at runtime, so
     * during when the coe is running. You're making room for an object in memory, but
     * you don't exactly know the type of that object. Here we're making room for an Animal,
     * but we don't know what subclass instance it's going to be if any.
     * + Other examples:
     * 1. In, Pokemon you eventually have to pick whether you're a boy or a girl character.
     * However, in the beginning, they do let you pick 'Human' (undecided) for a bit.
     * 2.In World oF Warcraft you have to pick a character class. When you start off, you don't
     * have a class, and overtime you make choices that gear you towards a certain class.
     */
    static public void dynamicPolymorphism() {

        Scanner scanner = new Scanner(System.in);
        Animal animal;

        System.out.println("What animal do you want?");
        System.out.println("(1=dog) or (2=cat)");
        int choice = scanner.nextInt();
        if (choice == 1) {
            animal = new Dog("James");
            animal.speak();
        } else if (choice == 2) {
            animal = new Cat();
            animal.speak();
        } else {
            animal = new Animal();
            System.out.println("That choice was invalid!");
            animal.speak();
        }
    }
}
