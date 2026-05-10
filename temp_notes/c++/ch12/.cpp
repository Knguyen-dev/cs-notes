#include <iostream>

void printByReference(const std::string& ref) {
  std::cout << ref << '\n';
}

void printByAddress(const std::string* ptr) {
  std::cout << *ptr << '\n';
}

int main() {
  std::string s{"Hello world!"};
  printByReference(s); // pass by reference, no copy created
  printByAddress(&s);  // pass by address, no copy created
  return 0;
}

