#include <iostream>

int main() {
  enum class Color {
    red,
    blue
  };
  enum class Fruit {
    banana,
    apple
  };

  // NOTE: enumerators aren't directly accessible now that 
  // we're using scoped enums, use scope resolution!
  Color color{Color::red};
  Fruit fruit{Fruit::banana};

  // Compiler Error: The compiler doesn't know how to compare different 
  // types Color and Fruit!
  if (color == fruit) {
    std::cout << "Color and fruit are the same!" << std::endl;
  } 
}

