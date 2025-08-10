#include <stdio.h>
void ex1() {
  // Conditionals: We have if, else if, and els
  // logical operators:
  // 1. && (AND) checks if two conditions are true
  // 2. || (OR) checks if at least one condition is true
  // 3. ! (not) reverses the state of a condition
  int age;
  printf("Enter your age: ");
  scanf("%d", &age);
  if (age > 18) {
    printf("You're now signed up!");
  } else if (age == 18) {
    printf("You're 18 years old? You signed up at the perfect time then!");
  } else {
    printf("You need to be at least 18 years old to signup!");
  }
}

void ex2() {
  // A switch statement is a more efficient alternative to using many 'else if' statements. 
  // While using a few 'else-if' is okay, if you're finding that you're using a lot, then use a switch
  char grade;
  print("Enter your grade: ");
  scanf("%c", &grade);
  switch (grade) {
    case 'A':
      printf("You got an A");
      break;
    case 'B':
      printf("You got an B");
      break;
    case 'C':
      printf("You got a C");
      break;
    case 'D':
      printf("You got a D");
    case 'F':
      printf("You got an F and failed");
      break;
    default:
      printf("Please enter only valid grades!");
  }
}

int findMax(int x, int y) {
  // ternary operator: Shorthand for an if/else when assigning/returning a value
  // (condition) ? value if true : value if false
  // If x is greater than y, then return x. Else return y
  return (x > y) ? x : y;
}

int main() {
  ex1();
  ex2();
}