
#include <iostream>

// Initializing chars
void ex1() {
	char ch1{'a'}; // stored as integer 97, preferred
	char ch2{97};  // Initialize with integer 97, not preferred
}

// Getting input
void ex2() {

  // Assume they inputted "abcd" without quotes
  char ch{};
  std::cout << "Input a character: ";
  std::cin >> ch; // ch = a, queue=bcd
  std::cin >> ch; // ch =b, queue=cd
}

// Extracting whitespace from the stream
// This doesn't work becasue cin skips whitespace. 
// A better approach is to use std::cin.get
void ex3() {
  char ch{};
  // Assume user inpust "a b" without quotes

  // BAD APPROACH:
  // std::cin >> ch; // ch = a, leaves " b\n" in stream/queue 
  // std::cin >> ch; // skips leading whitespace, ch = b
  std::cin.get(ch); // ch = a, stream = " b\n"
  std::cin.get(ch); // ch = ' ', stream = "b\n"
}

