

# CMake Version
```CMake
cmake_minimum_required(VERSION 3.15)
```
It's convention to use lowercase. `VERSION` is a special keyword for this function as the value following it is the minimum version of CMake it'll choose. Starting in CMake 4.0, setting the minimum version below 3.5 throws an error and below 3.10 produces a warning. A list of policies and recommended versions is at [policies](https://cmake.org/cmake/help/latest/manual/cmake-policies.7.html). However, in CMake 3.12, you can support a range of versions such as [3.15, ..., 4.4], allowing you to support a minimum version and have it tested on higher versions. Most projects do the below:
```CMake
cmake_minimum_required(VERSION 3.15...4.4)
```

# Setting A Project
```CMake
project(
    MyProject 
    VERSION 1.0
    DESCRIPTION "Very nice project"
    Languages CXX
)
```
Strings are quoted, whitespace is ignored, and the name of hte project is hte first argument. All keyword arguments here are optional. The version sets many variables e.g., `MyProject_VERSION` and `PROJECT_VERSION`. The languages are C, CXX (C++), Fortran, ASM, CUDA (for CMake 3.8+), Swift (3.15+), etc. CXX is the default. In CMake 3.9, `DESCRIPTION` was added to set a project description.

# Making an Executable
```CMake
add_executable(one two.cpp, three.h)
```
This creates an executable called `one` AND it generates a CMake target with the same name. We'll talk about **CMake targets** later, but for now think of them as build artifacts. You can create executables or libraries as targets.The source file list comes next. We can list as many source files as we want, and CMake only compile source file extensions (`.cpp`) and headers are practically ignored. The only reason you'd list header files is to make them show up in IDEs.

# Making a Library
```CMake
add_library(one STATIC two.cpp three.hpp)
```
Often we need to make a "fictional" target, meaning there's nothing that needs to be compiled for it. For example, a in a header-only library, all the code is included when the source files include the header, there's no source files that need to be compiled. That's called an `INTERFACE` library. We can make an `ALIAS` library with an existing library, which just gives us a name for a target. The main benefit here is being able to make libraries with the characters "::" in the name.

# Using Targets in CMake
```CMake
target_include_directories(one PUBLIC include)
```
In Modern CMake, everything revolves around targets. Once a target is created, we attach requirements to it. Here, the target `one` requires the `include/` directory to copmile its own source files (`two.cpp`). Furthermore, since it uses `PUBLIC` any downstream targets that link against `one` will automaticallt inherit `include/` on theri compiler search path.

```CMake
add_library(another STATIC another.cpp another.h)
target_link_libraries(another PUBLIC one)
```


`target_link_libraries` links a target (`another`) to a dependency (`one`).
- **If `one` is a CMake Target:** CMake automatically resolves its binary files and transitively attaches any `PUBLIC` or `INTERFACE` include paths, compile flags, or definitions to `another`.
- **If `one` is NOT a CMake target:** CMake assumes `one` is a system library and passes it directly to the native linker (e.g., `-lone`).

It's best practice to always use explicit visibility keywords (PRIVATE, PUBLIC, INTERFACE) on every larget. Legacy CMake allowed skipping keywords but modern CMake requires them to avoid broken dependency graphs.


## Example 1: Simple CMakeLists.txt
```CMake
cmake_minimum_required(VERSION 3.15...4.4)
project(Calculator LANGUAGES CXX)

add_library(calclib STATIC src/calclib.cpp include/calc/lib.hpp)
target_include_directories(calclib PUBLIC include)

# Ignore for now
target_compile_features(calclib PUBLIC cxx_std_11)

add_executable(calc apps/calc.cpp)
target_link_libraries(calc PRIVATE calclib)
```
Sets the minimum required CMake version to `3.15`, but supports policy behaviors up through version `4.4` without throwing deprecation wranings.

Names the project "Calculator" and initializes the C++ toolchain (`CXX`).

Creates a static library target named `calclib` from `src/calclib.cpp`. The `.hpp` file is included to clarify the corresponding header files. But the headers can be omitted. However, it's best practice to keep:
1. Exposes the header files inside IDE project trees like Visual Studio or Xcode.
2. Allows CMake to track header changes for automatic regeneration in certain build setups.

Adds `include/` to `calclib`'s build step and marks it `PUBLIC`. Consumers of `calclib` can access the header files it included. 

Creates an executable binary target `calc`. Links `calclib` into `calc`. The `calc` target inherits the `include/` directories and binary symbols from `calclib`. Meaning:
-  `calc` can include the `.hpp` files that `calclib` included when `calclib` was compiled.
- `calc` searches for the corresponding implementations in `calclib`.

This link is finally marked private because an executable sits at teh end of a build graph and has no downstream consumers.