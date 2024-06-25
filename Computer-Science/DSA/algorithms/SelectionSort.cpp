/*
+ Selection Sort: Switching positions sort 
    1. Find location of smallest element, and move it to the beginning of the list.
    2. Increment the loop and now look at the second element in the loop. Keep looping to find the min value, 
    and then swap it with the beginning of the unsorted part of the loop, which is everything after index i.
- Time complexity: O(n^2); The time for the inner loop on insertion sort decreases each time with (n - 1), (n -2), etc.
*/
void selectionSort(std::vector<int>& myArr) {
    int length = myArr.size();
    int minValue; 
    int minIndex;

    // Iterate through all elements
    for (int i = 0; i < length; i++) {
        // Set min value and index to the current iteration
        minValue = myArr[i];
        minIndex = i;
        // Then iterate through all elements after it; this is so we don't include i (the element itself) or 
        // things before i, which would already be sorted since we put the minimum values at the front
        for (int j = i + 1; j < length; j++) {
            // Keep looking to find the minimum value in the unsorted part of the list
            if (myArr[j] < minValue) {
                // Assign the new positions and values for the minimum value
                minValue = myArr[j];
                minIndex = j;
            }   
        }
        // After loop ends you have the official min value of the unsorted part, so you swap it with the current position
        // in the outer loop
        std::swap(myArr[i], myArr[minIndex]);
    }
}