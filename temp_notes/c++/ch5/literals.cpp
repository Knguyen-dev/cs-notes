#include <iostream>
void ex1() {
	std::cout << 5.0 << '\n';  // 5.0 (no suffix) is type double
	std::cout << 5.0f << '\n'; // 5.0f is type float
	float f{4.1};  // Warning: 4.1 is a double literal, not a float literal
	double d{4.1}; // Solution: Use a double type
	return 0;
}

void ex2() {
	// Two ways to write floating point literals:
	// 1. Standard Approach
	double pi{3.14159};
	double d{-1.23};
	double why{0.}; // avoid this, hard to see that it's 0.0
	
	// 2. Use scientific notation
	double avogadro{6.02e23};
	double protonCharge{1.6e-19};
}


