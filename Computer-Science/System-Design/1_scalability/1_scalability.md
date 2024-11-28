# Scalability

## What is scalability?
The capacity for a system to change in size, mainly used when talking about whether a system can grow bigger. If your system can scale, you can increase the amount of servers and infrastructure so that you can handle a larger user base whilst maintaining performance.

A service is said to be scalable if when we increase the resources in the system, it results in increased performance in a proportional manner to the amount of stuff added.

### Common issues when solving scalability:
- **Redundancy:** Often the first line of defense as we want an always-on service, ideally. Scalable if adding resources to facilitate redundancy doesn't make us loss performance.
- **Technological Heterogeneity:** When scaling you'll probably start having vastly different levels of computers and tech. Like there's probably going to be many different technologies that could be working on different things, or the same thing. You may have an old computer from 10 years ago, and then a more modern on your architecture, leading to faster response times for some servers.

### How to build a scalable service?
The best way to build a scalable system is that you simply need to be planning and thinking about how it can be scalable from the start. This makes it a lot easier, and of course this involves quite a bit of planning for the future. 


## Types of Scaling
Static, dynamic, and some database stuff. How do you go about scaling your site?

### Vertical Scaling
If you're running low on ram, exhausting cpu cycles, or running low on disk space, you simply get more 
stuff. Add more resources to the system. This means upgrading the CPU, adding more ram, increasing your 
network speed, or even replacing your entire server with a more powerful one.

- **Disadvantages:** The drawbacks of this are that at some point you'll either exhaust your financial resources, or you'll reach the current limit in technology. In the sense that, hey there's no CPU more powerful than the one you currently have, so you have to look for another solution. In any case, you're either going to hit a technological and financial ceiling, which isn't good.

- **NOTE:** Most new CPUs have a dual-core CPU, which is two brains or two microprocessors, allowing us to run
two things at a time. Of course, we're able to run multiple things, as the programs quickly switch on 
and off using resources, so things are happening serially, but they seem parallel. 

### Horizontal Scaling (And Load Balancing)
Rather than using one really good machine, we can use multiple average machines. So now when we get HTTP requests, 
we need to distribute these requests between our servers. This is called load balancing, and as we balance 
the traffic between the servers, it makes it easier for our servers to quickly respond to a low-moderate amount 
of requests, rather than having one server respond to a high number of requests.

Servers 1, ... n will have unique IP addresses, so we need to somehow handle this. Instead of sending back the 
ip-address of a server when we make a request, send the IP address of the load balancer. Then we can let the 
load balancer handle the logic of sending the data to one of the servers. As a result we can make the addresses of our servers private, whilst the load balancer stays public. The benefit of this is that no bad guys can directly contact our servers, and everything goes through the load balancer, a central point. But how would we load balance, the methodology? One way you could do it is we could send the request to the least busy server to optimize. This involves querying the server to see how busy it is. 

However there's another example rather than checking if servers are busy is doing tricks with DNS. When we send a request
we're sending packets to a DNS server. Let the load balancer be a fancy DNS server such that when someone makes a request 
to `www.website.com` we return the ip address of server 1, server 2, ... server n; spitting out a different IP address each time.
This is called (round-robin/randomness). The drawback is that this doesn't check if servers are busy, so by bad luck, one of the servers could be handling a lot heavier work than the others. For a real life implementation, you'd typically use vendor software, which is more affordable and easily configurable. 

## Shared Session State
Sessions are typically unique to a given machine. Servers can store them as text files or some way on the server when it's running. But in the simple case, server 1 has a session for you, but server 2 doesn't. So if you refresh the page, and you're sent to server 2, then you have to log in again. This would be annoying. 
- **Solution (Shared State):** Have a server that's dedicated to storing and handling session data, so when a server needs to verify someone's session, they just need to check with the session server. Another solution could be having the load balancer also store session data, so now it's more like a server. However, if the one computer that's handling the sessions is going to fail, then that's a big problem.


How to mitigate the risk of the single session server going down?
- **Solution 1 (Multiple Shared State):** The obvious solution is to have multiple session servers that have the same exact data. This is accomplished with the idea of database replication. 
- **Solution 2 (Sticky Sessions/Session Affinity):** User's session is stuck to a particular server after initial request. So they are always routed back to the same server for the duration of their session. This can be achieved by storing what server the session cookie is associated with, within the cookie. You could store random number in the cookie, with the random number corresponding to a given server. So when sent to the load balancer the load balancer would recognize the random number belongs to server 2, so the request could be authorized.

## Raid (Redundant Array of Independent Disks)
- **Raid0:** You have two identical hard-drives. So when saving data, you write some data to the first hard-drive and the rest 
to the second hard-drive. The advantage is that saving data is a little faster.

- **Raid1:** The idea of mirroring, so you save the same data to two different hard drives. So if one drive dies, you have the other drive 
that saves your data. Then you could back-up your data from the good hard drive to other hard drives. 

There are other forms of raid, but the main benefit is that it introduces redundancy within one of your servers. Reduces 
downtime and data loss for your server. 

## Caching
For sites like Craigs-list, it spits things out as an html file, as opposed to where we 
store and render things server-side. It allows them to store the html file and cache the webpage.
A downside is that storing things on disk. Imagine you have to change the background 
color, you'd have to change a lot of files, and this is pretty bad.

