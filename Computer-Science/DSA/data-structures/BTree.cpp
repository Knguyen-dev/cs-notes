/*
+ B Tree Definition: A self-balancing m-way tree datastructure that allows for searching, accessing, inserting,
and deleting in logarithmic time. Since it's called "m-way", each node can have at most m child nodes and m-1 data
values! Akin to a binary search tree, it stores sorted data, but the difference is that it has more than 
two child nodes per node.
 
+ Why use B-Trees? A: Binary search trees get bad when there's a large amount of data, slow performance, and high
memory usage. B-Trees have less height means better performance, making it good for large data. 
    1. For large volumes of data, and this large volume of data probably won't fit into primary memory (RAM).
    For this reason, we want to reduce as much disk operations as possible to reduce the amount of resources taken.
    2. To reduce disk operations (secondary storage which is slow) such as reading input or outputting data. 
    2. I/O operation efficiency dependent on height of the tree (time complexity).
    3. Essentially height _. log base t(n + 1) / 2 or O(log base t n); When graphing the time complexities, you
    see a higher t or log base value, grants a better time complexity (less operations). 

+ Vocab:
    - Keys: These are just data values that are inside of the nodes. These data values are often called keys.
    - "Order of #"?: Refers to the minimum degree of the tree. For example, a b-tree has an order of 6, meaning t=6.
    - Branching factor: Number of children at each node
    - Minimum Degree of a tree: Indicated by t, t >= 2 for b-trees.
    - Nodes: Each node has n keys, however every node has a lower and upper bound on the amount of keys it has. 
    - Internal nodes: Usually nodes that don't include leaf nodes and root


NOTE: There's a lot of ambiguity since there are different definitions for b trees 

+ Operations of B Trees:
    - Search: Similar to a binary search.  
        1. Start at root. Start iterating through all keys in current nodes.
        2. If the values match, then we return that we found it.
        3. Check if the current root/node is a leaf, if so then we failed in finding it. 
        3. If the search value is bigger, go to the right subtreee.
        4. If search value is smaller than current node value, go to left subtree.
        5.  
    - Insert
    - Delete
    - Traverse

+ Rules of a B-tree of order m (m is considered a maximum value for this m-way search tree):
    1. All leaf nodes are on same level
    2. Internal nodes (exclude root): Have at least m/2 (rounded up) children and at most m children. The
    range of keys is [m/2 - 1, m - 1]. 
    3. Root: If the root isn't a leaf, it should have at least 2 and at most m children. This rule is to maintain a 
    balance structure of the tree.
    5. Non-leaf nodes: A node with n-1 keys, must have n children; leaves don't have children
    6. Sorted Rules (ascending): Assume we have key1 and key2, the child between key1 and key2 will contain 
    keys/values that are greater than key1 and less than key2.

+ Rules behind inserting:
    1. A new key is always inserted into a leaf node. We start from the root and go down until we 
    get a leaf node.
    2. If the leaf node has enough space, then we insert it in. Else we have to do a splitting process up 
    the three, which may cause a new root node. See "when splitting a node".

    - When splitting a node:
        The splitting process is caused by the fact that we pass a median value up. If the leaf is full, we split 
        it into two nodes connecting to the parent. And then pass up the median to the parent. 
        If by storing that value, the parent goes over its capacity, we split the parent, and pass up the median 
        value to the grandparent. This process keeps going until it we find a parent that isn't full, 
        or we have to split the root. This causes us to create a new node as the root, split the old root, and
        as a result the tree's height increases.

    - Common insertion cases

    1. Inserting into an empty tree: When the tree is empty, the first key is inserted as the root of the tree.

    2. "Inserting" into Leaf nodes:
        - If full: Split node into two nodes. Move median key to praent and distribute remaining keys between the two
        Usually left half has before median, and right half has after median.
        - Not full: Has space so we insert it into an appropriate position.

    3. "Inserting" into Non-leaf nodes due to splitting up the tree:
        - Is full: Should be split and distribute keys like said earlier, but also children are 
        distributed as well. Left side gets before the median, so it gets all chlidren in range before the median, 
        and the right side it's all children that have values after median.
        - Not full: Has space so the new key (median value) being passed up can just be put in its appropriate position


+ Rules Behind Deleting: Removing a key from any node, internal or leaf. For deleting our main concern
is keeping the node from getting too small. For an order of m, min amount of keys is m/2 - 1 (except root). The 
algorithm will be designed so that a node has at laest one more key then the minimum (m/2). Maintaining
this rule of keeping above the minimum, we maintain the rule of always having at least m/2 -1 keys, so when
deleting we never worry about going under. This keeps a very well structured tree and prevents degeneration.

Assume k is a key, and x is a node.
    1. If k is in x and x is a leaf, then delete key from x; simple
    2a. If k is in x and x is an internal node (and left child has one more than minimum)
    (excluding root):
        - Move the predecessor (max value from left subtree) of x, from the left subtree 
        to the parent (where k is located). Replace k with the predecessor
    2b. Internal node (excluding root; also right child has one more key than min):
        - Move successor (min value from right subtree) of x, from right subtree 
        to the parent (where k is located). Then replace k with the successor
    2c. Both children of x have the minimum amount of keys:
        - Let y be left child of x, and z be the right child. Transfer all keys in z to y, and 
        transfer k into y. Now x doesn't have k, and its pointer to z (its child) is gone. Delete
        k from y, which may need to be done recursively.
    3a. Target node only has min amount of keys, but an immediate siblings has min + 1 keys:
        1. Transfer the min value from parent into the target node, replacing k. 
        2. From the immediate sibling, transfer its min key up to the parent.
        3. Also be sure transfer any appropriate child pointers from sibling to target node.
    3b. A node theta in the recursion path (our downward subtree search path) only has the minimum amount of keys, instead of min + 1:
        1. Transfer all keys from the theta's immediate sibling to theta. Also move the root key to theta.
        2. Now theta is combined to have the keys and children of the sibling. And then the key from the root
        3. Progress down the tree, recursively continue down the tree to delete the key from our target node. If our root is now empty, the height of the tree and the root 
        need to be updated since they've now changed.
*/

