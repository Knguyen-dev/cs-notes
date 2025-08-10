# C Programming

## What is C?
An old language that came from the 1970s. C is considered a mid-level language, so things aren't as abstracted as Python, but you aren't working too to machine architecture. It's fast, and uses less memory, however it's going to be harder to read and it's going to take a lot more code to do things that would take Python a couple of lines or two. C is the common ancestor for nearly every widely used programming language, and you can find it anywhere. You can find C in DBMS implementations like MySQL, operating systems like Windows, Linux, and embedded systems such coffee machines, cars, and planes.

However let's highlight some things:
1. C is not object oriented, but rather procedural. Meaning you don't have to put all of your code in functions like Java.
2. C is the parent of C++, so C++ is just C with more functionality. 

## How to setup C 
- GNU Compiler Collection (GCC): This compiles/converts C code into machine code that can be executed and ran. Instructions are [here](https://www.freecodecamp.org/news/how-to-install-c-and-cpp-compiler-on-windows/).
- VSCode: You can have this as your IDE. Download the C/C++ extension to get language support. Do `Configure Default Build Task` and select the GCC one. This just tells VScode how to compile your C code. Also for `Code-runner`, enable `Run in Terminal` to have an interactive terminal for user input.

## How to compile a C file

### Compiled vs. Interpreted Languages
In programming, there are two main ways that code can be executed: compiled and interpreted.
- Compiled Languages: In a compiled language like C, the source code you write is translated into machine code by a compiler. Machine code is a low-level language that the computer's processor can execute directly. This process happens all at once, typically before the program is run. The result of compilation is an executable file (like a .exe file on Windows). Once compiled, you can run the executable file on your computer without needing the source code or the compiler again.
  - Example: When you write a C program, you save it with a .c extension. You then use a compiler (like gcc or clang) to compile this .c file into an executable file. This executable file can be run directly to execute the program. The entire code is compiled at once, and if there are any errors in the code, they are caught during the compilation process.
- Interpreted Languages: In an interpreted language like Python or JavaScript, the source code is executed line by line by an interpreter at runtime. Instead of being compiled into machine code ahead of time, the interpreter reads and executes the code directly. This means you can run the code immediately, but the interpreter must be present to execute the program each time. Interpreted languages are often easier to test and debug since you can run code interactively and see results right away.
  - Example: When you write a Python program, you don’t need to compile it. Instead, you run the Python interpreter, which reads your .py file and executes the code line by line.

### Compiling a C file
Use gcc command on the `.c` file you want to compile. This should generate a `1_HelloWorld.exe` file
```
<!-- gcc <fileName.c> -o <desired_file_name_for_executable> -->
gcc 1_HelloWorld.c -o 1_HelloWorld
```
Run the `.exe` file in order to run that version of your code. If you make new changes to your code, you have to recompile the file to get an updated `.exe` file.
```
1_HelloWorld.exe
```


# Credit:
1. [C Programming Full Course - Bro Code](https://www.youtube.com/watch?v=87SH2Cn0s9A)
2. [Crash Course Computer Science (not as big)](https://youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo&si=d78l_u2jV01AH8gl)
3. [Computer Architecture Course (not as big)](https://www.coursera.org/learn/build-a-computer?action=enroll)
4. [Embedded Systems Course - A good starting point](https://drive.google.com/drive/folders/1hpNNOa2Qsp4WMRFIsKQH3kzQ7kDCqe3G)
5. [Embedded Systems shape the world - Also a good starting point if you can't understand the guy. It also has projects and whatnot](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/)
6. [Real-Time Bluetooth Networks - Shape the World](https://www.edx.org/course/real-time-bluetooth-networks-shape-the-world)


### Memory management in C
1. https://youtu.be/_8-ht2AKyH4?si=qsZaj_AycgEeNRIL
2. https://youtu.be/2ybLD6_2gKM?si=FflqMG2dj5v9wRJZ
3. https://youtu.be/1KVpi0VN82E?si=YhhSvs9okQy8TWaO
4. https://youtu.be/udfbq4M2Kfc?si=06NULX7R80OIwb32