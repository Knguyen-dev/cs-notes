# Meaningful text
When a user reads text or has it read to them, they should immediately understand what it means without surrounding context. First we'll talk about alternative text in images. Then we'll talk about how to have meaningful text in forms and also make forms accessible. Finally in the last part we'll talk about how to make accessible links.

# Alternative text
### Intro
Technology is getting better at what an image depicts, but they can't alone understand what it within the context of a page. I mean a maple leaf could represent Canada, or it could simply be a leaf of a tree. We provide alt text for the content and function of the images.
```
<!-- Example 1 -->
<img src='...' alt='' />

<!-- Example 2 -->
<img src='...' alt='Odin' />
```
Here are two examples of valid alternative text
- Ex. 1: When using an image purely for decoration, or it isn't really important for the user to aware of, you typically don't users of assistive technologies to be made aware of it. In this case, always use an empty string (aka a null value). Note that if you omit the alt, the image could still be announced. Every image should have alternative text, even if it is a null alt text.
- Ex. 2: Here the screen reader would say "Odin, graphic", making hte user aware that there's an image and what the image is.


### Example 1
As the first Hispanic woman to go to space, and, later, the first Hispanic director of Johnson Space Center, Ellen Ochoa is widely regarded as a role model. 

![](./images/ellen-ochoa.jpg)
- function: Image only has a function of it's linked, has an 'area' within a 'map', or if it's in a button. So in this case the image doesn't have a 'function'
- content: image content ifnorms the user that this is Ellen Ochoa, and her dress conveys she's an astronaut.
#### Choices:
- 'Astronaut Ellen Ochoa': The recommended alt text.
- 'Image of Ellen Ochoa, Astronaut': Somewhat redundant, as it describes the image as an image.
- 'Ellen Ochoa, the first hispanic woman to go into space':  Includes information that isn't a part of the image and also is redundant as the text surrounding the image already contains this information.
- Empty alt "": The image conveys content, so it needs more than an empty alt attribute.


### Important tips for alt text
- Should be accurate and equivalent
- Be succinct
- Not be redundant
- Not include phrases like 'image of...' or 'graphic of...'.


### Example 2
As the first Hispanic woman to go to space, and, later, the first Hispanic director of Johnson Space Center, Ellen Ochoa is widely regarded as a role model.

![](./images/ellen-ochoa.jpg)

- function: none
- content: It's Ellen Ochoa, implied she's an astronaut.

#### Choices
- "Image": Describes an image as an image, not useful.
- "Ellen Ochoa": The image content and text body already told us who she is, this is redundant.
- Empty alt attribute (alt=""): Best choice. The content of the image is already present in body text.


### Example 3
Some images have functionality. Let's have the image as a link, and then the caption below said link.

![](./images/ellen-ochoa.jpg)

Ellen Ochoa, Astronaut

#### Choices
- "Astronaut Ellen Ochoa": Best choice. The screen reader would say "Link, Image, Astronaut Ellen Ochoa. Ellen Ochoa, Astronaut". So we have a little redundancy to describe the function of the linked image.
- "Read More": Bad, doesn't provide enough information, especially out of context.
- "Wikipedia entry for Ellen Ochoa, Astronaut": Bad choice as it talks about content other than that conveyed by the image, which is the fact that the link goes to Wikipedia.
- Empty alt: Not good, since there's a link we should have at least some alt text.

However, if the image and the caption of the image we within the link it'd be better. We'd now do alt="" as the screen reader would read "Link, Ellen Ochoa, Astronaut". A lot more succint.

### Example 4
[Download the employement application (Pretend the PDF Icon Here)](https://github.com/)

#### Choices
- "PDF": Best choice since it conveys the content of the icon, and also it indicates the type of file
- "Employement application": Redundant, as this was already explained in the link's text.
- "PDF icon": Describes what the image looks like, which is redundant.
- "alt": Omits important info that the link is to a PDF document.



## Decorative images
Decorative images are ones that don't present important content, is used for layout or non-informative uprposes, or don't have a function (e.g. isn't a link). In this case decorative images will have alt="" so nulled alt text.

- NOTE: When an iamge is only used for decorative purposes, it's best to remove the image from the page content and instead define it as a CSS background image. This removes the need for alt text and will remove the image from the flow of the page. 

### Example 5
Let's say the image had text next to it saying "Our busniess promises the best service you'll find on the planet. Our team is professionally trained to offer ..."

![](./images/handshake.jpg)

You may think 'Handshake', 'Businessmen shake hadns to complete a contract', but these are incorrect. The image doesn't convey relevant or important content, so an empty alt text is best. The former two options describe the image, but this is unnecessary information. The image doesn't really matter or relate that much to the context of the page itself, it's for decoration, so we don't need to put alt text for it. This prevents screen readers from acknowledging it, which is good for decorative images.


## Advanced Images

### Logos
Many sites have the logo linking to the home page. Typically we'd provide alt text containing the company name such as alt="My Company". Usually it isn't necessary to have 'My Company Logo' or 'My Company home page'. In the end the screen-reader should announce 'Link, Graphic, My Company', and since it's at the top of the web page, the user should likely know that the logo is linked to the home page.