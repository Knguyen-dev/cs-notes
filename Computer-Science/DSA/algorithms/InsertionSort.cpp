/*
+ Insertion Sort: Sort that slides stuff towards beginning and looks at elements before it
    1. Ignore the first element and assume it's already sorted, look at the second element, and store it in current
    2. Compare current with the first element, if the first is greater, then switch them.
    3. Now the first two elements are sorted.
    4. If the third element is smaller then the previous, then keep swapping it until it's in the correct place
    5. Keep doing this for the rest of them 
*/

void insertionSort(std::vector<int>& myArr) {
    int length = myArr.size();

    // Start from the second value to the end
    for (int i = 1; i < length; i++) {
        int currentValue = myArr[i];
        int j = i - 1;

        // Shift elements of the sorted segment forward to make space for the currentValue
        while (j >= 0 && myArr[j] > currentValue) {
            myArr[j + 1] = myArr[j];
            j--;
        }
        // Insert the currentValue in its correct position
        myArr[j + 1] = currentValue;
    }
}