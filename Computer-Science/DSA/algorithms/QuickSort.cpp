/*
+ Quick Sort: Uses divide and conquer algorithm and recursively sorts the array
    1. Select an element that acts as a pivot, we'll pick the last element;
    Our final goal is to have all elements on the left side less than the pivot and all on the right side greater than the pivot, and the pivot in the middle
    2. Now have two indices i and j. i points to the -1 index whilst j points to the 0th index
    3. Check value at j and compare it to the pivot
        - If value at j is >= pivot, leave it alone and increment pivot, and repeat step 3 check
        - If value at j is < pivot, first increment i, then swap values at indices i and j. Now move on to next
        iteration by incrementing j, then repeat step 3.
        NOTE: Repeat this process until j reaches the pivot at the end
    4. Once j reaches pivot, then the resting place of the pivot is at index i + 1. So first increment i, and 
    then swap the value at index i and then the value at the pivot's index. 
    5. Values less than pivot are one partition, and values greater than pivot are the other. Call the quicksort function
    on those sub-arrays (note: pivot shouldn't be included in the sub arrays).

    - So what? A: If you keep doing this division process it's going to break the arrays down into small enough pieces that 
    are sorted by themselves, and then it starts returning those arrays and combining them into the ultimate final sorted away. 
    Well that's in some other implementations, here it doesn't return the arrays, but rather sorts them in place (without using extra arrays)
    
    NOTE: In the visual demonstration the left or lesser side is finished first, and then the process of breaking down happens 
    on the greater side starts.

- Time complexity: O(nlogn) is best case, but O(n^2) is worse case.
*/

#include <vector>
#include <algorithm>



// Actually sorts the items (swaps them around), but mainly returns the index position of where the pivot should be
// Sorts it in place, rather than returning a new array like other implementations
int partition(std::vector<int>& arr, int first, int last) {
    // Assign the pivot value to be the last value in the array
    int pivot = arr[last];
    int i = first - 1; // should be -1 index, one before an actual position
    // Loop through all elements in the array, except for pivot element, which is at last.
    for (int j = first; j < last; j++) {
        // if index j is less than pivot, increment i, and swap the values of the positions i and j.
        if (arr[j] < pivot) {
            i += 1;
            std::swap(arr[i], arr[j]);
        }
    }

    // Loop ending means pivot's position is i + 1
    i += 1; // increment i, then swap i with the position of the pivot
    std::swap(arr[i], arr[last]);

    return i; // returns pivot location
}

// array, and then starting, ending indices
// NOTE: This quickSort implementation sorts in place, so it doesn't create a new list or anything
void quickSort(std::vector<int>& arr, int first, int last) {

    // If both indices are pointing at the same value or an empty array, then the side is already sorted
    if (first >= last) {
        return;
    }

    // Find pivot, and sort partitions of the array
    int pivotIndex = partition(arr, first, last);

    // After we find our pivot we can call quickSort on our lower and upper partitions; no need to include pivot because already 
    // in place.
    quickSort(arr, first, pivotIndex - 1); // sorts our lower half
    quickSort(arr, pivotIndex + 1, last); // sorts our upper half
}
