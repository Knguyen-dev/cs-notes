
Let's focus on adding common features in our CMake project. Such as adding commonly needed options in C++ projects, supporting IDEs, etc.

# Default Build Type
```CMake
set(default_build_type "Release")
if(NOT CMAKE_BUILD_TYPE AND NOT CMAKE_CONFIGURATION_TYPES)
  message(STATUS "Setting build type to '${default_build_type}' as none was specified.")
  set(CMAKE_BUILD_TYPE "${default_build_type}" CACHE
      STRING "Choose the type of build." FORCE)
  # Set the possible values of build type for cmake-gui
  set_property(CACHE CMAKE_BUILD_TYPE PROPERTY STRINGS
    "Debug" "Release" "MinSizeRel" "RelWithDebInfo")
endif()
```
CMake normally does a "non-release, non-debug" empty build type. We can set the default build type ourselves using the above snippet. Here we set it to release.

# C++ Standards
CMake has amazing C++ support, letting us set language standards up to C++26. There are two good ways to do this:
- Per-target compile features.
- Standard variables/properties.

## Meta Compiler Features
```CMake
target_compile_features(myTarget PUBLIC cxx_std_11)
set_target_properties(myTarget PROPERTIES CXX_EXTENSIONS OFF)
```
The first line configures what language standard the `myTarget` target is going to compile with. This also works with `INTERFACE` targets, but only compiled targets can use the second line.

The second line is optional, but it avoids compiler-specific extensions being added. This maintains portability with our code and absolute alginment with the official C++ ISO language standard. Without this, internally a `-std=gnu++11` would replace `-std=c++11`. 

## Global Properties
```CMake
set(CMAKE_CXX_STANDARD 11 CACHE STRING "The C++ standard to use")
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Or equivalently
set_target_properties(myTarget PROPERTIES
    CXX_STANDARD 11
    CXX_STANDARD_REQUIRED YES
    CXX_EXTENSIONS NO
)
```
A specific set of 3 global/target level properties can be used. The first sets the C++ standard level. The second makes the standard level strictly required for all targets. The third bans any compiler-specific language extensions.

This isn't recommended for libraries though. We're setting a default for every target created after those lines and the subdirectories. If someone imports our library into the projecct using `add_subdirectory` or `FetchContent`, our global varaible leak can forcibly override their target settings. Instead the best practice is to use `target_compile_features`.


## Manual Flags Bad!
Don't set manual flags yourself. We'd become responsible for maintaining correct flags for each release of every compiler. Also IDEs might not pick up on manual flags.
```CMake
# Bad: Manually encoding GCC/Clang flags
target_compile_options(my_target PRIVATE)

# Good: CMake automatically passes -std=c++17 for GCC/Clang # and /std:c++17 for MSVC
target_compile_features(my_target PRIVATE cxx_std_17)
```
- **Cross-Compiler Failure:** GCC/Clang use `-std=c++17`, but Microsoft Visual C++ (MSVC) uses `/std:c++17`. MSVC will throw a syntax error or ignore GCC flags.
- **Compiler Version Breaking:** Compiler flag soccasionally get deprecated or changed across compiler versions. Hardcoding them opens us to the risk of breaking things or the risk of writing conditional logic for each compiler and version.
- **IDE Breakdown:** Most IDEs inspect CMake abstractions to configure their project settings, autocomplete, and for static analyzers. Manual flags (raw strings) may not be recognized by the IDE.

# Position Independent Code
When we add something, we'll first check whether CMake supports it. If so, we can avoid setting an explicit compiler version, letting CMake or `CMakeLists.txt` handle it.

```CMake
# Global setting
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

# Target specific setting
set_target_properties(libl PROPERTIES POSITION_INDEPENDENT_CODE ON)
```

**Position Independent Code** is best known as the `-fPIC` flag. Cmake includes the flag for `SHARED` and `MODULE` libraries for us.

# CCache and Utilities (TODO)
We can set the `CMAKE_<LANG>_COMPILER` variable or the `<LANG>_COMPILER_LAUNCHER` target property to use CCache. Support for CCache looks like:
```CMake
find_program(CCache_PROGRAM ccache)
if (CCACHE_PROGRAM)
    set(CMAKE_CXX_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
    set(CMAKE_CUDA_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
endif()
```
set the following properties or `CMAKE_*` initializer variables to the command line. Most of them are limited to C or CXX with make or ninja generators.
- <LANG>_CLANG_TIDY
- <LANG>_CPPCHECK
- <LANG>_CPPLINT
- <LANG>_INCLUDE_WHAT_YOU_USE

# Include What You Use (IWYU)
In C++, if `foo.cpp` uses a function or class declared in `bar.h`, `foo.cpp` should explicitly `#include "bar.h"`. It's common in legacy C++ to rely on transitive includes (e.g., including `a.h`, which secretly includes `b.h`, allowing you to use symbols from `b.h` without including it explicitly). IWYU states that we should:
- Include everything we directly use.
- Remove any `#include` directives we don't use.
- Use forward declarations instead of fulll `#include`s where possilbe (e.g., when we only use a pointer or reference to a type).

