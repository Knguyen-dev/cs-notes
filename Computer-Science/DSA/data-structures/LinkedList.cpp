#include <iostream>
#include <vector>
/*
+ LinkedLists: Has a head and tail node, and very node has a reference to the next one in 
the chain.

Advantages:
1. Dynamic and flexible size
2. Insertion/Deletion: Very efficient as you just manipulate some pointers/links, while in an array you'd have
to move a ton of data. This is the main advantage of linked lists as they're very useful in situations where 
inserting or deleting data is frequent, an


+ Basic operations you can do for linked list:
- initialize list 
- determine whether empty
- print list 
- find length;
- destroy list
- get info in the first or last node
- search list for a given item
- insert item in linked list
- delete item from linked list
- make a copy of said list


+ Unordered LinkedLists: Not sorted
- insertFirst: Create new node, insert it before first;
- insertLast: Insert new node after last
- deleteNode: Deletes node with given data from list
    Case 1: If list is empty or target node isn't in list then output an error
    Case 2: If targt is fuirst node, adjust first node value. If no other nodes
    adjust first and last
    Case 3: If target isn't the head or tail, update link of previous node to target
    Case 4: If target is tail, update link of previous node to target, and update tail
- search: If data of current, stop search, otherwise keep going 


+ Ordered LinkedList: Assumes elements are arranged in ascending ordered
- search: If info of current node is >= seek, stop search, else keep going up the linked list until this condition is met
or until you go through everything. This is because if it's greater than the seek, you know it doesn't exist, while if it matches
then you've found it so you don't need to keep searchin anymore.
- insert:
    Case 1: If list is empty, then the head and tail point to the new node
    Case 2: List isn't empty, traverse from head, iterate through linked list to make sure you're entering
    the node at a proper place since ascending order. Be sure to check whether its 
    going to be inserted at the head or tail
    NOTE: insertNode is actually the function used to insert the node in its proper place
- delete:
    Case 1: List is empty then show error
    Case 2: Deleting the head, adjust head
    Case 3: Is somewhere in hte list, have current and previous nodes to be ready to track and change values
    Case 4: If item isn't in list, show error 

+ DoublyLinkedList: Can be traversed in either direction since they have links to previous and next;
For these ones you'd need to modify the nodes to fit those requirements.
- reversePrint: Since you have back links you can traverse it backwards
- search: Same as ordered linked list
- insertion: 
    Case 1: Inserting in an empty list
    Case 2: Inserrting at the beginning of a nonempty list 
    Case 3: Insertion at the end of a nonempty list 
    Case 4: Insertion somewhere in a non-empty list 
    NOTE: Cases 1 and 2 require you to update head, whilst 3 and 4 are regular
    since you update the links instead. 
- deleting nodes:
    Case 1: It's empty
    Case 2: target is the head, so update the head
    Case 3: Target is somewhere in the list,
    Case 4: Target isn't in list

+ Circular linked list: Where the last node points to the first one; so the link on the tail points to head

In conclusion: Insertion adn deleting doesn't require data movement, as we only
reassign the connections in the links. A singly linked list can only be traversed in one 
direction, while a doubly linked can do 2 directions. The search is sequential, and when you 
traverse the list, you use a temporary variable like "current" and assign it to head, so that 
you can both start at the beginning of the chain and you won't mess up the assignment of the head.

*/


#include <iostream>
using namespace std;

// U is value/info datatype
template <class U>
struct Node {
	U info;
	Node<U>* link;
};

// Class for linked list that's used in hash table chaining
template <class U>
class LinkedList {
private:
	Node<U>* head;
	Node<U>* tail;
	int count;
public:
	LinkedList() {
		head = nullptr;
		tail = nullptr;
		count = 0;
	}

	~LinkedList() {}

	// Resets a linked list
	void destroyList() {
		Node<U>* current = head;
		while (current != nullptr) {
			Node<U>* temp = current;
			current = current->link;
			delete temp;
		}
		head = nullptr;
		tail = nullptr;
		count = 0;
	}

	// Checks if a linked list is empty
	bool isEmpty() {
		return count == 0;
	}

