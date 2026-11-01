#include <vector>
class Solution {
public:
    std::vector<int> productExceptSelf(std::vector<int>& nums) {
        std::vector<int> left(nums.size());
        std::vector<int> right(nums.size());
        std::vector<int> output(nums.size());

        // Build left and right array
        int left_product = 1;
        int right_product = 1;
        for (int i = 0; i < nums.size(); i++) {
            int j = nums.size() - i - 1;
            left[i] = left_product;
            left_product *= nums[i];
            right[j] = right_product;
            right_product *= nums[j];
        }

        // Build output array using parallel arrays
        for (int i = 0; i < nums.size(); i++) {
            output[i] = left[i] * right[i];
        }
        return output;
    }
};