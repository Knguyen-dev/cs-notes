#include <vector>
#include <set>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> threeSum_bruteforce(std::vector<int>& nums) {
        std::set<std::vector<int>> res;
        std::sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                for (int k = j + 1; k < nums.size(); k++) {
                    // Invariant i < j < k
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        res.insert({nums[i], nums[j], nums[k]});
                    }
                }
            }
        }
        return std::vector<std::vector<int>>(res.begin(), res.end());
    }
    
    std::vector<std::vector<int>> threeSum_threePointer(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        std::vector<std::vector<int>> res;

        for (int i = 0; i < nums.size(); i++) {
            // Skip duplicates for i
            if (i > 0 &&  nums[i] == nums[i-1]) {
                continue;
            }
            int j = i + 1;
            int k = nums.size() - 1;
            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                if (sum == 0) {
                    res.push_back({nums[i], nums[j], nums[k]});
                    j++;
                    k--;

                    // Skip duplicates a successful push
                    // NOTE: This prevents duplicate sum=0 pairs from 
                    // being pushed into the vector on subsequent iterations. 
                    // Notice that we don't care about duplicates if they don't sum to 0,
                    // because they won't be pushed inot our vector!
                    while (j < k && nums[j] == nums[j-1]) j++;
                    while (j < k && nums[k] == nums[k+1]) k--;
                } else if (sum > 0) {
                    k--; // lower the sum
                } else { // increase teh sum
                    j++;
                }
            }
        }
        return res;
        
    }
};
