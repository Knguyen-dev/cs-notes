#!/usr/bin/bash

 

echo "Hello World"

# Initialize variables
username="Knguyen44"
email="knguyen44@ivytech.edu"

# Recall and print out values
echo "My username is: $username"
echo "My email is: $email"
echo "$username is the username. The email is: $email" 


# There are also environment variables that are automatically defined in Linux.
# To see the entire list, use the 'env' or 'printenv' command 
echo "Current Linux User: $USER" 
echo "Current directory: $PWD"
echo "Hostname: $HOSTNAME"

