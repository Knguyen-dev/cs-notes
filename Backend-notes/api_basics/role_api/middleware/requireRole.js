/*
- Our second step is having middleware to handle the roles. 
  Here we have a function that stops the request when the roles don't 
  match and lets requests proceed when roles do match.

*/

function requireRole(role) {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res.status(401).json({ message: "Not allowed" });
		}
		next();
	};
}

module.exports = requireRole;
