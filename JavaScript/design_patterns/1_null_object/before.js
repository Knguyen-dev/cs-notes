// Our user class
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // If user has access; let's just say 'Bob' only has access
    hasAccess() {
        return this.name === "Bob";
    }
}

// Our 'database' of users
const users = [
    new User(1, "Bob"),
    new User(2, "John")
]

// Returns a user object if 'id' matches an id in 'users'. Else returns null
function getUser(id) {
    return users.find(user => user.id === id);
}

function printUser(id) {

    // Gets a user object if found, else null
    const user = getUser(id);

    /*
    - If !user, then the name is 'Guest', so we plan to print out 'Hello Guest'.
    - However this is problematic, as if we have similar 'name' logic somewhere else 
    we'd have to put this 'Guest' value everytime. Obviously this would be bad if we wanted to 
    change things to like 'Unknown User' instead of 'Guest'. We'd have to change it everywhere.
    */
    let name = "Guest"
    if (user != null && user.name != null) name = user.name

    console.log("Hello " + name)

    /*
    - Again we're doing more null conditional checks to do our hasAccess operation.
    We're checking if user itself isn't null, then if .hasAccess is defined, and finally
    we're doing the hasAccess function. Extra conditionals make things less clean, and 
    force us to do this everything
    */

    if (user != null && user.hassAccess != null & user.hasAccess()) {
        console.log("You have access!");
    } else {
        console.log("You have no access!")
    }


}