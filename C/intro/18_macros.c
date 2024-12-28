#include <stdio.h>
#define PI 3.141592
#define circleArea(r) (PI * r * r)

/*
## Preprocessors and Macros
- Pre-processors execute commands before the program is compiled.
  1. `#include`: Includes/imports header files.
  2. `#define`: Defines constants or macros
- Macros: Code snippets replaced by their definiton during preprocessing


### Why use macros?
When you call a function in C, this is what happens:
  1. Stack frame creation: A stack frame stores local variables, parameters, and the return address of
    where the function goes after returning.
  2. Jumping: Jump to the memory address where function instructions are stored. Getting ready to run function.
  3. Execution: When the function call is executed and done, we remove the stack frame from the callback and move
    to the return address.

This process can take time (little time, but still time). For simple calculations (e.g. calculating the square of a number),
this overhead can be considered significant compared to the actual work the function is doing. By inline functions and macros,
we can avoid this. When you use a macro or use an inline function, the compiler replaces the function call with the actual
code during implementation. What this means is that you eliminate the need to create a stack frame and jump to different
locations in memory.

Inline functions are preferred due to type safety and readability. However modern compilers often optimize code automatically,
so you'll see marking a function as 'inline' is less common.
*/

double regularCircleArea(double r) {
  return PI * r * r;
}

inline double inlineCircleArea(double r) {
  return PI * r * r;
}


int main() {
  double radius = 12.4;
  double area = circleArea(radius);
}