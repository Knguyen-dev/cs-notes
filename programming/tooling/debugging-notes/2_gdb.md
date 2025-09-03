# GDB Debugger Notes

GDB is the gnu debugger.

## Setting up GDB
```bash
sudo apt-get install gdb
```
Though it's often included with MinGW-w64 or MSYS2.


```bash
# Compiling our program with debug enabled
gcc -g my_program.c -o my_program 

# Then run your program with the gdb debugger
gdb ./my_program

# Changes the GDB editor layout
# One of the layouts allows you to see the C code
# and the ASM code side by side. Obviously a single 
# line of C can represent multiple lines of Assembly
# so you'll see a difference there.
layout next
```

## Workflow

1. Compile Program Using Debug Info: `gcc -g my_program.c -o my_program`
2. Do `gdb <path_to_executable>`
3. Set Breakpoints: Use `break <line_number>` or `break <function_name>` to set breakpoints where the program will pause.
4. Run the program with `run`; this runs your program until it hits a breakpoint. You can add command line args here.
5. Step through code:
  a. `next` (next): Execute the current line nad move to the next one. This steps over function calls. You can also do `next i` to move to the next ASM instruction.
  b. `step` (step): Executes the current line and move to the next, stepping into function calls.
  c. `print <variable_name>` to print the value of a variable.
  d. `continue` to continue execution until the next breakpoint.
  e. `ptype <variable_name>` to print the datatype of a variable name.
  f. Do `finish` if you're in a finish and just want to finish it to see the return value and keep going forward.

You can view registers and other memory as well.
```bash
info registers
x/10x &my_array
```

## Credits
- [GDB is easy - Low Level](https://www.youtube.com/watch?v=Dq8l1_-QgAc)
- [Debugging C code with GDB- Medium](https://medium.com/havingfun/debugging-c-code-with-gdb-90adb2f3da96)