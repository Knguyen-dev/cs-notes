#include <vector>
#include <stack>


class Solution {
public:
    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
        
        // NOTE: pair->first = temperature, pair->second = index
        std::vector<int> results(temperatures.size(), 0);
        std::stack<std::pair<int, int>> s;
        for (int i = 0; i < temperatures.size(); i++) {
            
            while (s.size() > 0 && temperatures[i] > s.top().first) {
                // Implies current temperature is higher than the top
                // a. Pop off the top temperature
                // b. Write the results[] array with teh answer.
                std::pair<int, int> popped_day = s.top();
                s.pop();
                results[popped_day.second] = i - popped_day.second;
            }

            // At this point, this means either the stack s has a size of 0, OR
            // the current temperature isn't bigger than the top of the stack.
            // In either case, the only thing we can do is psuh our temperature and index 
            // onto the stack s.
            s.push({temperatures[i], i});
        }
        return results;
    }
};
