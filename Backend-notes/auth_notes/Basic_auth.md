## Basic Authentication
Basic authentication is a mechanism that can authenticate your access to resources over http. Essentially the built-in browser will pop up with the option to enter your username and password. This is a part of the HTTP specifications, and has support for all browsers

### How it works
1. Client makes request for a protected resource on the server. In this first request, server checks the 'Authorization' header. Since it's empty, server sends a status 401 and 'WWW-Authenticate' header with value "Basic". This will trigger the browser to trigger basic authentication.

```
401 Unauthorized
<!-- 'realm' is just a value assigned to a group of pages that will use 
    the same credentials. The browser may use this value to cache the credentials, 
    and use these in the future when the browser fails to authenticate.-->
WWW-Authenticate: Basic realm='user_pages'
```
2. Browser will show the pop-up form that allows for username and password. 
3. Once the user submits this form, the browser will encode the input with base64 encoding and send them in the 'Authorization' header of the same request. Note that in order for basic auth to be secure, TLS/HTTPS should be used.
4. Server receives request and will decode the the base64 strings to get the username nad password. Then they'll use this to check if the credentials are valid or not.

### Credits: 
1. [HTTP Basic Authentication](https://roadmap.sh/guides/http-basic-authentication)
2. [Basic Authentication Visual Chart](https://roadmap.sh/guides/basic-authentication)
