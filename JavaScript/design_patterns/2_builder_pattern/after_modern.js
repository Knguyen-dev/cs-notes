class Address {
    constructor(zip, street) {
        this.zip = zip
        this.street = street
    }
}

/*
- In the more JavaScript specific way of the builder pattern, you'd do everything in the User object.
Here name is your required field, and then you'd have an 'options' object that contains all of your 
optional fields. So if the object isn't passed in, it defaults to an empty object, and so the other 
fields are undefined. However if the object is passed, it uses the 'options' object.

NOTE: However if your object is really complex, with a lot of parameters and moving parts, then using the traditional method 
would likely be the better call.
*/
class User {
    constructor(name, { age, phone = "123-456-7890", address } = {}) {
        this.name = name
        this.age = age 
        this.phone = phone
        this.address = address
    }
}

const user = User("James"); // 'options' isn't passed so everything else is undefined
const user2 = User("Bob", { address: new Address("123", "Main St.") }) // age and phone are the only ones undefined