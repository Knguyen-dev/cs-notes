<?php

  // 1. Intro to classes:
  class Car {
    
    public $color; // Public: Accessible outside of class
    public $make;
    protected $model; // Protected: Accessible within class and by inheriting classes
    private $engine; // Private: Accessible only within the class
    
    // Constructor with arguments
    public function __construct($color, $make, $model, $engine) {
      $this->color = $color;
      $this->make = $make;
      $this->model = $model;
      $this->engine = $engine;
    }

    public function drive() {
      echo "The car is driving.";
    }

    // Setter and getter for model since it's a protected attribute
    public function getModel() {
      return $this->model;
    }

    public function setModel($model) {
      $this->model = $model;
    }
  }
  $myFirstCar = new Car("red", "Good Make", "Okay Model", "Meh engine");

  // 2. Inheritance
  class Vehicle {
    public $speed;

    // Inherited by Car1
    protected $fuelLevel; 
    public function start() {
      echo "Vehicle started.";
    }
  }

  class Car1 extends Vehicle {

    // Static: Properties owned by the class itself
    public static $totalCars = 0;
    public static function addCar() {
      self::$totalCars++;
    }

    public function drive() {
      echo "Car is Driving";
    }

    // We also inherited start(). Here we'll demonstrate polymorphism
    // which allows a subclass to modify stuff that it has inherited
    public function start() {
      echo "Cart started.";
    }

    // Have the fu
  }

  // Cloning: The __clone() method is called when you want to 
  // 'clone' an object. This creates a new object in memory rather than pointing to the same address
  $mySecondCar = new Car();
  $myThirdCar = clone $mySecondCar;

  // + Interfaces: Defines a set of methods a class must implement. 
  // Also methods in an interface have no body and are public my default. 
  // We're basically exposing an API, a set of standards that one must follow.

  interface Drivable {
    public function drive();
  }
  class Car3 implements Drivable {
    public function drive() {
      echo "Car is driving.";
    }
  }

  // + Abstract Classes and Methods:
  // 1. Can't be instantiated and include abstract methods
  // 2. Methods don't have bodies, as another class will implement it. Again a standard.
  abstract class Vehicle2 {
    abstract public function start();
  }
  class Car2 extends Vehicle2 {
    public function start() {
      echo "Car started";
    }
  }


  // + Final prevents a class from being inherited or a method from 
  // being inherited.
  final class Car4 {
    // This class cannot be extended
  }
  class Vehicle3 {
      final public function start() {
          echo "Vehicle started.";
      }
  }

  // + Traits: Allow code reuse in multiple classes. Think of them as partial 
  // classes

  trait EngineTrait {
    public function startEngine() {
      echo "Engine started.";
    }
  }

  class Car5 {
    // Car5 can now use public and protected properties from EngineTrait
    use EngineTrait;
  }

  





?>