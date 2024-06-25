#include <iostream>
#include <algorithm>
/*
+ Binary Tree: A data structure resembling a tree; like a tree of possibilities for a coin flip. Where 
each element has a link or connection to the next element. No two nodes point to the same node in a tree.
A binary tree isn't ordered, but there's a version of it called a Binary Search Tree, which is ordered. The former
is very easy to understand, so here we're focusing on the latter.


+ Disadvantages:
    1. Binary Search Trees are not balanced. One of the branches can easily get extraordinarily long, causing the 
    tree to become more linear, than actually be structured like a tree. When this happens, the tree becomes
    unbalanced and performance drops.
    2. Solution: Using a balanced binary tree such as a red-black tree, or an AVL tree, which we will cover later.


+ Definition Continued: Binary tree, T, is empty or:
    1. Has a root node
    2. Has two sets of nodes on its left and right sides , a left and right subtree. 
    Where those subtrees are binary trees of nodes.

+ Performance:
    1. In the case that the tree is linear, like all nodes are placed on only the left or right branch,
    making a line or a chain akin to a linked list. The runtime would be O(n) since it's just a linear search now.
    This is the worse case scenario.
    2. Average number of nodes visited is about 1.39log base 2 n. Whilst number of key comparisons is around 2.77log base 2 n.
    3. Time complexity is O(logn), assuming it's a binary tree, but if the height becomes more skewed, then it 
    degrades.

+ Vocabulary:
- Root Node: The top item/cell in the tree. This is the node without any parents or other nodes pointing to it.
- Node: An item/cell in the tree.
- terminal/leaf nodes: Nodes without children
- Branch: A connection/link between a node and its children nodes. Each node can only have 0, 1, or 2 branches in this case.
- Terminal/leaf nodes: Nodes without children.
- Parent: The connecting node above another node
- Length: Length of a path is number of branches on that path
- Level: Level of a node is number of branches on the path from the root to the node
- Height: Height of a binary tree is the number of nodes on the longest path from root node to a leaf node.
- Predecessor: Largest node in the left subtree; 
- Successor: Smallest node in the right subtree; 
NOTE: Both work when replacing a deleted node with both subtrees for binary search tree.


+ Advantages: 
    1. Allows for efficient sorting, searching and retrieval of data. 
    2. Then it can also reflect some structural relationship in the data, such as a hierarchy.
 

 
+ Example constructing a binary tree:
    1. When we add a new element, compare it to the root. If larger, it goes down to the right, else down to the left
    2. Let's say it's smaller, it goes down to the left subtree. Then we see that position is already taken, so we do 
    the comparison again with that subtree. Then we keep doing it until we are put into an empty position within the tree
    3. With left and right pointers, we can simulate a binary tree. We compare the value of the new element 
    to the data in our root node. We see that it's less so it goes on the left side of the tree. 
    4. Check the left pointer (representing the position for the left subtree or child node). If we see it's empty
    then we know that position isn't taken yet, so we put our data value in there as that new node. 
    5. However, if it isn't empty, we then go to that subtree and compare our value to that subtree. We repeat
    this process until we found the empty spot for our data.
    NOTE: In an array implementation, it would be an array nodes containing left ptr, right ptr, and data. The first
    element would be the root, and the ordering of the array simply indicates the chronological order of which data was added.
    By starting at first element, which you know is the root node, you can then traverse through the tree by looking at 
    the left and right pointers, which could represent the index in the array. 

+ Traversing a binary tree.
- Best done using recursion
- Three depth first strategies: Called depth first because we see how far they can go down first till the leaf nodes,
and then backtrack upwards.
    1. Pre-order: First visit root, then go to left subtree, and then right subtree. Known as top-down traversal
    since we are encountering all of the roots before  
    2. Post-order: First visit left subtree, then right subtree, and finally the root as last. Bottom-up 
    traversal since we are looking at the leaves before the roots.
    3. In-order: First visit the left, then the root, and finally the right subtree.
- Pre, post, and inorder sequences: The sequence that represents the order in which the nodes/information 
in the binary tree is traversed or processed. 

+ Nonrecursive ways of traversing through a binary tree:
  - To do this we use a stack data structure to help us out
*/


