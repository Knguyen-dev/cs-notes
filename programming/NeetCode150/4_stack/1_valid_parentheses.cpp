#include <string>
#include <stack>
#include <map>
#include <unordered_set>

class Solution {
public:
    bool ivValid(std::string s) {
        std::unordered_set<char> open_bracket_set = {'(', '[', '{'};
        std::map<char, char> bracket_map = {
            {')', '('}, 
            {']', '['}, 
            {'}', '{'}
        };
        std::stack<char> stack{};
        for (char c : s) {
            // If it's not an open bracket
            if (open_bracket_set.find(c) == open_bracket_set.end()) {
                char expected_top = bracket_map[c];

                // If the stack is empty OR the expected and actual don't match.
                if (stack.empty() || stack.top() != expected_top) {
                    return false;
                }

                // Otherwise, the top of the stack matches what we expect.
                // Now popping the top of the stack.
                stack.pop();
                
            } else {
                // Otherwise an open bracket is pushed onto the stack.
                stack.push(c);
            }
        }

        // If stack is empty, return true, which also means it's valid
        // Otherwise, a non-empty stack means the string wasn't valid.
        return stack.empty();
    }
};