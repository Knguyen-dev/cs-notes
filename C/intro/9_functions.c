#include <stdio.h>
#include <string.h>
/**
 * Functions: Reusable modules or pieces of code.
 * Parameters: Here it's 'name' and 'age'. The things the function defines to be passed in.
 * Arguments: The values that we actually pass in
 * Return: You can also choose to return things in your function. Like here we didn't return anything, but of course you 
 * can return integers, floats, character arrays, etc.
 */
void birthday(char name[], int age) {
  printf("\nHappy birthday %s! You're now %d years old!", name, age);
}

/**
 * Function prototype: It's a function declaration without the function's body/implementation. It's declared before main and then 
 * implemented after main.
 * 
 * Many C compilers don't check for the parameter matching. Missing args will result in errors.
 * 
 * Advantages:
 * 1. Easier to navigate a program with main at the top
 * 2. Helps with debugging
 * 3. Commonly used in header files
 */
void hello(char name[]);

void usefulStrings();

int main() {
  char name[] = "James";
  int age = 21;
  birthday(name, age);
}


void hello(char name[]) {
  printf("\n Hello %s", name); 
}

void usefulStrings() {
  /**
   * 
   */
  char string1[] = "Bro";
  char string2[] = "Code";

  // strlwr(string1);  // lowercases a string
  // strupr(string1) // uppercases a string
  // strcat(string1, string2); // appends string2 to the end of string1
  // strncat(string1, string2, 1); // appends n characters from string2 to the end of string1
  // strcpy(string1, string2); // copies string2 to string1;
  // strncpy(string1, string2, 2); // copies n characters of string2 to string1 
  // strset(string1, '?'); // sets all characters of a string to a given character. In this case a question mark.
  // strnset(string1, 'x', 1); // Sets the first n charactesr of a string to a given character.
  // strrev(string1); // reverses a string

  int length = strlen(string1); // returns the length of a string as int
  // strcmp(string1, string2); // compares all characters in a string.
  // strncmp(string1, string2, 1); // compares n characters in a string 






}