// Object representing a node in the binary tree
struct BinaryTreeNode {
    int info; // the data contained in that node
    BinaryTreeNode* leftLink; // pointer to left subtree or child node
    BinaryTreeNode* rightLink; // pointer to right subtree or child node
};

// Class representing the entire tree itself
class BinaryTree {
    public:
        // Constructor initializes a binary tree
        BinaryTree() {
            root = nullptr;
        }

        // Copy constructor
        BinaryTree(BinaryTree& otherTree) {
            // If the other tree is empty, our tree will be empty
            if (otherTree.getRootNode() == nullptr) {
                root = nullptr;    
            } else {
                // Else there are nodes in the other tree that we will copy over
                copyBinaryTree(root, otherTree.getRootNode());
            }

        }

        // Deletes all nodes in binary tree
        void destroy() {
            destroyBinaryTree(root);
        }        

        // if the root is a nullptr, doesn't exist, then there are no nodes in the binary tree
        bool isEmpty() {
            return root == nullptr;
        }

        // Gets the height of the binary tree
        int getHeight() {
            return findBinaryTreeHeight(root);
        }

        // Gets sum of all nodes in the binary tree
        int getSum() {
            return findBinaryTreeSum(root);
        }

        // Gets the root node in the binary tree
        BinaryTreeNode* getRootNode() {
            return root;
        }

        // Searches the binary tree for a given item
        // NOTE: Given a root node, a larger element goes to the right subtree, 
        // while a smaller element on the left subtree.
        bool search(int value) {
            // Base case to cover an empty tree
            if (root == nullptr) {
                return false;
            }

            // Set the current node to the root
            BinaryTreeNode* current = root;
            bool found = false;

            // Perform a binary search on the tree; so while the node exists and we haven't the seek
            while (current != nullptr && !found) {
                // If we find the target value, set found to true so we can break out
                if (current->info == value) {
                    found = true;
                } else if (current->info > value) {
                    // If the current node value is bigger, then we know our value is to the left subtree somewhere
                    // So assign our current to point to the left child node, effectively moving through the tree.
                    current = current->leftLink;
                } else {
                    // This the current value is less than our seek value, so the nodes that could 
                    // have our seek value are could be at the right subtree
                    // Set current to the right child node
                    current = current->rightLink;
                }
            }
            // Return our result
            return found;
        }

        // Inserts an element in the binary tree
        // NOTE: When inserting, we say that larger elements go on the right side whilst smaller elements are left
        void insert(int value) {
            // Create new node for binary tree
            BinaryTreeNode* newNode = new BinaryTreeNode();
            newNode->info = value;
            newNode->leftLink = nullptr;
            newNode->rightLink = nullptr;

            // Check if the tree is already empty, if so we set the root node
            if (root == nullptr) {
                root = newNode;
                return;
            } 
            // Else the root node isn't empty
            // Assign current to the root to start at the top
            BinaryTreeNode* current = root;
            BinaryTreeNode* previous = nullptr;

            // Keep iterating until current is empty, which means previous will be a terminal/leaf node
            // This loop takes us through the binary tree to find where our new node stays.
            while (current != nullptr) {
                // Keep track of previous node, then advance the current in our conditional branches
                previous = current;
                // Check if its equal, which means it's a duplicate and we can't have that in a binary tree
                if (current->info == value) {
                    std::cout << "Binary Tree Error: The value '" << value << "' already exists in tree!" << std::endl;
                    return;
                } else if (current->info > value) {
                    // if current is greater, we'd go to the left for smaller values
                    // Assign current to the left child node
                    current = current->leftLink; 
                } else {
                    // This means current is less than our value so we have to look in the right
                    // subtree to find bigger values
                    // Assign current to the right child node
                    current = current->rightLink;
                }
            }
            // Loop stopped so current is empty, and previous is a leaf node. So our new node will be 
            // a child of 'previous' the leaf node

            // If previous is greater than our value, then the new node should be the left child node
            // since lesser elements go on the left side in the binary tree
            if (previous->info > value) {
                previous->leftLink = newNode;
            } else {
                // This means previous < value, which means our value should go on the right side 
                // of the binary tree
                previous->rightLink = newNode;
            }
        }

