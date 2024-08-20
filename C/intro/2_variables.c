#include <stdio.h>

int main() {




  int x; // Declaration 
  x = 123; // Initialization
  int y = 321; // Initialization and declaration
  int age = 21;
  float gpa = 2.05; // Stores a floating point number
  char grade = 'C'; // Stores a single character

  /**
   * Defines a constant. So 'PI' is now a fixed value that can't be changed by the program
   * during its execution!
   */
  const float PI = 3.14159;

  /*
   C is not an object oriented language and strings are objects. To represent
   a string in C, it's an array of characters instead.  
   */
  char name[] = "Mr. Mister";

  /*
  - Here's how you can easily print out variable values with your strings.
  Just put the percent sign and an indicator on what type you're printing out.

  See how the string is printed with '%s', '%d' can be used for decimals or integers, 
  and how '%c' is used for characters. You can find the documentation for all the symbols here: https://cplusplus.com/reference/cstdio/printf/
  */

 printf("Hello %s\n", name);
 printf("You are %d years old and you got a '%c' in Math", age, grade);
 printf("A month ago you had a %f gpa in Math. This is improvement!", gpa);
}