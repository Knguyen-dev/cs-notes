// BOOK MARK: Started working on sockets
// https://www.youtube.com/watch?v=ZKEqqIO7n-k

const joinRoomButton = document.getElementById("room-button")
const connectButton = document.getElementById("connect-button")
const disconnectButton = document.getElementById("disconnect-button")

const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")

// Connect to our server that's running on port 3000
const socket = io("http://localhost:3000")

/*
- Socket that's connected to a separate namespace; so this socket won't receive any messages from the 'root' namespace
 which is our main io connection on the server. When trying to connect to the user channel, we'll make sure to pass in
 some info. Let's say we expect our channel to check some data associated with our socket to see if our auth.token is valid.

*/
const userSocket = io("http://localhost:3000/user", {
    auth: { token: "sample-token" },
})

userSocket.on("connect_error", (error) => {
    displayMessage(error)
})

// Listen to the 'connect' event from the server
socket.on("connect", () => {
    displayMessage(`You connected with id: ${socket.id}`)

    /*
    - At this point we are connected to the server.

    Now that we can listen for events from the server, let's send events to the server.
    Here we can create any event, here it's custom event, and that event we're going 
    to send this data. So we're going to send this 'custom-event' event to the server.

    */
    socket.emit("custom-event", 10, "Hi", { a: "123" })
})

// Listen for the receive-message event; so we expect the server to send an event with 'message'.
socket.on("receive-message", (message) => {
    displayMessage(message)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const message = messageInput.value
    const room = roomInput.value
    if (message === "") return
    displayMessage(message)

    // Let's send a 'send-message' event. Here we'll send the server our message via the socket
    // Then on the server-side, we'll setup an event listener that listens for this message.
    socket.emit("send-message", message, room)

    // Clear the message after we're done.
    messageInput.value = ""
})

/*
- But how do we send a message to a user privately, how do we send data from one socket, to the server, and let the server 
  send that data to another specific socket? Well we can imitate this idea of private 'rooms' where we only communicate with certain people and only
  get messages from inside of that room.
   
  By default every user/socket has their own room, which is just their socket ID, so users are always also in their own personal room. So if you know a user's 
  socket ID, then we can send a message to their room, which is their socket id, and only they would see that message.

  
  However, we also have the choice of creating rooms with custom names. So when sending messages, we'll specify the name of the room we want to send the message to,
  and then all sockets that are in that room will receive our event and therefore our message.
*/
joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value

    /*
    - We're going to send a 'join-room' event to our server, and pass in a room name.

    + However we can also pass in a callback function. As a result, your function that we defined on the 
    client, can be called on the server, and make a difference on the client side.
    
    1. So here we're passing a displayMessage function. So we pass this to the server to run this client-side code,
      and it actually displays the message. Now this usually don't work in a regular client-server interaction. However 
      since this is using WebSockets, this is made possible.


    - NOTE: For this to work, the callback must be the last thing we pass to .emit(). This is an emit callback
    */
    socket.emit("join-room", room, displayMessage)
})

function displayMessage(message) {
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-container").append(div)
}

/*
- Situation: Every second we are sending the ping event to the server and logging the 
  incremented count. When we disconnect from the server, our socket is still emitting 
  these ping events. With nowhere to go, these ping events just queue up. Let's say we 
  disconnect for 15 seconds, that's 15 ping events that haven't been received by the server.
  Then we connect again, and then all of those ping events come at the server all at once.

  1
  2
  3
  // Stop for 15 seconds 
  4 ... 18; happens all at once. The lesson is that even if your socket is disconnected 
  and you're 'offline', socket.io will store all of the events that you may emit whilst 
  disconnected. Then when you finally re-connect, all of those events are sent to the 
  same all at once.
  
  19 
  20, and it keeps going like normal once you reconnect.



- Volatile:
Now what if you wanted it so that, once you disconnect, socket.io doesn't store any emits you may
emit. So as a result, once you reconnect to the server you aren't sending a queue of events you
emitted whilst offline/disconnected. You'd use volatile, which ensures that if you can't send the event
to the server, we don't store it anywhere

1
2
3
'Wait for 15 seconds'
18; So during those 15 seconds it did emit those events but it didn't store them. The only thing 
that was updated, as the count. And so once we reconnected, we just had an updated count and 
we only sent that one ping event and not a queue of ping events.



*/

let count = 0
setInterval(() => {
    // socket.emit("ping", count++)

    socket.volatile.emit("ping", count++)
}, 1000)

disconnectButton.addEventListener("click", () => {
    socket.disconnect()
})

connectButton.addEventListener("click", () => {
    socket.connect()
})
