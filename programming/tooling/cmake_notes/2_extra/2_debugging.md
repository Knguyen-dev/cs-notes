# Debugging CMake or C++

We may need to debug our CMake build or C++ code. 

## CMake Debugging
Let's look at how we can debug CMakeLists and other CMake files.

**Printing Variables**
```CMake
# Approach 1: Via regular print statement
message(STATUS "MY_VARIABLE=${MY_VARIABLE}")

# Approach 2: Via built-in module which is even easier
include(CMakePrintHelpers)
cmake_print_variables(MY_VARIABLE)
```
Of course, you could print the properties of a target individually, or we could reconfigure `cmake_print_variables`. Now each time we provide a target, it'll output the target's properties.
```CMake
cmake_print_properties(
    TARGETS <target-name>
    PROPERTIES POSITION_INDEPENDENT_CODE
```

**Tracing a Run**
```bash
cmake -S . -B build --trace-source=CMakeLists.txt
```
Every line run in the file that we provide will be echoed onto the screen when it's run. This lets us follow exactly what's happening in our CMakeLists file.

**Debug and Trace Messages**
```bash
cmake -S . -B build --log-level=DEBUG
```
The `message` command supports log levels beyond `STATUS`, including `VERBOSE`, `DEBUG`, and `TRACE`. Messages at the quieter levels are hidden unless we raise the log level.

## Building in Debug Mode
You can build your code with `DCMAKE_BUILD_TYPE=Debug` to get debugging flags. Once you have a debug build, you can run a debugger like gdb on the binary.