<?php
  // Indexed Arrays
  $peopleOne = ['Shawn', 'Crystal', 'Ryan'];
  $peopleTwo = array('Ken', 'Chun-Li');
  $ages = [13, 15, 16, 71];

  // Display array contents; 
  // NOTE: Know that you can only print strings, so printing a data structure 
  // like an array directly is not possible. So you have to use a function or create your own.
  print_r($ages);

  // Add values to the end of an array
  $ages[] = 60;
  array_push($ages, 60);

  // Merge two arrays
  $peopleThree = array_merge($peopleOne, $peopleTwo);

  // Associative Array (Hashmap)
  $gamePublishers = [
    "Luigi's Mansion" => "Nintendo",
    "Luigi's Mansion 2" => "Nintendo",
    "Pikmin 1" => "Nintendo",
    "Star Wars Battlefront" => "Electronic Arts"
  ];

  // Adding a new key-value pair
  $gamePublishers["Super Mario Sunshine"] = "Nintendo";

  // Count key-value pairs in the hashmap
  echo count($gamePublishers);

  // Nested Associative Arrays (2D array structure)
  $games = [
    [
      "title" => "Mario Party",
      "publisher" => "Nintendo",
      "release_year" => 2001
    ],
    [
      "title" => "Zelda: Link to the Past",
      "publisher" => "Nintendo",
      "release_year" => 2004
    ]
  ];

  // Remove the last element
  $popped = array_pop($games);
?>
