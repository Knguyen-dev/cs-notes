from typing import List


class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        row_len: int = len(board)
        col_len: int = len(board[0])

        # Represents index offsets for all 4 directions
        directions: list[tuple[int, int]] = [
            (1, 0), (-1,0), (0, -1), (0, 1) # up down left right
        ]
        visited_set = set()

        def dfs_helper(row_index: int, col_index: int, str_index: int):
            
            # If incorrect character, propagate back up
            # NOTE: Ensures we don't go down a path that doesn't match the word.
            if board[row_index][col_index] != word[str_index]:
                return False
                
            # If the current character matches the last character in the word, return true
            # NOTE: This also implies that we've already found grid cells for all previous 
            # characters in the word. Otherwise there are still characters left to match.
            if (str_index == len(word) - 1):
                return True

            # Explore all 4 directions
            # a. If direction is out of bounds, skip it
            # b. If next cell has already been visited, skip it
            # c. If next cell doesn't match our next character in the word, skip it
            # d. If the recursion returns True, we found the solution so return true
            # Otherwise, recurring through all directions didn't yield a solution, return false.
            for dir in directions:
                r = row_index + dir[0]
                c = col_index + dir[1]
                if (r < 0 or r > row_len - 1) or (c < 0 or c > col_len - 1):
                    continue
                
                key: str = str((r, c))
                if key in visited_set:
                    continue

                # Mark cell as visited 
                visited_set.add(key)
                is_found = dfs_helper(r, c, str_index + 1)
                if is_found:
                    return True

                # We didn't find a match in this direction, backtrack by removing from the cell.
                # This allows a later iteration to use this cell again if needed.
                # The recursion would mark it as visited, us propagating up unvisits it.
                visited_set.remove(key)            
            return False

        for row_index in range(0, row_len):
            for col_index in range(0, col_len):

                # A little hacky, but this is marking the first cell as visited before we start the recursion.
                key: str = str((row_index, col_index))
                visited_set.add(key)
                if dfs_helper(row_index, col_index, 0):
                    return True
                visited_set.remove(key)

        return False