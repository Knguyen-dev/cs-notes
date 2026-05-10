
#include <iostream>
int getNumber() {
	std::cout << "Enter a number: ";
	int y{};
	std::cin >> y; // Runtime expression
	return y;      // Runtime expression
}

// Return valule of a non-constexpr function
// is a runtime expression, even if the return 
// expression is a constant expression
int five() {
	return 5;
}



int main() {
	5;                      // Constant
	"hello world";          // Constant
  getNumber();            // runtime expression
	five();                 // runtime expression
  std::cout << 5 << '\n'; // std::cout is runtime


  // not a constant variable.
  int a{5};

  // not a constant expression, since initializer is non-const
  const int b{a}; 

  // Constant expression since initializer is constant
  const int c{5}; 

  // Not obvious whether d or e are constant expressions.
  const int d {someVar};
  const int e {getValue()};
}


