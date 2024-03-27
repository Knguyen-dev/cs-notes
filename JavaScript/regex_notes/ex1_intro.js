/*
- Ex. 1: 
The .test() sees if the pattern defined 
in the regex, is in the string. So we test if the 
world 'Hello' is in our string. The .test() method
returns true if it does (pattern matches and 'Hello' is in string), and false 
if it doesn't (pattern does not match and 'Hello' is not in string).

+ Ignoring casing:
We can use the 'i' character, or 'flag' to match a pattern
regardless of whether it is lower or upper cased. And of course, the 
casing of our regex doesn't matter. As long as the letters match, then


*/
function ex1() {
    const str = "Hello world!"
    const regex = /Hello/
    const result = regex.test(str) // true, because 'Hello' is in string

    const str2 = "I learned from FreeCodeCamp"
    const regex2 = /freecodecamp/i
    const result2 = regex2.test(str2) // true, because 'freecodecamp' is in string
}

/*
- Ex. 2: 
Using the OR operator to match multiple different patterns.
So this means the test will return true if any one of the patterns
is present in the string. So, if the string has the words 'dog', 'cat',
or 'fish', the test returns true.
*/
function ex2() {
    const str = "James has a pet cat."
    const regex = /dog|cat|fish/
    const result = regex.test(str) // true, because 'cat' is in string
}

/*
- Ex. 3:
You can match a pattern, then extract the part of the string that the regex matched with using the .match() method. However this only extracts the first match. What if for some reason you wanted to extract all matches to the pattern?

+ Extracting all matches:
Use the 'g' (global) flag to extract all matches to the pattern. Here we use it so that we can match and extract all instances of the pattern 'twinkle' using the g flag. We then say we want all matches, regardless of casing with the i flag as well.
*/

function ex3() {
    const str = "Extract the word 'coding' from this string."
    const regex = /coding/
    const result = str.match(regex) // result should be 'coding'.

    const str2 = "Twinkle, twinkle, little star!"
    const regex2 = /twinkle/gi
    const result2 = str2.match(regex2) // returns an array of the matched patterns so ['Twinkle', 'twinkle']
}

/*
- Ex. 4
You can match any character with the wildcard character, which is a period. In the regex, we match a string that ends in 'ain', whilst the first two characters could be anything. This matches 'rain', and 'main'. We'll use the global flag so both are extracted into our result array.

+ Matching a set of characters
However, you can limit things and match a range or allowed list of characters. In our second example, we want to match any character in those square brackets. We then say regardless of casing and also match all instances of those vowels.

+ Matching a range of characters
Writing all of those characters is inefficient in cases where maybe you want to match all alphabetical characters. Instead you can match a RANGE of characters. Here we will match any character between a and z. We use .match() to extract the character, but we use g flag to extract all instances that match our regex, and i flag to match them regardless of casing.

*/
function ex4() {
    const str = "The rain on main!"
    const regex = /..ain/g
    const result = regex.match() // ['rain', 'main']

    const str2 =
        "Beware of bugs in the code. Use the debugger. You know they are dangerous"
    const regex2 = /[aeiou]/gi
    const result2 = str2.match(regex2)

    const str3 = "The quick brown fox jumps over the lazy dog."
    const regex3 = /[a-z]/gi

    const result3 = str3.match(regex3) // array of all letters in the string

    // Here we extract all (using g flag) characters that are a digit 2-6 or letter h-s, regardless of casing (using i flag).
    const str4 = "Blueberry 3.141592653s are delicious."
    const regex4 = /[2-8h-s]/gi
    const result4 = str4.match(regex4)
}

/*
- Ex. 5:
Using negated character sets, so we get all characters that aren't listed in the regex. First we create the regex with the '^' to indicate negation. This will match any character not in the square brackets, so match any character that isn't a digit from 0 to 9. Then we use 'g' flag because we want to extract all characters that aren't in the character set. 
*/
function ex5() {
    const str = "3 blind mice and they went 93"
    const regex = /[^0-9]/g
    const result = str.match(regex) // all character sthat aren't 0 to 9
}

/*
- Ex. 6:
We can match whenever a pattern occurs 1 or more times. So first our regex will match a pattern s, and cases where it occurs 1 or more times consecutively. This includes 's', 'ss', 'sss', and so on. Then we use g flag to ensure we extract all instances of that pattern.

+ Matching characters that happen 0 or more times:
We use asterisks for this. Here we match a string that starts with 'g', and any 'o' after it. The letter 'o' can occur 0 or more times consecutively.

*/
function ex6() {
    const str = "s Mississippi"
    const regex = /s+/g
    const result = str.match(regex) // ['s', 'ss', 'ss']

    const str2 = "gooooo"
    const regex2 = /go+/
    const result2 = str2.match(regex2) // extracts 'gooooo'

    const str3 = "guts"
    const result3 = str3.match(regex2) // extracts 'g'.
}

/*
+ Greedy vs Lazy Matches:

- Greedy: Finds the largest possible part of the string that matches the regex. This is regex's default behavior.
- Lazy: Finds the smallest possible part of the string that matches the regex. To do a lazy match you use a question mark
*/
function ex7() {
    const str = "titanic"

    /*
  - Matches string that starts with t, ends with i, and has 0 or more lowercased letters in between. This is a greedy match, so it matches "titani"
  
  */
    const regex1 = /t[a-z]*i/
    const result1 = str.match(regex1) // ['titani']

    /*
  - We add '?' before our set, so it does a lazy match for the middle characters. Now it'll match 'ti' because '*' indicates 0 or more, and it chose 0 because that's the smallest possible string to fit our regex pattern.
  */
    const regex2 = /t[a-z]*?i/
    const result2 = str.match(regex2) // ['ti']

    /*
  - String will have '<' and '>' at the start and end. Then we match 0 or more characters that are any character ('wildcard'). So since tihs is greed yby default we should get the entire original string. But with 'regex4' using lazy match, it will choose to get 0 of the in-between characters, so the pattern we'll mathc is '<>'
  */
    const str2 = "<h1>Winter is coming</h1>"
    const regex3 = /<.*>/
    const result3 = str2.match(regex3)

    const regex4 = /<.*?>/
}
