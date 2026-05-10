#include <iostream>

class Dollars {
private:
  int m_dollars{};

public:
  explicit Dollars(int d) // now explicit
      : m_dollars{ d } {}

  int getDollars() const { return m_dollars; }
};

void print(Dollars d) {
  std::cout << "$" << d.getDollars();
}

int main() {
    // compilation error because Dollars(int) would be 
    // an implicit user-defined conversion. But since we 
    // marked the constructor as "explicit", we can't have any 
    // implicit conversions.
    print(5); 
    return 0;
}


