#include <stdio.h>
#include <stdlib.h>  // Include this header for malloc, realloc, and free


/**
 * Pointer: A variable that stores the memory address of another variable. Instead of holding a value directly, a pointer 'points' to the
 * memory location of where the value is stored.
 *
 */
void printAge(int* pAge) {
  printf("\nYou are %d years old!", *pAge); // Dereference the pointer to get the value
}

void ex1() {
  int age = 21;
  printf("\nAddress of 'age': %p", &age);
  printf("\nValue of 'age': %d", age);
  /**
   * + Now create a pointer to age. So to create a pointer, we use '*' (indirection operator, which you can nickname as 'value at address' operator)
   * and by convention we prefix 'p' onto it to indicate that we're dealing with a pointer.
   *
   * 1. 'int *pAge': Right off the bat we know we're dealing with a pointer. This pointer points to an integer variable,
   * so it holds the memory address of a variable that has the integer datatype.
   *
   * 2. '= &age': Pointers contain the memory address of the variable they're pointing to. So, assign the pointer the memory
   * address of the 'age' variable using the '&' (address-of) operator.
   *
   * - When to use '*' (indirection):
   * 1. When creating a pointer.
   * 2. When dereferencing a pointer, and getting the value that's stored at the memory address it's pointing to.
   *
   * + Size of a pointer
   * Again a pointer stores a memory address. The size of the pointer isn't determined by the type of variable, but by the
   * actual architecture of your system. For a 32-bit system, pointers are 4 bytes. For a 64-bit system, they're 8 bytes, because
   * these are the respective sizes of the registers that hold their data.
   */
  int* pAge = &age;
  printf("\nAddress at pointer: %p", pAge); // By default the 'value' of the pointer is just the memory address of another variable it points to.
  printf("\nValue at the stored address: %d", *pAge); // dereferencing the pointer.
  printf("\nSize of age: %d bytes", sizeof(age));
  printf("\nSize of pointer age: %d bytes", sizeof(age));

  printAge(pAge); // You can pass in the pointer
  printAge(&age); // Passing the address of 'age'

  // Finally, you can update the value at the memory address the pointer is pointing to via your pointer.
  *pAge = 64;

  printAge(pAge);
}

/**
 * Example 2: Swapping values. One of the most common uses of pointers is being able to swap the values of two variables
 * without returning anything from the function itself. Here it accepts two integer pointers.
 */
void swap(int* x, int* y) {
  int temp = *x; // store the value at the address that the 'x' pointer stores
  *x = *y;       // copy the value at address y onto address x
  *y = temp;     // copy the value in temp to address y
}

void ex2() {
  int a = 10;
  int b = 20;

  printf("\nBefore swap: a = %d, b = %d", a, b);
  // Our function accepts the pointers of the integers, so we can either pass in pointers, or the addresses, and let the pointers 
  // be created in the function. So in this case, we'll just pass in the addresses of a and b, so that the pointers are created locally.
  swap(&a, &b);

  printf("\nBefore swap: a = %d, b = %d", a, b);
}

/**
 * Ex. 3: Pointer Arithmetic. Remember that the variable for an array by itself is just a pointer to the first element in the array.
 * As well as this, making a pointer to an array, would make a pointer to the first element of said array. You can then add numbers
 * to the pointer. So pArray + 1 is the memory address of the first index in the array. pArray+2 is 2 positions forward from the 0th index,
 * so the second index.
 *
 * Hardware Explanation:
 * In an array of integers (e.g., arr[5]), each integer occupies 4 bytes (32 bits).
 *
 * Memory Layout:
 * 1. The first element (arr[0]) starts at a specific memory address (e.g., 0x100).
 * 2. The second element (arr[1]) is 4 bytes ahead (0x104), the third (arr[2]) is at 0x108, and so on.
 * 3. When you add i to a pointer, the CPU calculates the address offset:
 * 4. pArr + i = base address + (i * size of element).
 * 5. Dereferencing (*(pArr + i)) fetches the value at that calculated address.
 *
 * Significance of Contiguous Memory:
 * - Arrays are stored in contiguous blocks of memory.
 * - Contiguity allows efficient iteration: the CPU can preload adjacent values into registers for faster access using cache lines.
 * - This improves performance for large arrays due to spatial locality.
 */
