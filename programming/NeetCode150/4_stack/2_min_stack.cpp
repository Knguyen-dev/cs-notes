
#include <stack>

class MinStack {
    std::stack<int> regular_stack;
    std::stack<int> min_stack;
public:
    MinStack() {}
    
    void push(int val) {
        regular_stack.push(val);
        if (min_stack.empty()) {
            min_stack.push(val);
        } else {
            int min = std::min(min_stack.top(), val);
            min_stack.push(min);
        }
    }
    
    void pop() {
        regular_stack.pop();
        min_stack.pop();
    }
    
    int top() {
        return regular_stack.top();
    }
    
    int getMin() {
        return min_stack.top();
    }
};