        /*
        + Deletion Cases:
        1. We're deleting a leaf since it has no left or right nodes
        2. Target node has no left subtree, but it has a right subtree.
        3. Target node has no right subtree, but has a left one.
        4. Target node has both left and right subtrees
        */
        // Given a value, it deletes a node from the tree
        void deleteNode(int value) {
            // Check if tree is already empty
            if (root == nullptr) {
                std::cout << "Binary Tree: Tree is already empty you can't delete from it!" << std::endl;
                return;
            }

            BinaryTreeNode* current;
            BinaryTreeNode* previous;
            bool found = false;
            // Let current equal root to start at the top 
            current = root;

            // Let's perform a binary search
            while (current != nullptr && !found) {
                previous = current; // keep track of previous or parent node
                // If current node's value equals our target value, then we've foudn it
                if (current->info == value) {
                    found = true;
                } else if (current->info > value) {
                    // Current is greater, so look to the left subtree
                    current = current->leftLink;
                } else {
                    // Current is less, so advance to the right subtree 
                    current = current->rightLink;
                }
            }
            // Check if we didn't find the node
            if (!found) {
                std::cout << "Binary Tree: Could not delete node with value '" << value << "'!" << std::endl;
            }

            // At this point we found the node, but we need to maintain the binary tree after deleting
            // Remember current is our target node to be deleted, and previous is defined as parent node
            if (current == root) {
                // Since we are using a reference of a pointer, it'll change the variable value of 
                // the root variable as well, which is good.
                deleteBinaryTreeNode(root);
            } else if (previous->info > value) {
                /*
                - NOTE: We know 'current' is either previous's left or right child node. So if our target node's 
                parent value is greater than our seek value, we know our target node is the left child node. And vice
                versa! We can't just do deleteBinaryTreeNode(current) because we want to maintain the leftLink and rightLink 
                attributes on our 'previous' or parent node as well. This is the same reason we pass in the 'root'
                variable, as we want to maintain the values through using a reference of a pointer.
                */
                deleteBinaryTreeNode(previous->leftLink);
            } else {
                deleteBinaryTreeNode(previous->rightLink);
            }
        }

        // int getNodeCount


        // displays the preorder sequence of the binary tree
        void preorder() {
            std::cout << "Preorder Sequence: ";
            preorderTraversal(root);
            std::cout << std::endl;
        }

        void inorder() {
            std::cout << "Inorder Sequence: ";
            inorderTraversal(root);
            std::cout << std::endl;
        }

        void postorder() {
            std::cout << "Postorder Sequence: ";
            postorderTraversal(root);
            std::cout << std::endl;
        }

    private:
        BinaryTreeNode* root;

        // That copies over a binary tree given copiedRoot, which is the binary tree we are filling data in, and then
        // otherRoot, which is the tree we are getting the node data from. Using *& to pass 'original' pointer to persist changes
        void copyBinaryTree(BinaryTreeNode* &copiedRoot, BinaryTreeNode* otherRoot) {
            // if the current root of the other tree is now empty, then we reached the end of the other tree
            // So at that point we stop.
            if (otherRoot == nullptr) {
                return; 
            }
            // Create a new node and assign it to the current root/node of the copied tree
            copiedRoot = new BinaryTreeNode();
            // Copy the information from the other tree's node to our new node
            copiedRoot->info = otherRoot->info; 
            // Then repeat this process and go down the next subtrees
            copyBinaryTree(copiedRoot->leftLink, otherRoot->leftLink); 
            copyBinaryTree(copiedRoot->rightLink, otherRoot->rightLink);
        }

        // Destroys all nodes in the binary tree recursively
        // NOTE: Makes sense to do post order for this so that we delete the bottoms first
        // which gives us a way out to delete the roots or parents
        void destroyBinaryTree(BinaryTreeNode* root) {
            if (root == nullptr) {
                return;
            }
            destroyBinaryTree(root->leftLink);
            destroyBinaryTree(root->rightLink);
            delete root;
            root = nullptr;
        }


        // Finds the height of a binary tree, given the root of the tree
        int findBinaryTreeHeight(BinaryTreeNode* root) {
            if (root == nullptr) {
                return 0;
            }
            int leftHeight = findBinaryTreeHeight(root->leftLink);
            int rightHeight = findBinaryTreeHeight(root->rightLink);
            return std::max(leftHeight, rightHeight) + 1; // add one every time to count the level of the current root
        }

