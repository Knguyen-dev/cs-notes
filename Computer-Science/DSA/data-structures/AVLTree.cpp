/*
+ Perfectly Balanced Binary Tree:
    1. Heights of left and right subtrees of the root are equal.
    2. The left and right subtrees of the root are perfectly balanced

+ AVL Tree: A height-balance binary tree 
    1. The heights of the left and right subtrees of the root differ by at msot 1 node
    2. Left and right subtrees of the root are AVL trees as well, meaning
    their subtrees should follow the rule of only differing by at most 1 node.
    NOTE: Remember height is the amount of nodes from the longest path from root to leaf, counting the root,
    leaves, and all nodes in between on the path. On an AVL Tree, the height will always be O(logn)

    
+ Theorem:
- x be a node in the binary tree. 
- xl is the height of the left subtrees of x. 
- xr is the height of the right subtree of x.

    - Theorem: Let T be an AVL Tree and x a node in T. Then, |xr - xl| <= 1.
    `NOTE: This basically means the difference between the heights of the 
    `left and right subtrees of a givne node is at most 1 node.
        1. If xl > xr, x is "left high" as xl = xr + 1; 
        NOTE: The height of the left subtree is larger "higher" than the 
        height of the right one. Since height difference is at most 1, 
        the left subtree is only one node higher. 
        2. If xl = xr, 'equal high' since heights are equal.
        3. If xl < xr, 'right high'; since right subtree has more height

    - Definition (Balance Factor): Balance factor of x, is defined
    by the equation bf(x) = xr - xl, or sometimes leftHeight - rightHeight;
        1. If x is left high, bf(x) = -1; 
        2. If x is equal high, bf(x) = 0;
        3. If x is right high, bf(x) = 1;

    - Definition (Balance Criteria Violation): Node x violates the 
    balance criteria if |xr - xl| > 1; If the heights of the left and right
    subtrees differ by more than 1 node, it breaks the balancing rules of avl trees. Balance factor

+ AVL Tree Operations: Most operations are the same
    1. Search
    2. finding height
    3. finding node count
    4. checking if tree is empty
    5. Insertion: Different
    6. Deletion: Different


+ Rotations: We rearrange the nodes to keep that balance in the AVL tree

	- credit: https://www.youtube.com/watch?v=_nyt5QYel3Q
    - Assume we have node A as the top node in one of the four pattern, B as middle, and C as bottom. 
    Also assume that these nodes could be anywhere within the binary tree, and have some number of subtrees below them. 

    NOTE: These 4 binary patterns on their own, are the ones we see when a balance issue happens. HOWEVER, these 
    times these patterns can exist IF there are other nodes so the height balances out. But when there's a balance violation, 
    you're going to deal with these patterns. 
    
    - Right rotation: Counter-clockwise motion rotation
		1. Let node A be the top, B is a child, and C is grandchild
		2. A's left child (B) becomes new root. A becomes B's right Child.
		3. B has a potential right subtree (t). Transfer that right subtree so that t is B's left subtree.
		4. C should remain the same as B's left child	

    - Left rotation: Counter-clockwise motion rotation
		1. Make A's right child new root (B).
		2. Make A the left child of B.
		3. Then get B's left subtree (t). Make t the right child of A.
		4. C should remain the same

    1. LL Case: Do a right rotation with A as the top node
        A
       / \
      B   t4
     / \
    C   t1
   / \
  t2  t3

    2. RR Case:(): Do a left rotation with node A as top node.
    A
   / \
  t2  B
     / \
    t1  C
       / \
      t4  t3

    3. LR Case: Do a left rotation with the middle node (B) (left-child of the top node A), 
    so B is treated as the top node temporarily. Then at this point we have a left-left-imbalance
    , simplifying the pattern. Finally do a right rotation on A.
      A
     / \
    B   t4
   / \
  t3  C
     / \
    t1  t2

    4. RL Case: Do a right rotation on the middle node (B) (or the right child of the top node), 
    which treats B as a top node. Then do a left rotation on Node A.
    A
   / \
  t1  B
     / \
    C   t2
   / \
  t3  t4



+ Inserting into AVL Trees:
    - We search the tree to find the position, if duplicate error, else we place it there.
    - Now we may need to restore balance by traveling the same path as search, the nodes
    on this path are the parts of the tree we focus on.
    - Assume we're talking about node X
    
        1. Left Heavy: Left child of the left subtree is imbalanced; top right to bottom left line
        2. Right Heavy: Right child of right subtree is imbalanced; top left to bottom right line 
        3. Left-Right: Left Child with right subtree.
        4. Right-Left: Right Child with left subtree.

+ Deleting from AVL Trees:
    - Basic process:
    1. First perform a binary traversal down the tree to find the value you want to delete like normal.
    2. Then let's say you find the target node you want to delete. So delete that node like normal.
    3. Then start from the target node's parent we recursively update the height and balance factor of the 
    nodes that were on our path. When we find any unbalanced nodes on the path, we fix them.
*/ 

