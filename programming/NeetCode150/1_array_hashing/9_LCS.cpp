#include <vector>
#include <algorithm>
#include <unordered_set>

class Solution {
public:

    int longestConsecutive_bruteforce(std::vector<int>& nums){
        int max_streak = 0;
        std::unordered_set<int> numSet(nums.begin(), nums.end());
        
        for (int num : nums) {
            // 1. Let num be the start of the streak
            int streak = 0, curr = num;

            // 2. While the current (expected) number is in the set
            while (numSet.find(curr) != numSet.end()) {
                streak++;
                curr++;
            }

            // 3. sequence with 'num' has ended
            max_streak = std::max(max_streak, streak);
        }
        return max_streak;

    }

    int longestConsecutive_hashset(std::vector<int>& nums) {
        int max_streak = 0;
        std::unordered_set<int> numSet;
        for (int num : nums) {
            numSet.insert(num);
        }
        for (const int& num : numSet) {
            // Not the start of a sequence
            if (numSet.count(num-1)) {
                continue;
            }

            // Start of a sequence, counts the entire sequence
            int length = 1;
            while (numSet.count(num + length)) {
                length++;
            }
            max_streak = std::max(max_streak, length);
        }
        return max_streak;
    }
};