# Designing a chat system

## Step 1: Understand the problem
First establish what kind of chat app we're talking about. There are one-on-one chat apps like Facebook Messenger, group chat apps like Slack, or gaming chat apps like Discord which focus on large group interactions and low-latency voice chat. You should ask key questions to establish assumptions and constraints:
1. Is it a mobile or web app?
2. What's hte scale of this app? A startup or massive scale? Number of daily active users?
3. What are the key features?

### Task: Implement Facebook messenger
Let's say that the system supports 50 million DAU. Here are the key features:
1. One-on-one chats with low delivery latency.
2. Group chats (max of 100 people).
3. Online presence indicator.
4. Multiple device support. So the same account can be logged into multiple devices at the same time.
5. Push notifications; so the app should notify you even when app isn't open. Stuff can appear on lock screen, notification center, etc.

## Step 2: Propose the high level design
![](https://bytebytego.com/_next/image?url=%2Fimages%2Fcourses%2Fsystem-design-interview%2Fdesign-a-chat-system%2Ffigure-12-2-CA3ZOSQI.png&w=1080&q=75)

The mobile and web app are connected to the chat service. The service has the following responsibilities:
1. Receive messages from the clients.
2. Find the recipients for a message and relay the message to them.
3. If recipient isn't online, we'll need to store the message son the server until they are online.

### How to do client, chat service, and receiver
The client can connect to the chat service via an HTTP protocol. However, is client initiated, which makes this tricky to handle sending the message to the receiver. With HTTP, the client isn't typically setup to listen for http requests. Usually they're waiting for responses to request that they started.

To simulate a server initiated connection, we have methods such as polling, long polling, and WebSocket.

#### Technique 1: Polling
![](https://bytebytego.com/images/courses/system-design-interview/design-a-chat-system/figure-12-3-WYSR7WB4.svg)

This is the idea of where our client periodically asks (polls) the server to see if there are new messages available. Depending on how frequent the polling is, this could be costly. I mean you are constantly doing an http request and using server resources, which can become noticeable with 50 million users.

#### Technique 2: Long polling
![](https://bytebytego.com/images/courses/system-design-interview/design-a-chat-system/figure-12-4-6KL7KY4X.svg)


An evolution of polling. Continue to maintain a connection with the server until new messages are received. Then we re-open our connection and wait for new messages again. This way we reduce the number of times we're polling the server. 

- **Disadvantages:**
  1. Sender and receiver many not end up at the same chat server. Sender sends their messages to a chat server, and since the receiver isn't online, those messages are stored on the server. If the receiver doesn't connect to that server when going online, they aren't going to see/receive those messages. This assumes we have multiple servers for the chat service.
  2. The server doesn't have a good way to see if the client disconnected. If the client disconnects, possibly due to network issues, the server might not immediately know this because the connection is still open. As opposed to regular polling, the server knows the client has disconnected since they aren't receiving the frequent connections anymore.
  3. This is inefficient if the user doesn't chat. Remember that long polling will still make connections after timing out.

#### Technique 3: WebSockets
Most common solution for sending asynchronous updates from server to client.
Connection is initiated by the client and it's bi-directional and persistent. 

---
### Stateless services
These will be your classic request and response services. Such as sign up, login, user profile related stuff, etc.

---
### Stateful services
The chat service is the only stateful service since it's maintaining a persistent connection the chat server. 

---
### Third party integration

---
### Scalability 

---
### Storage


# Credits
1. [Chat systems - Bytebytego](https://blog.bytebytego.com/p/