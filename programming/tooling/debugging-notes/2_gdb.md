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
layout next
```



## Workflow

- Compile Program Using Debug Info: `gcc -g my_program.c -o my_program` Do `gdb <path_to_executable>`
- Set Breakpoints: Use `break <line_number>` or `break <function_name>` to set breakpoints where the program will pause.
- Run the program with `run`; this runs your program until it hits a breakpoint. You can add command-line args here.
- Step through code:
  - `next` (next): Execute the current line and move to the next one. This will step over function calls. You can also do `next i` to move to the next ASM instruction.
  - `step` (step): Executes the current line and moves to the next, stepping into function calls.
  - `print <variable_name>` to print the value of a variable.
  - `continue` to continue execution until the next breakpoint.
  - `ptype <variable_name>` to print the datatype of a variable name.
  - Do `finish` if you're in a finish and want to finish it to see the return value, and keep going forward.

You can view registers and other memory also.
```bash
info registers
x/10x &my_array
```

## Pitfalls 
```
Warning:
Cannot insert breakpoint 1.
Cannot access memory at address 0x140001876
```
This is a common issue when debugging Windows executables (`.exe` files) in a Linux environment (like WSL). The problem above happens because we're trying to use GDB (a Linux debugger) on a Windows PE executable. There are two ways to fix this:
1. **Use Native Windows Debugging:** 
```bash
# Open windows terminal
gcc -g -o float.exe float.c  # Compile with debug symbols
gdb float.exe                # Use Windows GDB if available
```
2. **Compile for Linux in WSL:**
```bash
# Remove the Windows executable first. Here we're working with "float.exe"
rm float.exe

# Compile for Linux (no .exe extension)
gcc -g -o float float.c

# Now debug with GDB
gdb ./float
```

## Explaining `.gdbinit`
A configuration file that GDB automatically runs every time it starts. There are some benefits:
- **Automation:** We can always tell gdb to set certain breakpoints or environment variables.
- **Pretty Printing:** It can make complex C `structs` readable instead of just showing their hex addresses.

```bash
# Don't prompt for confirmation on quit
set confirm off

# Print arrays nad structs in a pretty/readable format
set print pretty on

# Show the local variables automatically when the program stops
set print address on

# custom command to start the server with specific args
# 1. Indicate the path of the executable
# 2. Indicate clargs after 'run'
define start_server
	file bin/server
	run 8080
echo \n--- .gdbinit loaded ---\n
```


## Credits
- [GDB is easy - Low Level](https://www.youtube.com/watch?v=Dq8l1_-QgAc)
- [Debugging C code with GDB- Medium](https://medium.com/havingfun/debugging-c-code-with-gdb-90adb2f3da96)
