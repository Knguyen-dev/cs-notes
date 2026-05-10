#include <iostream>


// Template struct definition
template <typename T, typename U>
struct Pair {
  T first{};
  U second{};
};

struct Point {
  int first{};
  int second{};
};

// Type template parameter will match anything
// This only compiles if type that's used to instantiate this has first and second members
template <typename T>
void print(T p) {
  std::cout << '[' << p.first << ", " << p.second << ']\n'; 
}

int main() {
  Pair<double, int> p1{4.5, 6}; // Instantiates Pair<double, int>
  Point p2{7, 8};
  print(p1); // Instantiates print<Pair<double, int>>
  print(p2); // Instantiates print<Point>
}

