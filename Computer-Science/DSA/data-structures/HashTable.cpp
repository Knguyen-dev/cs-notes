/*
+ Hash table: Allows you to quickly get data. Normally with an array, if we want to look for 
an item. We'd have to loop through the array (seq search). This could take a long time, but 
if we also knew the index of the thing we're looking for? Hash tables solve this issue
as if we know the data, we can calculate its index. A position b, is called a bucket that generally holds one item. 
Basically a python dictionary, or a javascript object.

+ Hash map: Just another name for hash table, but at an array position/bucket it has key and
 value. This is actually the common use of a hash table. You could store classes or object, and
 the key would just be one of the many properties.

+ Time complexity: For inserting, sorting, and deleting is constant time in the best case.
For inserting, deleting, and updating, the best and average case is O(1), but the worse case is O(n)

+ Hashing algorithm: The calculation or steps applied to transform a key into an output/address.
    1. Numeric Keys: Common way to is divide the key by length of list, n, and
    take the remainder which will be address. (Modulus hashing)
    2. For alphanumeric keys, sum up the ascii codes of the key and divide by length of list.
    Then get the remainder, which is your address (Modulus hashing).
    NOTE: Modulus hashing just makes sure that no matter how large/small the output is, it'll
    always fall in the range of 0 to length - 1. Though with these hash algorithms, they can
    still cause collisions, they just try their best not to. In any case you should have collision
    resolution techniques at the ready.

    - If you knew all if the inputs in advance, you could create a perfect hash algorithm and 
    set of rules thaet'd use all of the spaces in the array. However, most of the time you just
    have to use a flexibile hash function

    - What to look for in a hash function?
    1. Minimize collisions and quick; spend less time on collision resolution and focus on storing/retrieving. For minimizing
    collisions, given a key, you'd want to have all characters we apart of the hash function to reduce collisions happening
    2. Ideally uniform distribution of values; not necessary though.
    - NOTE: A hash function for security concerns has a whole lot of different requirements, but here we're only
      talking about a hashtable. 

+ Inserting into a hash table:
    1. Get the data, it could be a name like "Mia"
    2. Convert every letter into its ascii equivalent, sum it up to a total
    3. Divide the total by the length of the array, and the remainder is your index
    NOTE: Here we are using an algorithm or a hash function, which takes in a key, and outputs
    what we consider is an address or index in the array. The main issue now, is that sometimes
    different keys can output the same index value, which is a 'collision'.

+ Retrieving an item from a hash table:
    1. Let's say we want to find "Mia", we pass "Mia" into the hash function.
    2. This does the same math that was done to output the index of where she'd be inserted into the array
    3. We get the index, use it on the array, and get "Mia" back
    NOTE: Depending on the way we handle collisons, a linear search could be needed too.

+ Collisions: 
    - Def: Two elements try to position themselves at the same index. This is common so we have to 
    have a way to deal with it
    - Open addressing: Rseolving a collision by placing an item somewhere other their calculated
    address. All addresses are available for the new item.
    - Closed addressing: Resolves a collision by chaining items in a linked list or some other suitable
    data structure
    - Load factor: Number of items stored / size of the array. Keep this reasonably low so that
    open-addressing and linear probing can work reasonably well. 
    -Clustering: Keys bunching up very closely in the ilst, this isn't good since we kind of 
    want to have a uniform distribution when looking at data

        1. Linear Probing: We keep searching the next address until an available slot is found.
        Usually done by continuing to look at the right slot until an empty one is found. However,
        this means that when we look for an item, it's not in that calculated index, so we linear
        search until we find it. Assume circular array, so if we reach the end, we go back to the beginning to search 

        2. Having more space: Making hash table somewhat bigger than needed, so that you have more
        space for dealing with collisions.

        3. Chaining (Closed addressing): An item is positioned at an index, it becomes the
        head of a linked list. Then if insert another key, and it has the same index value, 
        then we just make it the new tail of that existing linked list. Now when you're trying
        to retrieve an item, you're going to get an index to a linked list that has your item. 
        Just traverse through the linked list and then find what you need. Here we don't have
        to loop through the entire list, and that way we are faster at looking up things. 
            - However, the draw-back is that for low load factors, when not many items are in list, it may be
             faster to use linear probing.
        
        4. There's also many others like plus 3 rehash, where we looking at every 3rd slot
        until a space is found. Quadratic hashing increase the distance quadratically. We 
        also have double hashing where we would hash the key again, and the output is the amount 
        we would travel to look.    

+ Overflow: When you try to add more items, but there are no more buckets/positions left in hashtable so you must resize it.
It could also refer to the situation where a bucket full. In the case where a bucket can contain only 3 elements, that fourth one would cause a bucket overflow. 
Bucket overflow and collision could occur at the same time if the bucket's size is only 1.

*/