#include <iostream>
#include <string>
#include <vector>

class AVLNode {
    public:
        int info;
        int bFactor; // balance factor
        int height;
        AVLNode* leftLink;
        AVLNode* rightLink;

        // Constructor and initialize all of the default values; values will be changed accordingly later
        // in the program
        AVLNode(int _info) {
            info = _info;
            bFactor = 0;
            height = 0;
            leftLink = nullptr;
            rightLink = nullptr;
        }

        ~AVLNode() {}
};

class AVLTree {
    private:
        AVLNode* root;
    
        // Helper function for finding the height of the tree
        int getMax(int x, int y) {
            if (x > y) {
                return x;
            } else {
                return y;
            }
        }

        // Preorder traversal helper function
        void preorderHelper(AVLNode* node) {
            if (node == nullptr) {
                return;
            } else {
                std::cout << node->info << " ";
                preorderHelper(node->leftLink);
                preorderHelper(node->rightLink);
            }
        }

        // Deletes all nodes
        void destroyTreeHelper(AVLNode* node) {
            if (node == nullptr) {
                return;
            } else {
                destroyTreeHelper(node->leftLink);
                destroyTreeHelper(node->rightLink);
                delete node;
            }
        }

        // Finds height of tree at a given avl tree, treats node as the root
        int getTreeHeightHelper(AVLNode* node) {
            if (node == nullptr) {
                return 0;
            } else {
                int leftHeight = getTreeHeightHelper(node->leftLink);
                int rightHeight = getTreeHeightHelper(node->rightLink);
                return getMax(leftHeight, rightHeight) + 1; // increment 1 to count the level/height of the node
            }
        }

        // Finds balance factor of a given tree
        // NOTE: Balance factor, bf(x) = height of right subtree - height of left subtree
        int getBalanceFactorHelper(AVLNode* node) {
			int rightHeight = getTreeHeightHelper(node->rightLink);
			int leftHeight = getTreeHeightHelper(node->leftLink);
			return rightHeight - leftHeight;
        }

        // Checks if nodes need rotation
        // 'node' represents root of the pattern, 'info' is the value of the new node that was inserted
        AVLNode* balanceNode(AVLNode* node, int info) {
            // Assuming the bFactor = height of right subtree - height of left subtree
            // Right subtree is heavy
            if (node->bFactor > 1) {
                // right-right case
                /*
                - This is because our new node value is bigger than the parent's right subtree. This means the 
                new node will be on the right of the right child, making a right-right pattern that caused a 
                balance violation
                */
                if (info > node->rightLink->info) {
                    std::cout << "AVL Tree: Right-Right Imbalance at node '" << node->info << "' when inserting '" << info << "'!" << std::endl;
                    node = leftRotate(node);
                } else {
                    // else a right-left case
                    /*
                    - Else it's less, so the new node was placed as the left child of the right subtree. Making
                    a right-left case.
                    */
                    std::cout << "AVL Tree: Right-Left Imbalance at node '" << node->info << "' when inserting '" << info << "'!" << std::endl;
                    node->rightLink = rightRotate(node->rightLink);
                    node = leftRotate(node);
                }
            } else if (node->bFactor < -1) {
                // Else tree is somehow left-heavy
                // Left-left case 
                if (info < node->leftLink->info) {
                    std::cout << "AVL Tree: Left-Left Imbalance at node '" << node->info << "' when inserting '" << info << "'!" << std::endl;
                    node = rightRotate(node);
                } else {
                    // Left-right case
                    std::cout << "AVL Tree: Left-Right Imbalance at node '" << node->info << "' when inserting '" << info << "'!" << std::endl;
                    node->leftLink = leftRotate(node->leftLink);
                    node = rightRotate(node);
                }
            }
            return node;
        }

