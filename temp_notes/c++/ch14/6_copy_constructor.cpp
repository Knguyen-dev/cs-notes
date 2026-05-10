#include <iostream>


class Fraction {
private:
  int m_numerator{0};
  int m_denominator{1};

public:
  Fraction(int numerator=0, int denominator=1)
    : m_numerator{numerator}, m_denominator{denominator} 
  {}

  // Delete the copy constructor so no copies can be made
  Fraction(const Fraction& f) = delete;
};

int main() {
  Fraction f{5,3};
  Fraction fCopy{f}; // Compiler Error: Copy constructor has been deleted
}


