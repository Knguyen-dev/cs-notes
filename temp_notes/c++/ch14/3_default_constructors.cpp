#include <iostream>

class Foo {
private:
  int m_x{};
  int m_y{};
public: 
  Foo(int x=0, int y=0) 
    : m_x{x}
    , m_y{y} {
  }
};

int main() {
  // Value and default initialization. Both 
  // call the default constructor.
  Foo foo{}; 
  Foo foo2;
}