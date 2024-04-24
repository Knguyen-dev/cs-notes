class Address {
    constructor(zip, street) {
        this.zip = zip
        this.street = street
    }
}

/*
- Situation: Let's say that 'name' is required, whilst the other 
fields aren't required for this app. 
*/
class User {
    constructor(name, age, phone, address) {
        this.name = name;
        this.age = age
        this.phone = phone
        this.address = address
    }
}


/*
- When creating a user with only the name and address, we'd have 
to pass undefined some fields in-between. This is kind of unreadable if you're seeing 
this as there are just multiple 'undefined' values. And if your class has a lot of parameters 
that are required and optional, this becomes a lot messier. So let's fix this.


*/
const user = new User("Bob", undefined, undefined, new Address("123", "Main St."))