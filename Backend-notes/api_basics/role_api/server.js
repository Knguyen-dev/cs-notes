const express = require("express");
const app = express();
const { users } = require("./data");
const projectRouter = require("./routes/projectRouter");
const { ROLE } = require("./data");
const requireAuth = require("./middleware/requireAuth");
const requireRole = require("./middleware/requireRole");

app.use(express.json());
app.use(setUser);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
	res.send("Home Page");
});

app.get("/dashboard", requireAuth, (req, res) => {
	res.send("Dashboard Page");
});

app.get("/admin", requireAuth, requireRole(ROLE.ADMIN), (req, res) => {
	res.send("Admin Page");
});

function setUser(req, res, next) {
	const userId = req.body.userId;
	if (userId) {
		req.user = users.find((user) => user.id === userId);
	}
	next();
}

app.listen(3000);
