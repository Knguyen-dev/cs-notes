# Webservers 

Refers to software or hardware systems that handle requests from clients and serve web content such as HTML pages, images, and other resources. They process HTTP request, interact with application servers or databases if needed, and send the appropriate response back to the client. Popular web severs include Apache HTTP Server, Nginx, and Microsoft Internet Information Services (ISS). 

## Hardware and Software Aspect
Anything with a network connection can be a webserver such as a phone, small IoT device, etc.
- **Hardware Side:** The computer needs to store website files like html docs, images, files, etc.
- **Software Side:** Software that lets clients request data. Has several components, but at minimum we have an HTTP server, which is the software that understands the HTTP protocol and can handle HTTP requests.

## Review of Terminology:
- **HTTP Server**: Parses HTTP requests and abstracts low-level handling.  
- **Web Server**: Includes an HTTP server, file storage, and supports other protocols.  
- **Static Web Server**: A computer running HTTP server software.  
- **Dynamic Web Server**: A computer with HTTP software and a persistent data store.  
- **Application Server:**  Handles dynamic content, often interacting with a database. This is often interchangeable with the dynamic web server.
- **Origin Server:** The server that's the origin of the content being served. It could be static or dynamic.
- **HTTP** (application layer) = Language of communication.  
- **TCP** (transport layer) = Handles packet transmission and reconstruction.  
- **Static Routing**: Retrieves files directly from the web server's filesystem. So this is images, static files, etc.
- **Dynamic Routing**: Requests resources based on specific identifiers or traits. So like looking for posts with a certain ID.

## Web Servers and Their Role in Development

### Development Focused Web Servers
Frameworks like Express and Django allow us to run development-focused web servers. They allow us to run the application, test out endpoints, see how the UI looks, etc. These are typically built into the framework to simplify development and testing. However, these web servers aren't meant to be used in production, as they're not designed with scalability in mind.

### Production-Grade Web Servers
Web servers like Nginx and Caddy are designed to handle high traffic, serve static files efficiently and act as reverse proxies. Here are some popular webservers:
- **Nginx (Engine-X):** A high-performance web server known for its asynchronous, event-driven architecture. This allows it to handle a large number of concurrent connections with minimal resource usage. It's frequently deployed as a reverse proxy, load balancer, and HTTP cache, sitting in front of application servers like Express or Django to distribute incoming traffic. It has powerful configurations, but can be more complex to setup than others. 
- **Caddy:** A modern, open source web server distinguished by its simplicity and "secure by default" 'philosophy. It even exposes a RESTful API for handling configurations. Its standout feature is automatic HTTPS management, where it securely obtains and renews TLS certificates (via Let's Encrypt) for our domains automatically. It's written in Go, uses an event-driven model and built-in support for modern protocols like HTTP/3 and QUIC.
- **Apache HTTP Server (httpd):** One of the oldest and widely used egb servers. It's flexibility and has a large ecosystem. Apache traditionally uses a process/thread-based architecture (Multi-Processing Modules), which can use more memory under heavy load. Its major advantage is its support for `.htaccess` files, allowing for a decentralized way to do configurations. It's highly modular and excellent for situations where we require extensive customization and compatibility. 

In a production environment, development-focused servers (like Express or Django) are typically used as **application servers**, while production grade servers (like Nginx or Caddy) act as **reverse proxies**. Here's how it works:
1. **Reverse Proxy Role:** A production grade web server sits in front of the application server. It handles incoming client requests. It directly handles serving static content (e.g. html, css, js), but when it gets a dynamic request, the reverse proxy will forward it to an application server.
2. **Load Balancing:** If there are multiple instances of the application server, the production grade server can distribute traffic among them.
3. **Security and Performance:** Production grade web servers handle SSL/TLS (HTTPS), caching, and compression, offloading these tasks from the application server .

### Example Workflow 
- Client sends a request to the domain
- The request hits the production-grade web server (e.g. Caddy or Nginx)
  - If it's a static file request, such as getting the site's logo, the production grade web server may send a response and handle the request directly.
  - If it's a dynamic request, then the server forwards it to an application server (e.g. Django or Express). 
- The application server processes the request and sends the response back to the production grade web server.
- The production grade server forwards the response to the client.

## Credits
- [What Is a Web Server - Hostinger](https://www.hostinger.co.uk/tutorials/what-is-a-web-server)
- [Intro to Webservers - MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server)
- [Making a basic static website with Caddy](https://www.youtube.com/watch?v=WgUV_BlHvj0)
- [Caddy official Docs](https://caddyserver.com/)
- [Caddy Docs](https://caddyserver.com/docs/getting-started)
- [Caddy Github](https://github.com/caddyserver/caddy)
- [Simple 7 minute Caddy tutorial](https://youtu.be/WgUV_BlHvj0?si=UAk-3lmGBM6llq1f)
- [Apache vs Nginx](https://youtu.be/9nyiY-psbMs?si=7YU7d-rCs60fn20q)