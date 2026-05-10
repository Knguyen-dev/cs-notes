#include <bitset>
#include <iostream>

int main() {
  constexpr std::uint8_t isHungry{1 << 0}; // 0000 0001
  constexpr std::uint8_t isSleeping{1 << 1}; // 0000 0010
  std::uint8_t me{}; // all flags/options turned off at start
  me |= (isHungry | isSleeping); // I am hungry and sleeping
  me &= ~isSleeping;             // no longer sleeping
}

