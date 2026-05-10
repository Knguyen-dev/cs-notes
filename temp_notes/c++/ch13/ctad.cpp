#include <iostream>
#include <string>

int main() {
  std::string str{"The rice is cooking"};
  str.erase(4, 11);
  std::cout << str << '\n';
}

