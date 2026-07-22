#include <string>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        int res = 0;
        std::unordered_set<char> set;
        int i = 0, j = 0;
        while (j < s.size()) {
            // If s[j] is already in the window, shrink window from the left
            while(set.count(s[j]) == 1) {
                set.extract(s[i]);
                i++;
            }
            // Finally include s[j] in the window
            // Update res
            // go to next character
            set.insert(s[j]);
            res = std::max(res, j-i+1);
            j++;
        }
        return res;   
    }
};