/*
- A higher order function that returns a function that checks if the request object has 
  certain roles.

*/
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // if roles property is undefined, don't proceed
        if (!req?.roles) return res.sendStatus(401)

        // Get the allowed roles we we defined, we'll use these to test against the req object's roles
        const rolesArray = [...allowedRoles]

        /*
        1. Iterate through all roles in the request object. Check if that role 
          exists in the rolesArray. req.roles.map() is now an array of booleans
        2. Search for the first true value in the array. So if any role from 
          req.roles matches a role in allowedRoles, this function evaluates to true.
          So you just need one role to match to be authorized essentially.
        3. If (!result), this means no roles from req.roles matched a role from allowedRoles.
          So we stop the process there instead of moving on.
        */
        const result = req.roles
            .map((role) => rolesArray.includes(role))
            .find((val) => val === true)
        if (!result) return res.sendStatus(401)
        next()
    }
}

module.exports = verifyRoles
