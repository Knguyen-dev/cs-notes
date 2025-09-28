# Code Compilation: How Projects Use Multiple Languages
A frontend application usees HTML, CSS, and JavaScript. An API could be using a Python framework like Django, where all of the source code in your API is Python. This setup makes sense as we're setting up for interprocess communication between two different processes. However there are some projects that use multiple different languages that are meant to be run together as a single process.

## Introduction to Compilers
Generally, each programming language has its own dedicated compiler that turns source code into an executable (a binary file). Meaning you can't use a Go compiler to compile Rust source code. Compilation follows a multi-step process. Let's follow this process through an example on how a C source code file is compiled. On most GNU Linux systems, we use the GNU Compiler Collection, a collection of compilers and compilation tools for multliple languages, including C. We would run `gcc main.c -o main`, which turns our source code into an executable, but under the hood, obviously more work is done. Here is the compilation workflow:
1. Pre processor
2. Compiler
3. Assembler
4. Linker

```C
#include <stdio.h>
int main() {

  // this is a comment
#ifdef _WIN32
  printf("Hello from widnows\n);
#elif __linux__
  printf("Hello from Linux\n);
#elif __APPLE__
  printf("Hello from MacOS\n);
#else
  printf("Hello from an unknown OS");
#endif
  return 0;
}
```

### Step 1: Preprocessor
```C
// ... contents of stdio.h ...
int main() {
  printf("Hello from widnows\n);
  return 0;
}
```
Removes comments, expands macros, resolves conditional compilation, and most importantly it resolves any `#include` statements. The preprocessor copies and pastes the contents of that header file, and the header file it includes, into the source code file. This gets everything ready for the compilation phase, outputting a `main.i` file.

### Step 2: Compilation to Intermediary Language
The preprocessed code is translated into Assembly language, or some other intermediary language. Most compilers don't directly translate pre-processed code into binary, but rather than intermediary language like Assembly or something else.

### Step 3: Assembler (& linking)
The assembler is a compiler that compiles ASM code into binary, outputting an **object file (`.o`)**. However the object file isn't running yet, and this is due to how header files work. Typically, the header files from C/C++ libraries contain and expose functions that the library intends users to use. It's exposing an API. However more importantly, the contents of a header file mainly only contain the definitions of functions, rather than their implementations. The idea is that a developer creating a library, defines some header functions that the users will use, this acts as like an API contract, as the developer will need to implement those functions exactly as they've defined in their header files. 

Again, we only have the function definitions, not the actual implementations of those functions. For example, our binary doesn't have the code that actually implements `printf()` right now, and as a result, it's not going to run properly. Relating back to libraries from earlier, when developers create a header file such as `stdio.h` that exposes function definitions, they typically also create a corresponding "library file" (e.g. `stdio.o`), which is just a binary that contains the implementations of the functions exposed in the header file.

To make sure this library file is "considered/found" during our compilation process, we'd usually pass flags in our compilation command that indicates the path of the library. For example:
```bash
# E.g. assuming main.cpp includes fancy_graphics.h
# NOTE: Don't know if the names have to match though?
gcc -o main ./cpp/main.cpp /path/to/fancy_graphics.a
```
However, you've probably noticed that whenever you've included builtin libraries (C Standared Libraries) `stdio.h` you haven't had to do this. Actually, assuming you're on Linux, sometimes you don't even have to do this. Your libraries and include files are stored at specific directories, and as long as they're there, then you don't have to do any weird pathing stuff:
- `/usr/include`: System provided headers.
- `/usr/lib`: System provided libraries.
- `/usr/local/include`: Locally installed headers, so these are the headers for the libraries that you've installed.
- `/usr/local/lib`: Locally installed library files, the compiled files for the libraries you've installed.

### Step 4: Linking
Anyways the linker combines our `main.o` and our `stdio.o` into a single self contained executable. There are two ways to do this
- **Static Linking:** Take the machine code of the required library functions and paste them into the binary. This is easy, and everything is self contained. As a result if you have a statically linked executable, you should be able to run it, regardless of whether or not you've installed its library files. This sounds cool, but it's kind of unmaintainable since every program/executable has its own copy of the required library functions. Think of all the system code that uses the `printf()` function. If everything was statically linked, each executable would have its own copy of that function. If `printf` was modified, those changes aren't reflected for existing executables using that function. As a result, we'd have to rebuild/recompile all our other executables to keep them up to date. 
- **Dynamic Linking:** The linker uses a dynamic shared library (`.so` or `.dll`). Now in the linking phase, instead of copy-pasting the function implementation into the final product, the linker inserts a reference to the library that contains the implementation (machine instructions) for that required function. Then at runtime, when the executable needs to use the library function, the OS loads the implementation of that library function in-memory. The main benefit of dynamic linking is that since every executable isn't holding its own copy of functions like `printf()`, we are a lot more space efficient.

## Motivation for Controlling Compilation
Using specific gcc flags, we can stop the compilation process at certain steps. A popular usecase is seeing how our C source code compiles into Assembly. You can even start from any stage in the pipeline, even passing gcc an ASM file, so that it outputs a binary e.g. `gcc  main.s -o main`. The main motivation for this in industry is optimizing performance critical code. If you're working on a high performance application, you'll definitely see engineers inspecting the ASM code to ensure that the compiler is generating efficient instructions. Since we can pass in ASM files and start from anywhere in the compilation process, it opens up the idea of compiling source code from different languages into a single runtime. A common application of this is writing your boilerplate in a higher level language, and then writing the performance critical sections in ASM or C.

## Limits and Application Binary Interfaces (ABIs)
However even if two languages have a final linking phase and were built on the same architecture, it doesn't mean you can import them. For example, in language A, when you pass arguments to a function, it may store those arguments in CPU registers 0 and 1, and then return the result to register 0. However in language B, it may store those arguments in registers 1 and 2, and return the result in register 2. The way the arguments are passed and stored, how things are returned is defined by the Application Binary Interface (ABI). Both languages have different assumptions on how data is handled. 

## Credits
- [Why Some Projects Use Multiple Programming Languages - Core Dumped](https://www.youtube.com/watch?v=-UrdExQW0cs)