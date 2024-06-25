/*
+ Merge sort: Uses the divide and conquer technique. It splits the list repeatedly until there's
only one element left in each sublist. Then it sorts those elements and merges them back together, building up the sorted list.

- General steps:
    1. If the size of the list is greater than one:
        a. Divide it into two sublists.
        b. Perform merge sort on the first sublist (i.e., recursively call the function to further divide it).
        c. Perform merge sort on the second sublist.
        d. Merge the two sorted sublists.

- Linked List algorithm steps (assuming we don't know the length):
    1. Find the middle of the list using two pointers: mid and current. 
        - mid starts at the first node, while current starts at the third node.
        - If there are only two nodes, set current to nullptr. If there's only one node, it's already sorted.
    2. Advance mid by one node for each two nodes current advances. Eventually, current reaches nullptr, and mid is at the last node of the first sublist.
    3. Cut the list at mid, creating two separate sublists. Keep splitting until each sublist contains only one element.
    4. Start merging the sublists:
        - Let first1 be the first node of the first sublist, and first2 be the first node of the second sublist.
        - Compare the nodes first1 and first2, and add the smaller one to the merged list, setting it as the head of the merged list.
        - Use a pointer called lastMerged to keep track of the last node in the merged list.
        - Advance first1 or first2 to the next node as appropriate and repeat the comparison.

- General algorithm:
    1. Divide: Split the array or list into two halves. This can be done recursively until the base case is reached (array size <= 1).
    2. Merge: Combine the two sorted halves by comparing and merging the elements in sorted order. This step creates a single sorted array from the two subarrays.
    3. Repeat: Continue the process until the entire list is sorted.
*/

#include <vector>
#include <algorithm>

// divideList function: Divides the list into two halves
template <class T>
void divideList(std::vector<T>& firstList, std::vector<T>& secondList) {
    if (firstList.size() <= 1) {
        return;
    }
    int mid = firstList.size() / 2;
    // Assigns the secondList with the firstList's items from the middle to the end
    secondList.assign(firstList.begin() + mid, firstList.end());
    // Since we allocated those elements from firstList, we have to delete those elements
    firstList.erase(firstList.begin() + mid, firstList.end());
}

// mergeList function: Merges two sorted lists into one sorted list
template <class T>
std::vector<T> mergeList(const std::vector<T>& firstList, const std::vector<T>& secondList, bool ascending) {
    std::vector<T> mergedList;
    size_t i = 0; // index for first list
    size_t j = 0; // index for second list
    // Start putting sorted items in the merged list
    while (i != firstList.size() && j != secondList.size()) {
        // The logic if we're sorting in ascending order; so we're pushing in the smaller values first
        if (ascending) {
            if (firstList[i] < secondList[j]) {
                mergedList.push_back(firstList[i]);
                i += 1;
            } else {
                mergedList.push_back(secondList[j]);
                j += 1;
            }
        } else {
            // It's putting in descending order, so we prioritize pushing the larger items first
            if (firstList[i] > secondList[j]) {
                mergedList.push_back(firstList[i]);
                i += 1;
            } else {
                mergedList.push_back(secondList[j]);
                j += 1;
            }
        }
    }
    // Now put the remaining items at the end of the mergedList vector
    for (size_t index = i; index < firstList.size(); index++) {
        mergedList.push_back(firstList[index]);
    }
    for (size_t index = j; index < secondList.size(); index++) {
        mergedList.push_back(secondList[index]);
    }
    // return the merged list
    return mergedList;
}

// mergeSort function: Sorts the items using merge sort algorithm
template <class T>
std::vector<T> mergeSort(const std::vector<T>& items, bool ascending = true) {
    // If the list is empty or there's only one thing, just return the list/stop procedure for that call
    if (items.size() <= 1) {
        return items;
    }
    // Create a second branch or sublist
    std::vector<T> items1 = items;
    std::vector<T> items2;
    // Divide the list
    divideList(items1, items2);
    // call merge sort
    items1 = mergeSort(items1, ascending);
    // call merge sort
    items2 = mergeSort(items2, ascending);
    // mergeList: combine the lists and return the result up the stack
    return mergeList(items1, items2, ascending);
}
