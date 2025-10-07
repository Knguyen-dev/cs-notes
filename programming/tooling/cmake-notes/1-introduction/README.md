# Introduction to CMake
CMake is a build system generator. It doesn't build our code directly, but rather it generates the files needed for another build tool (like `Make`) to actually compile your program.

In C++, projects can get messy when:
- There are a lot of source files in different directories.
- Multiple compilers and platforms.
- External needs need to be found and linked.

If we used only `make`, we'd have to write multiple platform specific Makefiles. CMake simplifies the process by letting us first describe our project at a higher level and then it generates the right build files for the current system. The idea is that you'd describe your project in a `CMakeLists.txt` file.


# 1. Basics of CMake
A `Makefile` is a file that runs commands. This is typically what you're going to use in Linux, Windows has their own versions of these. `CMake` creates your make files. CMake relies on a top-level file called `CMakeLists.txt`. You can check your cmake version with `cmake --version`, and then pick the one you want. Of course versions are sometimes important because there are some features that you can't do until later versions. You type `cmake` to call commands, the first we'll do is:
```bash
# cmake -S <path-to-source> -B <path-to-build>
# What most people do is that they make a directory called `build`. 
# Which is where they'll put all of their build files. Our source 
# is the current dir and the build files are in the 
cmake -S . -B build
```

After doing this it creates that `Makefile`, `CMakeCache.txt`, `CMakeFiles`, etc. inside your build path. Though notice that we didn't actually run any code, we just created files that would be helpful when you actually wanted to compile/run the code. Hence, CMake helps create build files (e.g. Makefiles) instead of executables. cmake saves a lot of the variable names. For example `PROJECT_NAME` variable is set by the `project()` function and can actually be accessed later. So after I created the line about the `main.cpp`, I rebuilt the build files. Then I see my changes reflected in `/build/Makefile`. Then do `cd build && make`, which compiles your code and should create an executable with your project's name e.g. `my_first_cmake`. Again the source code file for this would be `main.cpp`. We configured this whilst in our `CMakeLists.txt`.

## What are targets (build targets)?
In CMake, a target is basically a thing that you build. For example:
- an executable (via `add_executable(...)`)
- a library (via `add_library(...)`)
- even "meta targets" like `install`, `clean`, and `ALL`, which are just commands.

```bash
# This defines a target called main_program
# which is just an executable that the program
# produces.
add_executable(main_program main.cpp)
```