void ex3() {
  int arr[5] = { 1,2,3,4,5 };
  int* pArr = arr; // Point to the first element of the array.
  printf("\nArray elements using pointer arithmetic:");
  for (int i = 0; i < 5; i++) {
    // calculate the memory address with pArr + i. Then dereference to get the value at that position
    printf("\nElement at index '%d' with value '%d'!", i, *(pArr + i));
  }
}

/**
 * Ex. 4: An array name acts as a constant pointer to its first element. This means you can use pointers to
 * iterate through an array.
 *
 */
void printArray(int* arr, int size) {
  for (int i = 0; i < size; i++) {
    printf("%d", *(arr + i));
  }
}

void ex4() {
  int numbers[] = { 1,2,3,4,5 };
  int size = sizeof(numbers) / sizeof(numbers[0]);
  printf("Array elements:\n");
  printArray(numbers, size); // you can just pass in 'numbers' since it is a pointer to the first element in the array.
}

/**
 * Ex. 5: Double pointers (A pointer to a pointer). You can have pointers to pointers.
 */
void modifyDoublePointer(int** p) {
  // Do a double de-reference. Doing '*p' yields the memory address of the first pointer, whilst '**p' yields the value at 
  // that memory address.
  **p = 100;
}
void ex5() {
  int value = 10;
  int* pValue = &value; // Pointer to 'value'. Stores the memory address of 'value'
  int** ppValue = &pValue; // Pointer to 'pValue'. Stores the memory address of 'pValue'
  printf("\nBefore modification: %d", value);
  modifyDoublePointer(ppValue);
  printf("\nAfter modification: %d", value);
}

/**
 * Ex. 6: Function pointers. These are used to store the address of a function and can be used to call
 * functions indirectly.
 *
 * I'll be real, these aren't that important as you probably won't see these ever. I'm just showing these just so
 * that you know that they exist and are possible.
 */
void greet() {
  printf("\nHello, World!");
}
void ex6() {
  void (*pGreet)(); // Declare the function pointer
  pGreet = &greet;  // Assign the address of the function
  (*pGreet)();
}

/**
 * Ex. 7: Dynamic memory allocation. Pointers are essential when working with dynamic memory allocation in C.
 * + What is dynamic memory allocation vs regular memory allocation?
 * - Static memory allocation: When we define variables, functions, etc. in our program, it our program allocates
 * memory to those things so that they can be used for later use. However this is before our program is run, so all of
 * this memory we set is determined before the program runs.
 * - Dynamic memory allocation: The idea of allocating memory storage during the runtime of a program.
 *
 * + Functions used for memory:
 * 1. malloc(size_t size): Allocates a block of memory of 'size' bytes. The content is uninitialized.
 * 2. calloc(size_t num, size_t size): Allocates memory for an array of 'num' elements, each of 'size' bytes. All bytes are initialized to zero.
 * 3. realloc(void *ptr, size_t size): Resizes a previously allocated memory block. If necessary it moves the block to a new location.
 *
 * In C++ the you'd use 'new' to dynamically allocate memory, so that's the idea.
 *
 * 4. free(void *ptr): Deallocates the memory that was previously allocated by 'malloc', 'calloc', or 'realloc'. The same idea of releasing
 * memory in C++ using 'delete' keyword.
 *
 * + Memory alignment
 * Memory is allocated in chunks aligned to the system's word size. If you request an unclean number of bytes like 65, it rounds
 * up to the next multiple of the alignment size.
 *
 * - For a 64-bit system, requesting 65, it'll round up to 72 since 72 is the next multiple of 8 after 65.
 * - For a 32-bit system, it'd round up to 68 bytes since 68 is the next multiple of 4 after 65.
 *
 */
