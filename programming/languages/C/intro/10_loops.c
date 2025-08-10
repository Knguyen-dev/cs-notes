#include <stdio.h>

int main() {

  // for loop: Loop that lets us loop for a definite amount of iterations 
  for (int i = 1; i <= 10; i++) {
    printf("%d\n", i);
  }

  // while loop: Loop that lets us loop while a condition is true. Good for when we don't know exactly when the loop should end.
  // Here we use a while loop to get prompting input if the user doesn't give us their name.
  char name[25];
  printf("\nWhat is your name?: ");
  fgets(name, 25, stdin);
  name[strlen(name) - 1] = "\0"; // get rid of newline at the end.
  while (strlen(name) == 0) {
    printf("\nYou didn't enter your name!");
    printf("\nWhat's your name?: ");
    fgets(name, 25, stdin);
    name[strlen(name) -1] = '\0';
  }

  // do while loop: A loop that's guaranteed to execute once, then after it checks a condition.
  // Here it's guaranteed to prompt and add a number, and then after it'll check the condition. 
  int number = 0;
  int sum = 0;
  do {
    printf("Enter a number above 0: ");
    scanf("%d", &number);
    if (number > 0) {
      sum += number;
    }
  } while (number > 0);

  /**
   * Iterating through an array:
   * 
   * The sizeof operator returns the size of an object in bytes. So sizeof(prices) sum of all of the 
   * memory allocated for the array (in bytes). Then divide that by the size of one double in bytes, and as a result you'll get 
   * the number of elements in the array.
   * 
   */
  double prices[] = {1.0,2.9,3.4,4.4,5.91};
  int n = sizeof(prices) / sizeof(prices[0]);
  for (int i = 0; i < n; i++) {
    printf("%.2lf\n", prices[i]);
  }

  /**
   * 2D array = An array where each element is an entire array. This is pretty useful when you 
   * want to create something like a matrix, grid, or a table of data.
   * 
   * 2 rows, 3 columns. Then you'd use a nested loop to iterate through the array
   */
  int myMatrix[2][3] = {
    {1,2,3},
    {4,5,6},
  };

  int numRows = sizeof(myMatrix) / sizeof(myMatrix[0]);
  int numCols = sizeof(myMatrix[0]) / sizeof(myMatrix[0][0]);
  for (int i = 0; i < numRows; i++) {
    for (int j = 0; j < numCols; j++) {
      printf("%d\n", myMatrix[i][j]);
    }
  }
}