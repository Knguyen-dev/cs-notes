#include <vector>
#include <string>
#include <stack>
class Solution {
public:
    int evalRPN(std::vector<std::string>& tokens) {
        std::stack<int> s;
        for (const std::string& t : tokens) {
            if (t == "+") {
                int right_op = s.top();
                s.pop();
                int left_op = s.top();
                s.pop();
                s.push(left_op + right_op);
            } else if (t == "-") {
                int right_op = s.top();
                s.pop();
                int left_op = s.top();
                s.pop();
                s.push(left_op - right_op);
            } else if (t == "*") {
                int right_op = s.top();
                s.pop();
                int left_op = s.top();
                s.pop();
                s.push(left_op * right_op);
            } else if (t == "/") {
                int right_op = s.top();
                s.pop();
                int left_op = s.top();
                s.pop();
                s.push(left_op / right_op);
            } else {                
                s.push(stoi(t));
            }
        }
        return s.top();
    }
};
