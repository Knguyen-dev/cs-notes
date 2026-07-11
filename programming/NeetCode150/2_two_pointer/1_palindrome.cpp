#include <string>
#include <bits/stdc++.h>
class Solution {
public:
    bool isPalindrome_reverse(std::string& s) {
        // Create copy of the string that is alphanumeric only.
        // NOTE: I don't think this is fully needed though.
        std::string newS = "";
        for (char c : s) {
            if (std::isalnum(c)) {
                newS = newS + c;
            }
        }
        std::string newS_reversed = std::string(newS.rbegin(), newS.rend());
        return newS == newS_reversed;
    }

    bool isPalindrome_twopointers(std::string& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            // While in range and l is not alphanumeric
            while (l < r && !std::isalnum(s[l])) {
                l++;
            }
            while (l < r && !std::isalnum(s[r])) {
                r--;
            }
            if (std::tolower(s[l]) == std::tolower(s[r])) {
                l++;
                r--;
            } else {
                return false;
            }
        }
        return true;
    } 
}