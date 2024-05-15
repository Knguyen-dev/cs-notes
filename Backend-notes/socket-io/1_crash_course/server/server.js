const http = require("http").createServer()

// Create a socket server
const io = require("socket.io")(http, {
    cors: { origin: "*" },
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
    socket.on("send-message", (message) => {
        console.log("Message Received: ", message)

        /*
        - When we get a message, let's indicate to the client that we got their message, so we'll emit an event called 'receive-message'
         We expect the client to listen for this message and see that we got their message from before.
        
        - NOTE: Now the server is emitting an event, so when this happens, we shot this event to all connected sockets. So all sockets
          will see this message, assuming they're all listening for the 'receive-message' event. This is very close to that chatting feature,
          but we're also sending this 'receive-message' to the socket that sent the original message (emitted the receive-message event)
        */
        // io.emit("receive-message", message)

        /*
        - To emit this event to all sockets, besides the one that sent the 'send-message' event,we'll use socket.broadcast.emit
        */
        socket.broadcast.emit("receive-message", `${socketID} says: ${message}`)
    })
})

http.listen(3000, () =>
    console.log("Server: listening for connections on 3000!")
)
