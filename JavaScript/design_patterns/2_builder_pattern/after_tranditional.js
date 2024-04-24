class Address {
    constructor(zip, street) {
        this.zip = zip
        this.street = street
    }
}

/*
+ Traditional Way:
Here we'll demonstrate the traditional way of using the builder pattern. So this shows a more 
language-independent way of doing it, meaning you should be able to do this in other languages 
easily. Later we'll show the javascript-specific way of doing the pattern, which can be a little more 
brief and clean for some people.

+ User class: The user class only accepts your required fields. This class is kind of like a helper, in the senes that 
this class isn't directly used to create user objects, but rather we'll use a class called 'UserBuilder'. This 
class is just the helper that creates the User object and accepts the required fields.

*/
class User { 
    constructor(name) {
        this.name = name
    }
}


/*
+ UserBuilder: The class that we'll use to create user objects.


*/

class UserBuilder {
    constructor(name) { // accept only the required parameters

        // Create the user object and set it as a property for hte builder
        this.user = new User(name);
    }

    /*
    - Our setters will then manipulate that '.user' property
    to mess with the object. This is how we'd do the setters.
    We return 'this', the UserBuilder instance, as it allows us 
    to do method chaining
    */

    setAge(age) {
        this.user.age = age // set age property on user object
        return this // return UserBuilder, allowing fur additional methods to be chained
    }

    setPhone(phone) {
        this.user.phone = phone
        return this
    }

    setAddress(address) {
        this.user.address = address
        return this
    }

    /*
    - Then we'd have a 'build' method that we'd call at the end of the method chain,
    which would return our actual user object. As a result we'd be able to work with 
    the user object directly, rather than working with a UserBuilder instance    
    */
    build() {
        return this.user
    }
}

/*
- Let's create a User builder that creates users with the name 'Bob'. THen we'll do method
    chaining, to set the address and age attributes. Then finally we call build to be returned the 
    user object. Quickly we see, that this looks a lot better than the before.js example, as we 
    only pass the required field, and when we need to, we will define the optional fields.

    As a result, we easily created a User 'Bob', and clearly defined some of the optional fields.
*/
const myBuilder = new UserBuilder("Bob")
const user = builder.setAddress(new Address("123", "Main St.")).setAge(21).build();

const user2 = new UserBuilder("knguyen44")
    .setAddress("123 Cookie Ln")
    .setAge(24)
    .build();