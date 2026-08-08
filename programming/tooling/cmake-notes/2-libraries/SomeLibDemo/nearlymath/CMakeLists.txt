cmake_minimum_required(VERSION 2.8)

# Project name is "nearlymath", this time though, we want this to 
# compile to a library file. So compile adder.cpp into a library file.
project(nearlymath)
add_library(nearlymath ./cpp/adder.cpp)

# Associates the header file "adder.h" with the library 
# file. It's a public header because users are going to directly include it.
set_target_properties(nearlymath PROPERTIES PUBLIC_HEADER "./cpp/adder.h")

# - nearlymath library goes to DESTINATION /usr/local/lib
# - The "adder.h" public header file we set earlier is installed into /usr/local/include
install(TARGETS nearlymath LIBRARY DESTINATION lib PUBLIC_HEADER DESTINATION include)