	void insertFirst(U info) {
		// Create new node and fill in the data
		Node<U>* newNode = new Node<U>();
		newNode->info = info;

		// Empty linked list, so we're actually adding the first node, so redirect both head and tail as the new node
		if (isEmpty()) {
			head = newNode;
			tail = newNode;
		}
		else {
			// Else there's at least one node in the list, so connect the node to the head nad update the head
			newNode->link = head;
			head = newNode;
		}
		// Increase count since we're adding one more node
		count += 1;
	}

	// Inserts new node at tail 
	void insertLast(U info) {
		// Create new node and fill in the data
		Node<U>* newNode = new Node<U>();
		newNode->info = info;
		newNode->link = nullptr;

		// If the list is initialily empty, put both head and tail as the new node
		if (isEmpty()) {
			head = newNode;
			tail = newNode;
		}
		else {
			// Else there's at least one node in the linked list, so just connect the tail to the new node
			// Then update the tail
			tail->link = newNode;
			tail = newNode;
		}
		count += 1;
	}

	// Search linked list and returns a node with matching info; if it's not found it'll return a nullptr
	Node<U>* searchNode(U info) {
		Node<U>* current = head;
		while (current != nullptr) {
			// If the info match, it's the node we're looking for
			if (current->info == info) {
				break;
			}
			current = current->link;
		}
		return current;
	}

	/*
	+ Various Cases:
	1. If list is Empty
	2. If the node we isn't found in the linked list
	3. If we are deleting the head. And if deleting the head lead to an empty list.
	4. If We are deleting a node that isn't the head.
	*/
	void deleteNode(U info) {
		Node<U>* previous = nullptr; // node after the current node in linked list
		Node<U>* current = head; // represents current node in linked list,

		// If the linked list is already empty then abort the mission
		if (isEmpty()) {
			std::cout << "HTLinked List Deletion Error: List is already empty!" << std::endl;
			return;
		}

		// Search for target node in linked list
		while (current != nullptr) {
			// if data matches
			if (current->info == info) {
				break;
			}
			// Set the previous node, then advance current node
			previous = current;
			current = current->link;
		}

		if (current == nullptr) {
			std::cout << "LinkedList Deletion Error: Couldn't find node with info in list!" << std::endl;
			return;
		}

		// If we're deleting the head, first update the head to the next node in the chain
		if (current == head) {
			head = head->link;
			// Means there was no node after head so the linked list is empty, so set the tail to nullptr also
			if (head == nullptr) {
				tail = nullptr;
			}
		} else {
			// Else the node we are deleting is not the head
			// Connect the previous node to the node after the target node.
			previous->link = current->link;
			// If the target node being deleted is the tail, also have to update hte tail 
			if (current == tail) {
				tail = previous;
			}
		}
		// Finally delete our target node and decrement the count
		delete current;
		count -= 1;
	}

	// Checks to see if node with info exists
	bool isExistingNode(U info) {
		Node<U>* current = head;
		bool found = false;
		while (current != nullptr) {
			if (current->info == info) {
				found = true;
				break;
			}
			current = current->link;
		}
		return found;
	}

	// Returns a vector of all values in the linked list; if it's empty we return an empty vector
	std::vector<U> getAllNodeValues() {
		std::vector<U> nodeValues;
		Node<U>* current = head;
		while (current != nullptr) {
			nodeValues.push_back(current->info);
			current = current->link;
		}
		return nodeValues;
	}

	// Function prints the linked list
	// NOTE: Assumes current->info has its output stream overloaded with a custom print fucntion
	void print() {
		if (isEmpty()) {
			std::cout << "Linked List: Empty!" << std::endl;
			return;
		}
		Node<U>* current = head;
		std::cout << "Linked List: ";
		while (current != nullptr) {
			std::cout << "(" << current->info << ")" << ", ";
			current = current->link;
		}
		std::cout << std::endl;
	}

	// Get the length or number of nodes in the linked list
	int getLength() {
		return count;
	}

	// NOTE: These, and any other functions that return an Node will also return a nullptr if the node in 
	// question doesn't exist.

	// Get node located at the head of hte linked list
	U getHeadValue() {
		if (isEmpty()) {
			std::cout << "LinkedList Error: Empty so can't get head value, returning default value!" << std::endl;
			return U();
		}
		return head->info;
	}

	// Get value at the linked list's tail 
	U getTailValue() {
		if (isEmpty()) {
			std::cout << "LinkedList Error: Empty so can't get tail value, returning default value!" << std::endl;
			return U();
		}
		return tail->info;
	}
};