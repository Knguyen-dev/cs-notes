<?php

  // + Basic conditions
  $age = 20;
  if ($age >= 18) {
      echo "You are an adult.";
  } elseif ($age > 12) {
      echo "You are a teenager.";
  } else {
      echo "You are a child.";
  }
  // Output: You are an adult.

  // + Ternary Operator
  $is_logged_in = true;
  $status = $is_logged_in ? "Welcome back!" : "Please log in.";
  echo $status; // Output: Welcome back!

  // + Null Coalescing Operator
  $username = $_GET['username'] ?? 'Guest';
  echo "Hello, $username!"; // If no username is provided, outputs: Hello, Guest!


  // + Switch Statement
  $role = "admin";
  switch ($role) {
      case "admin":
          echo "Access granted to all areas.";
          break;
      case "editor":
          echo "Access granted to editorial area.";
          break;
      case "subscriber":
          echo "Access granted to subscriber area.";
          break;
      default:
          echo "Access denied.";
          break;
  }
  // Output: Access granted to all areas.

  /*
  + Comparing values in PHP:
  PHP has loose and strict comparison operators.

  1. Loose (==): Compares values after type conversion if necessary.
  2. Strict (===): Compares both the value and type.
  */
  $a = 5;
  $b = '5';
  echo ($a == $b) ? "Equal" : "Not Equal"; // Outputs: Equal
  echo ($a === $b) ? "Equal" : "Not Equal"; // Outputs: Not Equal

  /*
  + Logical Operators:
  1. && (AND): Both conditions must be true.
  2. || (OR): At least one condition must be true.
  3. ! (NOT): Inverts the condition.
  */
  $is_member = true;
  $is_admin = false;
  if ($is_member && !$is_admin) {
      echo "Welcome, member!";
  } elseif ($is_admin) {
      echo "Welcome, admin!";
  } else {
      echo "Please sign up.";
  }
  // Output: Welcome, member!
?>