#include <iostream>
#include <string>

// In any case, when using separate chaining, the nodes in your linked list
// must have a string attribute for the key.
struct HTNode {
	std::string key;
	int data;
	HTNode* next;    
};


class HTLinkedList {
	private:
		HTNode* head;
		HTNode* tail;
		int count; 
	
	public:
		HTLinkedList() {
			head = nullptr;
			tail = nullptr;
			count = 0;
		}

		// Function for resetting the linked list
		void destroyList() {
			HTNode* current = head;
			while (current != nullptr) {
				// record the current node
				HTNode* temp = current;
				// update the current node to go further
				current = current->next;
				// Delete the node
				delete temp;
			}

			// Reset the first and last nodes
			head = nullptr;
			tail = nullptr;
			count = 0;
		}

		// Checks whether linked list is empty or not
		bool isEmpty() {
			return count == 0;
		}

		// Function for building the linked list backwards; inserts something at head
		void insertFirst(std::string key, int value) {
			HTNode* newNode = new HTNode();
			newNode->data = value;
            newNode->key = key;
			newNode->next = head;
			
			// If it's empty make both of them point to the new node
			if (count == 0) {
				head = newNode;
				tail = newNode;
			} else {
				head = newNode;
			}
			
			count += 1;
		}

		// For building the linked list forward; inserts something at tail
		void insertLast(std::string key, int value) {
			HTNode* newNode = new HTNode();
			newNode->data = value;
            newNode->key = key;
            newNode->next = nullptr;
			tail->next = newNode;

			if (count == 0) {
				head = newNode;
				tail = newNode;
			} else {
				tail = newNode;
			}
			count += 1;
		}

		// Deletes a node based on the key given from HashTable class.
		void deleteNode(std::string key) {
			HTNode* temp = nullptr; // represents node where we put the information of the target into
			HTNode* previous = nullptr;
			HTNode* current = head;

			// Search for the node
			while (current != nullptr) {
				if (current->key == key) {
					temp = current; // assign the target node to temp
					break;
				}
				previous = current;
				current = current->next;
			}
			// NOTE: Error checking should have already been done to make sure the node exists in the linkedlist
			
			// At this point, the temp node is defined so we delete it
			// If it's the head node, then make sure to replace head variable
			if (temp == head) {
				head = head->next;
			} else if (temp == tail) {
				previous->next = nullptr;
				tail = nullptr;
			} else {
				// Else the temp node we are deleting 
				previous->next = temp->next;
			}
			
			// In any case we're deleting temp and decrementing counter
			delete temp;
			count -= 1;

			// If we deleted the last node, we need to put head and tail at nullptr
			if (count == 0) {
				head = nullptr;
				tail = nullptr;
			} else if (count == 1) {
				// If there's only one node left after deletion,
        // set tail to point to the head node
        // to maintain consistency in the linked list.
				tail = head;
			}
		}

		// Searches and returns a pointer to the node 
    HTNode* searchNode(std::string key) {
			HTNode* current = head;
			// Search for a node based on its key
			while (current != nullptr) {
				// If the keys match, break off immediately since current is the match
				if (current->key == key) {
					break;
				}
				current = current->next;
			}

      // If they couldn't find the right node
      // it'll return a nullptr, and an error is thrown
      return current;
    }

