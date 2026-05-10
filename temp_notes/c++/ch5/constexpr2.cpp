#include <iostream>
// Return value of a non-constexpr function is not constexpr
int five() {
  return 5;
}

void identify() {

  // 'q' is constant since it's a literal
  // a is non-constant since it's defined as non-const
  char a{'q'};

  // 0 is const and b is a constant expression initializer. Since it's 
  // a constant integral type with a constant expression initializer.
  const int b{0};

  // 5.0 is a const expression since it's a literal, but c is 
  // a non-const because it's a non-integral type.
  // As per definition: Only const integral variables with constant
  // expression initializer are compiler-time constants.
  const double c{5.0};

  // e is a non-constant expression because it's not defined as const 
  // AND because it has a non-constant initializer. The latter happens
  // because c is a non-constant expression so c+1.0 is also non-constant.
  int e{c+1.0};


  // Constant expression initializer since both d and 2 are 
  // constant expressions.
  // f is also a constant-expression since it has a 
  // const integral type, so it's a compile-time constant.
  const int d {0};
  const int f {d * 2};

}

int main() {
	constexpr double gravity{9.8}; // ok: 9.8 is a constant
	constexpr int sum{4+5}; 	     // ok: 4+5 is a constant
	constexpr int something{sum};  // ok: sum is a constant
  std::cout << "Enter your age: ";
	int age{};
	std::cin >> age;
  constexpr int myAge {age};  // compiler error: age is not a constant
  constexpr int f {five()};   // compiler error: return value is non-constexpr  
  constexpr double d{1.2};    // Even works for non-integral types!

  // Both of these are constant expressions
  // due to them having constant initializers.
  // a. Must be evaluated at compile time, note the keyword
  // b. May be evaluated at compile or runtime
  const int x{3+4};
  int y{3+4};
}
