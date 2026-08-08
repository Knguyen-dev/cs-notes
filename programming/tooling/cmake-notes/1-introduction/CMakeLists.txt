# CMake Version
# NOTE: Doesn't matter that much, typically you just use your current version
# or maybe you need a specific version for backwards compatibility.
cmake_minimum_required(VERSION 3.22.1) 

# Project name: The executable is called "my_first_cmake"
project(my_first_cmake)

# Our project is an executable <output> <input>
add_executable(${PROJECT_NAME} main.cpp)

# Allows "cmake --install", letting us install our executable into 
# /usr/local/bin if needed.
install(TARGETS ${PROJECT_NAME} DESTINATION bin)