Transitive includes create bloat. If `a.h` stops including `b.h`, dozens of unrelated source files in our github codebase will suddenly fail to compile. It's not immediately obvious that those source files depended on `b.h`, even if they didn't explicitly include it. Following IWYU minimizes "header debt" and cuts down C++ compilation times, AND it also makes our code a little easier to track.

**The Tool**
```CMake
set(CMAKE_CXX_INCLUDE_WHAT_YOU_USE, "include-what-you-use")
```
There's a standalone clang-based tool named `include-what-you-use`. CMake has nativate integration for it via a built-in variable.

# Link What You Use (LWYU)
While IWYU deals with source and header files at compile time, LWYU deals with compiled libraries at link time. LWYU dictates that a build target (executable or library) should only link against shared/static libraries whose symbols it actually uses directly.

Developers often over-link libraries. For example, linking `libpng`, `libz`, and `OpenSSL` to an executable that only actually uses `libpng`'s API. Overlinking causes:
- Slower link times
- Unnecessary runtime dependencies e.g., failed launches due to the user not having a library file that's not even used.
- Bloated binaries and memory footprints.

**Tool/Feature**
```CMake
# Enables LWYU for all targets 
set(CMAKE_LINK_WHAT_YOU_USE ON)

# Enabls it for a specific target
set_target_properties(my_app PROPERTIES LINK_WHAT_YOU_USE ON)
```
LWYU is built directly into build system generators like CMake as a target or global variable, rather than being a standalone binary tool.

# CMakePresets.json
A JSON file that stores pre-configured build, configure, test, and package settings for a CMake project. Introduced in CMake 3.19, it eliminates the need to remember or type out long command-line arguments, ensuring consistent builds across different developers, tools, and IDEs. Here's how to use it:
```bash
# Configure using a specified preset
cmake --preset dev-debug

# Build using a configured preset
cmake --build --preset dev-debug

# Run tests using a test preset
ctest --preset unit-tests
```
1. Place a `CMakePresets.json` at the root directory of your project, alongside your main `CMakeLists.txt`.
2. Run CMake using the `--preset` option.

## Core Structure
A `CMakePresets.json` contains four main sections:
1. **`configurePresets`:** Defines build directories, CMake variable, generators, and toolcahins.
2. **`buildPresets`:** Specifies build targets, configurations, and parallel jobs.
3. **`testPresets`:** Defines how CTest runs, including test execution parameters.
4. **`packagePresets`:** Configures CPack targets and packaging options.

## Example 1: Inheritance and Variables
```JSON
{

  // Global stuff
  "version": 3,
  "cmakeMinimumRequired": {
    "major": 3,
    "minor": 19,
    "patch": 0
  },
  "configurePresets": [

    // Preset named "base" 
    {
      "name": "base",
      "hidden": true,
      "generator": "Ninja",
      "binaryDir": "${sourceDir}/build/${presetName}",
      "cacheVariables": {
        "CMAKE_EXPORT_COMPILE_COMMANDS": "ON"
      }
    },
    {
      "name": "dev-debug",
      "displayName": "Debug Build",
      "inherits": "base",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Debug",
        "BUILD_TESTING": "ON"
      }
    },
    {
      "name": "dev-release",
      "displayName": "Release Build",
      "inherits": "base",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Release",
        "BUILD_TESTING": "OFF"
      }
    }
  ]
}
```
Above, we setup a base configuration and inherit from it to create the Debug and Release presets. 

The base preset uses the Ninja, which modern/faster alternative than using Make, speeding up build times. The `binaryDir` ensures that when a preset is built, it goes into the `/build<presetName>`. This isolates all build files and binaries created by that particular preset. For example the `dev-debug` preset will now create a folder `/build/dev-debug` to contain all its build files and binaries.
- **`CMAKE_EXPORT_COMPILE_COMMANDS`:** When set to `ON`, CMake generates a file called `compile_commands.json` in the build directory. It's a JSON database containing the exact compiler flags, include paths, and amcros used for each C/C++ source file in our project. Then `clangd`, IDE exetnsions, and static analyzers would use this file to provide accurate code completion, linting, and navigation.
- **`CMAKE_BUILD_TYPE`:** A built-in CMake variable that specifies the build configuration for single configuration generators like Ninja or Makefiles. Common values include:
    - **`Debug`:** Enables debug symbols and turns off compiler optimizations so we can inspect variables in a debugger.
    - **`Release`:** Turns on high-level compiler optimizations and strips debug symbols for maximum performance.
    - **`RelWithDebInfo`:** Enables optimizations while retaining debug symbols. 
    - **`MinSizeRel`:** Optimizes the build specifically to minimize binary size.
- **`BUILD_TESTING`:** A standard CMake variable that's defined and controlled by the project's developer or a built-in module. When we include CMake's standard `CTest` module in our `CMakeLists.txt`, CMake automatically creates the `BUILD_TESTING=ON` option. Toggling this setting allows us to decide whether unit test targets are configured and built. In our case, we set it to `ON` for `dev-debug` which ensures tests are compiled during development. We turn it `OFF` for `dev-release` to speed up release builds by skipping test generation.