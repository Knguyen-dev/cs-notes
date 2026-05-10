#include <iostream>
#include <string>
#include <string_view>
int main() {
  std::string_view sv{"Peach"};
  std::cout << sv << '\n';

  // remove 1 char from the left side of the view
  sv.remove_prefix(1); 
  std::cout << sv << '\n'; // each

  // remove 2 chars from the right side of the view
  sv.remove_suffix(2); // ea

  // make the view point at a new string literal; 
  sv = "Peach"; 
  std::cout << sv << '\n'; // Peach
}

