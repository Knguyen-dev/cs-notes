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

/**
 * A union is a user-defined data type that can contain elements of different data types like a structure.
 * But unlike a structure, all members in the C union are stored in teh same memory location. As a result, only one member can store data at a given point 
 * in time. The value of a union can be accessed using the dot operator, and a value can be associated using the assignment operator.
 * 
 * The size of a union will always be equal to the size of the largest member in the union. All the less-sized elements 
 * can be stored in the same place without overflow, 
 */
union Student {
  int rollNo;
  float height;
  char firstLetter;
};

// the size of this union is 4 bytes, which is the size of an integer
// Note: char is 1 byte, so when we store a char value, we only need to take 1 byte out of the 4.
// This leaves 3 remaining bytes. Of course if we're storing an integer, we need all 4 bytes.
union A {
  int x;
  char y;
};

// The size of this union is 40, since the array allocates 40 byte  
union B {
  int arr[10];
  char y;
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

  union Student student_data;
  student_data.rollNo = 21;

}