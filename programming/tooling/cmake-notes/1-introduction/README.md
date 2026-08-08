# Introduction to CMake
A Make is a build system that allows you to create Makefiles, which are files that runs commands. This is typically used on Linux whilst Windows has their own equivalent. CMake is a build system generator. It doesn't build our code directly, but rather it generates the files needed for another build tool (like `Make`) to actually compile your program. In this case, CMake creates your Makefiles and automatically adjusts to your specific compiler and platform. In C++, projects can get messy when:
- There are a lot of source files in different directories.
- Multiple compilers and platforms.
- External needs need to be found and linked.

If we used only `Make`, we'd write multiple platform specific Makefiles. CMake simplifies the process by letting us describe our project at a higher level and then CMake handles generating the correct build files for the current system. 

## Basics of CMake
```bash
# ### Inside CMakeLists.txt ###
# CMake Version
cmake_minimum_required(VERSION 3.22.1) 

# Project name: The executable is called "my_first_cmake"
project(my_first_cmake)

# Our project is an executable <output> <input>
add_executable(${PROJECT_NAME} main.cpp)

# Allows "cmake --install", letting us install 
# our executable into /usr/local/bin if needed.
install(TARGETS ${PROJECT_NAME} DESTINATION bin)
```
CMake relies on a top-level file called `CMakeLists.txt`. To run CMake, you must specify two things:
- **Source Path:** Specify the path to your source code files, which depends on the CWD.
- **Build Path:** The path to where you want CMake to generate the build system files. Most projects create a directory called `build` specifically for storing all build files.

```bash
# cmake -S <path-to-source> -B <path-to-build>
cmake -S . -B build
```
CMake then generates a `CMakeCache`, `CMakeFiles`, `cmake_install.cmake`, and a `Makefile`. These are additional CMake files that we don't touch. We only touch the `CMakeLists.txt` file. Again, we didn't actually compile/link any source code files to generate a binary yet. We simply generated the files needed to do that for our OS and hardware. Hence, CMake helps create build files (e.g. Makefiles) instead of executables. CMake lets us define variables in our `CMakeLists.txt`. For example, `project(my_first_cmake)` sets a variable `PROJECT_NAME` that can later be use in the `CMakeLists.txt` file. This helps us reduce repetition, which makes sense as we also see variables in Makefiles and other CI/CD related stuff.

## What are Build Targets?
In CMake, a target represents a build artifact (library or executable) and its properties (sources, include directoreis, compiler flags, and dependencies). Essentially, a target is a thing we want to build/create such as an executable (via `add_executable`), library file (`add_library`), or meta targets (commands) like `install`, `clean`, `ALL`, etc. Below are the different types of targets in CMake:
- **Local Target (Built From Source):** Create inside our project using `add_library(my_lib STATIC src.cpp)`. CMake manages the build order so `my_lib` compiles before anything that links to it.
- **Imported Targets (System/External):** Created when finding pre-installed system libraries using stuff like `find_package(CURL REQUIRED)` or `find_package(OpenGL REQUIRED)`. CMake creates "imported targets" like `CURL::libcurl` or `OpenGL::GL` that wrap external `.so`/`.a`/`.lib` files and their header paths into a standard target interface.
- **FetchContent/Subdirectory Targets:** DOwnloaded or added during the configuration step. These behave like local targets even though the code originated externally.

```bash
# In CMakeLists.txt
add_executable(main_program main.cpp)

# Then in your terminal.
# a. Generate build files
# b. Compile the code
cmake -S . -B build
cd build && make
```
`add_executable()` creates a build target, in particular an executable calle `$(PROJECT_NAME)`. This executable was compiled and linked using the `main.cpp` source code file. After everything, we generate the build files and run those build files to compile an executable.