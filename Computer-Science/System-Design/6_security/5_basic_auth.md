# Basic Authentication
Basic authentication is a simple method for verifying access to resources over HTTP, supported by all major browsers. It triggers a browser-based login prompt when authentication is required.

## How It Works
1. **Initial Request**: The client requests a protected resource. The server responds with `401 Unauthorized` and a `WWW-Authenticate: Basic` header, prompting the browser to display a login form.
2. **User Input**: The user enters their username and password, which the browser encodes in base64 and sends in the `Authorization` header.
3. **Server Validation**: The server decodes the base64 string to extract credentials and checks their validity.

## Why basic auth isn't commonly used.
You have to send your credentials on every request. There's no built-in session management, so once a user is authenticated, you can't really revoke it.

Also the UX is pretty bad. Most users and developers are used to custom login pages rather than logging in via the browser. So there's limited customization there.

Finally there are just better options. JWT and session-based auth offer advanced features such as authentication revocation.

# Credits: 
1. [HTTP Basic Authentication](https://roadmap.sh/guides/http-basic-authentication)
2. [Basic Authentication Visual Chart](https://roadmap.sh/guides/basic-authentication)
