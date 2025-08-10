#!/usr/bin/bash

# 2. User Input: To take input from the user, you'll use the 'read' command in linux
echo "Enter your name please: "

# Store user input in a variable called 'name'. Reads the input buffer until it sees a newline.
read name

# A shorter way to prompt and store input
read -p "Enter your age: " age

# Use the 'silent' flag to ensure that the user's password isn't shown in the terminal.
read -sp "Password: " password

# Print out the user's information
echo "Your name is: $name"
echo "Your age is $age"
echo "Password: $password"