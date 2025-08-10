# Framer Motion Notes
Basic notes about Framer Motion to get familiar with it.


## Intro to SVG (Scalable Vector Graphics)
A 'vector image' format that uses 'XML' to define images. The key advantage is their ability to scale infinitely without losing quality because they are defined by math equations rather than pixels.

#### Attributes:
- xmlns: Defines XML namespace. For SVG, it's 'http://www.w3.org/2000/svg'
- viewBox: Defines a coordinate system of the SVG. The format is 'min-x min-y width height'. 

#### Common SVG elements
- Shapes: Basic shapes like rectangles (`<rect>`), circles (`<circle>`), ellipse (`ellipse`), lines (`<line>`), and polgons (`<polygon>`).
- Path: The most versatile and complex element, allowing us to draw custom shapes. You define these with a series of commands and parameters.

#### Attributes and Styles for path
- fill: Specifies the fill color of a shape.
- stroke: Speifies the color of the shape's outline
- stroke-width: Specifies the width of the outline.

You can also define styles with inline css with 'style' or through a CSS file. Then these styles will be applied on the SVG element.

#### Path Syntax
Paths are defined using the 'd' attribute, and here we define a series of commands and parameters. This is essentially where the math happens.
- 'M': Move to a point (without drawing).
- 'L': Draw a line to a point.
- 'C': Draw a cubic Bezier curve.
- 'Q': Draw a quadratic Bezier curve.
- 'Z': Close the path.

#### SVG Example:
```
<svg
    className="pizza-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100">
    <path
        fill="none"
        d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
    />
    <path fill="none" d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z" />
</svg>
```

#### SVG Analysis
We already know the className, and the namespace is just boilerplate stuff to make an svg work.
- `viewBox="0 0 100 100"`: Defines the coordinate system from (0,0) to (100, 100)

##### Paths
Let's talk about the first path attribute.

- fill="none": No fill color
- d: Defines all of our points and movements
1. `M40 40`: Move to (40, 40).
2. `L80 40`: Line to (80, 40)
And you get the rest. Of course you can put together the dots for the rest of them. But this defines the first 'shape'. And then our second path attribute defines a separate second shape.

## Takeaway for SVGs
Powerful vector image format for creating scalable graphics. They use 'XML' and are used to create various icons, graphics, and other visually appealing stuff. For our purposes here, this is all we really need to know about SVGs.


## Framer Motion Takeaway
Framer motion is basically the library you want to use if you're looking to do any kind of advanced aniamtions in react, and we didn't even cover everything.

They have a lot more things such as more custom hooks, scroll animations, animations based on a group of components when they render, etc. All of which you can find on the Framer Motion documentation, if you ever need help implementing an idea, maybe the docs already have a tool to help you create it.

# Credits: 
1. [Framer Motion Tutorial](https://youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i&si=n8cyrX4S2GylBuyo)
2. [Framer Motion API](https://www.framer.com/motion/)