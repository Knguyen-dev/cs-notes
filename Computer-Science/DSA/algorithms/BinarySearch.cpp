/*
+ Binary search: We use it on a list that's sorted or ordered. Start in the middle, if the element is 
greater than how target, cut the list in half. Then go in the middle again, if it's lower this time, cut the 
top half off and go in the middle again. Keep going until you find the target value.

Advantage: 
    1. Time complexity: log base 2 (n); this is the lower bound for a comparison based algorithm; if you want
    to go faster, you must use an algorithm that isn't comparison based.

- Uses divide and conquer technique of dividing our problems into subproblems (could be with or without recursion). In this case 
we'd be dividing our list in half.

NOTE: For larger input sizes, it may be better for performance to use iterative solution. For smaller input sizes
using recursive may be better
*/

// NOTE: This is binary search without recursion
bool binarySearch(int target, std::vector<int> sortedArray) {
    // Get lower and upper indices
    int lower = 0;
    int upper = sortedArray.size() - 1;
    int mid;
    // Keep looping while there are still elements to look at
    while (lower <= upper) {

        mid = (lower + upper) / 2; // NOTE: Make sure this is an integer! In other languages you may have to, but since int in c++ you're good

        if (sortedArray[mid] == target) {
            return true;
        } else if (sortedArray[mid] < target) {
            // This means the middle is smaller, and low everything lower is smaller.
            // Move so that we look at everything above the middle
            
            // Set the new range to be mid + 1 to ignore all old values
            lower = mid + 1;
        } else {
            // middle and higher is bigger than our target, so look at everything lower
            upper = mid - 1;
        }
    }
    return false;
}


// Here's the binary search with recursion; 
bool recursiveBinarySearch(int target, std::vector<int> sortedArray) {
    // Get length of the array, and create the lower, upper, and middle indices.
    int length = sortedArray.size();
    int lower = 0;
    int upper = length - 1;
    int mid = (lower + upper) / 2;
    // Base Case: Check when there's only one left, then return true or false depending on whether it matches or not
    if (length == 1) {
        if (target == sortedArray[0]) {
            return true;
        } else {
            return false; 
        }
    }
    // If we find it in the middle just return true since we found it
    if (sortedArray[mid] == target) {
        return true;
    } else if (sortedArray[mid] > target) {
        mid -= 1;
        // Slicing where we start at beginning, and end right before the middle, indicated by decrement
        sortedArray = std::vector<int>(sortedArray.begin(), sortedArray.begin() + mid);
    } else {
        // middle was less than our target, so ignore the middle and lower to look at the upper half
        mid += 1;
        // Slicing, we start after the middle since increment, then to the end 
        sortedArray = std::vector<int>(sortedArray.begin() + mid, sortedArray.end());
    }
    // Call the function again with new array; obviously do a return statement so the boolean can go back up the stack
    return otherBinarySearch(target, sortedArray);
}