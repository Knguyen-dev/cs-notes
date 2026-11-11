
#include <unordered_map>
#include <vector>
#include <string>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams_sorted(std::vector<std::string>& strs) {
        // Build the map: sorted string -> list of original strings
        std::unordered_map<std::string, std::vector<std::string>> res;
        for (const auto& s : strs) {
            std::string sortedS = s;
            std::sort(sortedS.begin(), sortedS.end());
            res[sortedS].push_back(s);
        }

        // Push all sublists into the result list
        // NOTE: Iterating over kv-pairs 
        std::vector<std::vector<std::string>> result;
        for (auto& pair : res) {
            result.push_back(pair.second);
        }
        return result;
    }

    std::vector<std::vector<std::string>> groupAnagrams_hashmap(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> anagram_group;
        for (const auto& s : strs) {
            // Create frequency list
            std::vector<int> count(26, 0);
            for (const auto& c : s) {
                count[c - 'a']++;
            }

            // Create key from frequency list to act as string
            // NOTE: convert digits into character equivalents
            std::string key = std::to_string(count[0]);
            for (int i = 1; i < 26; i++) {
                key += "," + std::to_string(count[i]);
            }
            // Put into corresponding frequency list
            anagram_group[key].push_back(s);
        }

        // Build the sublist
        std::vector<std::vector<std::string>> result;
        for (const auto& pair : anagram_group) {
            result.push_back(pair.second);
        }
        return result;
    }
};

