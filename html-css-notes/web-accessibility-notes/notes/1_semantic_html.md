# Semantic Html and a11y

## What is semantic html and how does it relate to a11y?
Semantic HTML is the practice of using meaningful html tags that convey the structure and content of the page. So rather than using generic tags such as div or span, we'll use tags such as header, nav, main, section, aside, and footer. The more specific tags clearly define the purpose of a section and more easily describe the structure of a page to users. 

The div and span are semantically netural, as they have no extra meaning and provide no context to assistive technologies, which makes it more difficult for users of those technologies to preceive, operate, and understand them. It's not like they're bad, of course generic containers still have their uses, but we should use them only when appropriate.

### Project Example: 
Let's think a rock, paper, scissors game. For the buttons and clickable areas we could use div or span, and it would still work. 

```
<div class="button-container">
  <div class="rock">Rock</div>
  <div class="paper">Paper</div>
  <div class="scissors">Scissors</div>
</div>
```
A person with regular eye sight would have no trouble playing the game if you could see the buttons easily. However a screen reader would simply announce the text content of 'Rock', 'Paper' or 'Scissors', leading the user to think it's just plain text on the page and move on. There's no context to tell the user that they can or are supposed to interact with these elements. Now let's fix this with semantic html.

```
<div class="button-container">
  <button class="rock">Rock</button>
  <button class="paper">Paper</button>
  <button class="scissors">Scissors</button>
</div>
```
We use the button element since that has semantic meaning and provides context. Now a screen reader would announce the text content and role of the element, so something like 'Rock, button'. 

## Using semantic HTML correctly
Think about the intent for the users and what context we want to provide. Here are some general examples that help you get the idea:
1. If something is clickable, whether it's a button or not, use a button element to let the user know that they can interact with the element by clicking it.
2. If you have tabular data, use a table element. This provides a lot of context to assistive technologies.
3. When using an input element, always attach a label to it to provide context for what an input means. This also announces label contents each time the input is announced. As well the label element increases the clickable area of the input itself, making the input area easier to select. There are two ways we can do this:
```
<!-- Useful when you need the input itself to have an ID -->
<label for='name'>Name</label>
<input type='text' id='name' />

<!-- Here's how we do it when input doesn't have an 'id'! -->
<label>
  Name
  <input type='text' />
</label>
```
- More on inputs, always use the 'type' that best makes sense. So type="text" is best for name, address, etc. whilst type="email" is best for email fields. 
4. When making a list of some sort, use ol, ul, or dl and thier related list item elements. This lets the user know that they're entering or exiting a list, and the number of items in the list.


## Headings and landmarks
Headings are elements h1 to h6, and they act as headings to sections in a page. Landmarks are html elements that act as regions for a page. There are 7 native html elements that define these landmark regions:
1. aside
2. footer
3. form
4. header
5. main
6. nav
7. section
Using landmarks and headings properly makes it easier for users of assistive technologies to understand and operate a page. Screen readers help users navigate a mark via landmarks and headings using keyboard navigation, and also the roles of these elements are read out as well, giving the user more context and info about a section of a page. If you were to only use divs, then users should have to go through the entire page to get to a specific section, and it makes it harder for them to understand the structure of the page.

![Image showing the regions of a page a landmark is supposed to be at](./images/semantic_html_example.png)