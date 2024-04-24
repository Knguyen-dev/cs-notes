class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    hasAccess() {
        return this.name === "Bob";
    }
}

/*
- A class representing a 'nulled' version of a user. So instead of assigning our user variable to null,
we'd assign it to a NullUser (null-object), which will have the same properties as 'User'. As a result, 
we don't have to do conditional checks to see if user was null, rather we can continue using our 'user' variable
as if the variable and its methods are always defined.

Of course we the premise that 'user' could represent a valid logged in user (User), or a 'guest' (NullUser) stays the same.

We should also note that this.name = 'Guest', which stores 
it all here. So if we wanted to change 'Guest' to something else, we'd only have to 
do it in the class, just one place.


*/
class NullUser {
    constructor() {
        this.id = -1
        this.name = "Guest"
    }

    hasAccess() {
        return false;
    }
}


const users = [
    new User(1, "Bob"),
    new User(2, "John")
]

function getUser(id) {
    let user = users.find(user => user.id === id);

    // If user wasn't found, instead of returning null, return NullUser
    // Only doing null check in one place rather than many
    if (user == null) {
        user = new NullUser()
    }

    return user;
}

function printUser(id) {

    // Get user, could be logged in or a guest (NullUser)
    const user = getUser(id);

    // user and user.name is always defined due to NullUser.
    console.log("Hello " + user.name);

    // No null conditionals, only need to do hasAccess()
    if (user.hasAccess()) {
        console.log("You have access!")
    } else {
        console.log("You have no access!")
    }

}