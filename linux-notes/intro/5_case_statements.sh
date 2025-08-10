#!/usr/bin/bash

read -p "Enter letter grade: " grade

case $grade in
  # 'A' was entered, this case activates
  A)
    echo "Marks between 90-100"
    ;;
  # If 'B' was entered, this activates.
  B)
    echo "Marks between 80-89"
    ;;
  C)
    echo "Marks between 70-79"
    ;;

  # The default case
  *)
    echo "Marks are below 70"
    ;;
esac