        // Given the root of a binary tree, let's make a function to find the sum of all nodes
        // The solution to this is to do things recursively.
        // NOTE: This is using pre-order traversal, which you may have visualized when doing merge sort and 
        // analyzing its binary tree.
        int findBinaryTreeSum(BinaryTreeNode* root) {
            // If the current root/cell is a nullptr, it's empty and we've reached the end of the path so return 0
            if (root == nullptr) {
                return 0;
            }
            // The value of the current cell
            int rootValue = root->info;
            // Call again to get left subtree
            int leftValue = findBinaryTreeSum(root->leftLink); 
            // Call to get the right side
            int rightValue = findBinaryTreeSum(root->rightLink);
            // Add up the values of the root, left, and right sides
            return rootValue + leftValue + rightValue;
        }

        // Here's a delete function I found online as well
        // Node* deleteNode(Node* root, int k)
        //     {
        //         // Base case
        //         if (root == NULL)
        //             return root;
            
        //         // Recursive calls for ancestors of
        //         // node to be deleted
        //         if (root->key > k) {
        //             root->left = deleteNode(root->left, k);
        //             return root;
        //         }
        //         else if (root->key < k) {
        //             root->right = deleteNode(root->right, k);
        //             return root;
        //         }
            
        //         // We reach here when root is the node
        //         // to be deleted.
            
        //         // If one of the children is empty
        //         if (root->left == NULL) {
        //             Node* temp = root->right;
        //             delete root;
        //             return temp;
        //         }
        //         else if (root->right == NULL) {
        //             Node* temp = root->left;
        //             delete root;
        //             return temp;
        //         }
            
        //         // If both children exist
        //         else {
            
        //             Node* succParent = root;
            
        //             // Find successor
        //             Node* succ = root->right;
        //             while (succ->left != NULL) {
        //                 succParent = succ;
        //                 succ = succ->left;
        //             }
            
        //             // Delete successor.  Since successor
        //             // is always left child of its parent
        //             // we can safely make successor's right
        //             // right child as left of its parent.
        //             // If there is no succ, then assign
        //             // succ->right to succParent->right
        //             if (succParent != root)
        //                 succParent->left = succ->right;
        //             else
        //                 succParent->right = succ->right;
            
        //             // Copy Successor Data to root
        //             root->key = succ->key;
            
        //             // Delete Successor and return root
        //             delete succ;
        //             return root;
        //         }
        //     }



