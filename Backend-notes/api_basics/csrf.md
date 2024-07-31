# Cross Site Request Forgery

## Foundations:

### Cookie Flow

Imagine you're on a web app. By logging in, the web app sends the login request to the server. The server verifies that your credentials are correct, and sends a cookie back to the web app (client, your browser essentially). These cookies are then stored in your browser, and whenever you (the client) makes a request to the server, those cookies are sent in the request to verify that it's you, a logged in user.

### Cross Domain Access Control

-   iFrames: These HTML elements allow you to embed one website inside another. However, you can't do "cross-iFrame communication," which refers to the idea of two websites trying to communicate with each other through an iFrame. This includes data exchange, such as passing user input from the parent page to the child via the iFrame, and setting up event listeners to work together across the sites.
-   Same Origin Policy: This cross-communication is not possible due to a policy/rule on the web called the "Same Origin Policy". This rule restricts the execution of scripts and the sending of requests from one website to another unless they share the same origin (protocol, domain, and port). This makes things secure, as one random/sketchy website can't simply request data from another website without agreements and consent in place.

#### When would communication between iFrames work?

Communication between iFrames would only work when the 'same-origin' condition of the Same Origin Policy (SOP) is met. This means that three elements between the websites must match:

1. Domains: The domain names must be identical.
2. Schemas: The protocols (e.g., HTTP, HTTPS) must be the same.
3. Ports: The port numbers must be the same.
   If these conditions are met, the websites are considered to be of the same origin. In other words, you're performing a 'same-origin' request or data transfer. The data is being sent and received from and to the same origin/site, rather than one website sending information to a different one.

-   Clarification with same-origin-policy: SOP allows us to make a request to another website, but it just doesn't allow us to read the response. So `evil.com` is allowed to make an HTTP request to `vulnerable.com`, but the former isn't allowed to read the request sent by the latter. This is good because let's say users are logged into `vulnerable.com`. SOP prevents other websites from accessing this data without their consent, and only allows `vulnerable.com` to read said data. Furthermore, if `evil.com` could read responses from `vulnerable.com` it could obtain sensitive information about the users.

#### Common issues that SOP protects us from

Cookies are automatically sent through requests, and SOP helps ensure the server that set a cookie is the only one that's able to access said cookie. This greatly reduces the risk of malicious site potentially accessing cookies set by other sites.

-   Session Hijacking: Attackers can steal session cookies, allowing them to impersonate authenticated users and gain unauthorized access to their accounts.
-   Cross-Site Request Forgery (CSRF): Attackers could make authenticated requests to a site on behalf of a user. By first stealing the session cookie (session hijacking), the server would believe they are the real user, as session cookies are a main form of authentication. This would enable attackers to perform actions such as changing a user's settings, updating profile information like their username, and even attempting to change the user's password. We’ll go more in-depth about this as it is our main topic.
-   Data Leakage: Cookies can store sensitive information such as authentication tokens, which could include sensitive user data.

## Cross-site Request Forgery

One domain is making or 'forging' a request to another to modify some value. Let's use an example.

### Situation

You're on a website called `vulnerable.com`, and you're logged in. This makes you'd have a cookie to identify yourself as a logged in user, probably a cookie named `SessionID`. The website's server uses this cookie to authenticate that it's you, so as long as you have this cookie you could do things such change your user information, your password, and even delete your account. The deletion request would look something like this:

```
POST /delete_my_account
Host: vulnerable.com
Cookie: SessionID=d34dc0d3
```

Doing these things require certain permissions and that session cookie is 'proof' that the client, or you, is authorized to do that. So as long as you have an endpoint and a cookie, you can make a request. Luckily you're the only one with that private session cookie, so only you can delete your account, right?

Now then, let's say you click a link on `evil.com`. It's a fun website. However, it secretly stole your session cookie. Now it can use that cookie to impersonate, and the servers behind `vulnerable.com` will fall for it, because it is your session cookie. They can change your profile info such as your username, change your password, and even delete your account. In summary, `evil.com` just 'forged' a request to `vulnerable.com` using your cookie, and this is called Cross-Site-Request-Forgery.

### Protections against CSRF

CSRF is an old vulnerability, and the situation I described above is one that won't happen so easily anymore. An widely used measure against CSRF is using short and randomized tokens, aka 'anti-csrf' tokens.

#### Anti CSRF Tokens

Anti-CSRF tokens are unique, random strings generated by the backend server and sent to the frontend. These tokens are used to protect against Cross-Site Request Forgery (CSRF) attacks. Here’s how they work:

1. Token Generation and Distribution:

