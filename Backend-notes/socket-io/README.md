# Socket.io Notes 
Writing a chat application with usual technologies such as LAMP (php) is typically difficult. It involves frequently checking the server for changing, managing timestamps, and is pretty slow. Sockets are typically used to solve this and create bi-directional communication between client and server. The idea is that when you write a chat message, the server will get it and push it to all other connected clients.


## WebSockets
By using WebSockets we can create a bi-directional connection between a client and server, and send data in real-time (low latency). As a result, a client can initiate an interaction (send data) to the server, and the server do the same thing and send data to the client (vice versa). This connection (TCP/IP connection) stays active and allows both parties to send data to each other, until one of the parties disconnects, and then the TCP/IP resources that maintained the connection are unallocated. This bi-directional connection is also known as full-duplex, which describes how a phoneline works and how both parties can send message.

This is opposed to the usual HTTP way of doing things where the client is always the one initiating the connection and the server is the one sending a response to said request, and then ending the connection. However, with basic WebSockets, it gets complicated if you want to broadcast a message to multiple clients simultaneously, kind of like a groupchat. It's definitely possible to build this from scratch, but there are libraries such as Socket.IO that makes things like that easier.


### Setup
+ Frontend
```
<!-- Allows us to create sockets on the client-side -->
npm i socket.io-client
```

+ Backend: 
```
<!-- Integrates (mounts on) NodeJS Http Server -->
npm install socket.io

```






