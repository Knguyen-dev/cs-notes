# Project Structure
Let's follow a common convention on how to structure the directories in our project. We can use a pattern that most other projects use, avoid patterns that cause conflicts, etc.
```
- project
  - .gitignore
  - README.md
  - LICENSE.md
  - CMakeLists.txt
  - cmake
    - FindSomeLib.cmake
    - something_else.cmake
  - include
    - project
      - lib.hpp
  - src
    - CMakeLists.txt
    - lib.cpp
  - apps
    - CMakeLists.txt
    - app.cpp
  - tests
    - CMakeLists.txt
    - testlib.cpp
  - docs
    - CMakeLists.txt
  - extern
    - googletest
  - scripts
    - helper.py
```
The names aren't absolute e.g., you'll see contention about `tests/` vs `tests/`, or a different name for the application folder (e.g., `cmake` or even `python` in some cases). The application folder may not even exist.

The `CMakeLists.txt` files are split up all over our source directories and stay out of the include directories. We should be able to copy the contents of our include directory to `/usr/include` (system includes), without issues. Your root `CMakeLists.txt` will have quite a few `add_subdirectory()` calls, to ensure the `CMakeLists.txt` files of each folder are processed alongside our root.



```CMake
set(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake" ${CMAKE_MODULE_PATH})
```
A `cmake` folder typically conatins all our helper modules. 

Your `extern` folder should contain git submodules for the most part. This lets you version control waht dependencies you have.

Your `.gitignore` will ignore `/build*`, preventing build directories from being included in version control.

```CMake
### Require out-of-source builds
file(TO_CMAKE_PATH "${PROJECT_BINARY_DIR}/CMakeLists.txt" LOC_PATH)
if(EXISTS "${LOC_PATH}")
    message(FATAL_ERROR "You cannot build in a source directory (or any directory with a CMakeLists.txt file). Please make a build subdirectory. Feel free to remove CMakeCache.txt and CMakeFiles.")
endif()
```
Finally, ensure your build directly isn't trying to build isnide some kind of source directory.


