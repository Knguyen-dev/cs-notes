#include <cassert>
int main() {  
  static_assert(sizeof(long) == 8, "Long must be 8 bytes, but it isn't!");
  static_assert(sizeof(int) == 4, "Int must be 4 bytes, but it isn't!");
}
