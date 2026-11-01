#include <unordered_map>
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<int> topKFrequent_sort(std::vector<int>& nums, int k) {
        // Build frequency list
        std::unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        // Array of tuples {frequency, original number}
        // NOTE: Array is sorted in ascending order.
        std::vector<std::pair<int, int>> arr;
        for (const auto& p : count) {
            arr.push_back({p.second, p.first});
        }
        std::sort(arr.begin(), arr.end());

        // Build array of most common original numbers
        // NOTE: Use .second because that's the position of the original number.
        std::vector<int> res;
        for (int i = 0; i < k; i++) {
            res.push_back(arr[arr.size() - 1 - i].second);
        }
        return res;
    }

    std::vector<int> topKFrequent_array(std::vector<int>& nums, int k) {
        // Bulid frequency list; num -> count
        std::unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        // Build the array index by occurrence;
        // where freq_arr[i] is an array containing 
        // all numbers that have a count of i
        std::vector<std::vector<int>> freq_arr(nums.size() + 1);
        for (const auto& kv_pair : count) {
            freq_arr[kv_pair.second].push_back(kv_pair.first);
        }
        
        // Iterate from the end to 1 (occurrence of 1)
        std::vector<int> result;
        for (int i = freq_arr.size() - 1; i >= 1; i--) {
            // Iterate over the sublist and 
            // add elements from the sublist into the 
            // result array
            std::vector<int>& sublist = freq_arr[i];
            for (int j = 0; j < sublist.size(); j++) {
                result.push_back(sublist[j]);
                if (result.size() == k) {
                    return result;
                }   
            }

        }
        return result;
    }
};