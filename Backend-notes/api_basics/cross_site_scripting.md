# Cross Site Scripting (XSS)

## Same Origin Policy
Restricts the communication between websites across different domains

## Situation: JavaScript within a website
JavaScript is used to manipulate the DOM of a website. So hypothetically, if a malicious actor was able to manipulate the JavaScript on a website, they'd be able to do things such as deface the page, steal user information, etc. In any case, a malicious actor gaining access to the JavaScript on your website is very problematic. 

## XSS: Injecting JavaScript into a website
The idea of a malicious actor injecting their own JavaScript and code into another website. As a result, they'd be able to do pretty bad things. 

### Example Situation:
Imagine you’re participating in an online group chat where you can send and receive messages. When you send a message like "Hello everyone!", the message is sent to the server, which then broadcasts it to all the participants. The server might render this message as HTML, so on everyone else’s screen, it appears as plain text: `<p>Hello everyone!</p>`

However, if you send a message containing HTML or JavaScript code instead, such as `<script>alert("Hello World")</script>`, a security issue can arise.

Here’s how it works:

1. Message Sent: You input `<script>alert("Hello World")</script>` and send it to the server.
2. Server Processing: The server receives this message and sends it to other users in the chat, including it in the HTML response.
3. Rendering Issue: When other users’ browsers receive this message, their browser renders it as HTML. Since it includes a `<script>` tag, the script is executed in their browsers.
4. Script Execution: The JavaScript code within the `<script>` tag runs in the context of the other users’ browsers. In this case, an alert box saying "Hello World" pops up.


## Why is This a Problem?
This type of attack is known as Cross-Site Scripting (XSS). It becomes a serious issue when:
- Malicious Code Execution: Instead of harmless code like an alert, an attacker might inject malicious JavaScript that steals user data, such as cookies or session tokens, or performs other harmful actions.
- Exploiting Trust: XSS exploits the trust that users have in the website. Since the injected code runs in the context of the website, it can make the attack look legitimate and deceive users.

## Consequences of XSS
1. Data Theft: Attackers can steal sensitive information like login credentials or personal data.
2. Account Hijacking: With stolen credentials or session tokens, attackers might gain unauthorized access to user accounts.
3. Malware Distribution: Attackers can use XSS to distribute malware by injecting scripts that redirect users to malicious sites or prompt downloads.
4. Defacement: Attackers can alter the appearance of the website or inject disruptive content.

## Preventing XSS
To prevent XSS attacks, web developers should:

1. Sanitize Input: Ensure that user input is properly sanitized and validated before rendering it as HTML.
2. Escape Output: Escape special characters in user input to prevent them from being interpreted as executable code. Assuming we're rendering it as HTML, which is when it could be executed as code.
3. Use Content Security Policy (CSP): Implement CSP headers to restrict the sources from which scripts can be loaded and executed.


# Credits:
1. [Cross-Site Scripting (XSS) Explained - PwnFunction](https://www.youtube.com/watch?v=EoaDgUgS6QA)
2. [Cracking Websites with Cross Site Scriping - Computerphile](https://youtu.be/L5l9lSnNMxg?si=UjtyRgSIPHlEUzFw)