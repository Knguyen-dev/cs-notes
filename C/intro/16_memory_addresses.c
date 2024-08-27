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
}