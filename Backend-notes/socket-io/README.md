# Socket.io Notes 


## WebSockets
By using WebSockets we can create a bi-directional connection between a client and server, and send data in real-time (low latency). As a result, a client can initiate an interaction (send data) to the server, and the server do the same thing and send data to the client (vice versa). This connection (TCP/IP connection) stays active and allows both parties to send data to each other, until one of the parties disconnects, and then the TCP/IP resources that maintained the connection are unallocated. This bi-directional connection is also known as full-duplex, which describes how a phoneline works and how both parties can send message.

This is opposed to the usual HTTP way of doing things where the client is always the one initiating the connection and the server is the one sending a response to said request, and then ending the connection. However, with basic WebSockets, it gets complicated if you want to broadcast a message to multiple clients simultaneously, kind of like a groupchat. It's definitely possible to build this from scratch, but there are libraries such as Socket.IO that makes things like that easier







# Credits:
1. [WebSockets in 100 Seconds and Beyond with Socket.io](https://youtu.be/1BfCnjr_Vjg?si=XDBe7HjRgxjsFC99)
2. [Learn Socket.io In 30 Minutes - Web Dev Simplified](https://www.youtube.com/watch?v=ZKEqqIO7n-k)





## Project planning

### Requirements
- Authorization and authentication
- Sending messages to another user
- Customizing a user profile
- Allow users to create and send messages in direct messages (1 on 1), but also create and send in group chats.
- Message history, so obviously you should see previous messages from past conversations

#### Mid level
- Supports rich text formatting, emojis, and reactions to messages
- Moderation or roles in group chats. People with different roles can do different things.

#### Higher level requirements
- Allow sending images and files in chat.
- Users should get push notifications when someone messages them.
- Add a friends list that users can add other users to and see when someone is online (alternative: “Add a users list to show which users are currently online”; same thing except maybe a step or two less since it doesn’t require adding a friend)
- Video and audio calls
- Ability to search through messages, files, contacts


### Frontend 
1. React: Building UI
2. Socket.io: For real-time, bidirection communication between client and server
3. Redux (optional): For state management

### Backend
1. Express
2. MongoDB, PostgreSQL, Cassandra: For storing chat messages, user data, etc. MongoDB is flexible for json like documents, whilst PostgreSQL is a strong RDBMS. Though you'd probably need to see what your schemas were.

### Auth and security
1. JWT for securing endpoints
2. Passport.js for handling authentication strategies and handling the jwt-based authentication.
3. Sanitizer API, DOMPurify, CSP, TrustedTypes, helps protect users from malicious messages

### Deployment 
- Render, AWS, digital ocean, etc.

### Extra
1. Redis: For caching. Also very good for scaling up. For managing the websockets, though 'push notifications' are separate.
2. Cloud file storing such as AWS S3
3. WebSockets: The altnerative to socket.io For making a sophisticated chat system that sclaes well, they can become very complicated
4. If you're using firebase they have a lot of tools such as firebase realtime database.
5. WebRTC: Adds media features for like video and audio chats.
- Chat isn't hard, but the amount of features to make it a good chat application makes things complicated

https://stackoverflow.com/questions/66946066/realtime-scalable-chat-app-which-database-should-i-choose
