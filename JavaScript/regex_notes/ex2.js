/*
 + Matching the beginnings and endings of a string:

 1. Use ^ to match the beginning.
 2. Use $ to match the end
 
NOTE: When in square brackets '^' is for negating. 
 */
function ex1() {
    const str = "Cal and Ricky"
    const regex = /^Cal/
    const result = regex.test(str) // true, because 'Cal' is at the beginning of the string.

    const regex2 = "/Ricky$/"
    const result2 = regex2.test(str) // true, 'Ricky' is at the end of our string.
}

/*
+ Short-hand characters:
There are things called 'short-hand character classes'you can use to specify a set of characters in an easier and SHORTER, way.

1. \d: Matches any digit. The same as using [0-9]
2. \D: Matches any non-digit character. Same as [^0-9]
3. \s: Matches any whitespace character. Same as [ \t\n\r\f]
4. \S: Matches any non-whitespace character. Same as [^ \t\n\r\f]
5. \w: Matches any letter, number and underscore. Same as [a-zA-Z0-9_]
6. \W: Matches any non-letter, non-number and non-underscore. Same as [^a-zA-Z0-9_]

+ Specify an upper and lower number:
We can specify an lower and upper limit number of 'pattern' matches. 

1. In this regex, we want to match a string 'Oh no', but we only want to the pattern to match when the 'h' appears 3 to 6 times consecutively. 

2. If you don't specify the upper limit, this means it matches when h appears 3 to more (infinity) times.

3. You can also specify an exact match. Here we want to match a string 'Timber', when it has exactly 3 letter 'm'
*/
function ex2() {
    const str = "Ohhh no"
    const regex = /Oh{3,6} no/
    const regex2 = /Oh{3,} no/

    const str2 = "Timmmber"
    const regex3 = /Tim{3}ber/
}

/*
+ Using '?' to match also when a character is present:
For example the words "favorite" and 'favourite'. We can use a regex to match the word 'favorite', but also match it if the 'u' is there as well.

- Essentially, regardless of whether or not 'u' is there, match it.

*/
function ex3() {
    const str = "favorite" // would match this
    const str2 = "favourite" // would also match this
    const regex = /favou?rite/
}

/*
+ Using '?' to create look-aheads:


- With a positive lookahead, we can 'look-ahead' later in the string, and to check if a character is following. Essentially it allows us to ensure that we only match if a certain character or pattern is within the string.

- With a negative lookahead, we can ensure that we don't match if a certain character or pattern is in the string.

*/
function ex4() {
    /*
  - Matches a pattern starting with 'q' only if it is followed by the letter 'u'.
  */
    const str = "q"
    const regex = /q(?=u)/

    /*
  Matches 'q', only if it isn't followed by u
  */
    const str2 = "qu"
    const regex2 = /q(?!u)/

    /*
  1. (?=\w{5}): String has to match at 5 in this set [a-zA-Z0-9_]
  2. (?=\D*\d{2}): Ensures that there can be any number of non-digits, and followed two or more digits.
  */
    const password = "astronaut"
    const pwRegex = /(?=\w{5})(?=\D*\d{2})/
}

/*
+ Capture groups: 
Rather than repeating sets of characters, we can use capture groups to prevent repetition in regex. 

1. (\w+): Match a word character, one or more times (consecutive). This gets 'My' because that is one or more consecutive word characters.
2. \s: Matches whitespace in the middle.
3. \1: Equivalent to the first set of parentheses (\w+), so it matches one or more word characters again. This gets the 'Name' part, since that is one or more word characters.

- Takeaway: This gets the entire string 'My Name'. However remember that you must put the stuff in () for it to be considered a capture group. Here I can't do \2 because there's no second set of parentheses that have a character set in them.
*/
function ex5() {
    const str = "My Name"
    const regex = /(\w+)\s\1/
}

/*
+ Replacing with regex:
With regex, you can replace what your regex matches and ultimately modify the string 

1. In our first example, the regex will match the word silver. Then we will replace that matched portion of the string with 'gold'.

2. In our second example, we look for the word 'good' and replace it with 'amazing!'.

3. In our final challenge, we'll remove all of the leading and trailing whitespace from a string.

*/

function ex6() {
    let str = "In that competition, he won silver"
    const regex = /silver/
    const result = str.replace(regex, "gold")
    // result = "In that competition, he won gold"

    let str2 = "This sandwich is good"
    const regex2 = /good/
    const result2 = str2.replace(regex2, "amazing!")
    // result = 'This sandwich is amazing!';

    /*
  Use carot to match at the front of the string. We'll 
  use plus to match 1 or more whitespaces. Then we'll use dollar sign to match the end of a string. Since we want to match both cases, we use 'g' flag.
  
  */
    let str3 = "  Wow, that's a lot of whitespace   "
    const regex3 = /^\s+|\s+$/g
    const result3 = str3.replace(regex3, "")
}
