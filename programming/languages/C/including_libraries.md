# How to Import/Include Libraries in C/C++

In languages like C and C++ importing libraries has similarities and differences compared to importing libraries in something like Python. What's similar is that it seems that you can import stuff from the "C Standard Library", which is a collection of libraries that are built-in or standard to C/C++. This library is maintained by an official team that maintains standards for C/C++. 
```C
#include <stdio.h> // C
#include <iostream> // C++
```
We import those built-ins by "including" the header files that declare functions, types, and constants. Think of it as these files exposing the API or the actual functions that other people can access. The actual implementations of these functions (like `printf` or `std::cout`) are already compiled and linked to your program by the C compiler and also the linker. For the built-in libraries, this is done automatically, however libraries that aren't built in, we have to do some extra stuff to get this working.

## How Library Inclusion Actually Works
The `#include` directive works via text substitution. The preprocessor literally copy-pastes the contents of the header file into our source code. So when we do `#include <stdio.h>`, the preprocessor will change it to:
```C
int prinf(const char *format, ...);
int scanf(const char *format, ...);
// hundreds of more lines.
```
But remember we're not going the actual code that implements these functions. That will be handled separately during linking.

## Two Part System: Headers + Libraries
Most libraries follow this pattern:
- **Header files (`.h`, `.hpp`):** Contains declarations, type definitions, and inline functions.
- **Library Files (`.a`, `.so`, `.lib`, `.dll`):** Contain the compiled implementations of those functions.

When you compile, you need to:
1. Tell the compiler where to find the headers.
2. Tell the linker which libraries to link against.
3. Also tell the linker where to find the library files.

```C
// In myprogram.cpp, include the opencv header files
// NOTE: OpenCV will provide you these
#include <opencv/opencv.hpp>

// In command line
g++ -I/usr/include/opencv2 myprogram.cpp -lopencv_core -lopencv_imgproc -lopencv_highgui
```
Then you have to install OpenCV library locally and know the path to it. Then provide the paths to the corresponding files:
- `-I`: Look for headers in this directory.
- `-l`: Link against these libraries.

## "Header-Only" Libraries
Header-only libraries put everything in the header files themselves. With header-only libraries, you simply just include the header file, and it works. This is because:
- All code, including implementations, are included in the headers.
- These no separate compilation unit, or thing, to link against. No library to link against because we already have the implementations in the header files.

Header-Only libraries are quite straightforward to use, but it can come with drawbacks like slow compilation times since the same code is being compiled multiple times. This is unlike the Header + Library setup, where the implementations in the library files are already compiled and ready to go.

## Modern Solution: Package Managers
The traditional "download, compile, link" workflow is being replaced by package managers like `vcpkg`, `Conan`, and `CMake`. Whilst these are popular, not every C/C++ library allows you to download its code using these package managers. C/C++ predates modern package managers by decades. A lot of existing code uses traditional build systems that aren't compatible with package managers. C/C++ also compiles to native binaries, which means you'll need different packages for different operating systems, architectures, compiler versions, etc.
