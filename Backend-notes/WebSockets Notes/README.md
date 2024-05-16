# WebSockets and then Socket.io

## What are WebSockets
When we do an http request, we send a request to the server, the server agrees and sends us the data, and then finally the connection is closed. So if you want more data you'd have to open up a connection again. Imagine an online game where the top score was updated in 'real-time'. How would we broadcast the most updated information? The user could refresh their pages frequently, we could use a timer to update the page, or we could use WebSockets to maintain an opened connection and send real-time data through. Of course this is limited as using websockets alone doesn't handle the case of sending messages to multiple users, such as many users within a groupchat. 

## Socket.io
A library that allows low-latency, bidirection (both sides can communicate), and event-based communication between a client and server. This library is commonly used when we need real-time communication such as trasnferring data to all users connected to a web server, such as a real-time chat application. It's kind of like websockets, but it has a lot more features, capabilities, and improvements

Here are some examples of things that use socket.io:
1. Chat applications: It enables real time messaging between users. Examples include Slack, WhatsApp Web, Facebook Messenger, etc. 
2. Real-Time collaborative tools: Things such as google docs, Trello, and Figma use socket.io to allow multiple users to collaborate in real-time on documents, boards, and other things.
3. Real-time analytics dashboards: Places like google analytics use socket.io to provide real-time data to users.
4. Real-time multiplayer games: Online web games such as Agar.io or Slither.io use socket.io to manage real-time gameplay and interactions between players.
5. Live streaming platforms: Platforms like Twitch and Youtube use Socket.io to provide real-time chat functionality and video livestreaming.

However, Socket.IO isn't a WebSocket implementation. It does use WebSocket for packet transportation, but it adds additional metadata to each packet. As a result, a WebSocket client won't be able to connect to a Socket.io server, and a Socket.io client can't connect to a WebSocket server either.

## How does this relate to WebRTC?
WebRTC (Web Real-Time-Communication) is an api that's used for building real-time 'experiences', more specifically video and voice related. So if you're creating a real-time video application, you'd probably use WebRTC.