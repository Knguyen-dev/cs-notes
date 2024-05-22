/*
+ Here's the idea of 'Client delivery', which is hte idea of making sure that the server always receives messages sent by the clients. By default 
Socket.IO uses the 'at most once' delivery method, which means it will only try to send the message once, and if the event doesn't reach the server, 
then we will not retry it.


+ Buffered Events:
When a client is disconnected any call to socket.emit() on the client's end is buffered until reconnection. This just means that if you emit any events when you're disconnected, since those events have 
nowhere to go, they'll actually go into a queue. Then once we reconnect, all of those queued up events all shoot towards the server at the same time, being processed in the order they were emitted of course.

However there are a few cases where a message could be lost:
1. Connection is servered whilst the event is still being sent to the server 
2. Server crashes or is restarted while processing the event
3. The database was temporarily unavailable, and the message wasn't stored in persistent storage.

*/

import express from "express"
import { createServer } from "node:http"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { Server } from "socket.io"
import sqlite3 from "sqlite3"
import { open } from "sqlite"

const db = await open({
    filename: "chat.db",
    driver: sqlite3.Database,
})

/*
- We'll create a table, with the message's id, content, but also this client offset. Having this helps identify which messages 
are identical, and have already been inserted into the database. If messages have the same text that's fine, but if they have the same socketID and clientOffset, that means they 
are the same message.

*/
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE, 
      content TEXT
  );
`)

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
})

const __dirname = dirname(fileURLToPath(import.meta.url))

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
})

io.on("connection", async (socket) => {
    // Our event listener for chat message events takes a message, the id of the message, and then a callback function
    socket.on("chat message", async (msg, clientOffset, callback) => {
        let result
        try {
            result = await db.run(
                "INSERT INTO messages (content, client_offset) VALUES (?, ?)",
                msg,
                clientOffset
            )
        } catch (e) {
            if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
                // the message was already inserted (duplicate offset value), so we notify the client
                callback()
            } else {
                // nothing to do, just let the client retry
            }
            return
        }
        io.emit("chat message", msg, result.lastID)
        // acknowledge the event
        callback()
    })

    if (!socket.recovered) {
        try {
            await db.each(
                "SELECT id, content FROM messages WHERE id > ?",
                [socket.handshake.auth.serverOffset || 0],
                (_err, row) => {
                    socket.emit("chat message", row.content, row.id)
                }
            )
        } catch (e) {
            // something went wrong
        }
    }
})

server.listen(3000, () => {
    console.log("server running at http://localhost:3000")
})
