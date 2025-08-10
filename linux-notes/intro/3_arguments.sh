#!/usr/bin/bash

# 3. Passing arguments. 

# Accessing argument values
echo "Name of the script: $0" # passed by default
echo "First argument: $1"
echo "Second argument: $2"
echo "Third argument: $3"

# Some more 
echo "List of parameters used: [$@]"
echo "Number of parameters: $#" 