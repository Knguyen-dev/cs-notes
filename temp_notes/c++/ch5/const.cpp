

void ex1() {
	// Preferred use of 'const' before data type
	const double gravity{9.8};

	// 'east const' style, not preferred
	int const sidesInSquare{4};
}


// Const variables can be initialized from other variables
void ex2() {
        std::cout << "Enter your age: ";
        int age{};
        std::cin >> age;
        const int constAge{age};
}
