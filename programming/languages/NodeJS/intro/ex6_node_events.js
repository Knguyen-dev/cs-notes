/*
+ Events in Node.js: Every action on the computer is an event usch as when 
  a connection is made or a file is opened. This can happen in Node.js 
  as well.

+ Events module: A built in module where you can create fire and listen for 
  your own events. Just require it.

*/

const fs = require("fs");
const events = require("events");
/*
- Example 1: Here we're listening for a file opening event.
1. Open a file
2. Create a listener for seeing when a file is opened.
*/
function example1() {
	const readStream = fs.createReadStream(__dirname + "/sample.txt");
	readStream.on("open", () => {
		console.log("File is opened!");
	});
}

/*
- Example 2: All event properties/methods are an instance of the EventEmitter object
*/
const myDoor = new events.EventEmitter();
// Create an event handler to call when you trigger the event.
const doorHandler = () => {
	console.log("A door slam");
};

// Listen for a 'slam' event for the door event emitter object.
myDoor.on("slam", doorHandler);

// Fire the 'slam' event
myDoor.emit("slam");

// Having an event trigger only once. Callback only run when 'my-event' is fired for the first time and never again.
const e = new events.EventEmitter();
e.once("my-event", () => {
	console.log("Called only once");
});

// Remove an already existing event listener. could also do myDoor.off('slam', doorHandler)
myDoor.removeListener("slam", doorHandler);
