#include <iostream>

const int& getNextId() {
  static int s_x{0}; // non-const static local var
  ++s_x;
  return s_x; 
}

int main() {
  // Both id1 and id2 are references, same value of 2,
  // which is probably not expected
  const int& id1_ref{getNextId()};
  const int& id2_ref{getNextId()};

  // id1 and id2 are normal values and each receive a copy of the 
  // value returned by reference, different values (expected/good behavior)
  const int id1{getNextId()};
  const int id2{getNextId()};
}

