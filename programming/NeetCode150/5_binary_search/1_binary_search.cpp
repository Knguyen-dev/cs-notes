#include <vector>
class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int i = 0;
        int j = nums.size() -1;
        while (i <= j) {
            int m = (i + j) / 2;
            int mid_num = nums[m];
            if (mid_num == target) {
                return m;
            } else if (mid_num < target) {
                i = m + 1;
            } else {
                j = m - 1;
            }
        }
        return -1;
    }
};