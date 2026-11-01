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
Create a directory `/nearlymath` to house our library source files. Then create a `adder.hpp` for our public API, and `adder.cpp`. Instead of `add_executable()`, use `add_library()` to tell CMake to create a static/shared library file. CMake outputs `libnearlymath.a`, where the `lib` prefix means it's a library file. The `.a` indicates that it's a static library file. 
- **Handling Header Files? (`target_include_directories`)**: When compiling a C++ file that contains `#include "adder.hpp"`, the compiler needs to know where the header files are located. Otherwise the compiler searches the immediate folder of the `.cpp` file being compiled, or system paths. If our code grows and headers are stored in different folders (e.g., `include/`, `src/`), the compilation will fail. Typically you can do this with `-I <path-to-headers>`, but what's the equivalent in CMake? The solution is **`target_include_directories`**, which attaches a list of folder paths to a specific "target" (`nearlymath` library), so the compiler knows where to look for the header files.
  - **`nearlymath`:** The build target being configured.
  - **`PUBLIC`:** Controls the visibility/inheritance (how the directory path propagates to other projects that use our library). It indicates the current target AND anything that links to it (other apps linking to `nearlymath`), will use this directory in order to find `nearlymath`'s header files.
  - **`${CMAKE_CURRENT_SOURCE_DIR}`:** A built-in CMake variable that points to the folder where this `CMakeLists.txt` file lives. In this case, we tell CMake that the header files are in the same folder as the directory containing `CMakeLists.txt`. In many other cases though, you'll probably see "include/", indicating that the header files are in their own directory rather than simply living in the same folder as `CMakeLists.txt`.
- **Handling Library Files (Bad) (`target_link_directories`):** When including a header file, we need to tell the linker where it can find the corresponding library files that implement the API that the headers expose. Typically you can do this with `-L <path-to-libs>`, but what's the CMake equivalent? A rarely used solution is `target_link_directories`, which specifies extra directories that the linker can look for your library files in. However specifying raw library search paths can cause unpredictable link behavior e.g., when multiple libraries with the same name exist on the system. 
- **Handling Library Files (Good) (`target_link_libraries`):** Lets us link via search paths or directly to specific files/managed build artifacts (targets), the latter has no risks for collisions. 

### Visibility Keywords
In CMake, visibility keywords (`PRIVATE`, `PUBLIC`, `INTERFACE`) control how properties (like include paths or compile flags) propagate through the dependency graph. When a directory or library is marked with a visbility keyword, there are two reasons why:
- **Internal Use:** The target's own source files need the header to compile. E.g., I created a header file for my project to separate code, and need to use the API exposed in that header file.
- **Transitive/Interface Use:** Any target that links against this library also needs that header directory automatically added to its own compiler search path to compile successfully.

**Private Scope**
```cpp
// internal_math.cpp (inside target 'nearlymath)
// PRIVATE: only needed to compile internal_math.cpp
#include "secret_helpers.hpp" 
```
Only this target (project) uses this library directory. Suppose we have internal implementation details that shouldn't appear in any header files exposed to outside users of our project (e.g., internal helper functions, private `.hpp` files, or third party dependencies that only our `.cpp` files use). The effect is that consumers of our project won't inherit these directories. Target B links A with PRIVATE. Then Targt C links B. C receives nothing from A.

**Public Scope**
```cpp
// nearlymath.hpp (Public header exposed to users)
// PUBLIC: Users of nearlymath.hpp need Eigen's include path
#include <Eigen/Dense> 
```
For dependencies that are needed to compile the project itself and needed by anyone that uses our project. This is typically necessary when a dependency or header appears in one of your project's public header files (the ones that your users will include). In that case, if a consumer includes your public header, and that header includes a secondary header, the consumer needs access to that secondary header too. Therefore we'll need to tell their compiler where those header files and corresponding library files are located. In terms of CMake behavior, target B links A with `PUBLIC`. Target C links B, and C automatically inherits A's include paths.

**Interface Scope**
For headers and libraries not needed to compile the project itself, but required by people who want to use the project. Target B links A with `INTERFACE`. B's source code doeesn't gt the include path, but C does. 

