#include <vector>
#include <algorithm> // required for std::sort
#include <unordered_set>

class Solution {
public:
    bool hasDuplicate_bruteforce(std::vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }

    bool hasDuplicate_sorted(std::vector<int>& nums) {
        // Sort in place
        std::sort(nums.begin(), nums.end());

        // Check for adjacent duplicates
        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] == nums[i+1]) {
                return true;
            }
        }
        return false;
    }

    bool hasDuplicate_hashset(std::vector<int>& nums) {
        std::unordered_set<int> seen_map;
        for (int num : nums) {
            if (seen_map.find(num) != seen_map.end()) {
                return true;
            }
            seen_map.insert(num);
        }
        return false;
    }
};

