#include <stdio.h>

// struct: A collection of related variables that can be of different data types, that are all 
//         organized under a single contiguous block in memory. Very similar to classes in other languages, but 
//         but you don't have any fancy methods. C compiler allocates a single block of memory to hold all members of this 
//         'Player' instance. 12 bytes are given for the 'name', then immediately after 4 bytes is allocated for the score, then 
//         in a memory space after 'score', another 4 is allocated for the accuracy.
struct Player {
  char name[12];
  int score;
  float accuracy;
};

int main() {
  struct Player player1;
  struct Player player2;

  /**
   * Remember that in C, we can't directly assign strings to character arrays using the assignment operator like how 
   * we can do other primitives like integers or floats. That's because player1.name is a pointer to the first element 
   * in the character array. 
   * 
   * So the correct way is to do strcpy
   */
  strcpy(player1.name, "AwesomeDude");
  player1.score = 15;
  player1.accuracy = 0.78;

  strcpy(player2.name, "LameGirl");
  player2.score = 7;
  player2.accuracy = 0.34;

}