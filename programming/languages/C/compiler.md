## How compiler works

### The Overview
You write your code in a language like C. This is called your **source code**, it's the code in the programming language that you can read. Then the compiler magically converts this source code into **machine code**, which is binary code and machine readable. This machine code is stored in an 'executable' file, meaning you can just directly 
run the file and your computer should be able to run the program that you wrote. In some cases, people worked in an IDE and this entire process was hidden from them, or maybe they programmed in a language that doesn't use a compiler e.g. Python. But let's look a little closer at what's happening

The CPU can read and write to memory, and do math with the numbers they work with. The executable is binary, a list of instructions. It can tell the computer to read bytes from memory or modify bytes at this specific memory address. Which just mean, hey give me the value of the variable here and update the variable there. Of course, these instructions go the CPU, and the 0s and 1s allow the CPU to know things such as:
  1. Address bytes: What memory location is being accessed for the operation.
  2. Reading or writing: Accessing registers requires 2 bits which tell the CPU whether it's reading from a register.
  3. Data sending wires: These wires send bits to the corresponding register locations. They are also here to receive bits from those memory location.
You could probably get more technical, but I think this is technical enough whilst focusing on what's happening at the lower level. 

### Step by step
```C
int main() {
  int x;
  x = 3;
  if (x < 10) {
    x = x+1;
  }
}
```
1. Lexical analysis: Text is divided into tokens. Like 'int', 'main', 'x', etc.
2. Semantic analysis: Tokens go into a 'parse tree', which essentially categories each token to figure out the grammar/structure of the program. It is also here to record 'context' about the program. This is stuff like variable or function names. 
3. Intermediate steps: intermediate code, optimization, assembly code, object code, linking, etc.
4. Then it traverses the tree in order to find machine code that does the same thing as the source code.
Now arithmetic and assignment works pretty well, as there are direct machine code equivalents that the compiler can use. But this isn't true for control structures like conditions, iterations, or functions. 
  - If conditions: We'd have an instruction to evaluate the condition, and we'd have an instruction to jump over/skip the if-statement logic as long as the instruction evaluated false. So if condition is true, the jump is ignored. Note that a flag is used to store the result of the evaluation.
  - While loop: Similar logic to if statement.
  - Functions: When you call the function, we first save all local scope variables into memory. Since functions can call each other, when functions call each other, we simply just allocate more memory, RAM for each function call. When a given function call returns, the local memory that the computer held for that function call is freed. 

### Portability 
Unfortunately, compiling your program on one computer and running the executable on another might not work. Computers with different OS or processors likely use different machine instructions. So if you're making software from a compiled language like C, and you want it to be run on multiple platform, you'd have to have multiple different executables. This is the reason why something like VLC media player has multiple downloads.




## Credits
1. [Preprocessor and Macros - Programiz](https://www.youtube.com/watch?v=cmGq62c1Ceg)
2. [How do computers read code - Frame of Essence](https://www.youtube.com/watch?v=QXjU9qTsYCc&t=85s)
3. [Comparing C to machine language - BenEater](https://www.youtube.com/watch?v=yOyaJXpAYZQ&t=241s)
4. [How transistors run code](https://youtu.be/HjneAhCy2N4?si=aRtgEvco1pttlG61)
