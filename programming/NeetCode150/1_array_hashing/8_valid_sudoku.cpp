#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <map>

class Solution {
public:
    bool isValidSudoku(std::vector<std::vector<char>>& board) {
        // Maps row_index -> hash set for said row; maps col_index to hash set for column
        std::unordered_map<int, std::unordered_set<char>> row_map, col_map;

        // Maps (row_index, col_index) -> a set
        // NOTE: unordered map can't hash the pair out of the box.
        // we use a map since it's tree-based.
        std::map<std::pair<int, int>, std::unordered_set<char>> box_map;

        for (int r = 0; r < board.size(); r++) {
            for (int c = 0; c < board.size(); c++) {
                if (board[r][c] == '.') continue;
                std::pair<int, int> box_key = {r / 3, c / 3};
                
                char val = board[r][c];

                if (row_map[r].count(val) || col_map[c].count(val) || box_map[box_key].count(val)) {
                    return false;
                }
                row_map[r].insert(val);
                col_map[c].insert(val);
                box_map[box_key].insert(val);
            }
        }
        return true;
    }
};