-   When a user logs in or accesses the web app, the backend server creates a unique CSRF token for their session.
-   This token is stored server-side (often in the user's session data) and sent to the frontend, typically embedded in forms or included as a header in AJAX requests.

2. Token Usage in Requests:

-   When the user makes a request that changes state (e.g., submitting a form to change their username), the CSRF token is included in the request. This can be done by:
-   Including the token as a hidden input field in forms.Adding the token as a custom HTTP header in AJAX requests.

3. Server-Side Validation:

-   When the server receives a state-changing request, it checks the CSRF token sent with the request against the token stored server-side.
-   If the tokens match, the request is considered legitimate and is processed. If not, the request is rejected.

#### How Anti-CSRF Tokens Enhance Security

-   Difficulty for Attackers: It's challenging for attackers to obtain a valid CSRF token because:
    -   HTTPS Protection: Tokens are sent over HTTPS, which encrypts the data in transit.
    -   Inclusion in Forms or Headers: Tokens are usually included in forms or request headers, which are not easily accessible to attackers.
-   Session-Specific Tokens: Even if an attacker manages to obtain a token, it is tied to a specific user session and cannot be reused for other sessions or users.

#### Limitations and Security Considerations

-   Edge Cases: There are rare scenarios where an attacker might be able to obtain a CSRF token, but these are generally difficult and require additional vulnerabilities (e.g., XSS attacks).
-   Mitigation: Anti-CSRF tokens significantly reduce the risk of CSRF attacks by requiring a valid token for any state-changing request, plugging a major security hole.

### How to do a CSRF attack

Let's see how clicking on `evil.com` deleted our account On page load, you can have a script that hits that delete account endpoint asynchronously. As a result, your app will get that SOP error as a response, but the request to delete the account is still sent to the server.

### Modernity and protection

Let's say you're doing a CSRF via an API that accepts JSON. The server will explicitly require a certain 'Content-Type' header value and reject all requests that don't have that value. If the server accepts JSON, your request needs to have a json header. This isn't possible with forms as they don't support sending JSON. With JavaScript you can set the header for requests, but the server has to agree to those headers via CORS. If not then modern browsers will prevent the sending of cross origin requests. This is a lot stricter than how it was done historically, as before it was you can send the request, but not read the response.

## Cross Origin Resource Sharing

Basically a secure and really good bypass for SOP. So we maintain our SOP security standards, but we can now allow for some origins to bypass sop and access our site. This is really good for a frontend site and a backend API, as they're usually on different origins. Via CORS, you can make an exception for the frontend site, and allow it to make requests to your backend, whilst still protecting your backend against other unauthorized origins.

### CORS Preflight Requests

-   Preflight Requests: For requests that could affect user data, such as those with custom headers or HTTP verbs like PUT or DELETE, the browser sends an initial OPTIONS request called a "preflight" request.
-   Purpose: This preflight request is sent before the actual request to check with the server whether the real request is allowed.
-   Server Verification: The server responds to the preflight request indicating whether the actual request, including its headers and method, is permitted.

### Blocking Unauthorized Requests

-   Request Blocking: If the preflight request does not receive a positive response from the server (i.e., the server does not explicitly permit the requested method, headers, or origin), the actual request will not be sent.
-   Effect on Cross-Origin Requests: This means that a cross-origin request will only be sent if the server explicitly allows it via the CORS policy indicated in its response to the preflight request.

### Setting the Content-Type Header via JavaScript

When making a cross-origin request using JavaScript (e.g., via fetch or XMLHttpRequest), there are specific CORS headers that the server needs to send back in response to the preflight request to allow the main request to proceed.

#### Correct Behavior and flow

1. Preflight Request:

-   If the main request is not a "simple request" (e.g., it uses a method other than GET, POST, or HEAD, or it has custom headers like Content-Type: application/json), the browser will send an OPTIONS preflight request to the server.
-   The preflight request checks with the server whether the actual request is allowed. Checks if the HTTP method is allowed, if the headers and their values are allowed, if the origin is allowed, which are the main things.

2. Server Response to Preflight:

-   The server must respond to the OPTIONS preflight request with the appropriate CORS headers to allow the main request. Here are the required headers:
    1. Access-Control-Allow-Origin: <your-site>: Specifies which origin is allowed to make the request.
    2. Access-Control-Allow-Headers: Content-Type: Indicates that the Content-Type header is allowed in the main request.
    3. Optionally, Access-Control-Allow-Methods: <methods>: Specifies which HTTP methods are allowed.

3. Main Request:
   If the preflight request is successful (i.e., the server responds with the necessary CORS headers), the browser will then send the actual request with the specified headers.

# Credits:

1. [Cross-Site Request Forgery (CSRF) explained](https://www.youtube.com/watch?v=eWEgUcHPle0)
2. [Cross Site Request Forgery](https://www.youtube.com/watch?v=vRBihr41JTo)
