# Introduction to CMake
A Make is a build system that allows you to create Makefiles, which are files that runs commands. This is typically used on Linux whilst Windows has their own equivalent. CMake is a build system generator. It doesn't build our code directly, but rather it generates the files needed for another build tool (like `Make`) to actually compile your program. In this case, CMake creates your Makefiles and automatically adjusts to your specific compiler and platform. In C++, projects can get messy when:
- There are a lot of source files in different directories.
- Multiple compilers and platforms.
- External needs need to be found and linked.

If we used only `Make`, we'd write multiple platform specific Makefiles. CMake simplifies the process by letting us describe our project at a higher level and then CMake handles generating the correct build files for the current system. 

## Basics of CMake
```CMake
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
- **FetchContent/Subdirectory Targets:** Downloaded or added during the configuration step. These behave like local targets even though the code originated externally.

```bash
# In CMakeLists.txt
add_executable(main_program main.cpp)

# Then in your terminal.
# a. Generate build files
# b. Compile the code
cmake -S . -B build
cd build && make
```
`add_executable()` creates a build target, in particular an executable called `$(PROJECT_NAME)`. This executable was compiled and linked using the `main.cpp` source code file. After everything, we generate the build files and run those build files to compile an executable.

# Libraries in C/C++ & CMake

How do we build a C/C++ library from scratch? While we often consume third-party libraries, creating one requires distinct patterns and practices. 
1. Libraries don't have a `main()` entry point. 
2. They often group their code inside namespaces to prevent global namespace pollution. This avoids name collisions with other libraries or user code.

## Example 1: Making and Using a Library
```CMake
cmake_minimum_required(VERSION 3.10)
project(nearlymath CXX)

# Compiles adder.cpp into a library named "nearlymath"
add_library(nearlymath adder.cpp)

# Tells CMake, which directory to use when looking for the library
# (.a, .so, etc). 
# target_link_directories(<target> [BEFORE] <INTERFACE|PUBLIC|PRIVATE> [items...])
target_include_directories(nearlymath PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})

# Mark adder.hpp as a public header file for installation
set_target_properties(nearlymath PROPERTIES PUBLIC_HEADER adder.hpp)
```
Create a directory `/nearlymath` to house our library source files. Then create a `adder.hpp` and `adder.cpp`. Instead of `add_executable()`, use `add_library()` to tell CMake to create a static/shared library file. CMake outputs `libnearlymath.a`, where the `lib` prefix means it's a library file. The `.a` indicates that it's a static library file. 

**Handling Header Files? (`target_include_directories`)**
When compiling a C++ file that contains `#include "adder.hpp"`, the compiler needs to know where the header files are located. Otherwise the compiler searches the immediate folder of the `.cpp` file being compiled, or system paths. If our code grows and headers are stored in different folders (e.g., `include/`, `src/`), the compilation will fail. Typically you can do this with `-I <path-to-headers>`, but what's the equivalent in CMake? The solution is **`target_include_directories`**, which attaches a list of folder paths to a specific "target" (`nearlymath` library), so the compiler knows where to look for the header files.

`nearlymath` is the target we're configuring. We're telling the include directories for this target is `/include`. The `PUBLIC` keyword controls visibility/inheritance. How the directory path propagates to other projects that use our library. It indicates the current target (our library) AND anything that links to it (other apps linking to our library), will use the `/include` directory to find `nearlymath`'s header files.

**`${CMAKE_CURRENT_SOURCE_DIR}`** is a built-in CMake variable that points to the folder where `CMakeLists.txt` lives. We tell CMake that the header files are in the same folder as the directory containing `CMakeLists.txt`. In many other cases though, you'll probably see "include/", indicating that the header files are in their own directory rather than simply living in the same folder as `CMakeLists.txt`.

## Visibility Keywords
In CMake, visibility keywords (`PRIVATE`, `PUBLIC`, `INTERFACE`) control how properties (like include paths or compile flags) propagate through the dependency graph. When a directory or library is marked with a visbility keyword, it comes down to two questions:
1. Does the target need this to build itself?
2. Does anything linking to the target also need it to build?

Then the three cases:
- If target needs it to build but consumers don't inherit, then `PRIVATE`. It's an internal detail
- If target doesn't need it to build, but consumers inherit it, then `INTERFACE`. This is for header-only libraries, public interfaces, etc.
- If the target needs it to build and consumers also need that header and library to build, then it should be `PUBLIC`. 

### Private Scope (Internal Use)
```cpp
// internal_math.cpp (inside target 'nearlymath)
// PRIVATE: only needed to compile internal_math.cpp
#include "secret_helpers.hpp" 

// ----- In CMakeLists.txt ----

// Target A (Internal Implementation)
// 1. Create a library containing internal helper implementation.
add_library(mathlib a.cpp b.cpp secret_helpers.cpp)

// Target B (middle Layer)
// a. Create the executable target; ignore public here
// b. Add include directory privately so internal_math.cpp
// can find the "secret_helpers.hpp"
add_library(internal_math STATIC internal_math.cpp)
target_include_directories(internal_math PRIVATE include)
target_link_libraries(internal_math PRIVATE mathlib)

// Target C (Consumer)
add_executable(new_math main.cpp)
target_link_libraries(new_math PUBLIC internal_math)
```
internal_math needs `include/` to locate `"secret_helpers.hpp"` while compiling `internal_math.cpp`. Then later, `internal_math` needs `mathlib` at link time to resolve implementation symbols form `secret_helpers.cpp`. If another target were to link against `internal_math`, that consumer wouldn't inherit access to `include/` or `mathlib`.

