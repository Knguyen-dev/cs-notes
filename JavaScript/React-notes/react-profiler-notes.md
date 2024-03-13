# React Profiler Notes
The best way to measure performance in a React application is to use the 'Profiler' tool provided by React Dev Tools. So let's learn how to use and understand it.

## How to start 'profiling':
1. Click on 'start profiling' or 'reload start profiling'. The former is more so for when you only want to test certain actions, whilst the latter is for the same thing, but you include the data from the page load.
2. Once you start profiling, start doing stuff. Start doing actions you want to test and see if its slow. After you've done the actions, go back to dev tools and stop profiling.
3. Now dev tools will display '1 / num_renders', so '1 / 33' would be it counted 33 renders whilst we were profiling. Here we can go through the renders and see how long they took. The important thing is that you'll notice that the larger bars indicate renders that took the longest, and are the worst performance wise. Note you see this in your 'Ranked chart'.


## Different graphs:
The profiler gives you the 'Flame graph', which kind of just shows a hierarchal view of your components. You'll focus on the 'ranked chart' which will show you detailed data about the time for each component to render during a single application 'render'.
1. In the ranked chart, you'll look at the tallest bars to examine 
the renders that took the longest.
2. Then you'll probably seeing the components that look the longest. Then from there you at least have an idea of the slow components in your code. 
3. Then after you've applied your changes to your code, if any, you can then run Profiler again, record yourself doing similar stuff. Then you'll look at the renders and see how long they took compared to last time. And essentially that's the process.

## Advanced Profiler Features:
Let's focus on the flame chart. From it's hierarchal structure you can visualize the rendering of a component and the children inside of it. For example, for the a 'DataTable' component you'll see  '1.9ms of 22.6ms'. This means that in total, rendering the DataTable and its children took 22.6ms. However rendering the datatable itself, with no children only took 1.9ms. So the DataTable isn't actually the slow one here, but the children are the main issue. This feature let's you figure out whether a component itself is slow or is the rendering of the children the slow part.

As well as this components that are 'gray' didn't render at all or only rendered one. Whilst colored components on the flame chart indicate components that did re-render. Then clicking on those bars will show you when they rendered, and how long the render took to complete.

## Hiding renders:
To improve the experience, you can hide commits that take a below a certain amount of time. For example, you can hide renders that take below 20ms, so you'll only be shown renders that took above 20ms. This just improves things so you only see things that are slowing down your application.

## Limiting Computer Performance:
In the performance tab you can purposely throttle your computer to make things slower for yourself. This is because sometimes the computer you're working on is a lot more powerful than the other devices that your users are using. 

# Credits:
1. [Web Dev Simplified](https://youtu.be/Qwb-Za6cBws?si=RuKxKOQOGt3j6t2G)