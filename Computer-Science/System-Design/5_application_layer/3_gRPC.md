# gRPC (Remote Procedure Call)

## What is it and how does it work?
A modern communication framework. Let's say we have an app. We have a front end, but and we have a microservices backend.
Our microservices need to communicate with each other:
1. Micro A: In Python
2. Micro B: Java
3. Micro C: Golang.

gRPC tries to give us convenience and scalability. We want the microservices to communicate via HTTP. This can be a little messy since 
Python, Java, and Golang all have their respective http libraries. These are maintained by different teams, things could be more messy and 
out of hand. gRPC handles all HTTP protocol related implementations for us, so we don't have to make our own HTTP related software.

gRPC also has code generation, which is achieved with 'protocol buffers'. These are contracts for communications. With a traditional 
rest API, you don't really have a contract I guess, because in the end you can send whatever you want via JSON? However with gRPC you'd 
define the data that's being sent. For example,
```
message Person {
  required string name = 1;
  optional int 32 id = 2;
  optional string email = 3;
}
```
So first define the data being sent. Then we can also define functions or 'procedures' that can be accessed (remote called) by other microservices.
For example:
```
service Contacts {
  rpc SayHello (Person) returns (HelloResponse) {}
}
```
So apparently in implementation, you'd have a protocol file. Then there you'd say you're 'messages' or data to be in some form. Then apparently you'd 
be outputted code that creates these classes for you, based on what you outlined in your protocol file.  


### Performance and convenience
Protocol buffers are sent as binaries 'across the wire'. Apparently this is the reason why gRPC is very performant. As a result, data is sent as binaries, which is a 
lot more efficient. If you wanted to use something like gzip, you'd have to have that for all of your microservices since you want to compress your messages when sending data.
However with gRPC, all of that is handled for you, giving you that convenience.






## Takeaway
1. Code generation
2. Protocol buffers, giving you performance since they send very small messages across your microservices.
3. Client request libraries already implemented. No need to have different client libraries across different languages.
Of course gRPC isn't the end all solution.





# Credits:
[What is gRPC - IBM Tech](https://www.youtube.com/watch?v=hVrwuMnCtok)
https://youtu.be/gnchfOojMk4?si=blIl-rotwia4WsqH
https://youtu.be/njC24ts24Pg?si=0ZUyeKHk98lkdQoT
