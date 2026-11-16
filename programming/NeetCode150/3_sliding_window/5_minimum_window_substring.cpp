#include <string>
#include <unordered_map>
#include <vector>
#include <utility>
#include <algorithm>
#include <climits>

class Solution {
public:
    std::string minWindow(std::string s, std::string t) {
        if (t.length() > s.length()) return "";        
        int min_size = INT_MAX;
        std::pair<int, int> min_indices(-1,-1);
        std::unordered_map<char, int> window_count, t_count;
        for (char c : t) {
            t_count[c]++;
        }

        int haves = 0, needs = t_count.size();
        int i = 0;
        for (int j = 0; j < s.size(); j++) {
            // a. Include rightmost character in window count.
            // b. If c is in t_count, we can compare their counts.
            //    If including c makes the window align with t, then 
            //    we fulfilled a condition.
            char c = s[j];
            window_count[c]++;
            if (t_count.count(c) && window_count[c] == t_count[c]) {
                haves++;
            }

            while (haves == needs) {
                // If the valid window is smaller, record the size and indices
                if ((j-i+1) < min_size) {
                    min_size = j-i+1;
                    min_indices = {i, j};
                }
                window_count[s[i]]--;
                if (t_count.count(s[i]) && window_count[s[i]] == t_count[s[i]] - 1) {
                    // Decrementing haves will break us out of this loop.
                    // Therefore we won't somehow recount things.
                    haves--;
                }
                i++;
            }
        }
        return min_size == INT_MAX ? "" : s.substr(min_indices.first, min_size);
    }
};