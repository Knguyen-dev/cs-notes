
// In pair.h
#ifndef PAIR_H
#define PAIR_H
template <typename T>
struct Pair {
  T first{};
  T second{};
};

template <typename T>
constexpr T max(Pair<T> p) {
  return (p.first < pair.second ? pair.second : pair.first);
}
#endif

// In foo.cpp
#include "pair.h"
#include <iostream>
void foo() {
  Pair<int> p1{1,2};
  std::cout << max(p1) << 'is larger!\n';
}

// In main.cpp
#include "pair.h"
#include <iostream>
int main() {
  Pair<double> p2{3.4, 5.6};
  foo();
  return 0;
}
