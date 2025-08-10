#include <stdio.h>
// enums (enumerations): A user defined type where we associate integers with names.
enum Day { Sun, Mon, Tue, Wed, Thu, Fri, Sat };

int main() {
  enum Day today = Sun;
  if (today == Sun || today == Sat) {
    printf("It's the weekend, rest easy!");
  } else {
    printf("Not the weekend yet, stay on guard!");
  }
}