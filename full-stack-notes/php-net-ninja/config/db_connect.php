<?php 

  /**
   * + Modularizing our database code:
   * Instead of re-writing this code every time we 
   * want to use it inside of a file, we have a better solution.
   * 
   * Write the code here, then when they include this file 
   * the code from this file runs, connecting them to the database.
   * 
   */


  // Database connection information
  $db_host_name = "localhost";
  $db_username = "shaun";
  $db_password = "test123";
  $db_name = "ninja_pizza";

  /**
   * + Connecting to the database:
   * Establishing a connection occupies system resources (memory and network)
   * which is dynamic since it's not predictable and set like creating a variable.
   * As well as this, the result set is dynamic memory since we don't know how much data 
   * is in the result set, so the program just has to accommodate for that on the fly
   */
  $sql_connection = mysqli_connect($db_host_name, $db_username, $db_password, $db_name);

  // If sql connection failed, it would be a falsy value and trigger this conditional.
  if (!$sql_connection) {
    echo "Connection Error: ". mysqli_connect_error();
  }

?>