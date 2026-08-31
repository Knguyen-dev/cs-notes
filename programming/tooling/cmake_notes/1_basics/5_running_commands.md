# Running Commands: Build and Configure Time

Remember, CMake is not a compiler or build system itself, but rather a build system generator. Therefore our project goes through two distinct phases. Configure time happens when we first run `cmake -B build`. During this phase, CMake executes our `CMakeLists.txt`. 
- It inspects our system, finding compilers, packages, etc. 
- It evaluates control flow logic
- Finally it'll generate the native build files into our build directory using whatever build system we have setup e.g., Makefile, Ninja, or Visual Studio related.

At this point, no C++ code has been compiled yet. The second phase is build time, which happens when we run `cmake --build build` or invoke our native tool directly (e.g., `make` or `ninja`).

## Running a command at Configure Time
Use `execute_process` to process and access the results. Typically, avoid hard coding your program paths into CMake. Just use stuff like `find_program`, `find_package()`, etc. to access the command you want to run. Then use `RESULT_VARIABLE` to check the return code and `OUTPUT_VARIABLE` to get the output.
```CMake
find_package(Git QUIET)

if(GIT_FOUND AND EXISTS "${PROJECT_SOURCE_DIR}/.git")
    execute_process(COMMAND ${GIT_EXECUTABLE} submodule update --init --recursive
                    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
                    RESULT_VARIABLE GIT_SUBMOD_RESULT)
    if(NOT GIT_SUBMOD_RESULT EQUAL "0")
        message(FATAL_ERROR "git submodule update --init --recursive failed with ${GIT_SUBMOD_RESULT}, please checkout submodules")
    endif()
endif()
```
The above script updates all git submodules.

## Example 1s: CMake File and Unit Testing
```CMake
# Almost all CMake files should start with this.
# Specify the ranges of the oldest and newest we want to test.
cmake_minimum_required(VERSION 3.15 ... 4.4)

# Always list languages; Listing the version is nice since 
# it sets a lot of useful variables
project(
    ModernCMakeExample
    VERSION 1.0
    LANGUAGES CXX
)

# If you set any CMAKE_ variables, they can be used here.
# But typically avoid that, except maybe for C++ standard 
# related variables. 

# Find packages go here.

# Default library that will match the "*" variable setting.
# including header files in the library helps with IDEs, 
# and again aren't required. The output library name matches
# the name of the target.
add_library(MyLibExample, simple_lib.cpp simple_lib.hpp)

# An executable target that uses the API of simple_lib.hpp
# therefore needing to link against MyLibExample
# NOTE: We didn't do target include libraries here
# since headers and source were in the same place.
add_executable(MyExample simple_example.cpp)
target_link_libraries(MyExample PRIVATE MyLibExamples)

# Unit Testing
enable_testing()
add_test(NAME MyExample COMMAND MyExample)
```

## Unit Testing
`enable_testing()` and `add_test()` are CMake's built-in commands for integrating unit tests into our build system using CTest (Cmake's testing driver).

`enable_testing()` enables testing for the current directory and all subdirectories in our CMake project. Place it once in our root `CMakeLists.txt` file (typically near the bottom) or behind a `if(BUILD_TESTING)` check. Without this command, CMake ignores any `add_test()` calls, and CTest won't find any tests to run.
```CMake
add_test(Name <TestName> COMMAND <ExecutableTargetOrCommand> [arg1, arg2, ...])
```
`add_test()` registers an executable script or program as a test that CTest should execute. Here `NAME` is the human-readable identiifer for the test (shown in terminal outupts and reports). The `COMMAND` is the binary script to run. Below is a complete workflow of what this could normally look like:
```CMake
cmake_minimum_required(VERSION 3.20)
project(TestExample LANGUAGES CXX)

# 1. Create your application executable
add_executable(my_app src/main.cpp)

# 2. Create your test executable (e.g., using GoogleTest, Catch2, or a custom main.cpp)
add_executable(unit_tests tests/test_main.cpp)

# 3. Enable CTest support
enable_testing()

# 4. Register the test target with CTest
add_test(NAME RunUnitTests COMMAND unit_tests)
```
Once configured, rather than running the test executables individually, we run CTest directly from the CLI:
```bash
# Configure and build files
cmake -B build
cmake --build build

ctest --test-dir build --output-on-failure
```
CTest executes the `unit_tests` target, checks its return code (0=pass, non-zero=fail) and outputs a clean pass/fail summary.