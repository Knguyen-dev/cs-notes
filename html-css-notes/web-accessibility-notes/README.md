# Web Accessibility Notes

## What is web accessibility and why is it important?
Web accessibility, a11y for short, is the idea that our websites are designed so that people with disabilities can use them more easily. There are different types of disabilities such as auditory, physical/motor, visual, etc. These can be permanent or temporary. There are also 'situational limitations' such as using a phone outside on a bright day, living in an area where hte internet is slow, etc. These limitations are different as they only happen in situations, but we should also keep them in mind when developing a website too.

Web a11y matters because it makes our website more usable to other people, and we are able to easily accomodate more users. Think of a situation where a building doesn't have any accomodations for a person with a wheelchair, it's going to make it difficult for that person to do things such as get to higher floors, etc. 

## Web Content Accessibility Guidelines (WCAG)
We need to know how to make things a11y friendly and how. There are many sources that help us know, but one of the best ones is the 'Web Content Accessibility Guidelines' (WCAG). These guidelines just help create a shared standard for web a11y. They aren't the end all be all or finish line, but they will help make things a11y friendly

### Four Principles of the WCAG
1. Perceivable: Users must be able to visually see the information. For example, light text on a light background isn't good since it makes it hard for normal people and visually impaired people to see the content.
2. Operable: Users must be able to operate and interact with stuff any UI element. For example, a navbar with a drop-down menu that only appears if the user hovers on it, can't be used by keyboard users that rely on focusing UI elements with keyboard navigation.
3. Understandable: Users must be able to understand the information given to them, it must be human readable. For example, if a user submits a form and gets an error 'Error 113: Bad data' they wouldn't be able to understand what the error actually means, or how to fix it. You'd want to send back an error that the a user would understand such as 'Incorrect username or password', as they'd know what caused the error and how to fix it.
4. Robust: Content must be accessible by current assistive technologies and user agenets, and should remain accessible as those technologies advance.

### Conformance levels
WCAG has 3 level of conformance to indicate how accessble a site is. The higher the level, the more accessible it is.

- Level A: Essential support as it's the minimum level of conformance and accessibility.
- Level AA: Ideal support, it's the level many organizations should strive for. To meet this level you must meet the previous ones.
- Level AAA: Specialized support, it's not expected or recommended for all sites to reach this point, as some content may make it impossible to meet this conformance level. Meeting this level also requires the site meeting the previous levels as well.

Before you implement accessibility, these notes won't cover every facet and detail about accessibility, but rather it introduces you to the more common concepts. As well as this, you should note that no site will ever be 100% accessible. What matters is taking the steps to make it as accessible as impossible.

## WebAim's WCAG 2 Checklist
Here are some common accessibility issues that WebAim lists and recommends you fix when trying to conform to WCAG. So let's choose WCAG version 2.2 and level A accessibility, so the simplest level.
- 1.1.1 Non-text content: Images have must alt text. Images that don't have context have no alt text. Form buttons must have a 'descriptive' value. Input elemeents must have labels. Multimedia is identified via accessible text. Your frames and iframes must have title attribute filled out; This is a guideline for the first principle 'Perceivable'.
- 2.5.5 Target Size: Clickable targets (UI elements) should be at least 44 by 44 pixels in size, unless you have an alternative way of targeting it, or if it's an inline element, etc; This is a guideline for the second principle 'Operable' as it talks about making things easy to interact with.
Now that you get the idea, we're not going to list all of the guidelines, but to keep this checklist bookmarked for now. Then later when you're going to implement accessibility, you can go through the rules one by one as you're fixing them.









# Credits
1. [WCAG Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
2. [WebAIM's WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
3. [Guide to designing a dark mode](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#aa-using-separate-stylesheets)
4. [WebAIM's lesson on alt text](https://webaim.org/techniques/alttext/)
5. [WebAIM's lesson on form accessibility](https://webaim.org/techniques/formvalidation/)
6. [15 Rules for accessible links](https://www.sitepoint.com/15-rules-making-accessible-links/)
7. [Fully a11y tutorial - freeCodeCamp](https://www.youtube.com/watch?v=e2nkq3h1P68&t=10s); Not started yet