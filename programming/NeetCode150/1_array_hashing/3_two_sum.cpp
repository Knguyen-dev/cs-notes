#include <vector>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    std::vector<int> twoSum_bruteforce(std::vector<int>& nums, int target) {
        std::vector<int> result;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    // invariant: i < j
                    return {i, j};
                }
            }
        }
        // Should be unreachable.
        return {};
    }

    std::vector<int> twoSum_sorting(std::vector<int>& nums, int target) {
        // Create array of tuples and sort it
        std::vector<std::pair<int, int>> A;
        for (int i = 0; i < nums.size(); i++) {
            A.push_back({nums[i], i});
        }
        std::sort(A.begin(), A.end());

        // Two pointers approach 
        int i = 0, j = nums.size() - 1;
        while (i < j) {
            int sum = A[i].first + A[j].first;
            if (target == sum) {
                // Return smaller index first and larger index second
                return {
                    std::min(A[i].second, A[j].second),
                    std::max(A[i].second, A[j].second)
                };
            } else if (sum < target) {
                i++;
            } else {
                j--;
            }
        }
        return {};
    }

    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        // Build index map; val -> index
        std::unordered_map<int, int> indices; 
        for (int i = 0; i < nums.size(); i++) {
            indices[nums[i]] = i;
        }
        // Iterate
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            // If the complemnet exists AND the 
            // indices don't match (not the same number)
            // then we found a match.
            if (indices.find(diff) != indices.end() && indices[diff] != i) {
                return {i, indices[diff]};
            }
        }
        // no pair found; should be 
        // unreachable given our conditions
        return {};
    }
};

