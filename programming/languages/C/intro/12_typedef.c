#include <stdio.h>


typedef struct {
  char name[25];
  char password[12];
  int id;
} User; // 

int main() {
  // typedef: A reserved keyword that gives an existing datatype a 'nickname'.
  // Notice we don't need to indicate 'struct'
  User user1 = {"knguyen44", "password123", 123};

}