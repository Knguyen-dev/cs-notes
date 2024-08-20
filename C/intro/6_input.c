#include <stdio.h>
#include <string.h>


void badEx() {
  int age;
  char name[25]; // 25 bytes for this array, 1 byte = 1 character. If we go over, then not good.
  /*
  - To get input use scanf. Then use the corresponding format specifier 
  that you're accepting input for. In this case since we're expecting an integer
  we can use '%s'. Then you pass in the memory address of the variable (& address of) that's going to 
  take the memory.

  - scanf reads until it finds whitespace, newline, or end of file.

  + Why this doesn't work with input that has space like "Kevin Nguyen":
  - So if you enter 'Kevin Nguyen' it's going to stop at the middle, capture 'Kevin' in the name. However, when
  you press enter, you are inserting in a newline into the input buffer, now our second scanf function immediately sees that newline 
  character and doesn't let us even enter the age input; skipping of the second prompting.
  and skip over the prompting of age input.

  + Solution: For input with space, use fgets which will get the entire line of content.
  */
  printf("What's your name?: ");
  scanf("%s", name); // no need to use address-of since it's arrays are already pointers when you use them; we'll talk about this later.

  printf("How old are you?: ");
  scanf("%d", &age);


  printf("\nYour name is '%s'!", name);
  printf("\nYou are %d years old", age);
}

void goodExample() {
  int age;
  char name[25]; 


  /*
  - Input is going in 'name'. We'll match a maximum of 25 bytes. One thing 
  to note is that fgets will include a newline character at the end of your 'name'
  string. To remove this, we'll clear the character at the end of the string (the newline character).
  Replace it with a null-terminating character, which essentially makes the string 
  contain only 24 characters, with the last character indicating that it's the end of the string.
  
  NOTE: Since that newline takes the place of one character, the largest name you could have is 
  only 24 characters.
  
  */
  printf("What's your name?: ");
  fgets(name, 25, stdin);
  name[strlen(name)-1] = '\0';

  printf("How old are you?: ");
  scanf("%d", &age);

  printf("\nYour name is '%s'!", name);
  printf("\nYou are %d years old!", age);
}

int main() {
  goodExample();
}