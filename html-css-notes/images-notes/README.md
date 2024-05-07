# Images Notes
Going to be takes on how to optimally load our images (lazy loading), and then responsive images.

## Basics
When working with responsive images, the idea is maintaining aspect ratio so they don't appear distorted. If you shrink the width and don't do anything to height, the aspect ratio is messed up and looks distorted. The solution is to not define a width or height. If an image is given a flexible width, and height is auto, then it retains aspect ratio.

## background-size, background-position, and object-fit
If you don't want our images to shrink, we can use background-size and object fit.

background-position and backround-size only work on elements with a background image, so it doesn't work on normal img tags. 




## Advanced Responsive Images
Let's look at some techniques that allow us to optimize how we load in our images

### Using Srcset
Let's say we had a 1600 x 400 image. Well regardless of the user's secreen size, if we only define 'src', then it's always going to download that image, even if we're on a small screen. This isn't necessarily bad, but it's not needed to download that large image for a small screen size, for us to just shrink it down really.

To fix this, we use the 'srcset' to define the various widths of our images we want. So if the width of the screen is smaller than 400px, then it's going to keep the 400px image rendered. However once we go over 400px, it's going to render the next size that's larger. So we'd render the 800px image now. Then once we go over 800, we'll swap to a larger image size, downloading and rendering the 1600px wide image. However, note that even if you downsize the screen, it keeps the 1600px image. This is because we've already downloaded the really large image, and there's no point to downloaded a smaller one.

As a result, mobile users can download a much smaller image whilst desktop users can download the much larger image, so each of them download an image appropriate to them. However, by default it assumes the size of your image is '100vw', but you can customize that with 'sizes' attribute. However note you can only use 'vw' or 'px' for this. I guess the only downside to this is that you need to have multiple copies of the same image at different sizes.

### Picture 
Good for showing a different image on different screen sizes. With a media query you're able to show two different images at two different sizes. Of course this is a little less performant, but if you want your site to be more artistic and aesthetic, then this gets the job done.


## Lazy loading
Let's say you had a page with 16 images. The browser would load all of those images, even the ones that the user doesn't even see. With lazy loading, we will load the images that the user sees, and as the user scrolls down, we will begin downloading those as well.



# Credits
1. [Fast Responsive Images - Web Dev Simplified](https://www.youtube.com/watch?v=fp9eVtkQ4EA)
2. [Lazy Loading - Web Dev Simplified](https://www.youtube.com/watch?v=hJ7Rg1821Q0)