#include <iostream>
#include <vector>
#include <string>
class BTreeNode {
	public:
		bool isLeaf;
		std::vector<int> keys;
		std::vector<BTreeNode*> children;

		BTreeNode(bool _isLeaf) : isLeaf(_isLeaf) {}
		
		// Add keys to a node in ordered order
		void nodeAddKey(int key) {
			int i = 0;
			int numKeys = getNumKeys();
			while (i < numKeys && key > keys[i]) {
				i += 1;
			}
			keys.insert(keys.begin() + i, key);
		}

		void nodeDisplayKeys() {
			for (int key : keys) {
				std::cout << key << " ";
			}
			std::cout << std::endl;
		}

		int getNumKeys() {
			return keys.size();
		}

		int getNumChildren() {
			return children.size();
		}
};

class BTree {
	private:
		BTreeNode* root;
		int maxChildren;

		void traverseHelper(BTreeNode* node) {
      int i;
      for (i = 0; i < node->getNumKeys(); i++) {
        // If this is not a leaf, then before printing the key, traverse the subtree rooted with the child
        if (!node->isLeaf) {
            traverseHelper(node->children[i]);
        }
        std::cout << node->keys[i] << " ";
      }

      // Print the subtree rooted with the last child
      if (!node->isLeaf) {
        traverseHelper(node->children[i]);
      }
    }


		// Splits the child node at index of the parent node when there's not enough space in the child node 
		void splitChild(BTreeNode* parent, int index) {
			BTreeNode* targetChild = parent->children[index];
			BTreeNode* newChild = new BTreeNode(targetChild->isLeaf);
			/*
			medianIndex = maxChildren / 2 - 1; this is the index of the median key
			- We get the median key from the targetChild, and insert it into the vector at 
			*/
			int medianIndex = maxChildren / 2 - 1;
			parent->nodeAddKey(targetChild->keys[medianIndex]);
			/*
			- Splits the keys. Leaves all keys from [0, maxChildren / 2 - 1] in targetChild, whilst keys in
			range [maxChildren / 2, end] are put into the newChild. Transfer all keys above median basically
			*/
			for (int i = medianIndex + 1; i < targetChild->getNumKeys(); i++) {
				newChild->keys.push_back(targetChild->keys[i]); // push a key onto newChild
			}
			/*
			- Resizes or keeps the first n elements in the vector, let n = maxChildren / 2, which 
			keeps all of our original values, and removes everything that was moved to newChild from targetChild
			*/
			// Remove all values from medianIndex and to the end, in the targetChild since they've been transferred out
			targetChild->keys.erase(targetChild->keys.begin() + medianIndex, targetChild->keys.end());
			/*
			- If our targetChild isn't a leaf, then we know it has children. 
			We transfer about half of its children to the newChild node, because we transferred over keys that 
			were bigger than the median, we should also transfer over the subtrees that are bigger too to keep
			things sorted.  
			*/
			if (!targetChild->isLeaf) {
				for (int i = medianIndex + 1; i < targetChild->getNumChildren(); i++) {
					BTreeNode* transferChild = targetChild->children[i];
					newChild->children.push_back(transferChild);
				}
				// Erases child nodes from targetChild that were transferred already
				targetChild->children.erase(targetChild->children.begin() + medianIndex + 1, targetChild->children.end());
			}
	    	/*
			- Positions our new child one position to the right of our original child (the left half of the split).
			Which makes sense because they're supposed to be sorted and newChild has the larger values.
			*/
			parent->children.insert(parent->children.begin() + index + 1, newChild);
		}

