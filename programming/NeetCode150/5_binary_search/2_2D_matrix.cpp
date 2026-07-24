#include <vector>
class Solution {
public:
    bool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {
        int row_i = 0; 
        int row_j = matrix.size() - 1;
        int target_row_index = -1;
        while (row_i <= row_j) {
            int row_m = (row_i + row_j) / 2;
            std::vector<int>& row{matrix[row_m]};
            int left = row[0];
            int right = row[row.size() - 1];
            if (left <= target && target <= right) {
                target_row_index = row_m;
                break;
            } else if (target < left) {
                // Look at lower rows
                row_j = row_m - 1;
            } else {
                // target > right, look at higher rows
                row_i = row_m + 1;
            }
        }
        if (target_row_index == -1) {
            // Target row not found
            return false;
        }

        std::vector<int>& target_row{matrix[target_row_index]};
        int col_i = 0;
        int col_j = target_row.size() - 1;
        while (col_i <= col_j) {
            int col_m = (col_i+col_j) / 2;
            int m = target_row[col_m];
            if (m == target) {
                return true;
            } else if (m < target) {
                col_i = col_m + 1;
            } else {
                col_j = col_m - 1;
            }
        }
        return false;
    }
};