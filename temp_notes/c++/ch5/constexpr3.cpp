#include <iostream>

int max(int x, int y) {
  return (x > y) ? x : y;
}

constexpr int cmax(int x, int y) {
  return (x > y) ? x : y;
}

int main() {
  int m1{max(5,6)};           // good
  const int m2{max(5,6)};     // good
  constexpr int m3{max(5,6)}; // compiler error: max(5,6) isn't a constant expression

  int m4{cmax(5,6)}; // may evaluate at compile time

}