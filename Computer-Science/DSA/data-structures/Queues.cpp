/*
+ Queue: Set of elements of the same type. Elements are added at one end, 
usually at the back/rear and then deleted at the other end (the front). It's 
considered a first in first out data (FIFO) structure. Items at the front or arrive first are serviced first, 
while new items are inserted at the end to wait their turn. The middle items aren't accessible, and to insert 
elements you manipulate the rear. To delete elements you manipulate the front

An example could be waiting at a line in a bank!

+ Applications of queues:
- Simulations and event driven systems. Things like flight simulation, task scheduling.
- Good when you want to keep the order of when things came in. An example would be a task scheduling system
since order of what's coming first or later in the sequence of tasks is extremely importance.

+ Queue Types:
- Array implementation: Use an array to store queue elements, front, back, and maxSize of the queue. However,
it's limited and you're using extra things such as arrays which overcomplicates it.
- LinkedList implementation: Queue is never full since dynamic memory. Only needs pointers or variables to 
keep track of the front and back
- Deque: Double eneded queues.

+ Typical Operations:
- Adding element: Simple increment rear by one and put that new value in that rear position. Increment count by
one if you use it
- Deleting an element: Simply increment the front, effectively moving to the next queue element. Decrement the
count by 1.
- getFront(); typically you'd also have functions that get the data of the front and rear nodes, in generally all linkedList type stuff
- getRear()
*/
#include <iostream>
using namespace std;

template <class T>
class arrayQueue {
private:
	int maxQueueSize;
	int front;
	int rear;
	int currentSize;
	T* arr;
public:
	arrayQueue(int _maxQueueSize = 10) {		
		maxQueueSize = _maxQueueSize; // update the maximum size of the queue
		arr = new T[maxQueueSize]; // initialize the pointer so that it's now a pointer to an array of type T
		front = -1;
		rear = -1;
		currentSize = 0;
	}
	~arrayQueue() {
		delete[] arr;
	}

	// Resets the queue
	void initializeQueue() {
		front = -1;
		rear = -1;
		currentSize = 0;
	}

	// Returns whether the queue is empty or not
	bool isEmptyQueue() {
		return currentSize == 0;
	}

	// Returns whether its full or not; when using circular arrays, we also use this to make sure that the rear never overtakes the front position. At most it's always
	// one behind. 
	bool isFullQueue() {
		return currentSize == maxQueueSize;
	}

	void addQueue(const T& newElement) {
		if (isFullQueue()) {
			std::cout << "Add Error: It's already full" << std::endl;
			return;
		}

		// Advance the rear to the new position you want the element to be placed; use modulus so that when rear = maxQueueSize, it means that the rear is past the max index
		// so by using modulus and the maxSize we put it back to zero, causing this wrapping around effect.
		rear = (rear + 1) % maxQueueSize;

		// If the array was empty and we are adding the first item, update the front, so it now equals the rear, which'll be zero 
		if (isEmpty()) {
			front = rear;
		}

		// Finally add the new element and increase count
		arr[rear] = newElement;
		currentSize += 1;
	}

	// Remove the first element of the queue
	void deleteQueue() {
		
		if (isEmptyQueue()) {
			std::cout << "Can't remove from an empty queue!" << std::endl;
			return;
		}

		int targetData = arr[front];

		front = (front + 1) % maxQueueSize; // so that when it reaches maxQueueSize, it would wrap around
		currentSize -= 1;

		std::cout << "Dequeued: " << targetData << std::endl;
	}

	T front() {
		if (isEmptyQueue()) {
			std::cout << "Queue is empty, couldn't return front, returning -1";
			return T();
		}
		return arr[front];
	}

	void displayQueue() {
		if (isEmptyQueue()) {
			std::cout << "Queue is empty, couldn't display!" << std::endl;
			return;
		}

		int count = 0;
		int i = front;
			
		std::cout << "Queue: ";
		while (count < currentSize) {
			std::cout << arr[i] << " ";
			i = (i + 1) % maxQueueSize;
			count += 1;
		}
		std::cout << std::endl;
	}
};

// Section for implementing a queue as a linked list
class Node {
    public:
        int data;
        Node* next;
        Node(int data) {
            this->data = data;
            this->next = nullptr;
        }
}

class linkedListQueue {
    public:
        linkedListQueue() {
            front = nullptr;
            rear = nullptr;
        }

        // Check if the queue is empty
        bool isEmpty() {
            if (front == nullptr) {
                return true;
            } else {
                return false;
            }
        }

        // Adding to the end of the queue
        void enqueue(int data) {
            Node* newNode = new Node(data);
            // If it's already empty, set both front and rear to point at same node
            if (isEmpty()) {
                front = newNode;
                rear = newNode;
            } else {
                // Else add the node to the end by linking it to the rear and updating the rear
                rear->next = newNode;
                rear = newNode;
            }
        }

        void dequeue() {
            if (isEmpty()) {
                cout << "Underflow Error: Queue is already empty so you can't remove" << endl;
                return;
            }

            // Get the front of the queue and update the front
            Node* temp = front;
            front = front->next;

            delete temp; // delete the target
            
            // This would mean you removed the last element, and so now there are no nodes
            if (front == nullptr) {
                rear = nullptr; // set rear to nullptr as well
            }

        }

    private:
        Node* front;
        Node* rear;
}