        // Does a right rotation; 'node' argument is the top node in the pattern 
        AVLNode* rightRotate(AVLNode* node) {
            // Top node's left child becomes the new root of the pattern 
			AVLNode* newRoot = node->leftLink;
            // Get the new root's right child, which will transfer over
			AVLNode* subtree = newRoot->rightLink;
            // Make the passed node the right child of the new root
			newRoot->rightLink = node;
            // Make that subtree we got earlier into the left subtree of the passed node
			node->leftLink = subtree;
            // Update the heights of the passed node and new root. This is because 
            // The subtree from the newRoot was transferred to node, which can changes 
            // their heights. 
			node->height = getTreeHeightHelper(node);
			newRoot->height = getTreeHeightHelper(newRoot);
            // return the newRoot since it's the top of our subtree now
			return newRoot;
		}

        // Does a left rotation on a given node. Treats 'node' as the root or top node
		AVLNode* leftRotate(AVLNode* node) {
            // Make the passed node's right child the new root
			AVLNode* newRoot = node->rightLink;
            // Save the left subtree of the new root to be transferred
			AVLNode* subtree = newRoot->leftLink;
            // Make the passed node the left child of the new root
			newRoot->leftLink = node;
            // Transfer that subtree from earlier and make it the right subtree of the passed node
			node->rightLink = subtree;
            // Now update the heights of the node and new node because we 
            // transferred a subtree from newRoot to node, which can affect the heights.
			node->height = getTreeHeightHelper(node);
			newRoot->height = getTreeHeightHelper(newRoot);
			return newRoot;
		}

        // Insert function that recursive inserts on the path down, and then rebalances stuff on the path up
        /*
        - node: passed node that changes each recursive call in order to traverse down the tree
        - info; the value or key of the new node that we're trying to insert into the binary tree.
        */
        AVLNode* insertNodeHelper(AVLNode* node, int info) {
            // if we reach a nullptr, we return a new node, which will connect to either the left or right link
            if (node == nullptr) {
                return new AVLNode(info);
            }

            // Traverse down the tree with comparisons
            if (info > node->info) {
                node->rightLink = insertNodeHelper(node->rightLink, info);
            } else if (info < node->info) {
                node->leftLink = insertNodeHelper(node->leftLink, info);
            } else {
                // Value already exists so it's an error, we avoid errors by returning the original node that 
                // was passed, which leaves the tree untouched with its potential parents.
                std::cout << "AVL Tree: Error insert value '" << info << "' already exists!" << std::endl;
                return node;
            }
            node->height = getTreeHeightHelper(node);
            node->bFactor = getBalanceFactorHelper(node);
            /*            
            - For all nodes on the path to the new node or the node where the key is if the insert operation
            failed. We adjust their heights, balance factor, and if needed we perform rotations.
            - Let's focus on when we successfully insert a new node because that's when rotations and changes
            happen. Else in a failed case we're kind of calculating the same heights, balance factors, and 
            not going to do any rotations since the tree didn't change. 
            
            NOTE: Since it starts at the parent of the new node, since the new node is a leaf the balance factor won't 
            be greater than one so a rotation won't trigger. However rotations will start triggering on the way up
            since there are enough nodes to make the absolute value of the balance factor greater than one.
            
            NOTE: Though leaving a balance factor of 0 is good, and normally leaving the height of the newly inserted
            leaf node is 1 since its one high so we leave it. 
            */
            node = balanceNode(node, info);
            return node; // return node to maintain the tree's chain.
        }
    public:
        AVLTree() {
            root = nullptr; 
        }

        ~AVLTree() {
            destroyTree();
        }

        // Destroys entire binary tree
        void destroyTree() {
            destroyTreeHelper(root);
            root = nullptr; // set root directly to nullptr since we freed its memory, and its an attribute of the class
        }

        // Inserting a key node into an avl tree
        void insertNode(int info) {
            root = insertNodeHelper(root, info);
        }
        
        // Classic search function
        bool search(int info) {
            AVLNode* current = root;
            bool found = false; 
            while (current != nullptr && !found) {
                if (current->info == info) {
                    found = true;
                 } else if (current->info > info) {
                    current = current->leftLink;
                } else {
                    current = current->rightLink;
                }
            }
            return found;
        }

        // Preorder traversal through entire tree
        void preorder() {
            std::cout << "Preorder: ";
            preorderHelper(root);
            std::cout << std::endl;
        }

        // Gets height of entire binary tree
        int getTreeHeight() {
            return getTreeHeightHelper(root);
        }
};

int main() {
    AVLTree myTree;
    std::vector<int> myData = {5, 7, 9, 10, 8, 6, 3, 4, 2, 1};
    std::cout << "Data being pushed into avl tree: ";
    for (int data : myData) {
        std::cout << data << " ";
    }
    std::cout << std::endl;

    for (int data : myData) {
        myTree.insertNode(data);
        myTree.preorder();
    }
    return 0;
}