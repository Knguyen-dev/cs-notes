# Wai Aria

## What is WAI-ARIA 
WAI-Aria (Web Accessibility Initiative's Accessible Rich Internet Applications specification) creates a make native html more accessible. It introduces attributes we can use to modify the semantics or context of an html element. Aria can be really good for accessibility, but dangerous when done incorrectly. The idea is 'no ARIA is better than bad ARIA'. Here are WCAG's five rules of ARIA:

1. Always use native html elements and attributes over ARIA if possible.
2. Never change native semantics, unless you have no other choice.
3. All interactive ARIA controls must be usable with keyboard.
4. Never use role="presentation" or aria-hidden="true" on focusable elements.
5. All interactive elements must have an accessible name. 

## Accessibility Tree
Based on the DOM, so like how the DOM represents nodes and objects that make up a webpage, the accessibility tree contains only the accessibility related information that will be used by assistive technologies. As a result, ARIA modifies the properties of the objects that make up this accessibility tree. Let's focus on two properties:

- Name: An 'accessible name', assistive technologies will announce this to a user. For example for a link, they'll probably say 'link' and then the text.
- Description: What assistive technologies announce in addition to the accessible name. So again for a link, it could be the text content of said link.

With ARIA attributes, you could provide an id to one element and pass that id value as another element's ARIA attribute value. This creates a link/relationship between the elements, akin to how the label element's 'for' creates a link to an input's 'id'. Let's look at some of these:

### aria-label
Overrides any native label of an element and modifies its name property in the accessibility tree. Best used when an element doesn't already have a native label. When added the aria-label's value becomes the element's accessible name. However, aria-label doesn't have effect on some html elements such as div or span. A common use is putting aria-label on 'close' buttons of menus or modals.
```
<button type='button' aria-label='Close menu'>X</button>
```
Instead of the reader announcing "X, button", it would announce "Close menu, button", which makes a lot more sense. You could also use aria-label on landmark elements such as the navigation.
```
<nav aria-label='main navigation'>...</nav>
```


### aria-labelledby
Overrides both the native label and aria-label attribute. It changes the element's accessible name to a concatenated string of text contents or lat atributes of the labeling elements (the ones whose id are passed). You can pass in as many ids as you want, even have the element reference itself, but you can't pass in the same reference multiple times. This is because any subsequent references after the first will just be ignored.

```
<!-- Here's the labelling element -->
<h2 id='label'>Shirts</h2>

<!-- And here's the labelled element. Note the order of the ID references passed in -->
<button type='button' id='shop-btn' aria-labelledby='label shop-btn'>Shop Now</button>
```
Screen reader would announce 'Shirts, shop now, button'. A good thing is that even if the labeling elmeent is visually hidden by css 'hidden' or something else, it will still modify the accessible name of the labeled element.

One thing we should note is that aria-labelledby doesn't have the same event handling by default . So you need to add this functionality yourself.
```
<!-- Clicking the <label> element gives focus to the input element -->
<label for='name'>Name:</label>
<input id='name' type='text' />

<!-- Clicking the <div> element won't give focus to the input element -->
<div id='label'>Name:</div>
<input type='text' aria-labelledby='label' />
```

### aria-describedby 
Modifies the description property in the accessibility tree. Again you pass in the id of the labeling element.
```
<label>Password:
  <input type='password' aria-describedby='password-requirements' />
</label>

<!-- Meaningful text + ARIA! -->
<span id='password-requirements'>Password must be at least 10 characters long.</span>
```
When input receives focus, the screen reader announces "Password, edit protected, password must be at least ten characters long.". As a result, anytime the user focuses on the input, the user is immediately reminded of the password requirements.


## Hiding content from the accessibility tree
You can use aria-hidden to hide elements from the accessibility tree. Of course, you'll still need to make sure that the element is hidden visually as well.
```
<!-- Example 1 -->
<button type='button'>
  <span class='material-icons'>add</span>
  Add Book
</button>

<!-- Example 2 -->
<button type='button'>
  <span class='material-icons' aria-hidden='true'>add</span>
  Add Book
</button>
```
In example 1, it reads 'Add add book, button. The text content of the span and button are concatenated. In example 2, the span is hidden from the accessibility tree, so it reads 'Add book, button'. Note that when you give aria-hidden='true', all children of that element are hidden to the accessibility tree. As well as this, adding aria-hidden='false' to a child element won't have any effect if its parent has 'aria-hidden='true'. Also if you use aria-hidden='true', make sure the element isn't focusable. So do this with tabindex='-1'.


# Aria Roles
Aria roles are added to elements using role="<ROLE_TYPE>. Once a role has been set on an element, it shouldn't be changed. Let's talk about the six roles.

## Abstract roles
Intended for browser use. Shouldn't be used by developers writing HTML markup.

## Document Structure roles
Used to provide a description of a section. You'd use these when the appropriate native html doesn't not exist. Look at the example below, as there aren't any native html elements for a toolbar or tooltip, so we can use a 'role' instead to more accurately describe the element.
```
<div role="toolbar">
  <div class="text-characteristics">
    <button>Bold</button>
    <button>Italic</button>
    <button>Underline</button>
  </div>

  <div class="text-alignment">
    <button>Left</button>
    <button>Middle</button>
    <button>Right</button>
  </div>
</div>

<button aria-describedby="notifications-desc">Notifications</button>
<div role="tooltip" id="notifications-desc">View and manage notifications</div>
```

## Landmark Roles
Roles you use to identify contents on a page. For example a role='banner' can be associated with a header element, 'complementary' can be associated with the 'aside' element etc.


## Takeaway
Aria can be very important, and just remember to use it when it's needd

[More on roles](https://www.a11yproject.com/posts/an-indepth-guide-to-aria-roles/#toc_Abstract-roles)