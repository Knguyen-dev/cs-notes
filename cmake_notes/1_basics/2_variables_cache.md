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