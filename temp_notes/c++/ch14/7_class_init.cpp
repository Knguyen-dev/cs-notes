#include <iostream>

class Something {
  int m_x{};
public:
  
  Something() = default;

  Something(const Something& x) : m_x{x.m_x} {
    std::cout << "Copy Constructor\n";
  }
};

Something rvo() {
  // Calls Something and copy constructor
  return Something{};
}

Something nrvo() {
  Something s{};
  return s;
}

int main() {
  Something s{Something{5}}; // Focus on this line
}


