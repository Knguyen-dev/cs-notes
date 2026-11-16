#include <string>
#include <algorithm>
#include <unordered_map>

class Solution {
public:
    bool isAnagram_sort(std::string s, std::string t) {
        // Length check that quickly rules out wrong answers.
        if (s.length() != t.length()) {
            return false;
        }
        // Sort check
        std::sort(s.begin(), s.end());
        std::sort(t.begin(), t.end());
        return s == t;
    }

    bool isAnagram_hashmap(std::string s, std::string t) {
        // Quick length check for filtering out wrong answers.
        if (s.length() != t.length()) {
            return false;
        }

        // Build frequency lists
        std::unordered_map<char, int> countS;
        std::unordered_map<char, int> countT;
        for (int i{0}; i < s.length(); i++) {
            countS[s[i]]++;
            countT[t[i]]++;
        }

        // Compare frequency lists 
        return countS == countT;
    }
};