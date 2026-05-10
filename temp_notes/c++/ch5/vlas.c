#include <stdio.h>

void init_arr(int *arr, int size) {
  for (int i = 0; i < size; i++) {
    arr[i] = i+1;
  }
}

void print_arr(int size) {
  int arr[size];        // Declare VLA
  init_arr(arr, size);  // Initialize VLA
  for (int i = 0; i < size; i++) {
    printf("%d ", arr[i]);
  }
}

int main() {
  int n; // n only known at runtime
  printf("Enter the size: ");
  scanf("%d", &n);
  print_arr(n);
}