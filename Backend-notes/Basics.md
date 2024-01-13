# Front End

- interface that a web user interacts with. What they can see and hear. The three languages
  we use are HTML (Page Structure), CSS (Styling), and JavaScript (Updating page and visual stuff).

# Backend

- Involves behind the scenes things, so stuff that isn't visually indicative.
  All technology required to processe a require and generate a response. Here
  they fetch data from a database to help create that response and fill those
  html templates that will be shown to the user. You can use any language you want on a server since
  it doesn't require the user's browser to care. All the browser cares is whether you
  sent proper HTML, CSS, and JavaScript related stuff. Popular server-side
  languages: Php, C#, Ruby, Python, and Java. All look different but do the same things.

# What the backend consists of:

1. Server: Computer that listens, receives, and processes requests
2. App: Application running on the server that listens for requests.
   Using the server data to update the site.
3. Database: Data storage place used to organize and persist data.

# Client and Server Side Programming (Dynamic vs Static):

- Static sites: A site that returns the same hard-coded
  content from a server, whenever a resource is requested.
  For example, client requests resource from web server,
  web server gets the same pre-created html/css/js and other files, and
  returns a response. Doesn't use a database, so it can only
  return hard-coded content instead of using database to help generate
  content for a resource.

- Dynamic sites: Response content is generated dynamically
  when needed. Usually by inserting database data into our
  html templates. Can return different response data for a url based
  on a user's preferences/data.

- Server Side Programming: Most code for supporting dynamic sites and
  handling these dynamic responses is run/located on the server. Of course, requests
  for static resources are done the same, for example some pages are the
  same for everyone, however dynamic resources are dealt like above.
  Can be done with any number of languages, done outside of browser.

- Client Side Programming: Related to the front end such as
  improving the behavior or appearance of a webpage. Such as creating/styling
  forms, making logic for user interaction with the page. Made with
  HTML, CSS, and JavaScript and only done in the browser.

# Some results of Server Side Programming:

1. Customized UX: Google maps using saved or current location data to create the best route or a travel history
2. Data Analaysis: Or analyzing what videos or topics users like to watch and recommending them similar
   videos. Construct search results based on client preferences, previous purchases.
3. Efficient data storage and delivery: Having a template for a product, using data from database to fill that template when
   the user wants to go on that page. We dynamically create that page instead of having
   thousands of static pages for products.

# Frameworks:

- Code library used to make development quicker Makes it easier to not
  reinvent the wheel or repeat code for doing basic tasks. Client frameworks
  are about the presentation of the site. Server-side frameworks are
  more about providing you different web-server features that you don't
  have to make yourself. Such as user auth., easy database access, etc.

  NOTE: It's entirely possible to not use a front-end framework.
  It's probably quicker to not use one when creating a small website. It's
  easy to create markup, style, and do simple user interactions. However,
  a backend framework is practically required when we want a backend.
  Tasks such as making an HTTP server is extremely difficult to do
  doing from scratch in python. Something such as user authentication
  is something that we leave to professionals rather than make ourselves.

# A client server interaction:

1. Client clicks on link to new page (GET Request)
2. Request travels from client browser to the server.
   Server has always been listening so it receives it.
3. Let's say the page was a page for a product. Server queries
   database for product info needed. Server receives data
   and sends response back to user. Response body has
   data for the product, and its header contains the HTTP
   status 200 to indicate it was a successful request.
   After this, the server closes the connection.
4. Response travels to client's computer and now
   the page for them is seen and updated.

# REST (Respresentational State Transfer) paradigm

- Separation of Client and Server: Client and server should be able to
  communicate with each other regardless of how they were implemented or made.
  As long as each side knows what format of data to send (JSON, XML, etc.), they can work together.

- Statelessness: Server doesn't need to know what's happening to the client currently,
  and vice versa in order efficiently communicate. As a result, should be able to
  communicate without the knowledge of past interactions/messages. Consequently,
  each request is independent, and the server processes it based solely on the
  information provided in that specific request.

- Communication between Client and Server: REST needs the client to make
  an HTTP request.

  1. HTTP verb: What kind of request is being done
  2. Request header: Passes info about the request.
  3. Path to the resource
  4. Optional message body containing data.

- Headers and Accept parameters: Header contains type of content
  that it wants from the server. This is called the 'Accept' field.

* Credits:

1. MDN (Server Side): https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps
2. CodeAcademy (Back End Architecture): https://www.codecademy.com/article/back-end-architecture
3. Static Sites Diagram: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction/basic_static_app_server.png
4. Dynamic Sites Diagram: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction/web_application_with_html_and_steps.png
