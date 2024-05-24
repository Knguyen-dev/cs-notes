# API 

## Rest API
1. Stateless: All information required in a request is sent by the client. Every request is a standalone request, so the server doesn't store data during client-server communication. If we send two requests, A and B. The server shouldn't need to remember any information from request A, to do stuff for request B. Every request is self-contained.
2. Uniform interface and identification of resources: Client and server should know the rules on how to communicate with each other. Your url endpoints are resource based. So let's say we had posts, to get a list of posts the endpoint is '/posts', so a plural noun. Then to get a particular post do '/posts/:postId', so the plural noun and then an have a 'postId' route parameter. This indicates that we're uniquely identifying a particular post. Then go deeper with '/posts/:postId/comments' to get the comments on a particular post. You get the idea
3. HATEOAS (Hypertext as the engine of application state): The response sent fro mthe server needs to contain information about what the client can do in further requests. For example when returning posts, return the links to those posts. Or when retuning users, have a 'prev' or 'next' links.
```
<!-- Notice how there are follow-up routes that the user can take with the request. Of course in different situations, the follow-up links may be different, and that's ok!-->
{
    "account": {
        "account_number": 12345,
        "balance": {
            "currency": "usd",
            "value": 100.00
        },
        "links": {
            "deposits": "/accounts/12345/deposits",
            "withdrawals": "/accounts/12345/withdrawals",
            "transfers": "/accounts/12345/transfers",
            "close-requests": "/accounts/12345/close-requests"
        }
    }
}
```
4. Layered system: There could be a lot more than just client and server. Between them there could be a proxy layer, some kind of cache, etc.

### Request Anatomy
1. URL: Base address to access the resource. E.g. "http://api.example.com"
2. URI: Specifies which specific resource the client would like to request. E.g. "/products"
3. Information that affects the client specifies which affects server response.
- Body params: Contained in the body of the request. Used in cases where we NEED data to successfully process a request. Such as a create or update.
- Route params: Parameters in the url. Good for idnetifying a resource that we're getting or will be targeted by a request.
- Query params: Parameters inserted in the url. More so related to filter and searching. Such as: http://api.example.com/products?name=laptop&available=true

4. CRUD routes:
- GET: Get data. Get data about a post or many posts 
- POST: Create a new piece of data. Create a new post
- PUT: Update a resource in its entirety. So update all attributes for a post.
- PATCH: Update a specific attribute of a resource. Updaet the description of a post


### Rest API Best Practices

#### Basics of structuring a response:
1. Accept/Respond with JSON: Json is just standard and common for transferring data so don't deviate from it.
2. Use nouns instead of verbs in endpoints: We use nouns to represent the thing we're getting. So don't use '/getComments' to get a list of comments. Instead use '/comments', where we just include the noun. Remember following CRUD, we know GET, POST, PUT, and DELETE.
3. Use logical nesting: Group stuff that make sense together. If your object contains another object, then cover that endpoint. So a post contains comments, so do '/posts/:postid/comments/:commentid'. However, don't nest too far, as if you're 2 or 3 levels in, you may want to return a URL to those resources. So if you want to return a user who made a comment, you could do "/posts/:postid/comments/:commentid" and return that, or you could send a json response such as "author": "/users/:userid".

##### Error handling and returning error codes:
When an error occurs, we need to respond with the proper HTTP repsonse codes to indicate what kind of error it was.
1. 400 Bad Request: Client side input failed our serverside validation
2. 401 Unauthorized: User isn't authorized to access resource. Usually when user isn't authenticated.
3. 403 Forbidden: They're authenticated, but they're just not allowed to access a resource.
4. 404 Not Found: Resource wasn't found
5. 500 Internal server error: A generic server error. Probably shouldn't use it too much since it doesn't really provide much information.
6. 502 Bad Gateway: Invalid response from an upstream server
7. 503 Service Unavailable: Something unexpected happened serverside. Could be a server overload, or some parts of the system failed.

#### Filtering Sorting and Pagination:
For pagination, we return a few results at a time, say 10 results per call. Typically the api would have a 'next' url in the json to get the next page of results. For filtering, allow search parameters to affect what they get from the database. Sorting of course allows them to sort. So with "http://example.com/articles?sort=+author,-datepublished", + indicates ascending order whilst - indicates descending order.

#### Security practices:
- Use SSL/TLS security so that most communication between client and server is private.
- Have good authorization, so users shouldn't be able to access more information than they're
  supposed to. We'd assign roles to users, and the admins could change their roles.

#### Caching data:
Improve performance by returning data from the server's memory isntead of querying the everytime. We'd be able to get their data faster. Of course the user could get outdated data. One solution is setting an expiry time: Always set an expiry, which is the time we consider the data as outdated, and so if it is we fetch new data from database.

