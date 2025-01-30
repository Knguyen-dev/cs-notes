<?php
  /*
  + Global Scope: For variables that are defined outside of a function.
  These global variables are accessed inside functions, but can also be accessed
  with the 'global' keyword or the '$GLOBALS' array, which is just a hashmap (associative array)
  that contains all global variables.
  */
  $globalVar = "I'm global!";

  function accessGlobalVar() {
    global $globalVar;  // Import the global variable into the function scope
    echo $globalVar;    // Outputs: I'm global!
  }
  accessGlobalVar();

  // Accessing global variables with $GLOBALS array
  function accessGlobalWithGlobals() {
    echo $GLOBALS['globalVar']; // Outputs: I'm global!
  }
  accessGlobalWithGlobals();

  /*
  + Local Scope: These are for variables declared inside a function. They
  can't be access outside of the function.
  */

  function localScopeExample() {
    $localVar = "I'm local!";
    echo $localVar;
  }
  localScopeExample();

  /*
  + Static Scope: Retains its value between function calls. This is useful 
  for counting, caching, or other data that should persist across function calls but still be limited
  to the function scope.
  */
  function staticScopeExample() {
    static $count = 0;
    $count++;
    echo $count;
  }
  staticScopeExample(); // Outputs: 1
  staticScopeExample(); // Outputs: 2
  staticScopeExample(); // Outputs: 3

  /*
  + Superglobals: PHP has built-in 'superglobal' arrays such as '$_GET', '$_POST', '$_SESSION',
  '$_COOKIE', and '$_SERVER'. These are accessible anywhere in your script, regardless of scope.


  
  */

  // Using $_GET to access query parameters in a url
  // NOTE: The dot '.' in PHP is used for string concatenation. It combines two strings into one
  if (isset($_GET("name"))) {
    echo "Hello, " . $_GET['name']; // if URL is ...?name=Yoshi, we output: Hello, Yoshi 
  }
  echo $_SERVER['SERVER_NAME']; // outputs the server's name

?>
