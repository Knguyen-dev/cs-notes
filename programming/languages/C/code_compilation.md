# Code Compilation: How Projects Use Multiple Languages
In a simpler project, you might have a Python/Django backend and a JavaScript/HTML/CSS frontend. It's easy to see why these different languages are used—they power two separate applications that communicate with each other. This is a multi-language project, but the separation is clear. However, there are times when components written in different programming languages need to run together as a single process. This is often done for performance, optimization, or to leverage the strengths of different languages.

Each programming language has its own dedicated compiler or interpreter. A compiler is a program that translates source code into machine code (binary) that a computer's processor can execute. For example, a C compiler is used to compile C source code, and a Rust compiler compiles Rust source code. You can't compile a Rust file with a Go compiler, as each language has a specific syntax and structure that its compiler understands.

## Introduction to Compilers
Generally, each programming language has its own dedicated compiler that turns source code into an executable (a binary file). Meaning you can't use a Go compiler to compile Rust source code. Compilation follows a multi-step process. Let's follow this process through an example on how a C source code file is compiled. On most GNU Linux systems, we use the GNU Compiler Collection, a collection of compilers and compilation tools for multliple languages, including C. We would run `gcc main.c -o main`, which turns our source code into an executable, but under the hood, obviously more work is done. Here is the compilation workflow:
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
Anyways the linker combines our `main.o` and our `stdio.o` into a single self contained executable. There are two ways to do this:
- **Static Linking:** Take the machine code of the required library functions and paste them into the binary. This is easy, and everything is self contained. As a result if you have a statically linked executable, you should be able to run it, regardless of whether or not you've installed its library files. This sounds cool, but it's kind of unmaintainable since every program/executable has its own copy of the required library functions. Think of all the system code that uses the `printf()` function. If everything was statically linked, each executable would have its own copy of that function. If `printf` was modified, those changes aren't reflected for existing executables using that function. As a result, we'd have to rebuild/recompile all our other executables to keep them up to date. 
- **Dynamic Linking:** The linker uses a dynamic shared library (`.so` or `.dll`). Now in the linking phase, instead of copy-pasting the function implementation into the final product, the linker inserts a reference to the library that contains the implementation (machine instructions) for that required function. Then at runtime, when the executable needs to use the library function, the OS loads the implementation of that library function in-memory. The main benefit of dynamic linking is that since every executable isn't holding its own copy of functions like `printf()`, we are a lot more space efficient.

## Optimizing with Assembly
The modular nature of the compilation pipeline allows for advanced techniques. While GCC hides these steps by default, you can use flags to stop the process at an intermediate stage, for instance, to inspect the generated assembly code. This is useful for performance optimization.

Furthermore, you can write parts of a program in assembly language and link them with code written in a higher-level language like C. This is a common practice for performance-critical sections of code. For example, you might write the main logic of a prime number calculation program in C, but write a highly optimized `is_prime` function directly in assembly to have full control over the generated machine instructions. Because sometimes you may not trust your compiler to generate optimized Assembly instructions, and so control is necessary. The workflow would look like this:
1. A C source file (`main.c`) and an assembly source file (`mylib.s`) are passed to the compiler.
2. GCC pre-processes, compiles, and assembles `main.c` into `main.o`.
3. GCC skips the initial steps for `mylib.s` and passes it directly to the assembler, creating `mylib.o`.
4. The linker combines `main.o` and `mylib.o` into a single executable.

Again, the main benefit here is that this lets us leverage the high-level abstractions of a language like C for most of the application while using the low-level control of assembly for critical performance gains. 

## The Linker as the Bridge: Mixing Languages
The modularity of the compiler toolchain, particularly the role of the linker, is what makes it possible to combine code from different languages into a single executable. The GNU Compiler Collection (GCC) is a prime example of this modular design. It's not just a C compiler; it's a suite of tools that support many languages, including C++, Fortran, and Go. It can swap in language-specific compilers and pre-processors while using a common assembler and linker. When mixing high-level languages like C and Fortran, the process is similar to mixing C and assembly. Each language's build system compiles its respective source code into object files. The key is that they all produce object files that a common linker can understand.

For instance, to use a Rust function in a C program:
1. The Rust code (`is_prime.rs`) is compiled into a static or dynamic library (e.g., `libisprime.a` or `libisprime.so`), which contains machine code.
2. The C code (`count_primes.c`) is compiled into an object file (`count_primes.o`).
3. The linker combines the C object file with the Rust library, creating a single executable.

## Linker Limits and the ABI
While the linker is the bridge between different languages, it has its limits. For two languages to be successfully linked, they must agree on a common set of low-level rules for how they interact. These rules are defined by the Application Binary Interface (ABI). The ABI dictates how code from different modules can call each other. This includes rules such as:
- Which CPU registers are used for function parameters and return values.
- How parameters are passed (e.g., on the stack or in registers).
- The organization of the call stack (stack frame layout).
- How data types are represented in memory.

If two languages have different ABIs, attempting to link them directly can lead to undefined behavior. For example, if a function in Language A expects parameters in registers R0 and R1, but a function in Language B passes them in R1 and R2, the resulting program will not work correctly. The processor would be operating on the wrong data, potentially leading to crashes or incorrect results.

In essence, the ABI ensures that the machine code generated by different compilers can "speak the same language" at a binary level, allowing the linker to successfully combine them into a single, coherent executable. This is why when mixing languages, you often need to use a standard like the C ABI, as it is a widely adopted interface that many languages can target.


## Credits
- [Why Some Projects Use Multiple Programming Languages - Core Dumped](https://www.youtube.com/watch?v=-UrdExQW0cs)