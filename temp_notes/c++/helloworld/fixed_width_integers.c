#include <cstdint> // for fixed-width integers
#include <iostream> 

int main() {
	std::int8_t x {65};

	// Actually prints out the ASCII character associated with 65 
	// since we're using a int8_t
	std::cout << x << '\n';
}
