
cmake_minimum_required(VERSION 2.8)
project(otherapp)
add_executable(${PROJECT_NAME} otherapp.cpp)

# Our project includes the header file, then in 
# our CMakeLists.txt we'll give CMake the path to the actual
# library file so that CMake can link our executable to the library file.
target_link_libraries(${PROJECT_NAME} nearlymath)