/*
+ Request Object:
1. request.url: Gets the url after the host name. Good for knowing what endpoint the user 
  accessed, so did they access www.website/home or www.website/account. The url that it'd
  return is '/home' or '/account' in this case.
2. request.method: 


+ Response Object: To actually get the browser to load, you need your server to give a response
- Response header: Gives the browser information on what kind of response they 
  should be receiving. You can check to see that the response header matches
  what we defined here when you go to chrome dev tools.

+ How to send an html response (primitive way):
1. response.setHeader("Content-Type", "text/html"); set your content type
2. response.write("<p>Hello Ninjas</p>"); write on the document. However this is a very 
  inefficient way of doing it if we're trying to send entire pages of html.

+ How to send html response (normal way):
1. Read the html file and serve it.





*/

const http = require("http");
const fs = require("fs");

const PORT = 3000;
const hostName = "localhost";

const server = http.createServer((request, response) => {
	// Set header content type; saying that we're going to send html as a response to user requests
	response.setHeader("Content-Type", "text/html");

	/*
  + Basic Routing using NodeJS:
  1. the path to our html files always being with './views'. We'll use this 
    to start building the path to the html file to serve the user.
  2. We'll get request.url, and put it in a switch statement 
    to see route of the page that the user is currently requesting
  3. Based on request.url, we construct a path to that html file.

  NOTE: Remember our server is always listening. Anytime the user submits a 
    new url on our site, it triggers a new request. We look at the request to 
    see the route, and then render the response accordingly.


  + Setting the Status codes:
  1. For our good pages, we set a status code of 200, and for our 
    default case, we set a status code of 404 because that's the route
    for our 404 not found page.

  NOTE: We set our status codes here because it's easy to know and 
    control the status codes for the different pages they're going to.


  + Handling redirects:
  - Situation: Your website has "/about-me" page, but you changed it to "/about". However
    other websites have links that link to your site's "/about-me" route, which doesn't
    exist. We need to handle this with redirects to make sure those old links still
    work.
  1. Add another case in your switch statement, covering 'about-me'
  2. Change the status code to '301' to indicate 'this resource has been moved' to say
    the page they're looking for has been moved to another route.
  3. Do response.setHeader("Location", redirectRoute); so by setting the 
    Location on the response header, we can redirect the user. Here we 
    redirect them to the '/about' page.
  4. End the response.

  + Dirname and relative paths:
  - When using relative paths, like "./views/", the period refers to the current working directory.
    This would be fine if you run the script from the inside "src", as your current directory
    would be 'src'. However running it one directory up will lead to 'parent/views/' which 
    isn't correct. By using __dirname, we get the absolute path of the current script's 
    directory, ensuring a consistent path to our views.

  */

	// let path = "./views/"
	let path = __dirname + "/views/";

	switch (request.url) {
		case "/":
			path += "index.html";
			response.statusCode = 200;
			break;
		case "/about":
			path += "about.html";
			response.statusCode = 200;
			break;
		case "/about-me":
			response.statusCode = 301;
			response.setHeader("Location", "/about");
			response.end();
			break;
		default:
			path += "404.html";
			response.statusCode = 404;
			break;
	}

	/*
  + Returning the html file as a response.
  1. Read the html file 
  2. If there's an error, then log the error but also end the response
  3. If there isn't an error in finding the html file, we can
    do response.end(data) to return the data as a response and end the response
    with one line. 

  */
	fs.readFile(path, (error, data) => {
		if (error) {
			console.log(error);
			response.end();
		} else {
			response.end(data);
		}
	});
});
server.listen(PORT, hostName, () => {
	console.log(`listening for requests on port ${PORT}`);
});