# Versioning the APIs
Have different versions of your API so that even if you make major changes, it'll be on a different API version than the ones that clients access. As a result, your changes won't break stuff for the clients since they're not using your newest version. This lets us gradually phase out old API versions, while not forcing everyone to use the newest versions all at the same time. We indicate versions by prefixing "/v1" or "/v2", which mean version 1 or version 2 at the start of our API paths. For example "/v1/employees" and "/v2/employees" both get a list of employees but are different API versions!

## JSON API
Specification/standard that defines how a client CAN ask for data and a server should respond when they ask for 'JSON' data. JSON data is JavaScript object notation. Let's say we want to get data back for a social media post, and we want it in json:
```
{
    "id": 1,
    "author": "james119",
    "title": "Going to Vegas",
    "description": "Hey guys I'm going to vegas"
}
```
This is what you'd get back. In some cases you should be able to specify the fields that you want to get back as well.

## What is XML
'XML' (Extensible Markup Language). let's us define and store data in a shareable manner. Allowing commmunication between websites, databases, third-party applications, etc.

XML can't do operations and computations, however we can define rules and structure our data. We can use markup symbols to tell 'Make the title bold', 'This sentence is a header', and 'this word is the author'. These symbols are 'XML' tags. For example, tags such as <book>, <title>, <author> could be used to structure information about a specific book. Doing this we can have some 'structure' to our data. 
```
<book>
    <title>Learning Amazon Web Services</title>
    <author age="22">Mark Wilkins></author>
    <genre>Technology</genre>
    <numPages>129</numPages>
</book>
```

### Components of an XML file
XML, kind of like json, is just another way of communicating and sending datat across. Let's talk about some components of an XML file:
1. XML document: The `<xml></xml>` tags are used ot mark the beginning and end of an XML fill. The content within tags are also called the XML document.
2. XML declaration: Tag or section that contains information about the XML itself. Such as the version, encoding, etc.
3. XML elements: Any tag we create inside an XML document, are called XML elements. Such as <author>, <genre>, etc. These elements can have text inside of them, and be assigend attributes.
4. XML attributes: Custom attribute names that you can put on XML. Such as the age attribute put on the author tag.
5. XML schema: Document that describes some rules or limits on the structure of the html file. Things such as order of the elements, yes/no conditions that the content ust satisfy, data types for content in the XML file, etc. For example, a book element will have title and author attributes, price of a book will be a separate element nested under book. Defining these rules let's other applications know how to parse and process the XML
6. XML parser: Software that processes or reads XML documents and extracts data from them. They can also validate syntax against schemas and whatnot. Essentially we use XML paresrs to understand and also translate the data into regular data types in programs. As a result we don't have to worry about implementing that ourselves, and we can focus on business or app logic.

## SOAP (Simple Object Access Protocol)
Another message protocol for exchanging information and communicating between systems. The SOAP API, or standard, is based on XML. It was built as a solution to communicate over HTTP, since HTTP was universal. A SOAP message is a regular XML document with the following items:
1. Envelope: Element idnetifying hte XML document as a 'SOAP message'. Our 'xmlns:soap' namespace defines the envelope as a SOAP envelope. If a different namespace is used, an error is thrown.
```
<?xml version="1.0"?>
<soap:Envelope
xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding">
  ...
  Message information goes here
  ...
</soap:Envelope>
```
2. Header: An optional header would have info such as authentication, payment, routing info, etc. about the SOAP message. The header should be the first child of the envelope.
3. Body: Contains all actual information you want to send to the server, and vice versa. 4. Fault: Element containing errors and status info that we got from our request. It contains elements for the status code, human read-able error, info about what caused the error, and even app specific error info.

### Soap Syntax Rules
- A SOAP message must be encoded with XML.
- Must use 'SOAP Envelope' namespace. For SOAP messages there are standard namespaces, methods to avoid name collisions by qualifying names in the XML doc with a URI. These standard namespaces are widely used to ensure a common way of communication. There are two common ones:
1. For SOAP 1.1: `http://schemas.xmlsoap.org/soap/envelope/`
2. For SOAP 1.2: `http://www.w3.org/2003/05/soap-envelope`
- SOAP Encoding Namespace: Defines the data types used in SOAP messages and hteir encoding values. It's less commonly used now, but it's used for completeness:
1. For SOAP 1.1: `http://schemas.xmlsoap.org/soap/encoding/`
2. For SOAP 1.2: `http://www.w3.org/2003/05/soap-encoding`
- Can't contain a DTD reference.
- Must not contain XML processing instructions.

# Credits:
1. [REST Fundamentals](https://dev.to/cassiocappellari/fundamentals-of-rest-api-2nag)
2. [Rest API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design)
3. [JSON API explained](https://www.youtube.com/watch?v=N-4prIh7t38)
4. [XML Explained](https://aws.amazon.com/what-is/xml/#:~:text=Extensible%20Markup%20Language%20(XML)%20lets,%2C%20and%20third%2Dparty%20applications.)
5. [What are SOAP web services](https://www.youtube.com/watch?v=sTGgBoFBDAY)
6. [SOAP API Tutorial - W3School](https://www.w3schools.com/xml/xml_soap.asp)