# Credits:
1. [WebSockets in 100 Seconds and Beyond with Socket.io](https://youtu.be/1BfCnjr_Vjg?si=XDBe7HjRgxjsFC99)
2. [Learn Socket.io In 30 Minutes - Web Dev Simplified](https://www.youtube.com/watch?v=ZKEqqIO7n-k)



## Project planning

### Base Requirements
- Authorization and authentication
- Sending messages to another user
- Customizing a user profile
- Allow users to create and send messages in direct messages (1 on 1), but also create and send in group chats. The former 
  can definitely be done in rooms. The latter can be done with rooms as well, just the room now involves 3 or more sockets together.
- Message history, so obviously you should see previous messages from past conversations. We should try to also include resiliency
  when user's temporarily disconnect so that they can see messages that they missed. Also the idea if the user logs out and logs back
  in they should see the messages they missed. 
- Show which users are online (could be done by checking if someone is connected or not)
- Have a feature to pop-up to indicate when a user is typing. Could be done using an onChange event, so if the user has 
  text in their textbox, then emit a 'is-typing' event to the server, then this is-typing event is sent to all other users.
  This can get a little complex due to how we want to render this on the screen. Will be it a be succession such as 
  'John is typing' -> 'Dave is typing', or maybe '2 people are typing'. In either case, if you are typing, it should be broadcasted
  to all other users in the room to indicate that you are typing (You yourself don't need to be reminded that you are typing)
- Doing 

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
  We've done one project with MongoDB in depth a little, so I think learning PostgresSQL could be a good thing and applying that knowledge. Hopefully it works well with node. MongoDB has the mongoose ODM, and then Postgres has an orm called 'Sequelize' for Node.js. Sequelize supports multiple rdbms including Postgres.

4. JWT for securing endpoints
5. Passport.js for handling authentication strategies and handling the jwt-based authentication.
6. Sanitizer API, DOMPurify, CSP, TrustedTypes, helps protect users from malicious messages

## A discussion of MongoDB and PostgreSQL

- Scalability: In terms of scalability MongoDB is often chosen for its horizontal scalability, as how its setup makes it easy to scale out and add more servers. So NoSQL is much better when handling multiple users 
  users at the same time, whilst SQL doesn't.
- Query flexibility and performance: Postgres has powerful querying and support for complex queries. For relationals, reading is generally a little faster, but writing is slower since we're more worried about the data meeting 
  strict formats and requirements. While for MongoDB and non-relational databases, writing is faster since the data is more flexible, whilst reading is slower.
- ACID: Postgres is ideal for ACID transactions, as its one of its core aspects. It's battletested and it's the reason why Postgres is used in mission-critical systems such as healthcare.
- Relationships: If you have relationships in your data and your data is structured uniformly, use a relational database like Postgres, it's literally structured for that. MongoDB is more for unstructured data.



- A chat application is very write heavy because people are sending messages, which MongoDB accels at.
- A chat could have many members (group chat), you'd likely have those as IDs. For MongoDB you could easily store that in an array called 'members'. However for a relational database it's a little more complex
  , as a chat has many members, and a member can be in many chats. That's an M:N, so you'd need a a joint-table to act as a middleman, probably called 
  'ChatMember'. Note though a chat has a minimum of 2 members, but for the ChatMember schema it'd probably contain the ChatID, and then a userID of a user associated in that chat. 
- A user would have friends. In MongoDB, for each user, you could have an array of friends. In Postgres and SQL relational databases, you'd need a friend table that contains 
  the user_id and friend_id. 
- Each chat message was sent by a user, so we have to store a userID in each chat message. Then also each chat message is associated with a chat, whether it be one-on-one or a group chat, so we store the chatID as well. As well as this some apps allow a message to directly reply to another message, so maybe you'd have to store an id for the chat message it's replying to 'replyChatID', which could be null. The composition of both userID and chatID isn't enough to be unique, so you'd probably need a primary key for the Messages table. A chat message may contain attachments such as images or files. In this case you probably want these files to retain their 
original name such as 'Kevin_Essay.doc', but also you may have to add somehting unique to it so that the files you're storing don't have conflicting names in the database but also in your storage provider. Obviously that depends on how it's stored and I still need to learn about S3 and the requirements.

  In this case we have two options:

  1. Files/attachments table: Would contain the the messageID, so the id of the message that the file is associated with. I guess to get a message and possible attachments you'd 
    do a merge between the messages and attachments table. And since any chat message can have attachments, you'd have to do this for all messages you render or query. The idea 
    of always needing to do a merge or query on another table when querying one table is a little foriegn and unusual to me. But then again people do horizontal and vertical 
    partitioning, but that's only separating certain columns, and then those columns make up an entire entity. Here the situation is somewhat different as a file attachment would be 
    an entire object by itself (with file_name), not an individual piece of an entire pie. 

    The standard practice is to use a files/attachments table. Of course you'd have to do a join each time, but this is actually standard practice, and it can be optimized with 
    indexes.


  2. Postgres NoSQL Column: I think they have noSQL support, if so then maybe you can place those attachments in a column that is an array or something. With this you can structure any file 
    attachments inside a single column, called probably 'files'. This way when reading messages from the table, you don't always have to do a merge with another table. Of course using NoSQL
    in an SQL relational database is going to be situational and for edge-cases, but this may be one of them.  And I'm guessing you can still query for certain attributes of objects. So maybe 
    you can query the chat messages in a certain chat, query the files column to see if there is a file with a certain name in the file array. And files are objects in this case? THis is all conjecture
    I don't know Postgres allows me to have an array of objects in their NoSQL column

  


```
-- Insert a friendship where user_id 1 is friends with user_id 2
INSERT INTO friends (user_id, friend_id) VALUES (1, 2);

<!-- Insert a friendship user_id 2 is friends with user_id 1.  -->
INSERT INTO friends (user_id, friend_id) VALUES (2, 1);
```
Let's say in our application when you accept a friend request, you guys are friends now so we'll insert these two rows. Having two rows to represent this friendship makes it a lot easier to query and makes sense. Let's say you wanted to find all friends for a user with id = 5. If that's the case we'd do:
```
SELECT friend_id FROM friends WHERE user_id = 5;
```
That was easy, but imagine we only had one row to represent this two way friendship. How would we know what column to make a conditional on? Would we look for all columns where user_id=5 or friend_id=5? We'd be taking a guess since only one row represents the relationship. However if two rows represent the relationship, when looking for the friends of a user, we can always make sure to query the user_id column


### Deployment 
- Render, AWS, digital ocean, etc.

### Extra
1. Redis: For caching. Also very good for scaling up. For managing the websockets, though 'push notifications' are separate. It's time to make use of redis in tihs project
2. Cloud file storing such as AWS S3. It's also time to use AWS S3 in this project
3. WebSockets: The altnerative to socket.io For making a sophisticated chat system that sclaes well, they can become very complicated
4. If you're using firebase they have a lot of tools such as firebase realtime database.
5. WebRTC: Adds media features for like video and audio chats.
- Chat isn't hard, but the amount of features to make it a good chat application makes things complicated

https://stackoverflow.com/questions/66946066/realtime-scalable-chat-app-which-database-should-i-choose