		// Helper function for inserting keys into the binary tree
		void insertNonFull(BTreeNode* node, int key) {
			// If it's a leaf, then we've successfully reached the right tree, so just add the key
			if (node->isLeaf) {
				node->nodeAddKey(key);
			} else {
				// Else the node isn't a leaf, so we still have to find the correct leaf node 

				// Loop essentially just finds the correct subtree tree 
				int i = node->keys.size() - 1;
				while (i >= 0 && key < node->keys[i]) {
					i -= 1;
				}
				i += 1;

				// If the subtree already has the maximum number of keys
				// We split it. 
				if (node->children[i]->getNumKeys() == maxChildren - 1) {
					splitChild(node, i);
					// Comparing the left and right halfs of the split
					// If our key is bigger than the left half (i), then
					// increment our index to point to the right subtree from the split 
					if (key > node->keys[i]) {
						i += 1;
					}
				}

				// Do our check on our new subtree, repeat until we find a leaf
				insertNonFull(node->children[i], key);
			}
		}

		// Helper function for the search function
		bool searchHelper(BTreeNode* node, int key) {
			// Safety check that can trigger on first call if root is empty
			// Else all others are taken care of when we detect that they're leaf nodes
			if (node == nullptr) {
				return false;
			}

			// NOTE: i < node->getNumKeys() is just an extra safety check to make sure that 
			// the keys you're getting are in range. Usually they are, but it's just a defensive
			// programming technique.

			// Iterate through the keys in the node 
			// Stop looping when we find a key that's bigger or equal to our input key
			int i = 0;
			while (i < node->getNumKeys() && key > node->keys[i]) {
				i += 1;
			}

			// Return true if the keys match
			if (i < node->getNumKeys() && key == node->keys[i]) {
				return true;
			} else if (node->isLeaf) {
				// At this point we didn't find it, and this is also a leaf node, so there are no
				// nodes further down. No chance of our value appearing
				return false;
			} else {
				// We haven't found it, but it isn't a leaf node, so there's still a chance
				// We stopped at keys[i-1] < targetKey <= keys[i], and indexing lets us go to the 
				// right subtree with that range.

				// Do the same search, but further down
				return searchHelper(node->children[i], key);
			}
		}

        /*
        - Let's say you wanted to implement a delete function:
            1. function getSuccessor(root)
            2. function getPredecessor(root)
            3. function mergeNodes(parent, childIndex)
            4. function delete(root, int)
        */ 

	public:
		BTree(int _maxChildren) : maxChildren(_maxChildren) {
			root = nullptr;
		}

		void insertNode(int key) {
			// If our tree is empty
			if (root == nullptr) {
				root = new BTreeNode(true); // our new root is the only one, it is a lea 
				root->nodeAddKey(key);
			} else {
				// Else our tree isn't empty. First check if our root is full, allowing us 
				// to manipulate the root variable and split it before it's done recursively
				if (root->getNumKeys() == maxChildren - 1) {
					BTreeNode* newRoot = new BTreeNode(false); // new root isn't a leaf 
					newRoot->children.push_back(root); // make the old root a child of the new one
					splitChild(newRoot, 0);
					root = newRoot; 
				}
				// Insert the new key at a leaf down the tree, which may cause a splitting process
				insertNonFull(root, key);
			}
		}

		// search function for searching the tree for a certain key
		bool search(int key) {
			return searchHelper(root, key);
		}

		void traverse() {
			if (root == nullptr) {
				std::cout << "B-Tree: The tree is empty!" << std::endl;
				return;
			}
			traverseHelper(root);
		}
};

int main() {
    BTree myTree = BTree(4);
    std::vector<int> myData = {5,2,4,6,7,9,1,3,5,6,7,8,9,10,11,12};
	std::cout << "Inserting data into b-tree: ";
    for (size_t i = 0; i < myData.size(); i++) {
        myTree.insertNode(myData[i]);
		std::cout << myData[i] << " ";
    }
	std::cout << std::endl;

    for (size_t i = 0; i < myData.size(); i++) {
        std::cout << "Searching for value '" << myData[i] << "': " << myTree.search(myData[i]) << std::endl;
    }
}