#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int generateRandomInteger(int min, int max) {
  if (min > max) {
    return -1;
  }
  return rand() % (max - min + 1) + min;
}

int main() {
  /**
   * In C, we mainly generate pseudo random numbers, and that's true for most random number generation
   * with computers. In the end we're still using an algorithm that's based in complex mathematics to generate these numbers, 
   * but still it's an algorithm and not truly random. For something actually random in terms of good cryptography and security, we'd use 
   * external sources of information that measures a truly random phenomenon. Things such as random user mouse input,  'atmospheric' noise, etc.
   * 
   * In C it uses the internal hardware's clock as a 'seed' or argument to these random number algorithms. 
   */

  
  srand(time(0)); // Use the current time to generate the random number
 

}