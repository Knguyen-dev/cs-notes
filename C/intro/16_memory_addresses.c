/*
## Memory Intro
A sequential array of bytes, or blocks. Each block, has a name, called a memory address that
we can use to identify the 'location'. More specifically, they're used to identify the memory 'register' associated with that address.
These registers are just computer components that store binary data (0s and 1s, literally electrical signals). For example, a block with an
8-bit (typically in hexadecimal) memory address is associated with an 8-bit register, and this makes up 1 byte of RAM, or
we'll call it read-write memory. We can write/store values, within a register at a given memory address (block name), and as long
as our program is still running, we can 'reference' or use that exact memory address again to access the last stored value.

Let's say we're on a 64-bit machine, meaning that the data bus can transfer 64 bits (8 bytes) of data at once.
The registers are 64-bits wide, meaning each register can hold up to 8 bytes. Now let's look at how variables work:

### char a = 'X'
A character is given 1 byte of data. So the letter x is represented using 8 bits, which is written to a ram register. The other 56 bits
associated with the register may be padded with zeros.

### int b = 10
4 bytes are used for integers, so these 4 bytes are used to represent the value '10'. The remaining 32 bits are going to be zero bits and just
padding when sent by the data bus to the 64 bit register.

### double c = 23.14
Doubles are 8 bytes, so 64 bits are used to represent '23.14'. All bits are used so you won't have any padding.

## Memory Segments and Memory in C



1. When a C program is executed, some memory is allocated in RAM. This type of memory is used for storing frequently executed code,
program variables, etc.
2. There are 3 types of variables:
  - Local (automatic) variables: Local to a given function and disappear after function finishes.
  - Global variables: Declared outside any function, and can be used within any function.
  - Static variables: Defined in functions, but have their values preserved even after function scope. They're in memory until program terminates.
3. Now there are 5 memory 'segments' in C. What I mean by this is that the memory representation in a C program consists of
five different sections:
  1. Text/Code segment
  2. Initialized data segment
  3. Uninitialized data segment
  4. Heap
  5. Stack

### Text/Code Segment
- It stores executable instructions (frequently executed code).
- Often read only to prevent a program's instructions from being overwritten by bugs.
- Doesn't contain variables.
- However can contain read-only string literals. Like when you do printf("Hello World"), the string "Hello World" is created in this segment.

### Initialized Data Segment
The data segment either lies below the heap area or above the stack, depending on implementation. But never
in-between. There are two parts: uninitialized data segment and initialized data segment.

#### Uninitialized data segment
- Also known as 'bss'. It contains
1. uninitialized global variables (including pointers).
2. uninitialized constant global variables.
3. uninitialized local static variables.
- Even if you initialize them with 0 or NULL, it'll still be stored in this segment.

#### Initialized data segment
- Stores:
1. Initialized global variables
2. Initialized constant global variables
3. Initialized local static variables
- You can further classify two more subsections "initialized read-only" and "initialized read-write" areas. Okay so
  your constants will be stored in the former, whilst variables that can be modified during runtime will go to the latter area!
- The size of the segment is determined by the size of the values in the program's source code. This doesn't change at runtime.

#### Stack segment
- Stores variables that are created inside functions.
  1. local variables
  2. Arguments passed to functions.
  3. Return address. Since we have a function stack, they need to keep track where a function call will return to.
- Variables stored in the stack will be removed as soon as the function finishes execution.


#### Heap segment
- Any dynamically allocated memory will be stored here.
```C

// 8 bytes of memory are allocated to the heap.
int* data = malloc(sizeof(int) * 2);

// However the 'data' variable is either on stack or data segment depending on its declaration or
// how it's used.
```

### Review on where variables are stored
1. global variables: data
2. static variables: data
3. constants: code and/or data.
4. local variables: stack
5. pointers: data or stack depending on context. If it's a global or static pointer then it's in data.
6. dynamically allocated space: heap
*/

#include <stdio.h>
int main() {
  /**
   * - Memory: An array of bytes within RAM. It's just how computers store data (city or country).
   * - Memory block: A single unit (typically a byte) within memory, that's used to hold some value (a person living in the city).
   * - Memory address: The address or location of where that block in memory is located (a house address). A memory address is typically
   * an 8-bit value, that's in hexadecimal notation. This can then be converted in binary, and this binary value can then be used by the
   * computer to find the exact location where a value is stored.
   */


   /**
    * When we run our program, our program will use need to use memory in order to 'remember' and store the values of these variables so
    * that they can be used later. Apparently each variable will get a block of memory that's appropriate for its size.
    *
    * char is the smallest which means it gets 1 byte of memory, but a double would get 8 bytes. It should be noted that things are 'contiguous' meaning
    * these variables are assigned memory addresses that are next to each other.
    */
  char a = 'X';
  int b = 10;
  double c = 23.14;


  /**
   * To display the memory address of a variable, rather than the typical value, then
   * use the '&' (address-of) operator. This will print out the memory address in hexadecimal notation.
   */
  printf("%p\n", &a);
  printf("%p\n", &b);
  printf("%p\n", &c);


  /*
  + Signed and Unsigned integers:
  So you may have seen data types like 'uint8_t'. This is an unsigned 8-bit integer type
  which is part of the C standard library. You're using this when you need a fixed-with integer that's
  1 byte wide. What I mean is 'uint8_t' will use all 8 bits for the integer (0 255).

  There's also int8_t, which is for an 8-bit signed integer [-128, 127], where it uses 1 bit for the sign whilst
  the rest are used for the value. You can find them all in this link: https://www.gnu.org/software/libc/manual/html_node/Integers.html

  For a 32-bit machine and a 64-bit machine, they can have different default sizes for standard types for int, long, and short. If you're
  working with low-level code, it's a good idea to specify the size of something regardless of what platform it's being used on.
  In a constrained environment this memory optimization is necessary.

  In embedded, data often needs to be in a specific size or format, so fixed-width types help make that happen. Like a register on another machine
  may expect exactly 16 bits of data, so using uint16_t would be a good idea.
  */
}