- **MySQL Query Cache:** The database caches queries that it has seen before 
- **Memcache:** A memory cache, so it's some software that runs on your server. It stores whatever you want in RAM. 
So instead of getting your data from the database or some kind of backend service, just get it from the cache. As a result 
we get things a lot quicker. Of course there's still the limit on ram. So if some data hasn't been used in a while, we can remove 
it from the cache. If something is frequently used, on every cache hit maybe we want to refresh the TTL so that it stays alive. Of course 
you'd still need to balance this with freshness of data. An example of this is when you cache a user profile for a certain amount of time so that you aren't 
hitting your databases each time users look at a certain profile. 

## Database Replication
Take a look at the databases section of our notes. Just read the section about replication

## Looking at some examples:
### Example 1: 
[image](https://drive.google.com/file/d/1K1whw3Uj177MHri9BM-uPc-qDF_zhoH3/view?usp=sharing)
1. Requests go to the load balancer. 
2. Load balancer chooses what server to send the request. 
3. If it's a read request, we send the db query to our load balancer, and this load balancer runs the request on one of the slave databases that are dedicated for read operations.
4. If it's a write request, we send that to our master database. Once changes take place in our master database, the slave databases are asynchronously updated to reflect those changes.

### Example 2: 
[image](https://drive.google.com/file/d/1UV_xpvYdw3von13Y-FKXwIg65O6G8ZFq/view?usp=sharing)

Let's say this is a social media platform, and we have database clusters, dedicated for reading, for the east and west coast. So when a user is on the west coast, and they want to view a post, their request is sent to a west coast server (after server load balancer for the west coast presumably). That server queries the west coast database cluster), so the db query goes through the respective load balancer, and hits some slave database.

When the user wants to do something like make a comment, upload a post, or any write related operation then we'll interact with the master DB. So from the beginning, we make the request, it hits the west coast load balancer, goes to a server, we see it's a write operation so we hit the master database. Then after the master database is updated, the changes are then replicated amongst the clusters. Now a user that's on the east coast can see the west coast user's post because that post is now stored on the east coast database cluster.

**NOTE:** An alternative is multi-master (regional master) approach, where you'd have multiple master databases. So you'd have a load balancer that would allocate write commands amongst different master databases. So the data replication process typically works asynchronously: When master 1 is updated, the changes are replicated asynchronously to master 2. Then both master 1 and 2 asynchronously replicate teh changes to their respective slave databases in parallel. Though there's no strict order, and so the order which things happen isn't as important, you just need to know that the masters update each other and the slave databases. Anyways, multi-master requires complex conflict resolution mechanisms to ensure data consistency since multiple masters could write data simultaneously. This approach is only necessary for high-scale apps with extremely high write demands and strict regional data requirements.

### Example 3
[Image](https://drive.google.com/file/d/1w2uU-5rKGaoj_Y6L4Qyliv7kBbkJ3Qq2/view?usp=sharing)

Shared State is too complicated and expensive. How can we ensure the idea of sticky sessions, or the idea of the user being able to use their session even with multiple servers, using the fact we have a load balancer?
- **Solution:** Have the load balancer insert some kind of cookie, that links a random number to a corresponding server. As a result, when we get a request with our cookie, we view that cookie, view the random number in that cookie, and specifically send the request to the corresponding server the client has a session for.


What's the problem with having a unique database inside or for each server?
- **Solution:** A unique database for each server is an issue with data consistency. If user creates a profile on Server 1 and Database 1, the next time they login or use the site, they could be routed to server 2. They have no profile on Server 2, so they no longer have an account. They'd need to be lucky and get on server 1 again, which is not ideal.

What's the problem for having only one database, and how could we solve it?
- **Solution:** The issue with only one database for these servers is again, that idea of a single point of failure. So let's do a multi-master approach, where we have two databases that can read and write. Then let's have two load balancers for the http and database layers in case one goes down. This helps mitigate the idea of a single point of failure. You can call this entire thing a data center, as it's going to be a building containing servers and computers that run your application.

But what if the building goes down? What if a hurricane destroys some of your data centers?
- **Solution:** The idea of cloud computing is, instead of buying our own servers, we outsource these servers and computing power to a company that specializes in them. We rent space on said servers, and on Amazon they offer 'availability zones'. This stuff is like 'US-East-1', 'US-East-2'. The idea is that you have different buildings that have different networks and power lines. So hey have multiple data centers such that, if one goes down, you still have another to keep things operational. It's kind of 

Let's say you have multiple data centers? How do you distribute the load across multiple data centers?
- **Solution:** You can load balance on the DNS level. If someone does `www.website.com` they'll be directed to an IP addresses for a load balancer associated with said data center. Even then, they need to make sure that your session is held, even when they have multiple data centers and servers. It's unlikely that a service like Google is sharing your session with the hundreds of other servers around the world, but rather, your request will be routed at a particular data center, and it's being handled there.

What kind of security do we want being able to go into our data centers?
- **Solution:** We only want tcp:80, 443 (default port for Https based stuff). 

What kind of traffic from load balancers to servers?
- **Solution:** You want TCP 80.

Traffic between between load balancers and databases?
- **Solution:** These are SQL queries, over tcp 3306. 

# Credits: 
1. (CS75 (Summer 2012) Lecture 9 Scalability Harvard Web Development David Malan)
[https://www.youtube.com/watch?v=-W9F__D3oY4]
