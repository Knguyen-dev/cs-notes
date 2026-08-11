# CMake Notes
Most IDEs support CMake, most packages use it over other build systems, etc. If you set your minimum CMake version too low, CMake will produce a warning or error. In practice, use a version of CMake that come out after our compiler since CMake needs to know compiler flags, etc. for that compiler version. It should be newer than the libraries we use as well.



 Always set the maximum version to the highest version you're willing to test. Your code will continue to work until CMake drops that maximum version from its support window, which won't be for a long time.

Downloading CMake system-wide is pretty safe, as CMake itself adjusts to the minimum required version in your CMake file. Though, at least install it locally. 

# Installing and Running CMake

## Building and Running on CMake
```bash
# Approach 1: Classic/traditional
mkdir build
cd build
cmake . .
make 

# Approach 2: Compact/modern
cmake -S. -Bbuild
cmake --build build
```
Install CMake on Linux via "sudo apt install cmake". When building a project,t you should always make a build directory and build from there (unless otherwise noted). 
- `-S`: Source location containing the CMakeLists.txt
- `-B`: Build directory that will be created. 

The `make` line can be replaced with `cmake --build`. This equivalently calls `make` or whatever build tool you use. 

**Installing with CMake**
```bash
# From the build directory (pick one)
~/package/build $ make install
~/package/build $ cmake --build . --target install
~/package/build $ cmake --install . # CMake 3.15+ only

# From the source directory (pick one)
~/package $ make -C build install
~/package $ cmake --build build --target install
~/package $ cmake --install build # CMake 3.15+ only
```
Assuming we've already created the build files, there are various different ways we can install artifact on our system. If we're already in the 'build' directory, we do the top 3 commands. If we're in the source directory (where `CMakeLists.txt` is), then the bottom 3 commands are what you'd use.

You can make CMake point at either the source directory from the build directory, or an existing build directory.

## Picking A Compiler
```bash`
CC=clang CXX=clang++ cmake ..
~/package/build $ export CC=clang CXX=clang++ cmake ..
``
You must select a compiler on the first run in an empty directory. For example, we select Clang and set environment variables CC and CXX. CMake respect these variables and export is used to propagate tehse variables to child processes.

## Picking A Generator
```bash
cmake --help
```
`make` is typically the default. Run the above command to see all the tools CMake knws about on our system. This is also something we need ot need to specify on our first run.

Makefiles only run in parallel if we pass a number of threads e.g., `make -j2`, whilst Ninja automatically runs in parallel. Therefore we can directly pass a parallelization option such as `-j2` to the `cmkae --build` command in recent CMake versions.

## Setting Options, Verbose/Partial Builds
```bash
cmake --build build --verbose
```
We modify CMake options with the `-D` flag. We see the list of options with `-L` or something like `-LA`. Not all build tools support this, but may be able to get verbose builds by passing the `--verbose` flag.

You can also build a part of a build by specifying a target e.g., the name of a library or executable we've defined. Then CMake simply builds that target.

A variable in CMake can be marked as cached, meaning it'll be written to a file called `CMakeCache.txt` in the build directory when encountered. We can change the value of a cached option via the `-D` on the command line. This way, CMake looks for the cached value, but won't use or overwrit he existing values.

## Debugging CMake Files
The `--trace` option prints each line of CMake that's run. Since it's very verbose, they added `-trace-source="filename"`, which prints out ever yline of the file we're interested indebugging.

# Do's and Don'ts

## CMake Patterns and Anti-pattersn

**Anti-Patterns**
- Don't use global functions: E.g., link_directories, include_directories, etc.
- Don't add unneeded PUBLIC requirements: We want to avoid forcing something on users that's not required. Make these PRIVATE instead.
- No GLOB files.
- Don't link to built files directly. Always link to targets.
- Never skip PUBLIC/PRIVATE when linking.

**Patterns**
- Think in targets: Targets should represent concepts. Make an imported interface target for anything that shuold stay together and link to it.
- Export your interface: You should be able to run from build or install.
- Write a Config.cmake.file: What a library author should do to support clients.
- Make ALIAS targets to keep usage consistent:



**Anti-Patterns**

# Credits
- [An Introduction to Modern CMake | Henry Schreiner](https://cliutils.gitlab.io/modern-cmake/)
- [CMake Tutorial | CMake](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)
- [CMake Docs](https://cmake.org/cmake/help/latest/index.html)