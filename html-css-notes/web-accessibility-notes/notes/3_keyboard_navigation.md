 # Keyboard navigation
 Some users can't use a mouse to operate their computer, so instead they rely on a keyboard or another technology that simulates keyboard inputs. In any case, there are users that require proper keyboard navigation, which is sometimes overlooked on websites.

 ## Focus, TabIndex, and example
 Looking back at our rock papers scissors example. By default the div and span elements aren't focusable, so we need to add a tabIndex. As well as this you need to add functionality for mouse and keyboard events.
 ```
 <!-- Tab index attributes makes divs focusable -->
 <div class='button-container'>
  <div class='rock button' tabindex='0'>Rock</div>
  <div class='paper button' tabindex='0'>Paper</div>
  <div class='scissors button' tabindex='0'>Scissors</div>
</div>
 ```

 ```
 // We also need to manually add in event handling for both mouse and keyboard events.
const buttons = document.querySelectorAll('.button');

function nameAlerter(e) {
  if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
    alert(e.target.textContent);
  }
}

buttons.forEach(button => {
  button.addEventListener('click', nameAlerter)
  button.addEventListener('keydown', nameAlerter)
})
 ```
 In our example, we use divs as buttons. When doing this for real, use button element, which provides context, and they're also focusable and have event handling for keyboards by default. As a result when focused on a button and you press 'space' or 'enter' key, then the click event for the button will activate. 

 Essentially make suer any interactive elements are focusable and have event handling for keyboards. Using the correct semantic HTML makes things a lot easier as the work is done for you, but if you use an element that isn't focusable by default and doesn't have any default event handling, then you need add that functionality manually.

 ## Focused styles
 When elements are focused we need to add styles, usually an outline or border surrounding the focused element. This is also a visual indicator of which element that is focused. You may have added this css rule below, which removes all focus styles, because admittedly when you start out learning, these don't look good.
 ``` 
 *:focus {
  outline: none;
  border: none;
 }
 ```
 Never do this, and never completely remove focus styles. Either leave the defaults, or replace them with your own focus styles. Whether it be a transform: scale(), adding a CSS property to a button, or doing something else, adding your own focus styles is the only alternatives you should consider. 
 
 Completely removing focus styles makes it impossible for keyboard navigation, since there's no visual indicator on the element being focused. The user would be keeping track of the number of tabs they've pressed and also which elements are even focusable, it's akin to browse a website with an invisible cursor and no indicator of when your cursor was hovering over things.

 ## Tab order
 The order in which elements on the page will receive focus when we press the tab key. By default the order aligns with the order of elements listed in the html file.

```
<!-- This element is first in the tab order. -->
<div tabindex='0'>This is the first element listed in the HTML.</div>

<!-- This element is second in the tab order. Despite it having the same tabindex, the one that's first is the one that's comes earlier in the html file  -->
<div tabindex='0'>This is the second element listed in the HTML.</div>

<!-- Has a negative tab index, so it isn't in the tab order -->
<div tabindex='-1'>This element is not included in the tab order</div>
```

One important takeaway is we should try to make sure the tab order aligns with the visual order of elements on the page. If the tab order is different from the visual order, then that can leave users confused or frustrated when trying to navigate the page. Best way to avoid this is to place your elements in your HTML file in the order you want themt to receive focus.


## Hidden Content
Sometimes you want content to be hidden. Such as a hidden menu or whatnot, but in any case the content needs to be hidden visually, and from assistive technologies until it is meant to be visible. If we don't do this, keyboards users would be able to navigate to content that they aren't supposed to see or interact with yet, leading to confused users and unexpected behavior.

To avoid this, for hidden content, give them tabindex = -1 which prevents elements from receiving focus via the keyboard and other assistive technologies. However, hte better solution is giving the hidden content display: none or visibility hidden properties. This removes the stuff from the tab order and prevents assistive technologies from announcing them.