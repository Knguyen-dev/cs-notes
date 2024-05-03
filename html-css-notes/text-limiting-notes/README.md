# Limiting lines of text in CSS

## Ex.1 Line Clamp
These notes are going to be about how to limit the maximum number of lines of text that are displayed in css. For example, let's say we have some cards for a Blog, and each blog post has a description. You're descriptions are going to have different lengths, and that could mess with your layout a little bit. You don't want one card being a lot taller than another card, so you'll limit the lines of text. You could technically do this in JavaScript and try to limit the characters, but of course that has restrictions as we try to make things responsive. An easier way to solve this problem is using css and the 'line-clamp' property.


## Ways to deal with text overflow
We're also going to talk about how to deal with text overflow. 

1. overflow: hidden; You could use this, but it cuts off your text unnaturally.
2. overflow-x: scroll; You could use the scroll value to make it horizontally scrollable.
3. overflow-wrap: break-word; Breaks a long word into two pieces. It could be what you need sometimes .
4. 'width: min-content'; You could change the width of the container the text is in. Min content makes the width of the element as small as it possibly can, matching the width of the largest word in the container.
5. 'width: 'fit-content'; Width is as much as it can comfortably get, but if you shrink it, it's width will be the largest word.


# Credits
1. [How to set a maximum number of lines of text with CSS - Kevin Powell](https://youtu.be/b6iVByCOx8A?si=RSFxRG11zHq7_AU-)
2. [4 Ways of Dealing with Overflowing Text - Kevin Powell](https://www.youtube.com/watch?v=6Nv0weHy7t0)
3. ['text-overflow: ellipse' - W3School](https://www.w3schools.com/cssref/css3_pr_text-overflow.php)