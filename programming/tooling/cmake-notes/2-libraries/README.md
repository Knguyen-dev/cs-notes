# 2. Libraries

## Reviewing CMake Workflow, Creating Custom CLI Programs.
Again the workflow is:
1. Create `build` directory
2. Do `cmake -S . -B build` to create your build files in that folder. This doesn't compile your code, but creates the files needed to compile your code. Do this every time you change the `CMakeLists.txt`

```bash
# This CMake line makes it so that when you run "make install", we copy
# the executable to the "bin" directory 
install(TARGETS ${PROJECT_NAME} DESTINATION bin)
```
- `Target ${PROJECT_NAME}`: The target you want ot install. Usually this ia an executable or library that you created with `add_executable()` or `add_library()`.
- `DESTINATION bin`: The folder where it will be installed, relative to the installation prefix. By default it prefixes all installs to `/usr/local` on Linux. This just allows you to copy libraries or executables to your own personal collection.
- The command we'd use is `cmake --install build`, but if you get permission issues then use `sudo cmake --install build` or `sudo make install`. Now what's the motivation of installing that fun little program into our `usr/local/bin` path? We'll now we can do `my_first_cmake` in our command line, and it runs that CPP program, as if it's a regular linux command.

## Handling Libraries
In C++ how do we make a library? We'll make a library before doing the build system. Libraries don't have a main entrypoint, so you wouldn't have a `main.cpp` in your library. At some point in C++, you'll call a function and you'll get an error saying that there are multiple versions of it, or multiple functions with the same name. This happens when you have functions or variables with the same name, so our compiler doesn't know which function or variable we're talking about it. A conventional solution would be putting those functions in their own namespace. As a result, when people want to call your functions specifically, they'll use the namespace plus the name of your function.
1. Create `adder.h` header file that exposes the headers of the library functions that you want others to use. Also declares the namespace.
2. Create the corresponding `adder.c` file that contains the implementations of those functions.
3. Create `CMakeLists.txt` with `touch CMakeLists.txt`.
Usually you do `add_executable`, but're building out a library here. We do `add_library()`. We only kind of need to compile our `adder.cpp` file. Remember that header files aren't really something that others will directly compile, but rather something others will include. The `.h` file provides function definitions during pre-processing, but that `.cpp` file will show what the implementations of those functions are when we get to the linking phase.

```bash
mkdir build 
cmake -S . -B build

# Traditional way:
# cd build
# make

# Shortcut modern way
cmake --build build

# Output:
# [100%] Linking CXX static library libnearlymath.a
```
Since this is a `.a` file, this is a static library, as opposed to a dynamic library. 

Then we created a separate `main.cpp` that uses this library.
1. Create `main.cpp` that includes the path to the `adder.h`. But now we need to link the actual library file containing the implementation of the functions in that header file.
2. Create `CMakeLists.txt` to link your project with the library? Let me explain the CMake file:
```bash

cmake_minimum_required(VERSION 2.8)
project(mytest)
add_executable(mytest ./cpp/main.cpp)

# Tells CMake, which directory to use when looking for the library
# (.a, .so, etc). The CMAKE_SOURCE_DIR contains the absolute path of
# the top-level source directory where our top CMakeLists.txt
# lives.
# NOTE: target_link_directories came in CMake 3.13, so we need 
# to update our CMake version
# target_link_directories(<target> [BEFORE] <INTERFACE|PUBLIC|PRIVATE> [items...])
target_link_directories(mytest PRIVATE ${CMAKE_SOURCE_DIR}/../SomeLibDemo/build/)

# Tell CMake about the name of the library file. This handles 
# nearlymath.so and all the different combinations.
target_link_libraries(mytest nearlymath)
```
With the `target_link_directories()` function you need to choose a visibility keyword. This affects how CMake searches for the library folders:
- `PRIVATE`: Only this target (project) uses this library directory.
- `PUBLIC`: This target and anything that links against it uses this directory.
- `INTERFACE`: Only consumers (targets that link to our target/project) will use the directory.

Now run everything:
```bash
mkdir build && cmake -S . -B build
cmake --build build
./build/mytest
```

### Code Sample and Compilation

```CPP
// Path to the SomeLibDemo adder.h
#include "../../SomeLibDemo/cpp/adder.h"
#include <iostream>
int main() {
  std::cout << "2+3=" << nearlymath::add(2,3) << std::endl;
  return 0;
}
```
The header is already included, let's compile this source file and link it to the library files. You've already done this with `cmake` and the `CMakeLists.txt`, which gives us a straightforward build and compilation workflow.

