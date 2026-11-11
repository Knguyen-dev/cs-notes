#include <string>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int sliding_window_1(std::string s, int k) {

        // Build the character set 

        int res{0};
        std::unordered_set<char> char_set(s.begin(), s.end());
        for (char c : char_set) {
            // For a given character 'c', find all valid windows
            // when we focus on c.
            int count = 0, l = 0;
            for (int r = 0; r < s.size(); r++) {

                // Account for the character c
                if (s[r] == c) {
                    count++;
                }

                // Ensure the window is valid (shrink if necessary)
                // a. window_len = r - l + 1;
                // b. num_to_replace = window_len - count;
                while ((r-l+1) - count > k) {
                    if (s[l] == c) {
                        count--;
                    }
                    l++;
                }

                // ATP, we have a valid window. record it
                res = std::max(res, r-l+1);
            }
        }
        return res;
    }


    int find_most_common(std::unordered_map<char, int>& map) {
        int res = 0;
        for (const auto& [key, value] : map) {
            if (value > res) {
                res = value;
            }
        }
        return res;
    }

    int sliding_window_2(std::string s, int k) {
        int res = 0;
        std::unordered_map<char, int> char_map;
        int i = 0;
        for (int j = 0; j < s.size(); j++) {
            char_map[s[j]] += 1;
            int m = find_most_common(char_map);
            while ((j-i+1) - m > k) {
                char_map[s[i]] -= 1;
                i++;
                m = find_most_common(char_map);
            }
            res = std::max(res, j-i+1);
        }
        return res;
    }
};