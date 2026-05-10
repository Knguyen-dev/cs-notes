#include <iostream>

void print(int x, int y); // forward declaration

int main() {
  print(3); // Compiler Error: Default argument for y isn't defined yet!
}

void print(int x, int y=4) {
  std::cout << x+y << '\n';
}


