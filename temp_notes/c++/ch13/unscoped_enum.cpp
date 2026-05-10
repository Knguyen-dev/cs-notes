
#include <iostream>

enum Color: int { // we've specified the base
  black,   // 0
  red,     // 1
  blue,    // 2
  green,   // 3
};

int main() {
    // Brace initialization allowed since the base for the enum has 
    // been explicitly specified as int, so we'll give it an int (C++17)
    Color shirt{ 1 };
    return 0;
}


