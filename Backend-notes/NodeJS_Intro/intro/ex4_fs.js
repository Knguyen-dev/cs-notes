/*
+ fs module and the file system: The 'fs' module allows us to access and interact 
  with our file system. It's builtin so we don't have to install it via npm.
  One thing we should note is that all methods are asynchronous by default, but 
  you can make them synchronous by appending 'Sync'. 

  fs.rename(); asynchronously rename a file or folder
  fs.renameSync(); synchronously rename a file or folder

  fs.write(); write to a file asynchronously
  fs.writeSync(); synchronously write to a file
  
  NOTE: Even though they are asynchronous, doing 'await' won't 
  work on them since by default they aren't promise-based functions.
  To do await and work with promises, read below when we talk about promise 
  based functions in fs.

- Basics: 




+ Using promises: You can also use promises instead of callbacks to 
  avoid the unreadable structure that is callback hell. Obviously
  first do the appropriate import for this to take effect.

  

  
+ fs module methods: https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-modules/node-module-fs.en.md
*/

const fs = require("fs");
function renameAsync(before, after) {
	fs.rename(before, after, (error) => {
		if (error) {
			console.error(error);
		}
	});
}
// renameAsync("sample.txt", "newSample.txt");

// Of course the different is that this makes us wait until the rename is done
// before we move on in our code.
function renameSync(before, after) {
	try {
		fs.renameSync(before, after);
	} catch (error) {
		console.error(error);
	}
}
// renameSync("newSample.txt", "sample.txt");

// Reading files using only callbacks
function badReadFile(filePath) {
	fs.readFile(filePath, "utf8", (error, data) => {
		if (error) {
			console.error(error);
			return;
		}

		console.log("File contents: ", data);

		const content = "Some new file content!";

		// Here's how we write a file using the asynchronous writeFile function
		fs.writeFile(filePath, content, (error2) => {
			// Handle any errors
			if (error2) {
				console.error(error2);
				return;
			}

			// At this point it was successful so that would be the end
			console.log(`Successfully wrote content: ${filePath}`);

			fs.readFile(filePath, "utf8", (error3, data3) => {
				if (error3) {
					console.error(error3);
					return;
				}
				console.log("File Content: ", data3);
			});
		});
	});
}
// badReadFile("sample.txt");

// Reading files using promises and async/await; import fs/promises first though
const fs2 = require("fs/promises");
async function goodWriteFile(filePath, content) {
	try {
		const data = await fs2.readFile(filePath, "utf8");
		console.log("Data: ", data);
		await fs2.writeFile(filePath, content);
		console.log("Wrote some content!");
		const newData = await fs2.readFile(filePath, "utf8");
		console.log(newData);
	} catch (error) {
		console.error(error);
	}
}
goodWriteFile("sample.txt", "Some Content!!!");

/**** Finally let's review; of course if you import the promises module; you can use async/await ****/

// Synchronously write to a file
function ex1(filePath, content) {
	try {
		fs.writeFileSync(filePath, content);
		// file written successfully
	} catch (err) {
		console.error(err);
	}
}

// Asynchronously writing to a file
function ex2(filePath, content) {
	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.error(err);
		}
		// file written successfully
	});
}

// synchronously read file
function ex3(filePath) {
	try {
		const data = fs.readFileSync(filePath, "utf8");
		console.log(data);
	} catch (err) {
		console.error(err);
	}
}

// asynchronously read file
function ex4(filePath) {
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data);
	});
}
