# Accessible Links

## Intro
Let's examine two links to see what to do and what not to do.
```
<!-- Example 1: Where's "here"? -->
<a href='...'>Click here</a> to start your career in web development!

<!-- Example 2: I love that place! -->
Visit <a href='...'>The Odin Project</a> to start your career in web development!
```
- Example 1: Visually, this would make sense for a visual user. However for a screen reader, they're able to navigate between all links on a page. When this happens they only get read 'click here' without the extra context about the web development. 
- Example 2: This makes sense for everyone. At least with the screen reader, when things are announced they get 'The Odin Project, link'. They at least know where they are going.

1. Text content of the link should indicate where the link is going to redirect the user to. 
2. If a link opens or downloads a file, include text that tells a user what kind of file it is as well as the file size.
3. If a link automatically opens a new tab or window with target="_blank", indicate this to the user.
```
<!-- Example 1: Now the user is aware that this link will open or download a PDF file. -->
<a href='...'>2021 Sign Up Statistics (PDF, 1MB)</a>

<!-- Example 2: And now the user knows this link opens in a new tab! -->
<a href='...'>GitHub (opens in new tab)</a>
```


## 15 Rules for links 
1. Don't use use word 'link' in your links. Screen readers tell the user when the yencounter a link, so adding the word 'link' makes things repetitive.
2. Don't capitalize links. Some screen readers read capitalized text letter by letter, which isn't good for links. As well as this, capitalized text is harder to read, especially with all of the letters capitalized since all words have a rectangular shape, making it hard for people to differentiate words by shape.
3. Avoid ASCII characters in your links. If a link was '16 - 17', some screen readers say "link one six one seven years end link" which is confusing. Instead do "16 to 17" so a screen reader reads it as "link sixteen to seventeen years end link".
4. Avoid using URLs as link text. For example https://www.github.com, this will read out the individual letters one by one, which isn't very understandable. Rather do [Link to Github](https://www.github.com) so the screen reader reads out something like 'Link, link to github'.
5. Keep link text short. The maximum would be 100 characters. 
6. Restrict number of text links on a page. You don't want to overflow a regular user with information, and you want to make it easy for a screen reader user to pull up all of the links for one page and easily read through them.
7. Indicate when a link activates a download and put this information in the link's text. If you use a 'PDF' or 'Word' icon, use they have an alt attribute that has useful info. Ensure you include the type of download and size of download.
8. Indicate when a link opens a new tab or window. Typically done in the link's text.
9. Beware of paginatio nand alphabetized links. To make them accessible add some context before it like "Go to search page: 1 2, ..etc". See the example below:

Author’s surnames starting with: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z

We put the context that it was about author surnames. So when the screen reader reads something like 'link A', or 'link B', then at least it makes sense what the links are about.

10. Be careful with 'anchor' links, which are links that redirect you to sections on the same page. Screen readers are usually good at identifying when a link does this, and they read aloud 'in page link' and then the link text. For normal users who rely on vision, this isn't apparent, so a solution would be adding text preceding the link such as 'In this page: ' or 'jump down to: ', etc.

11. It's recommended that we underline our links.
12. Make things keyboard accessibility, ensure that your links are able to be focused on, and there's a visual indicator for links when they're focused.
13. When an image is a link, the alt attribute acts as the link text.
14. Eliminate any broken or empty links, so ensure you only have working links.
15. Remember to always test your color contrast to ensure your link text has a good contrast ratio with the background