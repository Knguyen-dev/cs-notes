/*
+ Stack: A last in, first out data structure. Pushing an object makes it so on the top of the stack. You first
access the top of the stack, and to get to stuff at the bottom or in the middle, you'd have to go through all of the items
on top of it. Sometimes a stack can have a maximum amount of stuff in it, so you can have an overflow or underflow of items. 
So in those cases be sure to take care of it

Advantages:
1. Simple
2. Follows LIFO principle, so it's useful when you want to access
elements in reverse order.
3. Good for backtracking, undo operations, and solving problems in reverse 
4. Good for history management.

- Array implementation: Bottom of the stack is the first index, while the top of the stack
is the index of the last element. Stack elements can be stored in an array, and to track the top position they
use a variable called "stackTop".

- Linked List Implementation: Stack is never full, and initialize stackTop = nullptr. New node is added to the 
beginning of the linkedList, the 'head' being the top of the stack. You can use a stack to print a linkedList backwards,
by saving a pointer to each node in the stack; with the tail being the top of stack while head is bottom.


- stackTop: initialize the stackTop to be -1, if it isn't -1 then there must be something in the stack.


+ Typical stack operations:
- isEmptyStack;
- isFullStack;
- push: puts something on top of the stack. Store new item in array and increment stackTop

- top: gets object on the top of the stack
- pop: removes object from the top of the stack

NOTE: Some code is wrong but the idea is on the mark with the methods

*/

#include <iostream>
using namespace std;


// Example of a stack that uses an array
template<class T>
class Stack {
public:
	Stack(int initialSize = 10) {
		stackTop = -1;
		maxStackSize = initialSize;
		arr = new T[maxStackSize];
		size = 0;
	}

	~Stack() {
		delete[] arr;
	}

	void clear() {
		stackTop = -1;
	}

	bool isEmpty() {
		return stackTop == -1;
	}

	void push(const T& value) {
		if (size + 1 == maxStackSize) {
			throw std::invalid_argument("Push failed since max stack size was reached");
		} else {
			stackTop += 1;
			size += 1;
			arr[stackTop] = value;
		}
	}

	T pop() {
		if (isEmpty()) {
			throw std::invalid_argument("Stack is empty so we failed to pop element");
		}
		T value = arr[stackTop];
		stackTop -= 1;
		size -= 1;
		return value;
	}

	T top() {
		if (isEmpty()) {
			throw std::invalid_argument("Stack is empty so we failed to get top element");
		}
		return arr[stackTop];
	}

	// Prints elements of the stack
	void printStack() {
		std::cout << "Stack: ";
		for (int i = 0; i < size; i++) {
			std::cout << arr[i] << " ";
		}
		std::cout << std::endl;
	}

	int getStackSize() {
		return size;
	}

private:
	int size;
	int maxStackSize;
	int stackTop;
	T* arr;
};
