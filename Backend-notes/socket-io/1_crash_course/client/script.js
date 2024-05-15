const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")

// Connect to our server that's running on port 3000
const socket = io("http://localhost:3000")

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
    socket.emit("send-message", message)

    // Clear the message after we're done.
    messageInput.value = ""
})

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value
})

function displayMessage(message) {
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-container").append(div)
}
