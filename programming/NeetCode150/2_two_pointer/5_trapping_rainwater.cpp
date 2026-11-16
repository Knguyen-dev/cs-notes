#include <vector>
#include <algorithm>

class Solution {
public:

    int trap_array(std::vector<int>& height) {
        // 1. Build the prefix and suffix arrays
        // NOTE: Using this approach, edge cells get a maxLeft and maxRight of 0 by default
        std::vector<int> maxLeft(height.size());
        std::vector<int> maxRight(height.size());
        int max_l = 0;
        int max_r = 0;
        for (int i = 0; i < height.size(); i++) {
            int j = height.size() - 1 - i;
            maxLeft[i] = max_l;
            maxRight[j] = max_r;
            if (height[i] > max_l) {
                max_l = height[i];
            }
            if (height[j] > max_r) {
                max_r = height[j];
            }
        }

        // 2. Calculate water height for every position
        int res = 0;
        for (int i = 0; i < height.size(); i++) {
            int water_height = std::min(maxLeft[i], maxRight[i]) - height[i];
            if (water_height > 0) {
                res += water_height;
            }
            
        }
        return res;
    }
};