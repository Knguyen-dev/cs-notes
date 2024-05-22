/*
- At this point the application has measures against temporary network interruptions, but let's try to improve it so that it can be scaled to support thousands of concurrent clients.

+ Review on scaling:
1. Horizontal scaling: Aka, scaling out, it just means adding new servers to the infrastructure to cope with new demands.
2. Vertical scaling: Aka, scaling up, which means adding more resources (processing power, memory, etc.) to your existing infrastructure. You can think of this is buying more advanced and powerful tech.

Horizontal scaling is usually the one that we should go for since it's usually a lot easier and cheaper to buy new servers, rather than upgrading to a more powerful machine.

+ How to scale horizontally:
First we'll use all available cores on our host machine. Node.js runs our code ina single thread, so even for a 32-core cpu, we only use one core. It 
makes sense that this is the default behavior since maybe we want to delegate the other cores to other processes on our computer, but for this situation pretend 
that your host computer is a server whose job is to host a chat application. As a result all cores and resources should be allocated to maintaining that application.

To do this we'll use the Node.js cluster module which allows us to create one worker thread per core. Good now each worker process can host its own express app, http server, and  socket.io server instance,
so we have multiple servers for handling socket connections. Node cluster also distributes the incoming connections among the worker processes so that the load is distributed across all cores 
evenly. However for more advanced load-balancing, you may want to consider other methods.

Rather than forcing one server to handle the workload of receiving and sending events to and from all sockets, we can delegate the workload to all of our servers. We'll use
an 'adapter' to forward events between Socket.IO servers.

There are currently 5 official adapter implementations which are the Redis adapter, Redis Streams adapter, MongoDB adapter, Postgres adapter, and cluster adapter.
So you can choose the one that best suits your needs, however some of them don't support connection state recovery.
*/

import express from "express"
import { createServer } from "node:http"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { Server } from "socket.io"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import { availableParallelism } from "node:os"
import cluster from "node:cluster"
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter"

// If we're the process running is the primary process
if (cluster.isPrimary) {
    // Get number of cpu cores, assign them a port number, and start those processes?
    const numCPUs = availableParallelism()
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({
            PORT: 3000 + i,
        })
    }

    setupPrimary()
} else {
    // A child process

    // Create or open the existing sqlite db
    const db = await open({
        filename: "chat.db",
        driver: sqlite3.Database,
    })

    // Create a messages table, we'll use client_offset (custom id of the message, client delivery) value since we plan
    // to have the client resend messages after certain conditions are met to ensure the server is receiving their messages.
    await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `)

    // Our express app, http server, and instance of socketIO
    const app = express()
    const server = createServer(app)
    const io = new Server(server, {
        // Allow for connection-state recovery to be enabled.
        connectionStateRecovery: {},

        // Create an adapter for the process, allowing the server on this process to communicate with other
        // socket.io servers. As a result the servers can communicate with each other and forward events to each other.
        // As a result, they can share the workload of sending events to
        adapter: createAdapter(),
    })

    const __dirname = dirname(fileURLToPath(import.meta.url))

    app.get("/", (req, res) => {
        res.sendFile(join(__dirname, "index.html"))
    })

    io.on("connection", async (socket) => {
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
                    callback()
                } else {
                    // nothing to do, just let the client retry
                }
                return
            }
            io.emit("chat message", msg, result.lastID)
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

    const port = process.env.PORT

    server.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })
}
