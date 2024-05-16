import express from "express"
import { createServer } from "node:http"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { Server } from "socket.io"

/*
- Express initializes the app, and we pass that into the http server

- NOTE: Express server already creates an http server internally. The reason we wrap the express app inside an
  http server, is to have more control. As express server may not support things such as attaching
  sockets to it. So while the express server may handle api stuff, in this case rendering a page, the outside
  http server can be integrated and communicate with socket.io.

+ Socket.io clients aren't always connected, and teh server doesn't store any event.
  So any events sent by the server while you're disconnected will be missed by the client. 
  This just means you may need some way to recover from a disconnection, by synchronizing 
  the loca lstate of the client with the global state of the server, after being disconnected 
  so that the disconnected client can see the messages they missed whilst they were disconnected.

1. Connection state recovery: Enable this feature so that the server temporarily stores all the events
  sent by the server. We'll add some options to the Server constructor to enable this feature. By doing 
  this, when a socket connects it will try to restore any rooms the socket was in, and send the socket
  any events that it may have missed.

- NOTE: This isn't always enabled because it doesn't always work. If the server crashes or is restarted, 
then the client's state may not be saved. Also it's not always possible to enable this feature when we're 
scaling up our application. However, it's sitll a good feature since we don't have to synchronize the state 
of the client after temporarily disconnection. However this isn't always the only solution.
*/
const app = express()
const server = createServer(app)

const io = new Server(server, {
    connectionStateRecovery: {},
})

const __dirname = dirname(fileURLToPath(import.meta.url))

app.get("/", (req, res) => {
    // serve the index.html file; constructing an absolute path to index.html, serving this file regardless
    // of our CWD.
    res.sendFile(join(__dirname, "index.html"))
})

io.on("connection", (socket) => {
    console.log("User connected!")

    // Listen for chat message events, and then emit those events to all sockets
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected!")
    })
})

server.listen(3000, () => {
    console.log("server running at http://localhost:3000")
})
