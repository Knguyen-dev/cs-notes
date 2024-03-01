/*
- A file containing our multiple functions pertaining to 
  projects. 



*/
const { ROLE } = require("../data");

/*
- Middleware that determines whether we can view or read the project's data.
  Users can do this if they are an admin OR if the project is linked to them!
*/
function canViewProject(user, project) {
	return user.role === ROLE.ADMIN || project.userId === user.id;
}

/*
- Here we'll get all of the projects that a particular user is able to view.
*/
function scopedProjects(user, projects) {
	if (user.role === ROLE.ADMIN) return projects; // if admin, they can view all projects
	return projects.filter((project) => project.userId === user.id); // else a basic user so only show projects they own
}

// Here a project can only be deleted when its the users' own project.
function canDeleteProject(user, project) {
	return project.userId === user.id;
}

/*
- For stuff like editing you can do the same thing. Create a separate 
  middleware function such as 'canEditProject' and put in your conditional 
  logic. The flexible thing about these functions is that they don't interact
  with your req object or next() at all. They're very flexible that way.



*/

module.exports = {
	canViewProject,
	scopedProjects,
	canDeleteProject,
};
