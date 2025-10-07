cmake_minimum_required(VERSION 3.13.4)
project(submodules)

# Output submodules and input main.cpp
add_executable(${PROJECT_NAME} main.cpp)

# Creates a sub-directory, but what does that even mean? what does that imply?

# Tells CMake "go into folder Adder/, and look at its CMakeLists.txt. Make whatever targets
# it defines as available to the parent project, this project.
# - TODO: What are targets again?
add_subdirectory(Adder)

# Adds "Adder/" to the compiler's include search path. So when we write 
# #include "adder.h", the compiler will look inside "Adder/adder.h"
# NOTE: If "Adder/CMakeLists.txt" uses target_include_directories(adder PUBLIC .)
# then we don't need this line in the parent.
target_include_directories(${PROJECT_NAME} PUBLIC Adder)

# Adds "Adder/" to the linker's search path. In modern CMake, you almost never need this because 
# when you do "add_subdirectory(Adder)", CMake already knows where the "adder" library target is built.
# You can usually delete this line, it's more relevant when linking to precompiled libraries outside our project.
target_link_directories(${PROJECT_NAME} PRIVATE Adder) 

# Links our project executable with the "adder" library target
# tells the linker we want to look for a specific library file called "adder" exactly.
target_link_libraries(${PROJECT_NAME} adder)
