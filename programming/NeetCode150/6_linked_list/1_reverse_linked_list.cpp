
/*
Algorithm:
- temp_next = Create a copy of next
- At the current node: 
    a. If previous node exists, update the next pointer to point at the previous node.
    b. Otherwise, null the pointer.
- prev = current_node
- current = temp_next,
- Continue iteration whilst current_node != nullptr.
  Once you know that current_node == nullptr, you know you reached the end 
  of the list.

Since we have to return the head of the new list, you should return prev,
which is guaranteed to be defined, even if we have a linked list with only one node.
Prev is the tail of your linked list.
*/

struct ListNode {
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (head == nullptr) {
            return head;
        }
        ListNode* current = head;
        ListNode* prev = nullptr;
        while (current != nullptr) {
            ListNode* temp_next = current->next;
            if (prev) {
                current->next = prev;
            } else {
                current->next = nullptr;
            }
            prev = current;
            current = temp_next;
        }
        return prev;        
    }
};