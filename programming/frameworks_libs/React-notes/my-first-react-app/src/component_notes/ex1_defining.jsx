/*
Defining components: Basically sections and building blocks of the UI. In regular html a page can be defined with 
    individual sections and elements. While react combines the markup, CSS, and JavaScript into custom "components", which are
    reusbale UI elements.

- Typical HTML Mark up
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>

- Typical React Markup
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>

- How to build a component:
1. Define the component 
2. Then build the component
NOTE: Always enclose the return statement with parentheses. Also the name always has to be capitalized since that's how react
    can differentiate between regular markup and a react component.



- Example 1: Building a 'Profile' component. 
- Example 2: Using that profile component to build a Gallery component that uses multiple profile components.

- Here's what the browser sees:

1. React:
<Gallery />

2. The HTML version the browser sees and loads:
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" /
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" /
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>


*/

function Profile() {
	return (
		<img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
	)
}

function Gallery() {
	return (
		<section>
			<h1>Amazing scientists</h1>
			<Profile />
			<Profile />
			<Profile />
		</section>
	)
}

export default Gallery