void ex7() {
  int* arr;
  int n = 5;

  // Allocate memory for 5 integers 
  arr = (int*)malloc(n * sizeof(int));
  if (arr == NULL) {
    printf("Memory allocation failed!\n");
  }

  // Initialize the array slots with values and print the array
  for (int i = 0; i < n; i++) {
    arr[i] = i + 1;
    printf("%d", arr[i]);
  }

  // Resize the array to now hold 10 integers, use realloc
  arr = (int*)realloc(arr, 10 * sizeof(int));
  if (arr == NULL) {
    printf("Memory reallocation failed!\n");
  }

  // Initialize the new elements;
  for (int i = 5; i < 10; i++) {
    arr[i] = i + 1;
    printf("%d ", arr[i]);
  }

  // Free the allocated memory
  free(arr);  // Using free

}

/*
+ What is a Void Pointer?
A void pointer is just a pointer that can point to any data type. So you can have hold the address of any data type.
However, you can't dereference a void pointer directly since the compiler doesn't know what type of data it points to.

In order to reference it, cast/convert it to an appropriate pointer type before dereferencing.

+ Char Casting Review:
Character casting refers to when we convert char to unsigned char. In C, characters are represented using their corresponding
integer values according to the ASCII table. For example:

int value = 65; // ASCII value for 'A'
char ch = (char)value; // ch will now hold 'A'.
*/
void ex8() {
  void* myPtr;
  int x = 10;
  myPtr = &x;

  // Cast the void pointer to an integer pointer.
  int* intPtr = (int*)myPtr;

  // Now we can dereference it since it has a data type
  printf("%d\n", *intPtr);
}

/*
+ Representing a character array in C:
 In C a character array can be represented in two ways: using an array declaration or a pointer declaration.

 In both cases indexing is the same however they have different levels of mutability. So a pointer to a
 character array is mutable and you can safely modify its contents (e.g., myString[0] = 'h'), and it will
 change the first character of the string to 'h'.

 However a pointer to a string literal is a little more restrictive. Since it's typically stored in read-only
 memory, modifying it can result in undefined behavior. The exception to this rule is when the pointer is
 dynamically allocated using malloc. In this case, it is allowed, but of course be careful when working
 with pointers.
*/
void ex9() {
  // Character array; Creates an array of 6 characters (5 + '\0')
  char str1[] = "Hello";

  // Character Pointer Declaration; String literals are typically stored in a read-only section of memory
  char* str2 = "Hello";

  // 5 letters for 'Hello', with the sixth one for the '\0' since it's not automatically added.
  // You'd manually have to 
  char* str3 = (char*)malloc(6 * sizeof(char));

  if (str3 == NULL) {
    printf("Failed to allocate memory for str3 pointer");
    return;
  }

  // Copy "Hello" into str3
  str3[0] = 'H';
  str3[1] = 'e';
  str3[2] = 'l';
  str3[3] = 'l';
  str3[4] = 'o';
  str3[5] = '\0';  // Explicitly add the null terminator

  // str3 now contains "Hello" as a valid string; then free memory since we're done with it
  free(str3);
}


// + Pointers with const 
void ex10() {

  // Pointer to non-const data (default): 
  // - Address: Can be modified (you can change what ptr points to)
  // - Data: Can be modified (you can change the value at the location ptr points to)
  int* ptr;

  // Pointer to const data (read-only data)
  // Can modify the address, but not the data.
  const int* ptr;

  // Const pointer to non-const data (pointer is fixed)
  // You can't change the address, but you can change the data
  int* const ptr;

  // Const pointer to Const Data (fully fixed)
  // Can't change address or data.
  const int* const ptr;

}


int main() {
  ex1();
  ex2();
  ex3();
  ex4();
  ex5();
  ex6();
}