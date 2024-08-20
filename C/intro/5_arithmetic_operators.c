#include <stdio.h>


int main() {

  /**
   * Arithmetic Operators 
   * +: addition 
   * -: subtraction
   * *: multiplication
   * /: division
   * %: modulus gives you the remainder
   * ++: increment
   * --: decrement
   * 
   * Augmented assignment operators:
   * 
   * x = x + 3; Adds x to x 
   * x += 3; Add 3 to x 
   * 
   * 
   */
  int x = 5;
  int y = 2;

  // Since we're using a 'int', we're truncating that decimal portion.
  int badZ = x / y;

  /**
   * - Here's how we can preserve the decimal value and get 2.5:
   * 1. Change goodZ into a float so we can store the end result as a float.
   * 2. If we're dividing by integers, it will truncate the result to an integer.
   * One solution is to have the divisor 'y' as a float or double. Or precede the divisor
   * with float or double whilst in the expression. We'll show the latter:
   */
  float goodZ = x / (float) y;



  goodZ--;
  goodZ+=3;

  // Should be 4.5
  printf("%.2f", goodZ);

}