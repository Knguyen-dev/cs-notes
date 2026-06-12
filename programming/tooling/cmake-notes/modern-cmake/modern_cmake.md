# Modern CMake Guide

## Modern CMake Best Practice


### Version Requirements
```bash
# Use a more recent minimum version for modern features
cmake_minimum_required(VERSION 3.16)  # or 3.20+ for newest features

# Set policy for consistent behavior
cmake_policy(SET CMP0074 NEW)  # find_package uses PackageName_ROOT variables
```

### Project Declaration

```bash
# Modern project declaration with version and languages
# - Project name 
# - Project version
# etc. extra stuff
project(metavision_sdk_get_started 
    VERSION 1.0.0
    DESCRIPTION "Getting started with Metavision SDK"
    LANGUAGES CXX
)
```

### C++ Standard (Modern Way)
```bash
# Instead of CMAKE_CXX_STANDARD, use target properties
target_compile_features(${sample} PRIVATE cxx_std_17)

# Or for the whole project:
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)  # Disable compiler extensions
```

### Target Properties and Organization
```bash
# Create executable
add_executable(${sample} ${sample}.cpp)

# Set target properties
set_target_properties(${sample} PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
)

# Link libraries (your approach is already modern!)
target_link_libraries(${sample} 
    PRIVATE
        MetavisionSDK::core 
        MetavisionSDK::stream 
        MetavisionSDK::ui
)

# Add compile options if needed
target_compile_options(${sample} PRIVATE
    $<$<CXX_COMPILER_ID:GNU>:-Wall -Wextra>
    $<$<CXX_COMPILER_ID:Clang>:-Wall -Wextra>
    $<$<CXX_COMPILER_ID:MSVC>:/W4>
)
```

## Modern Files and Structure
```bash
project/
├── CMakeLists.txt          # Main build file
├── cmake/
│   ├── FindCustomLib.cmake # Custom find modules
│   └── Config.cmake.in     # Package config template
├── src/
│   ├── CMakeLists.txt      # Source subdirectory
│   └── main.cpp
├── include/
│   └── myproject/
├── tests/
│   └── CMakeLists.txt
└── docs/
```

## Main `CMakeList.txt` Template
```cmake
cmake_minimum_required(VERSION 3.16)

project(MyProject
    VERSION 1.0.0
    DESCRIPTION "A modern C++ project"
    LANGUAGES CXX
)

# Only do these if this is the main project, not a subproject
if(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
    # Set C++ standard
    set(CMAKE_CXX_STANDARD 17)
    set(CMAKE_CXX_STANDARD_REQUIRED ON)
    set(CMAKE_CXX_EXTENSIONS OFF)

    # Support folders in IDEs
    set_property(GLOBAL PROPERTY USE_FOLDERS ON)

    # Testing only available if this is the main app
    include(CTest)
endif()

# Find dependencies
find_package(MetavisionSDK COMPONENTS core stream ui REQUIRED)

# Add subdirectories
add_subdirectory(src)

# Only build tests if this is the main project
if(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME AND BUILD_TESTING)
    add_subdirectory(tests)
endif()
```
