# Variables and the Cache

## Local Variables
```CMake
set(MY_VARIABLE "value")
```
Variable names are typically in all caps with the value following the name. We then access the variable by using ${} notation e.g., `${MY_VARIABLE}`.

In CMake, we can acces the value of a variable as long as we're in the same scope that it was defined. If we leave a function or file in a subdirectory, the variable will no longer be defined. We can set a variable in the scope immediately above our current one via `PARENT_SCOPE`.

```CMake
# Equivalent ways of making lists
set(MY_LIST, "one" "two")
set(MY_LIST, "one:two")
```
The list command also has utilities for working with lists.

### Example 1: 
In CMake, configuring an option like `BENCHMARK_DOWNLOAD_DEPENDENCIES` works by writing into CMake's persistent cache (`/build/CMakeCache.txt`). Let's break down the following line:
```CMake
set(BENCHMARK_DOWNLOAD_DEPENDENCIES ON CACHE BOOL "" FORCE)
```
**`BENCHMARK_DOWNLOAD_DEPENDENCIES` (Variable Name)**
The variable name that Google Benchmark checks internally to decide whether to download Google Test automatically when someone downloads Google Benchmark.

**`ON` (VALUE)**
This sets the value to `true`. In CMake, boolean true can be written as `ON`, `YES`, `TRUE`, `1`, or `Y`. Setting `ON` is the standard convention for a boolean true.

**`CACHE` (Storage Location)**
This tells CMake to save this variable to the CMake cache, so that other scripts, subdirectories, and dependent projects (like Google Benchmark) can read it. Without `CACHE`, the variable would only exist locally in our immediate script scope/project AND it might be invisible to `FetchContent` modules.

**`BOOL` (Variable Type)**
Specifies the data type in the cache. Common types include `BOOL`, `STRING`, `FILEPATH`, etc. In this case we mark it `BOOL` so that CMake GUI tools know to present it as a checkbox.

**`""` (Help/Docstring)**
This empty string typically acts as documentation to indicate what a variable represents in CMake. However, since we're overriding an internal dependency setting, rather than defining a user-facing option, we'll leave it as an empty string `""` (convention). Otherwise, if you were really defining a CMake variable for users, then you'd explain what that variable does. 

**`FORCE` (Override)**
By default, if a CMake variable is already saved in `CMakeCache.txt` from a previous run, CMake will not overwrite it. Adding `FORCE` tells CMake, "I don't care if this variable already exists in the cache, overwrite it with `ON` each time CMake runs."

## Cache Variables
When we run CMake, it spends a lot of time detecting things about our system e.g., where our compiler is, where libraries are installed, what settings we want to use. We want to avoid CMake to waste time re-detecting all of that every single time we edit a `.cpp` file.
```bash
# Sets the cache variable 'CMAKE_BUILD_TYPE' to Release
cmake -B build -D CMAKE_BUILD_TYPE=Release
```
Once set, CMake saves `CMAKE_BUILD_TYPE=Release` in `CMakeCache.txt`. The next time we run `cmake --build build`, it'll remember that we wanted a Release build without us typing `-D CMAKE_BUILD_TYPE=Release` again.

Evidenetly, we can set properties via cache variables from the command line. Again the idea is that There's also environment variables, but those are typically avoided.

## CMake Properties
```CMake
set_property(TARGET TargetName PROPERTY CXX_STANDARD 11)
set_target_properties(TargetName PROPERTIES CXX_STANDARD 11)

get_property(ResultVariable TARGET TargetName PROPERTY CXX_STANDARD)
```
Akin to a variable, but it's attached to some other item, like a directory or target. A global property can be used so that many targets are initialized with the same thing e.g., `CMAKE_CXX_STANDARD` so that all targets created will have their `CXX_STANDARD` set. Above I show the two ways we can set properties. The former is more general and can be used to set multiple targets at once. The second is a shortcut.