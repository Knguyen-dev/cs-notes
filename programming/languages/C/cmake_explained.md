# Explaining CMake

CMake is a build system generator. It doesn't build our code directly, but rather it generates the files needed for another build tool (like `Make`) to actually compile your program.

In C++, projects can get messy when:
- There are a lot of source files in different directories.
- Multiple compilers and platforms.
- External needs need to be found and linked.

If we used only `make`, we'd have to write multiple platform specific Makefiles. CMake simplifies the process by letting us first describe our project at a higher level and then it generates the right build files for the current system. The idea is that you'd describe your project in a `CMakeLists.txt` file.

## Example 

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyApp)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)

# Add an executable
add_executable(myapp main.cpp math.cpp)
```

```bash
mkdir build
cd build
cmake ..
make

```