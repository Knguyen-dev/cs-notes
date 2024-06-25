/*
+ Bubble Sort: Adjacent sorting algorithm; slides maximum values to the end
    1. Given a list of n elements, we look at the range [0, n-1].
    2. Look at list[i] and list[i + 1], if current is bigger than next, then swap their positions.
    3. We then keep repeating step 2, until our current is <= our next value. If it's true we break
    and then go to the next index position. This is a nested loop situation.

    NOTE: On each iteration it pushes the largest element to the back, and then makes it so we don't touch
    that last element again. 

    4. Bubble isn't teh best sorting algorithm, and so it's mainly used to starting out with sorting algorithms
    and for demonstration purposes. 

- Time complexity: O(n^2)
*/

void bubbleSort(std::vector<int>& myArray) {
    int length = myArray.size();
    bool swapped; // Whether an outer loop iteration had switched anything

    // Do n - 1 iterations, because each loop puts the highest number in position; after this it's sorted
    for (int i = 0; i < length - 1; i++) {
        swapped = false; 
        // We minus i because every iteration of outer loop puts the largest element last
        // i elements are already sorted, so we minus i to take those positions out of the range.

        // Starts at beginning and swaps till the end
        for (int j = 0; j < length - i - 1; j++) {
            if (myArray[j] > myArray[j + 1]) {
                std::swap(myArray[j], myArray[j + 1]);
                swapped = true;
            }
        }
        // Each loop of bubble sort starts from beginning and goes to the end or upper bound, and 
        // gets the largest element in this place. Essentially, if nothing was swapped, then it's already sorted
        if (!swapped) {
            break;
        }
    }
}