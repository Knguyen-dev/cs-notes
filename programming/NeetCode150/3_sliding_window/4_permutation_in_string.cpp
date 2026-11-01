#include <string>
#include <unordered_map>
#include <vector>

class Solution {
public:
    bool hash_table(std::string s1, std::string s2) {

        // Build s1's frequency list
        std::unordered_map<char, int> count1;
        for (char c : s1) {
            count1[c]++;
        }

        int need = count1.size();
        for (int i = 0; i < s2.length(); i++) {
            std::unordered_map<char, int> count2;
            int have = 0;
            for (int j = i; j < s2.length(); j++) {
                // Include newest character in the window count
                // a. If including the character made the window count too big, break;
                // b. If including made the window count match.
                // c. If the current requirements 'have' matches 'need'
                char c = s2[j];
                count2[c]++;
                if (count1[c] < count2[c]) break;
                if (count1[c] == count2[c]) {
                    have++;
                }
                if (have == need) return true;
            }   
        }

        // After checking all substrings, we didn't find anything!
        return false;

    }


    /**
     * Given a character, return the index of where that character 
     * should be in the frequency array.
     * @param c Character
     * @return Integer index associated with that character's slot 
     * @note The character 'a' is ASCII 97. The subtraction of a character
     * with 'a' returns an integer between 0-25.
     */
    int get_char_index(char c) {
        return c - 'a';
    }


    bool sliding_window(std::string s1, std::string s2) {
        if (s1.length() > s2.length()) return false;
        /*
        We build the frequency array for s1. For s2, we 
        build some of the frequency array, imagine we 
        have an initial window of len(s1). Here we're 
        simply calculating the frequency of that window.

        In our second for loop, we compare the frequency list of the 
        s1 and our len(s1) window that we've placed over s2. The idea 
        is that if all 26 slots between the s1 and window frequency 
        array (called s2Count unintuitively) match, then that means 
        that our window is a valid permutation of the s1 string. We have 
        an integer 'matches' that's used to track how many slots between the 
        two frequency arrays match.
        */
        std::vector<int> s1Count(26, 0);
        std::vector<int> s2Count(26, 0);
        for (int i = 0; i < s1.length(); i++) {
            s1Count[s1[i] - 'a']++;
            s2Count[s2[i] - 'a']++;
        }

        int matches = 0;
        for (int i = 0; i < 26; i++) {
            if (s1Count[i] == s2Count[i]) {
                matches++;
            }
        }

        /*
        Now we'll iterate with r, creating our window. Remember that 
        our window 

        If 'matches == 26', then all 26 slots between s1 and the window's 
        frequency lists align, therefore the winodw is a valid permutation 
        of the s1 string.

        Calculate the index of the right-most character (newest char in the window).
        We'll increment the count of the character in the window, and the result is two things:
          a. char's frequency in the window its frequency in s1, so adding the character lead to a match.
          b. char's frequency in the window is greater than needed, so adding the character actually
             pushed us over our target number. This is bad, so we lost a match here.
        
        Removing the left most character
        a. Window now matches for that character, gains a match
        b. Window actually undershoots, we lose a match here  
        */
        int l = 0;
        for (int r = s1.length(); r < s2.length(); r++) {
            if (matches == 26) {
                return true;
            }

            int index = s2[r] - 'a';
            s2Count[index]++;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] + 1 == s2Count[index]) {
                matches--;
            }

            index = s2[l] - 'a';
            s2Count[index]--;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] - 1 == s2Count[index]) {
                matches--;
            }
            l++;
        }
        return matches == 26;
    }
};
