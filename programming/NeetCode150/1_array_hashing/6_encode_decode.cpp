#include <string>
#include <vector>

class Solution {
public:
    std::string encode(std::vector<std::string>& strs) {
        std::string encoded;
        for (const auto& s : strs) {
            encoded += std::to_string(s.length()) + '#' + s;
        }
        return encoded;
    }

    std::vector<std::string> decode(std::string s) {
        std::vector<std::string> strs;
        for (int i = 0; i < s.size(); i++) {

            // Extract the length string until we hit '#'
            std::string len_str;
            while (i < s.size() && s[i] != '#') {
                len_str += s[i];
                i++;
            }

            // Convert the length string to an integer
            int len = std::stoi(len_str);
            
            // At this point, i is pointing exactly at '#'
            // The payload starts at i+1. Slice the string:
            std::string payload_str = s.substr(i+1, len);
            strs.push_back(payload_str);

            // Update i =  i + len; after this i will be at 
            // the last character of the current payload. Then
            // the next loop increments i, which puts i at the 
            // start of the next string length.
            i += len;
        }
    }


};