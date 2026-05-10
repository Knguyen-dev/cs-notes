/*

## Brace elision for aggregates:
Why is it that when creating an array of structs, we have to use double braces, rather 
than single braces like with non-aggregate types? Aggregates in C++ support brace elision, 
which lays out some rules for when multiple braces may be omitted. 

Generally, you can omit braces when initializing an array of scalar values. You can do 
std::array with double braces all the time if you want as that avoids having to think about brace elision.
*/

#include <array>

struct House {
  int number{};
  int stories{};
  int roomsPerStory{};
};

int main() {
  // Approach 1
  std::array<House, 3> houses{};
  houses[0] = { 13, 1, 7 };
  houses[1] = { 14, 2, 5 };
  houses[2] = { 15, 2, 4 };

  // Approach 2: note the double braces
  constexpr std::array<House, 3> houses{{
    { 13, 1, 7 },
    { 14, 2, 5 },
    { 15, 2, 4 }
  }};

  // Approach 3: Mentioning each element by name, 
  // no need for double braces now.
  constexpr std::array<House, 3> houses2{
    House{ 13, 1, 7 },
    House{ 14, 2, 5 },
    House{ 15, 2, 4 }
  };
}

