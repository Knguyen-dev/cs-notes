const createApp = require("./app");
const database = require("./database");

const app = createApp(database);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