For example, say `new_math` links against `internal_math`, since `internal_math` contains symbols (implementations) that `new_math` needs.
- **Compilation:** When new_math compiles, it won't look at the same `"include/"` directory that `internal_math` looked into when it got compiled. Therefore if new_math.cpp tries to do `#include "secret_helpers.hpp"`, the compiler immediately fails because the header was not found. 
- **Linking:** When `new_math` links to `internal_math`, it won't be able to resolve symbols using `mathlib`. It can only link against `internal_math`.

### Public Scope (Internal AND External)
```CMakeLists.txt
# 'include/' path and 'mathlib' library are public now.
target_include_directories(internal_math PUBLIC include)
target_link_libraries(internal_math PUBLIC mathlib)
```
When `new_math` links against `internal_math`:
- **Header Paths Transferred:** CMake automatically passes `-I/path/to/include` to the compiler when compiling `new_math.cpp`. The `new_math` target can now `#include "secret_helpers.hpp"` without throwing an error.
- **Linker Symbols Transferred:** CMake automatically adds `mathlib` to `new_math`'s linker command. `new_math` can resolve symbols directly from `mathlib`.

However, you often don't want this. Making everything `PUBLIC` breaks encapsulation and causes severe build problems in large software engineering projects. Let's look at some potential issues:
- **Leaky Abstractions:** Imagine `secret_helpers.hpp` was meant ot be private, or for internal use, rather than being a public API. Making it `PUBLIC` lets engineers working on `new_math` to bypass `internal_math`'s intended interface and rely directly on `secret_helpers.hpp`.
- **Header Name Collisions:** Imagine `mathlib` has a generic header file `utils.h`, and another library in our project also has a `utils.h`. Making `mathlib` public forces downstream targets to inherit its include paths, leading to ambiguous includes and broken builds.

```cpp
// nearlymath.hpp (Public header exposed to users)
// PUBLIC: Users of nearlymath.hpp need Eigen's include path
#include <Eigen/Dense> 
```
Agan it comes to two questions. Yes the target needs EIGEN to build the target uses the EIGEN code. And yes consumers also need it because we're including it in a public header. Therefore both need it, so it's `INTERFACE`.

### Interface Scope (External Only)
Imagine `simple_cv.cpp` compiles into `cvlib.lib`, where `cvlib` uses `INTERFACE` for its include directory. Because `cvlib`'s source files already know where their headers are, but its consumers need to read that path into their own build setups.
```CMake
# 1. Library from source files
add_library(cvlib simple_cv.cpp image_utils.cpp)

# 2. Tell CMake where consumers can find the headers.
# cvlib itself doesn't need this rule to build simple_cv.cpp.
# but targets linking against cvlib
target_include_directories(cvlib INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}/include)

# 3. Downstream app that includes simple_cv.hpp 
# or image_utils.hpp.
add_executable(my_vision_app main.cpp)

# 4. Linking cvlib automatically gives my_vision_app
target_link_libraries(my_vision_app PRIVATE cvlib)
```
In `main.cpp` the consumer can write `#include "simple_cv.hpp"` and the compiler will find it when compiling  `my_vision_app`. During linkage, the linker accesses `cvlib.lib` to find the implementations for `simple_cv.hpp`.

### Interface: Header-only 
In this case, `simple_cv.hpp` contains all templates, inline codes, and necessary definitions. There's no `simple_cv.cpp` as the api and implementation are all in the header files, hence a header-only setup.
```CMake

# 1. Create a target that produces NO binary file (.lib/.so)
# A "fictional" target since it doesn't produce anything.
add_library(cvlib INTERFACE)

# 2. Attach include directories to the interface target
target_include_directories(cvlib INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}/include)

# 3. Link so that my_vision_app gets the 
add_executable(my_vision_app main.cpp)
target_link_libraries(my_vision_app PRIVATE cvlib)
```
Since `cvlib` has no binary file, this doesn't add a .lib to the linker command. The only reason we're linking is because it passes the include directory flags (-I/path/to/include) to their compiler.

## Library Types 

**Static Libraries (`STATIC`)**
A static library compiles C++ code into an archive file (`.a` on Linux/macOS, `.lib` on Windows). When you build your final executable, the linker takes the binary code directly out of the static library and copies it into our executable. 

The final executable is completely self-contained. You don't need to distribute any extra library files in our app. The con is that we have larger executable sizes. If 10 different executables use the same static library, that code is duplicated 10 times on disk and in memory.

**Shared Libraries (`SHARED`)**
A shared library compiles C++ code into a dynamic library file (`.so` on Linux, `.dylib` on macOS, `.dll` on Windows). The code isn't copied into our executable, but rather the executable holds a reference/pointer, which it'll receive at runtime. When the user runs our app, the OS loads the dynamic library into memory alongside the executable.

It results in smaller executable sizes, as multiple programs share the same librray file in memory. We can update the shared library file without having to recompile all the copies that depend on it. But the downside is that we must distribute the dynamic library file alongside our application.

**NOTE: BUILD_SHARED_LIBS**
```CMake
add_library(one two.cpp three.hpp)
```
CMake defaults to making `one` a `STATIC` library. However, if a developer sets `-DBUILD_SHARED_LIBS=ON` when configuring CMake, CMake automatically converts all untyped `add_library()` calls in the project to `SHARED` libraries.  Essentially, this setting can be messed with by consumers using our library, giving them the flexibility to choose how they want to build our code.