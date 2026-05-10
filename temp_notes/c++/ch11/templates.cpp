// In add.h
#ifndef ADD_H
#define ADD_H
template <typename T>
T addOne(T x) {
  return x + 1;
}
#endif

// In main.cpp
#include "add.h"
#include <iostream>
int main() {
  std::cout << addOne(1) << '\n';
  std::cout << addOne(2.3) << '\n';
}
