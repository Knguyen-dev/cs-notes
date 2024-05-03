# Position Sticky notes

Let's say we had a header that we want to stay at the top of the page, even when we scroll down. Of course, position fixed does this, but it takes it out of the normal flow. We want it so that if our header is at the top of the page, it's still in normal flow, but as we scroll down from the top, it becomes fixed to the top of the page. Then when we scroll back up, it becomes normal flow again. Position sticky achieves this for us.

## Tip for using position sticky
When styling with position sticky there will likely be times when it isn't sticky or the behavior is weird. In these situations, the best thing to do is to apply some background color or border to the parent (sticky container) and sticky element. By doing this you can now easily visualize what's happening as you know the container is the area where the element can stick. And with the border on the sticky element, you now know the size of the element. For example, by default with display flex or grid, it may stretch your sticky element to take the entire row or column, preventing your sticky element from
having any actual space to stick to. In that case you'd do align-self: start on it to prevent this. This is just one situation, but just styling the parent container and sticky element to visualize their dimensions does help.

# Credits: 
1. [The Forgotten CSS Position - Web Dev Simplified](https://www.youtube.com/watch?v=NzjU1GmKosQ)
2. [You probably want position sticky instead of fixed - Kevin Powell](https://www.youtube.com/watch?v=8MaCTDkoVd8)