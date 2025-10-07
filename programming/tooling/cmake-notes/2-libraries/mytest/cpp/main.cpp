// Path to the SomeLibDemo adder.h
// #include "../../SomeLibDemo/cpp/adder.h"

#include "adder.h"
#include <iostream>
int main() {
  std::cout << "2+3=" << nearlymath::add(2,3) << std::endl;
  return 0;
}