## Consuming the Library in Another Project
There are two primary ways a consumer can use your compiled library: Local Linking and System Installation. 

### Method A: Direct Linking (`target_link_directories`)
```CMake
cmake_minimum_required(VERSION 3.10)
project(MathApp CXX)
add_executable(MathApp main.cpp)

# 1. Tell CMake where to find nearlymath's header files.
# 2. Tell CMake where to find nearlymath's corresponding library files.
# 3. Link the nearlymath library to one of our target (executable).
target_include_directories(MathApp PRIVATE /path/to/nearlymath)
target_link_directories(MathApp PRIVATE /path/to/nearlymath/build)
target_link_libraries(MathApp PRIVATE nearlymath)
```
If we've build libnearlymath.a` in a specific build folder, an external app (like `MathApp`) can link to the library directly without having the user install the library globally. 

### Method B: Installing to System Paths (`cmake --install`)
```bash
cmake_minimum_required(VERSION 3.10)
project(nearlymath CXX)

add_library(nearlymath adder.cpp)
set_target_properties(nearlymath PROPERTIES PUBLIC_HEADER adder.hpp)

# Specify installation paths:
# - Library binary (.a/.so) -> /usr/local/lib
# - Headers (.hpp)          -> /usr/local/include
install(TARGETS nearlymath
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
    PUBLIC_HEADER DESTINATION include
)
```

The `set_target_properties` specifies file paths to the target's PUBLIC_HEADER` property. Essentially we're registering `adder.hpp` as the official public interface for the `nearlymath` library target.

When we call `install`, instead of manually typing out every header path insdie the `install()` command, CMake will track which headers belong to the public interface. When we pass `PUBLIC_HEADER DESTINATION include`, CMake automatically grabs all files listed with that property and copies them into the target installation directory (e.g., `/usr/local/include`).




Linux places our files a couple of standard locations:
- **`/usr/local/include/`:** Holds public header files (`adder.hpp`). The compiler automatically searches this directory when we use `#include <adder.hpp>`.
- **`/usr/local/lib`:** Holds compiled library binaries (`libnearlymath.a` or `libnearlymath.so`). The linker automatically searches here when linking with `-lnearlymath`.

`Target ${PROJECT_NAME}` refers to the target you want to install user-globally. Typically, it's the executable or library that you created with `add_executable()` or `add_library()`. The `DESTINATION bin` refers to the folder where it will be installed, relative to the installation prefix. By default, it prefixes all installs to `/usr/local` on Linux. Then do `cmake --install build` (likely with `sudo`) in the command line. Now the program is installed into our `usr/local/bin`, and we can now type `my_first_cmake` into the command line and it runs that CPP program as if it's a regular linux command.

## Example 2: Bare Bones
```cpp
#include "../../SomeLibDemo/cpp/adder.h"
#include <iostream>
int main() {
  std::cout << "2+3=" << nearlymath::add(2,3) << std::endl;
  return 0;
}
```
The header is already included, let's compile this source file and link it to the library files. You've already done this with `cmake` and the `CMakeLists.txt`, which gives us a straightforward build and compilation workflow. How about doing this all via command line?
```bash
# Library directory is at ../SomeLibDemo/build/libnearlymath.a
g++ -o main ./cpp/main.cpp ../SomeLibDemo/build/libnearlymath.a

# -L: Tells g++ where to look for the library
# -l: Libraries are compiled with the lib prefix,
# anyways this flag is telling g++ to link with 
# "libnearlymath"
g++ -o main ./cpp/main.cpp -L../SomeLibDemo/build -lnearlymath
```

**NOTE: Building From Source vs Installing Pre-Builts**
On Linux you're building from source. Meaning you're doing exactly what we have here, we pull down the source code of the library, we include the library header files, and link the compiled library files that implement the code in those header files. However, on Windows you'll see prebuilt executables/installers and the header files. This is because a lot of libraries are closed source so they don't want you to see the implementation, but open source libraries allow you to see the implementations of their header files.