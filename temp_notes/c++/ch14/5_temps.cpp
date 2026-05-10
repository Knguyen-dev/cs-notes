#include <iostream>


void printString(const std::string& s) {
  std::cout << s << '\n';
}

int main() {
  std::string_view sv{"Hello"};
  
  // printString(sv); // Compiler error: std::string_view doesn't implicitly convert to std::string
  // Case 1: static_cast returns a temporary std::string direct-initialized.
  printString(static_cast<std::string>(sv)); 
  
  // Case 2: Explicitly creates a temporary std::string list-initialized.
  printString(std::string{sv});

  // Case 3: C-style cast returns a temporary std::string direct-initialized
  // NOTE: Avoid using this.
  printString(std::string(sv));
}