How about doing this all via command line?
```bash
# Library directory is at ../SomeLibDemo/build/libnearlymath.a
g++ -o main ./cpp/main.cpp ../SomeLibDemo/build/libnearlymath.a

# -L: Tells g++ where to look for the library
# -l: Libraries are compiled with the lib prefix,
# anyways this flag is telling g++ to link with 
# "libnearlymath"
g++ -o main ./cpp/main.cpp -L../SomeLibDemo/build -lnearlymath
```

## Importing Libraries

### Building From Source vs Installing Pre-Builts
On Linux you're building from source. Meaning you're doing exactly what we have here, we pull down the source code of the library, we include the library header files, and link the compiled library files that implement the code in those header files. However, on Windows you'll see prebuilt executables/installers and the header files. This is because a lot of libraries are closed source so they don't want you to see the implementation, but open source libraries allow you to see the implementations of their header files.

### Setting up Library Installation
In our `SomeLibDemo`'s `CMakeLists.txt` we'll add 2 new lines:
```bash
set_target_properties(nearlymath PROPERTIES PUBLIC HEADER "adder.h")
install(TARGETS nearlymath LIBRARY DESTINATION lib PUBLIC_HEADER DESTINATION include)
```
This relates to how CMake associates header files with their corresponding library so that a command like `make install` or `cmake --install` knows where to put things. Here we're saying "This library's public headers (the ones users of the library should include) are: `adder.h`. Then later when we call `install()`, CMake knows to:
- Copy the built library file into `/usr/local/lib`
- Copy the public headers (`adder.h`) into `/usr/local/include`

After our install, our system looks like:
```bash
/usr/local/lib/nearlymath.so
/usr/local/include/adder.h
```
The convention for Unix-style libraries is that we put compiled objects in `lib/` and header files in `include/`. As a result another project can do:
```cpp
#include <adder.h>
```
and link against `-l nearlymath` without needing weird relative paths.

Let's test this out with :
```bash

# Creates build files, e.g. updates your Makefile and any other script related stuff
cmake -S . -B build # Create build files

# Recompiles your code; used when your code changed
# If you see: [100%] Built target nearlymath, that means that it checked
# the dependencies and determined that nothing needed recompiling. This 
# is because source code and headers haven't changed since the last build.
cmake --build build 

# Assuming that you have compiled library files and header files, 
# we're going to install those files into our local directory. 
# NOTE: Need to use sudo here to bypass permission issues.
sudo cmake --install build 
```

### Motivation For Library Installation
When you build a library like `nearlymath`, compiling it produces a `.a` or `.so` file in your build directory. But other projects, or your users, may not know where your build directory is. It could be under a different name, in some complex nested structure, etc. Here are some solutions:
- Copy the library manually to some folder, and for every project we'd probably have a couple different custom paths to that library's header and compiled files. This is kind of messy and makes things harder to maintain.
- Install it into the standard system directories so that the compiler and linker can find it automatically.

**File Convention in Unix-like Systems**
- `/usr/include`: System provided headers.
- `/usr/lib`: System provided libraries.
- `/usr/local/include`: Locally installed headers, so these are the headers for the libraries that you've installed.
- `/usr/local/lib`: Locally installed library files, the compiled files for the libraries you've installed.

Now when using the library, we can do this instead:

```CPP
// No need to include exact path relative to the source 
// file anymore because we installed the adder library.
// #include "../../SomeLibDemo/cpp/adder.h"

#include "adder.h"
#include <iostream>
int main() {
  std::cout << "2+3=" << nearlymath::add(2,3) << std::endl;
  return 0;
}
```
You can now remove the line `target_link_directories(mytest PRIVATE ${CMAKE_SOURCE_DIR}/../SomeLibDemo/build/)` in your `CMakeLists.txt`. Then rebuild build files and recompile, and your executable should run.

Lesser used but you can now finally compile
```bash
g++ -o main ./cpp/main.cpp -L /usr/local/lib -lnearlymath
```

### Explaining Public and Private Headers?
There are two types of headers:
- **Public Headers:** This exposes the API that your users are supposed to use. 
- **Private Headers:** Private apis that your system usually internally. These are internal implementation details that aren't installed. 

The `PUBLIC_HEADER` property tells CMake exactly which ones to ship to consumers of the library. 