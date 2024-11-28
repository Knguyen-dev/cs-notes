# Reverse Proxy (Web Server)

## What is a reverse proxy?
A web server that acts as a middle man between the client and a server that's supposed to handle requests. They sit in front of our web servers that are designed 
to handle requests, and we usually do it like this to increase security and performance.

### First, what is a proxy?
A 'forward' proxy (proxy/proxy server/web proxy), is a server that sits in front of a group of client machines. When those client machines make requests to other sites, 
the proxy server will intercept those requests, and communicates with the destination web server on the behalf of the client machines. It acts like a middle man. For example,
the 3 computers involved in a typical forward proxy communication:
1. The user's home computer.
2. A forward proxy server. This takes the user's request, and makes it on their behalf. It waits for a response from the server and delivers that back to the user's computer.
3. The website's origin server (where the sites data is stored). It sends a response to the proxy server.

### Why would you need a proxy server?
- **To block access to certain content:** They can be setup to block a group of users from accessing certain sites on the Internet. For example, a school network is probably configured such that anyone connected has to go through the proxy. As a result, the proxy can be configured to refuse requests to certain sites such as Facebook and Instagram.
- **Avoid state or institutional browsing restrictions:** Some governments, schools, etc. use firewalls to limit users access to the internet. A forward proxy lets users bypass this.
- **Identity Protection:** Regular Internet users may want more online anonymity. For example, they could live in places where posting about the government is pretty illegal. Using a forward proxy to connect to a website to talk about it is a lot safer, as you aren't given the IP address of the user's machine, but a proxy's IP.

### How is a reverse proxy different?
A regular proxy sits between the client and the internet, sending and receiving requests on a client's behalf. A reverse proxy is a similar idea, but on the server's side. These listen for requests from the client and then send requests to servers, and sends responses on the behalf of those servers. As a result the servers aren't exposing their IPs, but rather the proxy is the only thing public.

Essentially the difference is: A reverse proxy is a server that sits in front of one or more web servers, intercepting requests from clients. This is different from a forward proxy, where the proxy sits in front of the clients. 

### Benefits of a reverse proxy
- **Increased Security:** With a reverse proxy, the IP addresses of the origin servers aer never revealed to the public. This makes it more difficult to do a targeted attack such as a DDoS attack as attackers will only be targeting the reverse proxy itself. Also reverse proxy services nowadays have built in mechanisms to detect suspicious traffic and prevent DDoS attacks from taking down your origin servers.
- **SSL or TLS support:** Can be configured to decrypt incoming requests and encrypt all outgoing requests. This not only reduces computationally expensive operations from your origin server, but it's just extra security against things like 'man in the middle' attacks.
- **Increased scalability (load balancing):** A reverse proxy also acts as a load balancing solution, distributing traffic evenly amongst your different servers.
- **Caching:** They can also cache content. For example, a user in Paris connects to a site with origin servers in Los Angeles. The request would probably go to a Paris reverse proxy that would communicate with the LA origin servers, then cache the results of the response. As a result, subsequent Parisian users will also get the locally cached version from the load balancer, which increases performance on both sides.

### Should I implement mhy own reverse proxy?
Some companies try to do this, but it requires a lot of software and hardware engineering knowledge. As well as this, it's a lot of money to buy the hardware. So for normal businesses and developers, you should just use a paid service rather than making it from scratch.

### Load Balancer vs Reverse Proxy
They're both very similar, as they both distribute traffic and stand in front of your web servers, allowing their IP addresses to be private.

If you're looking to distribute traffic, just use a load balancer is useful since you have multiple servers. If you just have one or two servers, then a reverse proxy is perfect for your use-case.

# Credits:
1. [What is a reverse proxy - Cloudflare](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)