        // Helper function that deletes the binary tree node and also handles the cases
        // Pass in *& so that we make changes to the original pointer too
        void deleteBinaryTreeNode(BinaryTreeNode*& targetNode) {
            // Just a check so that we don't pass in any nullptrs     
            if (targetNode == nullptr) {
                std::cout << "Binary Tree: Node that was sent to be deleted doesn't exist" << std::endl;
                return;
            }

            // Declare 3 node pointers that may possibly use
            BinaryTreeNode* current;
            BinaryTreeNode* previous;
            BinaryTreeNode* temp;


            // If our target node is a terminal/leaf node since both subtrees are missing
            if (targetNode->leftLink == nullptr && targetNode->rightLink == nullptr) {
                temp = targetNode; // Assign temp to the targetNode so we can delete the node
                targetNode = nullptr; // assign targetNode to nullptr, which affects all versions
                delete temp; // free the memory address stored in temp
            } else if (targetNode->leftLink == nullptr) {
                temp = targetNode; // Assign temp to the target to be deleted
                /*
                - Since target node is going to be deleted, we replace it with the existing child node
                on the right. This is to maintain the connection with the target node's parent if it has one. Using 
                *& makes it easier since we are passing a reference to that pointer, so we are modifying the original pointer.
                */
                targetNode = temp->rightLink;
                delete temp; // Free the memory
            } else if (targetNode->rightLink == nullptr) {
                // If only the right subtree is missing
                temp = targetNode; // assign the temp to be deleted/freed
                targetNode = targetNode->leftLink; // replace our deleted node with its left child to maintain the parent connection
                delete temp; // delete our target node by freeing memory
            } else {
                /*
                - Else: Our targetNode has both subtrees rather than one so we can't just replace the
                target node with one of the subtrees. To fix this and replace the target node with the "immediate predecessor".
                We need to find the "immediate predecessor", which is just the node that comes after the target node in an "inorder sequence". 
                This can be the rightmost node in the left subtree, which will be the largest value in the left subtree. This works to keep the original 
                order of the target node's subtrees because the predecessor will still be larger than all of the nodes in the target node's left subtre 
                due to us searching to the rightmost node. AND it's still smaller than the target node, preserves the right subtree since all of those 
                values in the right subtree are still bigger than the predecessor.
                */                
                

                // current is the root of the target node's left subtree
                current = targetNode->leftLink;
                previous = nullptr;

                // Continue looping until rightLink doesn't exist so that we can find the 
                // right-most node (predecessor) in the left subtree. 
                while (current->rightLink != nullptr) {
                    previous = current; // keep track of the previous node
                    current = current->rightLink; // advance current by going down the right child nodes
                }
                // Copy the predecessor's value into targetNode
                targetNode->info = current->info;

                // Means if our current node didn't move; it's still the targetNode's left child node;
                // Also means target's left child node didn't have a right subtree
                if (previous == nullptr) {
                    /*
                    - In this case, the left child node of the target didn't have a right subtree, so
                    it is the immediate predecessor. So if we just assign the target node to this left
                    child node it would preserve order. It's still smaller than the target node, which means
                    the right subtree is still good. So we already copied or 'swapped' the target with the 
                    predecessor's information. Now we need to maintain the connection between our target node 
                    with the predecessor's possible left subtree. 

                    - To do this we connect our new target node's (predecessor's value now) left subtree to the 
                    former predecessor's left subtree. This works because the target node's value is the same
                    as the former predecessor's, so assigning it the same left subtree should be good. 
                    */
                    targetNode->leftLink = current->leftLink;
                } else {
                    /*
                    - So we found the rightmost node, and we know it doesn't have a right subtree, but it could 
                    still have a left subtree. When we delete it, we need to maintain the connection
                    of predecessor's parent to the possible nodes in the left subtree. 
                    
                    - So here we make that connection by setting the parent (previous)'s right subtree to
                    be the left subtree of the predecessor. Again this is because in order to delete our 
                    original target node, we're just going to overwrite or 'swap' its value with the predecessor's value.
                    And after doing that, we gotta get rid of the node that previously contained the predecessor's value
                    since we just swapped it. 
                    */
                    previous->rightLink = current->leftLink;
                }

                // Delete the former node that contained the precedessor
                delete current;
            }   
        }

        // Finds amount of nodes in a binary tree
        int findBinaryTreeCount(BinaryTreeNode* root) {
            if (root == nullptr) {
                return 0;
            }
            int leftNodeCount = findBinaryTreeCount(root->leftLink);
            int rightNodeCount = findBinaryTreeCount(root->rightLink);
            return 1 + leftNodeCount + rightNodeCount;
        }


        // Traverses through the binary tree using preorder
        void preorderTraversal(BinaryTreeNode* root) {
            // If current root/node is nonexistent, then stop
            if (root == nullptr) {
                return;
            }
            // Display the info of the current node
            std::cout << root->info << " ";
            // Then look at the left side 
            preorderTraversal(root->leftLink);
            // Then look at the right side
            preorderTraversal(root->rightLink);
        } 

        // Traverses through binary tree using inorder
        // NOTE: Look how it's nearly the same, it's just we structure the recursive calls differently 
        void inorderTraversal(BinaryTreeNode* root) {
            if (root == nullptr) { // if it's an empty node, then retur nit 
                return;
            }
            inorderTraversal(root->leftLink);    
            std::cout << root->info << " ";
            inorderTraversal(root->rightLink);
        }

        // Traverses through binary tree using postorder
        // NOTE: Again it's just we structure the recursive calls differently.
        void postorderTraversal(BinaryTreeNode* root) {
            if (root == nullptr) { // if it's an empty node, then retur nit 
                return;
            }
            postorderTraversal(root->leftLink);
            postorderTraversal(root->rightLink);
            std::cout << root->info << " ";
        }
};





int main() {
    BinaryTree myBinaryTree = BinaryTree();
    myBinaryTree.insert(10);
    myBinaryTree.insert(5);
    myBinaryTree.insert(15);
    myBinaryTree.insert(3);
    myBinaryTree.insert(7);
    myBinaryTree.insert(12);
    myBinaryTree.insert(18);
    myBinaryTree.deleteNode(18);

    myBinaryTree.preorder();
    myBinaryTree.inorder();
    myBinaryTree.postorder();
    return 0;
}