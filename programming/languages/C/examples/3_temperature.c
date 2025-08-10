#include <stdio.h>
#include <ctype.h>

int main() {
  char unit; 
  float temp;
  
  printf("\nIs the temperature in (F) or (C)?: ");
  scanf("%c", &unit);

  // Uppercase the units 
  unit = toupper(unit);

  if (unit == 'C') {
    printf("\nEnter the temperature in celsius: ");
    scanf("%f", &temp);
    temp = (temp * 9/5) + 32;
    printf("\Temp in fahrenheit: %.1f", temp);
  } else if (unit == 'F') {
    printf("\nEnter the temperature in Fahrenheit: ");
    scanf("%f", &temp);
    temp = ((temp - 32) * 5) / 9;
    printf("\nThe temp in Celsius is: %.1f", temp);
  } else {
    printf("Unit is not valid!");
  }
}