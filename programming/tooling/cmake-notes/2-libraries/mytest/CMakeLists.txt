cmake_minimum_required(VERSION 3.13)

# Project is called mytest
project(mytest)

# Executable is called "mytest", compiled from main.cpp
add_executable(${PROJECT_NAME} ./cpp/main.cpp)

# Assuming the library files aren't installed in /usr/local/lib
# then we'll specify the directory that CMake searches the library files in.
# target_link_directories(mytest PRIVATE ${CMAKE_SOURCE_DIR}/../SomeLibDemo/build/)

# Specifies that we're looking for the "nearlymath" library file.
target_link_libraries(${PROJECT_NAME} nearlymath)