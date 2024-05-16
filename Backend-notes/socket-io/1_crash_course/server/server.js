const http = require("http").createServer()

// Create a socket server
const io = require("socket.io")(http, {
    cors: { origin: "*" },
    // cors: ["http://localhost:5500", "https://admin.socket.io/#/"],
})

/*
- Create an event listener that listens for client connections. When a client connects, we'll give them a socket.
*/
io.on("connection", (socket) => {
    const socketID = socket.id

    // Create an event listener to listen for 'custom-event' from a socket
    socket.on("custom-event", (number, string, object) => {
        console.log("Received Your Data: ", number, string, object)
    })

    // Set up an event listener to listen for the 'send-message' event from a socket, we expect to get an argument 'message'
    socket.on("send-message", (message, room) => {
        /*
        - When we get a message, let's indicate to the client that we got their message, so we'll emit an event called 'receive-message'
         We expect the client to listen for this message and see that we got their message from before.
        
        - NOTE: Now the server is emitting an event, so when this happens, we shot this event to all connected sockets. So all sockets
          will see this message, assuming they're all listening for the 'receive-message' event. This is very close to that chatting feature,
          but we're also sending this 'receive-message' to the socket that sent the original message (emitted the receive-message event)
        */
        // io.emit("receive-message", message)

        // If no room was specified for the message, we'll broadcast the message (send the message/event to all other sockets)
        if (room === "") {
            socket.broadcast.emit(
                "receive-message",
                `${socketID} says: ${message}`
            )
        } else {
            // Send the 'receive-message' event to all other sockets linked to a specific room.
            // This does 'broadcast' automatically, so it'll send the 'receive-message' event to all sockets except the socket that sent the 'send-message' event.
            socket
                .to(room)
                .emit("receive-message", `${socketID} whispers: ${message}`)
        }

        /*
        - To emit this event to all sockets, besides the one that sent the 'send-message' event,we'll use socket.broadcast.emit
        */
    })

    /*
    - Setup a event-listener that listens for the 'join-room' event, and accepts room name 'room'. We can easily let the user join that room with 
      socket.join(). As a result, when we do socket.join(room), we link them to a room and put them on a list of the sockets we send the 'receive-message' 
      event to. Again, when we do socket.to(room).emit(), we will emit this event .to all sockets associated with that room

    - NOTE: Joining a room will still keep all of the previous rooms that a socket is associated with. So if they're in room A, and they join room B, they'll still be able 
      to listen for the individual 'receive-message' events sent to both rooms.
    */
    socket.on("join-room", (room, cb) => {
        socket.join(room)

        // Call the function we got from the client-side; we're expecting it to be a one argumnet function
        cb(`You joined room ${room}`)
    })

    // listening for ping event
    socket.on("ping", (n) => console.log(n))
})

/*
+ What are namespaces?
- A namespace is a way to group sockets together. We can have multiple namespaces, and each namespace can have multiple sockets. So in the end you 
can. Akin to a room, it's a way to create a separate communication channel.

For example, let's say you have an app with three different types of channels such as the 'public', 'private' and 'group chat' channels.
Then within each channel (namespace) you may have different rooms for further separation. For within the 'public' channel you may have 
different rooms based on different topics such as 'sports', 'music', etc.

You could have something like an 'admin' namespace, a chatting channel just for admins that has a different level of authentication and
whatnot. To do authentication, we're going to use middleware in our sockets.
*/
const userIo = io.of("/user")

userIo.use((socket, next) => {
    // You can do socket.handshake to access the data that the socket has; With this we access the auth.token value
    const token = socket.handshake.auth.token

    // If there is a token, we of course decode it and get the user info from it. Then assign the value of a username or id to the
    // socket. This is very much similar to how we assign a request object a user's id and whatnot, which we'll use in the following middleware.
    if (token) {
        socket.username = getUsernameFromToken(token)
        // Then go on to next middleware, which should be the on connection event listener!
        next()
    } else {
        /*
      -  Then we'd pass an error to our error handling middleware. Socket.io has its own 
      error handling middleware and so it will emit a 'connect_error' event back to the original
      socket that tried to connect to the userIo namespace.
      */

        next(new Error("Token was missing, please send token!"))
    }
})

// Mock function to decode jwt token and get the username from it
function getUsernameFromToken(token) {
    return "Jamie12"
}

userIo.on("connection", (socket) => {
    console.log(
        `Connected to the user namespace with username '${socket.username}'!`
    )
})

http.listen(3000, () => {
    console.log("Server: listening for connections on 3000!")
})
