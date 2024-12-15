# Design Pinterest

## Premise: System design interviews
1. **Consult interviewer/show skills:** Of course consult the interviewer to ensure you're on the right track, but your goal is to prove that you have the skills to independently design systems.
2. **Multiple solutions/trade-offs:** There are multiple solutions, so show your thinking and fluency. Also discuss trade-offs with different approaches.

---
### 4 Step template
1. **Clarify requirements and make assumptions**
2. **Sketch out a high-level design**
3. **Dive into individual components and how they interacted with each other**
4. **Wrap up blind-spots or bottlenecks**

## Task: Design Pinterest

### Step 1: Clarify requirements and make assumptions
Pinterest is a photo-sharing app with millions of users. Here are some considerations:
- **Most important features:**
  1. News feed: Customers will see a feed of images after login.
  2. A customer follows another to subscribe to their feeds.
  3. Customers can upload their images, which will appear on followers' feeds.
- **Scaling out:**
  1. There are a lot of features, and consequently teams on this project. The project should be decoupled into microservices.
  2. Most of the services should be horizontally scalable and stateless.
---
### Step 2: Sketch out the high-level design
Before diving into the details, outline the big picture. 

![](https://tp-misc.b-cdn.net/SDA/design-instagram-architecture-overview@2x.png)

---
### Step 3: Dive into individual components

#### Load Balancer
The load balancer is here since we need to balance traffic from HTTP requests to the server. Of course you could also have multiple load balancers. There are three main types:
1. DNS Round Robin: Basically it's random what server it's going to route something to. 
2. Network Layer load balancer: Traffic is routed by IP address and port. More control, simple, and traffic is distributed based on ports. However, we can't route based on data.
3. Application layer: Traffic is routed based on HTTP protocol. So the headers and request data matters. You can further expand by talking about algorithms such as round-robin, weighted-round-robin, least loaded, etc.

#### Reverse Proxy
The load balancer is also a reverse proxy. But you could use a regular reverse proxy for its security and caching benefits. They're good against DDos attacks, they're good for hiding the IP addresses of your web servers, and you could configure your reverse proxy to cache server resources.

Nginx, HAProxy, and AWS Elastic Load balancing aer popular services.

#### Web applications
Where you'll serve web pages. In the early days, a web app always used server-side page rendering, such as PHP, Django, etc. However, nowadays you may just have a frontend client interacting with some backend API.

#### Mobile App
A dedicated frontend web project is similar to a standalone mobile app as they're both clients that interact with an API/server. 

#### API App (Stateless)
The server that communicates with the client. Nowadays people often design RESTful or GraphQL APIs, which will send data to your web or mobile apps.

The major bottlenecks of the system are load (requests more second) and bandwidth. We could scale up or out, and we prefer to scale out. If we want to scale out, it's best to have our services be stateless, so they can't hold state in local/memory storage. As a result, we could restart these servers at anytime and they still work.

#### Service level and discovery
The microservices architecture means that each service focuses on doing one thing. Services should grow independently.

For services to find each other, we can use Zookeeper. We simply just need to register the service's information in ZooKeeper to track it. If a service doesn't know where another service is, it can ask ZooKeeper.

#### Follower Service
The follower (receiver) and followee (poster) relationship can be represented as:
1. Map<Followee, List of Followers>: For each user, we have a list of users that follow them.
2. Map<Follower, List of Followees>: For each user, we have a list of users that they follow.
A key-value store like Redis is useful here, as we'll use it for caching the results of followers and followees. This allows us to keep low latency for such a mission critical service. For an image to appear in one's feed, there are two models to make it happen:
1. Push: Once the image is uploaded, we push the image into all followers' feeds. If there are a lot of followers, then the 'push model' is going to cost a lot of time and data duplication.
2. Pull: Only deliver the image when they check their feed. When the follower checks their feed, we fetch a list of followees and get their images.  If the amount of followees is too large (if the fan out is too large), then this model/approach will spend a lot of time iterating the huge followee list.

#### Feed Service
This service stores image post metadata like url, name description, etc. in a database. The images themselves are stored in blob storage such as AwS S3 or Azure Blob store, places specifically designed to store files.
1. Servers create an S3 pre-signed URL that grants write permissions. So a pre-signed url allows services to certain permissions our S3 bucket, without giving them the credentials. As a result, instead of giving every client full access to your S3 bucket, you can give them limited access to do what they need to do. Here probably a few admins only have full access to manage the account and whatnot.
2. Client uploads the image binary (binary image data, as opposed to metadata) to S3 with the pre-signed URL to prove their permissions.
3. Client should also submit the post and image metadata to the server. This triggers a data pipeline to push the post to followers' feeds if there's a push model.

Cassandra is a popular choice for scenarios that involve large-scale, time-series data, high availability and low latency. In a social media post system, it's great. You can use composite keys such as `(user_id, timestamp)`, where the user ID determines the partition in which the data is stored, whilst the timestamp ensures data is stored sequentially. Also the timestamp is for uniquely identifying a post for a given user. Data is appended to the end of a partition, making it a good choice for feeds since posts are continuously added.

#### Images Blob store and CDN
Uploading a blob takes a bit of bandwidth, and once uploaded, we rarely update or delete it since that's static content. We'll cache them with CDNs, which will deliver that content to places closer to the user. A good choice could be AWS CloudFront CDN, which makes it pretty convenient since we're already using AWS S3.

#### Search Service
This service connects to all data sources for people to easily search feeds. You'd use ElasticSearch, or Algolia in order to do this text parsing.

#### Spam Service
A lot of Spam services will use machine learning techniques like supervised and unsupervised learning to mark and delete profanity content, fake accounts, etc.

### Step 4: Wrap up with blind spots or bottlenecks
We didn't even cover stuff like recommendation algorithms since social media platforms rely on that nowadays. We should also do some planning to see if this system can survive the load that we're imposing on it. There are two ways to do this:
1. Bottom-Up: This assumes you have an existing system, so you'd do some load tests and plan the future based on the company's current performance and growth rate.
2. Top-down: Start with the expected/theoretical amount of customers, then calculate stuff like requests per user each day, etc. It's recommended you use a spreadsheet program for this. 



# Credits:
1. [Design Pinterest - Blog](https://tianpan.co/blog/2016-02-13-crack-the-system-design-interview)
2. [Design Pastebin or (Bitly)](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/pastebin/README.md)
3. [Design Twitter timeline and search](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/twitter/README.md)
4. [Design a web crawler](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/web_crawler/README.md)
5. [Design Mint.com](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/mint/README.md)
6. [Social Network Data Structures](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/social_graph/README.md)
7. [How to scale a website to support millions of users? - Bytebytego](https://blog.bytebytego.com/p/how-to-scale-a-website-to-support)
9. [Design Youtube](https://bytebytego.com/courses/system-design-interview/design-youtube)
10. [Designing Uber](https://tianpan.co/blog/120-designing-uber)