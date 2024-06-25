/*
+ Sequential Search: Loop through the elements until one matches, or the item isn't in the list
- Time complexity: O(n)
    1. Best case: O(1)
    2. Worst Case: O(n)
    3. Average Case: Consider all cases and find number of comparisons (steps) for each case. Add them up
    and divide number of cases. So (n + 1) / 2 is average case. NOTE: Average case is also somewhat important for this.
*/
bool sequentialSearch(int seek, int arr[], int size) {
    for (int i = 0; i < size; i++) {
        if (arr[size] == seek) {
            return true;
        }
    }
    return false;
}