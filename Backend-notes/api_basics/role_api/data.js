const ROLE = {
	ADMIN: "admin",
	BASIC: "basic",
};

/*
- Our pretend mongodb database with users and the projects associated with those 
  users. As well as this, each user has a role. So in terms of permissions, the idea 
  is that basic users are only allowed to access their own projects, whilst admins 
  are allowed to access and mess with anyone's project.

  As well as this, maybe in our application we only want users to be able to see 
  their own projects. 

*/
module.exports = {
	ROLE: ROLE,
	users: [
		{ id: 1, name: "Kyle", role: ROLE.ADMIN },
		{ id: 2, name: "Sally", role: ROLE.BASIC },
		{ id: 3, name: "Joe", role: ROLE.BASIC },
	],
	projects: [
		{ id: 1, name: "Kyle's Project", userId: 1 },
		{ id: 2, name: "Sally's Project", userId: 2 },
		{ id: 3, name: "Joe's Project", userId: 3 },
	],
};
