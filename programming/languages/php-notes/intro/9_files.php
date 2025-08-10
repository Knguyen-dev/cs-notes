<?php

  // Originally contains file's name as a string but after readfile(), this becomes
  // the file object
  $file = "readme.txt";

  if (file_exists($file)) {
    echo readfile($file);
    // Create a file called quotes.txt
    copy($file_name, "quotes.txt");
    // absolute path
    echo realpath($file) . "<br/>";
    // file size
    echo filesize($file) . "<br/>";
    // rename file
    rename($file, "test.txt");
  } else {
    echo "File '" . $file_name . "' does not exist!";
  }

  // mkdir("quotes")


  
?>