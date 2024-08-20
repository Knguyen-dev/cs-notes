#include <stdio.h>
#include <stdbool.h>

int main() {


  char a = 'C';                 // single character       %c
  char b[] = "Letters";         // array of characters    %s
  
  /*
  - For a float, this means that about 6 or 7 digits after the decimal place, 
    we would start losing some quality in how precisely we can store the decimal.
    However with a double, we're able to use more bytes to represent more precise numbers.
    So the idea is while we get more precision, we use a little bit extra memory for it, which
    is fine typically.
  */
  float c = 3.141592;           // 4 bytes (6-7 digits)   %f
  double d = 3.141592653589793; // 8 bytes (15-16 digits) %lf
  bool e = true;                // 1 byte (true of false) %d, this outputs as 1 or 0 for true or false.

  /*
  - 1 byte: With chars you can store an integer (-128 or +127) range 
  and it can be formatted as %d or %c. If you print this out as a character, then the 
  numerical value will correlate to the appropriate character in the ascii table. In this 
  case the letter 'd'.
   */
  char f = 100;

  /*
  - 'unsigned' removes the ability to store negative numbers for a variable, however we now get double
  the memory in terms of storing positive numbers. Still 1 byte, but now the range is 0 to 255.    
  
  - NOTE: By default our variables are signed, so we don't need to include the 'signed' keyword in front of them. 
  If you go over the allowed limit, it's considered an overflow, and it will reset your variable's value to the lowest 
  possible value. For example if I go to '256', then it will set the value of g to 0.  For 'h' if I go 
  over +32767, then it'll set me back to -32,768.
  */
  unsigned char g = 255;

  /*
  - short int: 2 bytes of memory (-32,768, +32,767) %d
  - unsigned short int: 2 bytes of memory (0, +65,535) %d
  */
  short int h = 32767;
  unsigned short int i = 65535;

  int j = 2147483647; // 4 bytes (-2,147,483,648, +2147483647), so -2 to +2 billion %d
  unsigned int k = 1; // 4 bytes (0, +4 billion) %u

  /*
  - The reason we have to do 'long' twice is that by default 'int' are already implicitly long. So if we want to store a really
  large number we declare it like this. The former is -9 to +9 quintillion whilst the latter is 0 to +18 quintillion.
  The format specifier here is %lld and %llu respectively and these take 8 bytes.
  
  - NOTE: You likely won't be using most of these data types, but it's just good to be 
  at least aware of the other data types. 
  */
  long long int l = 1;
  unsigned long long int m = 2; 








  




  return 0;
}