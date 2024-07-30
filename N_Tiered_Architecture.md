# N-Tiered Architecture (Repository Pattern)

## What is it?
A common software engineering design pattern that promotes 'separation of concerns' by separating your code (logically and physically) into separate tiers (layers). The most common form of this is '3-tier' architecture, which separate your code into 3 layers. 

### Layers of 3-Tier Architecture
Here are the three layers from top to bottom:
- Presentation/Controller: This is where we define our API logic and your endpoints. Here our app handles operations related to the request object itself. Things such as getting JSON data, and sending back response data. Then this response data is used in your application to render information. This layer communicates with the service layer. The idea is that even if our API layer changes, we shouldn't need to change our service layer. 
- Service/Business Logic Layer: This layer interacts with the methods provided by the persistence layer. It uses those unit-like database functions to make your complex app's features possible. For example, a service function could be `login(...)` that implements login logic, and it could use database/persistence functions like `findUserByUsernameAndPassword(...)`. The difference is the service function for logging in represents a human-readable and understandable feature of the application (business logic). The latter database function isn't a feature or 'service', it's just a function we use to achieve something greater or more tangible. Anyways, the service layer communicates with both layers, but the big thing is that it should be the only one communicating with the persistence layer. So your service functions should be the only ones calling database functions directly. 
- Repository/Persistence/Data Access Layer: This layer or section of your code directly interacts with your database. It executes any CRUD operation logic. For example, a function could be `findUserByUsername(...)` or like `findById(...)`. This is the bottom layer, which means it should only be able to communicate with the service layer that's in the middle. So the service layer is the only one that should get direct access. 

## Key considerations and good ideas 

### Idea of Contracts/Interfaces
Each layer should interact wtih the adjacent layers through well-defined interfaces, APIs in this case. Meaning you should define standards when implementing a piece of a layer. If you're defining user services, you should have defined interfaces that show what kind of data those interfaces accept and return.

This promotes the idea that changes in one layer do not affect others as long as you follow the interfaces. This is also known as maintaining the contracts. Let's work through some examples of why this makes sense.

#### Example 1 
Imagine we want to add a new feature to get users by their email address. So we have a new search feature for our website, and we want to users to be able to find each other via their unique emails. Here's how this change is handled in the presentation layer, with minimal change to the other layers.
1. Presentation Layer: Created new endpoint.
```
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.findUserByEmail(email);
    }
}
```
2. Service Layer: Only needed to add a new method. Existing methods remained unchanged.
```
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
```
3. Repository Layer: Only a new method is added, whilst existing methods were unchanged.
```
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
```

## Input Validation (where do we put it?)
There seems to be two main ways where we can structure validation. The former: Perform input validation in the presentation layer, and again in the service layer if needed. In the presentation layer you may validate that input meets syntax constraints, but in the service layer you'd do data integrity validations. The second main way is to perform all validation in teh service layer, which keeps all of the validation in one stage.

### Takeaway
Honestly, there's no right answer, that's why there's controversy around this question but there are some reasonings and justifications on why people like the former

Database validations checks the integrity and consistency of the data are done in the business layer. Then in the presentation layer we validate the format and syntax of the data. We make sure that the data conforms. The service layer doesn't need validate date formats, that has nothing to do with business. It should trust that it's going to receive a valid date object, without needing to care how that's done. As well, the persistence layer trusts that the entity being saved will conform to your database constraints such as things being unique, not null, or meeting length constraints. Akin to how our persistence layer, trusts the service layer, the service layer trusts the controller.


## DTOs (Data Transfer Objects) vs Domain Objects
- Domain Objects: Also known as 'Entities', these are objects that erpresent data that's stored in the database. These are usually mapped directly to a database table and are used in the data access and service layers to do business logic.
- DTOs: Simple objects used to transfer data between the presentation and service layer. You often use them to encapsulate data and often exclude sensitive information or irrelevant data fields. For example, if you have a 'password' field on a User entity, then your DTO can make it so you don't include a user's password and sensitive info when sending it back.

1. Creating multiple DTOs: You can create multiple DTOs for a given table. Like a User table could have a `UserResponseDTO` for sending a response to back to the user, and a separate `UserRegistrationDTO` which gives you the data for creating a user.


## Testing the layers
- Presentation Layer: More so for integration tests. Test if they can actually make requests to endpoints you've defined and if they get the expected data back.
- Business layer: Here you'd do unit testing and mocking. You should mock the repository, stuff like a PasswordEncoder if you're using that. But keeep things usch as your service class and mapper implementation real. We should have already tested the data layer so we shouldn't need the real version of the repository. We want our unit tests to be fast, remember? 
- Data Layer: You'd test your DB queries. Whether or not your DB queries are working as expected. Bring in a in-memory database to do this one.

## Service functions and DTOs
First question, should the service layer always return DTOs, or can they also return domain models? Honestly this is an opinion-based question and there's no definitive answer. 

Throughout your work in software engineering, you'll definitely see both, and you'll probably see sometimes that DTOs aren't used when they should be or vice versa. Here is what I've gathered:

- Implementation: Let your application/service layer return domain objects to the presentation layer. The presentation layer then maps these domain objects to DTOs. However we should place some constraints on ourselves.
1. Read-Only Access: The presentation layer can only read values from domain object; it cannot modify them. This protects the integrity of the domain data, and leaves all of the work related to it in the business layer.
2. Input Parameters: The service layer accepts raw data instead of domain objects. This ensures the logic of creating a domain object isn't put on the controller, but rather the controller handles sending raw data to our service. Then our service will be the one handling the creation of a domain object.
3. Mapping in the presentation layer: The logic for mapping is done and used in the presentation layer. This keeps it separated from the business layer, as mapping domain to DTO isn't really business logic.

- Other benefits (Interfacing with other systems): If your API needs to interface with multiple other systems that may require different DTOs (microservices!), then making your application layer return various different DTOs would significantly increase its complexity and could lead to a lot of code repetition. Just let this stuff be handled in the presentation layer, as different routes can be designed for different systems, and as a result would address each external system's needs.





# Credits: 
1. [Intro to N-Tier Architecture - Teddy Smith](https://www.youtube.com/watch?v=0jZvOGnVcJ0)
2. [More about N-Tier Architecture - AmigosCode](https://www.youtube.com/watch?v=xJC7ItRoEbw)
3. [DTOs vs Entities - Baeldung](https://www.baeldung.com/java-entity-vs-dto)
4. [Returning DTOs, domain models, or both? - StackOverflow](https://stackoverflow.com/questions/21554977/should-services-always-return-dtos-or-can-they-also-return-domain-models)
5. [Testing the service layer - Java Guides](https://www.javaguides.net/2022/03/spring-boot-unit-testing-service-layer.html)