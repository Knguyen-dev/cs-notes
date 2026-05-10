#include <iomanip> // for std::setprecision()
#include <iostream>
int main() {
	// d1 should equal d2, but floating point numbers 
	// tend to be inexact, so comparing them is generally
	// problematic.
	std::cout << std::setprecision(17);
	double d1{0.5};
	std::cout << d1 << '\n';
	double d2{0.1 + 0.1 + 0.1 + 0.1 + 0.1};
}

