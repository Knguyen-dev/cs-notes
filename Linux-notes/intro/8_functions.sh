#!/usr/bin/bash

# 1. A simple function that prints hello world 
helloWorld() {
  echo "This is hello world"
}
helloWorld

# 2. Now passing arguments to a function
greet() {
  echo "My name is $1."
}
greet "Kevin Nguyen"

# 3. Defining local variables within the function 
addNumbers() {
  local sum=$(( $1 + $2 ))
  echo "Sum: $sum"
}
addNumbers 3 7

# 4. Returning values from a function. In Bahs, functions don't return values like in traditional programming languages.
# Instead they use exit statuses (0 for success, and non-zero for failure). However you can use 'echo' to output a value from your 
# function, and then capture it with a variable.
getProduct() {
  local product=$(( $1 * $2 ))
  echo $product
}
product=$(getProduct 3 5)
echo "Product: $product"

# When to use (()), and when to use -eq vs ==? What choices do we have

# 5. Functions with conditional logic
check_even_odd() {
  if [ $(( $1 % 2 )) -eq 0 ]; then
    echo "$1 is even"
  else 
    echo "$1 is odd"
  fi
}
check_even_odd 10
check_even_odd 5

# 6. Global variables

myGlobalCounter=0
incrementCounter() {
  myGlobalCounter=$((myGlobalCounter + 1))
}
incrementCounter
echo "Global Counter: ${myGlobalCounter}"

incrementCounter
echo "Global Counter: ${myGlobalCounter}"
