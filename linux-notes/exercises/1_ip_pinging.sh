#!/usr/bin/bash

# Task: Read input from the client and ping their IP. The 'ping' command tests the reachability of 
# websites and servers such as 'google.com' over the netwrok. This determines if the site is acccessible and measures round-trip 
# time from your computer to the server and back.

read -p "Which server do you want to ping?: " serverAddr


# Ping for 3 times/counts (c3) and if it doesn't ping after 5 seconds, then exit.
ping -c 3 -w 5 "$serverAddr"
