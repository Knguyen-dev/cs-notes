
#include <iostream>


void ex1() {
  int x { 3 + 4 };
  std::cout << x << '\n';

	// After constant folding: 
  // no need to always re-calculate 3+4
  int x{7};
	std::cout << 7 << '\n';
}

void ex2() {
	int x{7};
	std::cout << x << '\n';
	
	// After constant propagation
	int x{7};
	std::cout << 7 << '\n';
}

void ex3() {
	int x{7};
	std::cout << 7 << '\n';

  // After dead code elimination:
	std::cout << 7 << '\n';
}

void ex4() {
  // Since x is a constant expression, expr 
  // must be evaluatable at compile-time.
  constexpr int x { expr };
}


