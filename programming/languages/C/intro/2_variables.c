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

 /**
  * Array = A 'list' of things. It's a data structure that can store many values of the same data type. Arrays have a 
  * fixed size, so the size of the array can't change whilst the program is running. There are a fixed amount of resources/memory allocated to that 
  * array for it to be able to store values.
  * 
  * In C, everything in our program has an address. When talking about variables, we mainly look at their values, but we can also talk about where 
  * they're stored in memory, their memory address. The variable for an array such as 'prices', is actually a pointer to the first element in that 
  * array. So 'prices' is essentially the memory address of 'prices[0]'. Then when we do something like 'prices[2]', it's the idea of saying "Go to memory
  * location of 'prices[0]' and move forward by 2 positions". 
  * 
  * Pointers in C: It's a little early, but a pointer is just a variable that holds the memory address of another variable. So basically it's value 
  * is the memory address of another variable. Using pointers allows us to directly manipulate memory, which is a very important when working at the lower
  * levels, such as embedded and whatnot. We'll fully learn this later. 
  * 
  * NOTE: You can print out the elements of an array through a loop, which you can find in the 'loops' section.
  */
  double prices[] = {5.4, 10.9, 15.8, 20.2, 25.5};
  printf("Third Item: $%.2lf", prices[2]);

  // Updating 
  prices[2] = 16.0;

  /**
   * 2D array = An array where each element is an entire array. This is pretty useful when you 
   * want to create something like a matrix, grid, or a table of data.
   * 
   * 2 rows, 3 columns. Then you'd use a nested loop to iterate through the array
   */
  int myMatrix[2][3] = {
    {1,2,3},
    {4,5,6},
  };
}