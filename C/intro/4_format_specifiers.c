#include <stdio.h>

int main() {

  float item1 = 5.75;
  float item2 = 10.00;    
  float item3 = 100.999;

  /*
  - Format specifier %: Just defines and formats a type of data to be displayed

  1. '.2' only 2 places after the decimal are shown.
  2. '8': We set the 'field width'. Basically this is just the number of spaces we'll
  use to display the number.
  3. '-': Makes our text things left justified.
  4. 'f': We're printing out a float.
  
  */
  printf("Item 1: $%-8.2f\n", item1);  
  printf("Item 1: $%-8.2f\n", item2);
  printf("Item 1: $%-8.2f\n", item3);

}