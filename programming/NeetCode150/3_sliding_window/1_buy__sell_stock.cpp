#include <vector>
#include <algorithm>


class Solution {
    int maxProfit_sliding_window(std::vector<int>& prices) {
        int res = 0;
        int i = 0;
        for (int j = 1; j < prices.size(); j++) {
            int profit = prices[j] - prices[i];
            if (profit > 0) {
                res = std::max(res, profit);
            } else {
                i = j;
            }
        }
        return res;
    }
};