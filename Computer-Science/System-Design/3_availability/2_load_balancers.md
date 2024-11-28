# Load Balancers

## What are load balancers?
Load balancers distribute incoming client requests to computing resources such as application servers and databases. In each case, the load balancer returns the response from the computing resource to the appropriate client. Load balancers are effective at:

Preventing requests from going to unhealthy servers. Preventing overloading resources.
Helping to eliminate a single point of failure. To protect against failures related to load balancers, it's common to set up multiple load balancers, either in active-passive or active-active mode.

- **Advantages:** A critical step in horizontal scaling as it allows you to have multiple servers taking in requests, or multiple databases taking queries.
- **Disadvantages:** Introduces complexity for cloning servers. Since there are multiple servers, your servers should somehow achieve statelessness. We don't want a user being logged in on one server, and not on another.  
  1. Centralized Session Store: Stores session data in a shared location. This would be a database or persistent cache. As a result, each server doesn't need to remember the user's session state because they can just check with the centralized store.
  2. Sticky Session (session affinity): We ensure that once a user connects to a server, all subsequent requests will go to that server.

## Layer 4 Load Balancing

### What is Layer 4 Load Balancing?
Uses information in the networking transport layer (Layer 4) as the basis for deciding how to distribute request across a group of servers. It's going to use some info:
1. Source and destination IP addresses
2. Ports in the packet header.

### Layer 4 and NAT 
When the load balancer gets a request, it also performs a Network Address Translation (NAT) on the request packet. Here it changes the destination IP address from its own to that if the content/target server that's private facing. Similarly, before sending the response to the client, it changes the source IP address from the private facing server's IP to the load balancer's IP.

This type of load balancer usually comes in the form of hardware by a vendor. This used to be a popular form of load balancing when hardware wasn't as performant. But now computers are a lot better so Layer 4 load balancing isn't useful or relevant anymore.

## Layer 7 Load Balancing

### What is Layer 7 Load Balancing
Operates on the highest level in the OSI model, on the application layer. These load balancers base their routing decisions on stuff like the HTTP header, contents of request, cookies, etc. It actually deals with the content a HTTP request. This is more expensive, but usually more efficient. We're able to make smarter load-balancing decisions.

Modern load balancers, such as NGINX Plus or NGINX, operate at Layer 7 and serve as reverse proxy servers (well cover this later). These are reliable, and even the software based load balancer is very efficient!

### Example of Layer 7 Load Balancing
You have a user on your website. Over the course of their session, they may request static content (image/video), or dynamic content (user shopping cart, feed, etc.). Layer 7 load balancing means we can route a request based on the information of the request itself, such as what kind of content is being requested.

You can route the static requests to specialized servers that store your videos or images in high quality. Then requests for dynamic data can be done through your other servers.

## AWS Elastic Load Balancer (ELB)
AWS ELB is the umbrella service for several types of load balancers that operate at different layers of the OSI model. There are three main types of ELBs:
1. **Application Load Balancer (ALB):** Works at the application layer. It used for HTTP/HTTPS traffic and allows for advanced routing based on HTTP headers, url, etc. This is good for microservices and containerized apps. 
2. **Network Load Balancer (NLB):** Works at the transport layer, and it's designed for TCP, TLS, and UDP traffic. 
3. **Classic Load Balancer (CLB):** It's a legacy load balancer that operates about both the application and transport layer. Though, AWS recommends you use the former 2 load balancers.


# Credit: 
[Layer 4 load balancing](https://www.f5.com/glossary/layer-4-load-balancing)

[Layer 7 load balancing](https://www.f5.com/glossary/layer-7-load-balancing)

[AWS's Elastic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-listener-config.html)
