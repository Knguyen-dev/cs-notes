const express = require("express");
const router = express.Router();
const { projects } = require("../data");
const requireAuth = require("../middleware/requireAuth");
const {
	canViewProject,
	scopedProjects,
} = require("../permissions/projectPerm");

router.get("/", requireAuth, (req, res) => {
	res.json(scopedProjects(req.user, projects));
});

router.get(
	"/:projectId",
	setProject,
	requireAuth, // verify the user is logged in
	authGetProject, //
	(req, res) => {
		res.json(req.project);
	}
);

router.delete(
	"/:projectId",
	setProject,
	requireAuth,
	authDeleteProject,
	(req, res) => {
		res.send("Deleted Project!");
	}
);

// Finds project in our 'database', and sets it as a property of the request object
function setProject(req, res, next) {
	const projectId = parseInt(req.params.projectId);
	req.project = projects.find((project) => project.id === projectId);

	if (req.project == null) {
		res.status(404);
		return res.send("Project not found");
	}
	next();
}

/*
- authGetProject: Uses can view project which not only checks the role of the user to 
  see if they're an admin (role-based-authorization), but also checks if the 
  project belongs to the user, allowing us to authorize a request on multiple parameters, 
  not just the role of the user.
*/
function authGetProject(req, res, next) {
	if (!canViewProject(req.user, req.project)) {
		return res.status(401).json({ message: "Not allowed to access project!" });
	}
	next();
}

function authDeleteProject(req, res, next) {
	if (!canDeleteProject(req.user, req.project)) {
		return res.status(401).json({ message: "Not allowed to delete project!" });
	}
}

module.exports = router;
