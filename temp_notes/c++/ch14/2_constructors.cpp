#include <iostream>

class Foo {
private:
  int m_x{};  // default member initializer (is overridden in constructor)
  int m_y{2}; // dfeault member initializer (used)
  int m_z;    // no initializer, stays uninitialized.

public:
  // Member initialization list
  // NOTE: m_x will be initialized first, m_y initialized second
  Foo(int x, int y) 
    : m_x{x} {

  }
};


