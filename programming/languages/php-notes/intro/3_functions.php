<?php
  // Basic Function
  function greet() {
    echo "Hello, Ninja!";
  }
  greet(); // Outputs: Hello, Ninja!

  // Function with Parameters
  function greetUser($name) {
    echo "Hello, $name!";
  }
  greetUser("Yoshi"); // Outputs: Hello, Yoshi!

  // Function with Default Parameter
  function welcome($name = "Guest") {
    echo "Welcome, $name!";
  }
  welcome(); // Outputs: Welcome, Guest!

  // Function with Return Value
  function add($num1, $num2) {
    return $num1 + $num2;
  }
  $result = add(5, 10);
  echo $result; // Outputs: 15

  // Passing Arrays to Functions
  function printArray($array) {
    foreach ($array as $item) {
      echo $item . " ";
    }
  }
  printArray(['apple', 'banana', 'cherry']); // Outputs: apple banana cherry 

  // Using Global Variables
  $score = 0;
  function incrementScore() {
    global $score; // Use global keyword to access the global variable
    $score++;
  }
  incrementScore();
  echo $score; // Outputs: 1

  // Anonymous Function
  $multiply = function($a, $b) {
    return $a * $b;
  };
  echo $multiply(3, 4); // Outputs: 12
?>
