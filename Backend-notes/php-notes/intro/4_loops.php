<?php
  // For Loop
  echo "For Loop:\n";
  for ($i = 0; $i < 5; $i++) {
    echo "Iteration $i\n";
  }

  // While Loop
  echo "While Loop:\n";
  $count = 0;
  while ($count < 5) {
    echo "Count is $count\n";
    $count++;
  }

  // Do...While Loop
  echo "Do...While Loop:\n";
  $count = 0;
  do {
    echo "Count is $count\n";
    $count++;
  } while ($count < 5);

  // Foreach Loop (for Indexed Arrays)
  echo "Foreach Loop (Indexed Array):\n";
  $fruits = ['apple', 'banana', 'cherry'];
  foreach ($fruits as $fruit) {
    echo $fruit . "\n";
  }

  // Foreach Loop (for Associative Arrays)
  echo "Foreach Loop (Associative Array):\n";
  $person = ["name" => "Mario", "age" => 30, "job" => "Plumber"];
  foreach ($person as $key => $value) {
    echo "$key: $value\n";
  }
?>
