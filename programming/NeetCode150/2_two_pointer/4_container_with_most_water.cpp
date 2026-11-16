
#include <vector>
#include <algorithm>
class Solution {
public:
    int maxArea_bruteforce(std::vector<int>& heights) {
        int res{0};
        for (int i = 0; i < heights.size(); i++) {
            for (int j = i + 1; j < heights.size(); j++) {
                res = std::max(res, std::min(heights[i], heights[j]) * (j - i));
            }
        }
    }

    int maxArea_twopointers(std::vector<int>& heights) {
        int res = 0;
        int i = 0, j = heights.size() -1;   
        while (i < j) {
            res = std::max(res, std::min(heights[i], heights[j]) * (j - i));
            if (heights[i] < heights[j]) {
                i++;
            } else {
                j--;
            }
        }
        return res;
    }
};