		void printLinkedList() {
			HTNode* current = head;
			if (isEmpty()) {
				std::cout << "Linked List is empty!" << std::endl;
				return;
			} 
			while (current != nullptr) {
				std::cout << "{"<< current->key << ":" << current->data << "}" << " ";
				current = current->next;
			}
		}
};


class HashTable {
	private:
        int size; // size of the hashtable; it won't run out, but choosing a good start size would be good 
        HTLinkedList* buckets; // pointer to an array of HTLinkedList objects

    public:
        HashTable(int _size = 15) {
            size = _size;
			// Buckets is now a pointer to an array of type HTLinkedList
			buckets = new HTLinkedList[size];
			// Now fill up that array with empty HTLinkedList instances, which represent the empty/base state
			// of our buckets
			for (int i = 0; i < size; i++) {
				buckets[i] = HTLinkedList();
			}
        }
		
        ~HashTable() {
            delete[] buckets;
        }

        // insert a new key value pair 
        void insertPair(std::string key, int value) {
            int index = modulusHash(key);
			/*
			Remember buckets[index] is a pointer of class HTLinkedList. Which means to use the methods of the class on the pointer, 
			You must use arrow notation. 
			*/
			// If key value already exists
			if (isValidPair(key)) {
				throw std::invalid_argument("Insert Error: The key you entered already exists!");
			}

			// Since all buckets have linked lists, we can easily insert a new node that represents key-value pairs
			buckets[index].insertLast(key, value);
        }

        // Finds the position of the linked list, and then finds the node's value they were looking for
		int getValue(std::string key) {
			// Check if it exists or not
			if (!isValidPair(key)) {
				throw std::invalid_argument("Key Error: Key is doesn't exist");
			}

			int index = modulusHash(key);
			HTNode* targetNode = buckets[index].searchNode(key);
			return targetNode->data;
		}

		// Deletes a pair
		void deletePair(std::string key) {
			// Check if the key-value pair associated with said key exists
			if (!isValidPair(key)) {
				throw std::invalid_argument("Key Error: Key doesn't exist");
			}

			// Get index of bucket
			int index = modulusHash(key);
			// Delete the key-value pair by passing the same key
			buckets[index].deleteNode(key);			
		}

		// Update a pair
		void updatePair(std::string key, int value) {
			// First check if the key is valid and exists within the hash table
			if (!isValidPair(key)) {
				throw std::invalid_argument("Key Error: Key doesn't exist");
			}
			
			// Get index position of key's bucket
			int index = modulusHash(key);
			// Get the key since we know it exists 
			HTNode* targetNode = buckets[index].searchNode(key);
			// update it by updating the pointer and data attribute 
			targetNode->data = value;
		}

		// Checks if a pair exists or not and returns a boolean
		bool isValidPair(std::string key) {
			int index = modulusHash(key);

			// Try to get node's pointer from the HTLinkedList, if it's empty, then it'd return null
			HTNode* targetNode = buckets[index].searchNode(key);
			// Return false since key it doesn't exist
			if (targetNode == nullptr) {
				return false;
			} else {
				// Return true since the key does exist
				return true;
			}
		}

        // Modulus hashing: assuming that the keys are strings
        /*
        1. Sum up the ascii values of the letters in the string
        2. Find the remainder of the sum / size of hashtable
        3. Then return the remainder, since it's the index of the key
        */
        int modulusHash(const std::string key) {
            int sum = 0;
			// Using static cast so that both are integers of same type
            for (int i = 0; i < static_cast<int>(key.length()); i++) {
                int asciiValue = static_cast<int>(key[i]);
                sum += asciiValue;
            }
            return sum % size;
        }

		// Prints out all of the linked lists and items in hash table
		void printHashTable() {
			for (int i = 0; i < size; i++) {
				std::cout << "Bucket " << i << std::endl;
				buckets[i].printLinkedList();
			}
		}
};