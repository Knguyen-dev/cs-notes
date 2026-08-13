
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