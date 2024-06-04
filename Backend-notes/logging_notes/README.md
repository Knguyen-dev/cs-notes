# Logging

## What is logging and why is it needed?
Logging is the process of recording information about a program's execution, typically to a persistent storage medium such as a file or database. It's a crucial aspect of software development. 

Imagine a scenario when a customer tries to buy a product on your website and they get an error. When calling the customer support they may ask about this error and need help. The customer doesn't know about programming, web stuff, and any of the technical stuff. So to help, we'd use logging and look at our logged logged information to see what happened in our program before and after that error happened, to identify what went wrong and fix it.

#### Why not use console.log? Well putting console.log in a production codebase is bad practice for multiple reasons:
1. Performance impact: Using console.log a lot cna slow down the application, especially in high traffic environments. Writing to the console is a synchronous operation and can block the event loop. Also generating a large amount of output can overwhelm the system as well.
2. Lack of control/refinement: No log levels so it's hard to know what categories each log is in. 'Is this log a serious error or just something that's normal?'
3. Security Risks: Logs can accidentally expose sensitive infomration.
4. Limited retention: A console.log isn't stored anywhere, so 3 days from now, that log is gone. However with real logging it's stored in a persistent data store, so you can always go back and look upon a log.
5. Scalability: In a distributed system with multiple app instances running, using console.log makes it hard to get all of those logs and centralize/put them somewhere for good analysis.

#### Examples of Logging libraries 
- Node.js: Winston, Bunyan, Pino
- Java: Log4j, SLF4J with Logback
- .NET: Serilog, NLog
- Python: Logging module, Loguru


#### Logging levels
Usually we separate our logs into different 'levels' to indicate severity:
1. Fatal: Really bad, so bad that the app aborts and shuts down. 
2. Error: Serious issue that something went wrong. It doesn't cause the app to go down, but it could be something such as a major feature isn't working correctly, a file or service can't be accessed, etc.
3. Warning:  The 'WARN' level indicates that something unexpected or unusual happen. Such as a service failing a couple of times and then finally connecting. It's unusual 'what caused it to fail the first few times, and connect on the third?'. It isn't known if the issue will persist, but it warrants investigation.
4. Info: Nothing bad happened, we are just recording normal operations and milestones. Such as when a user successfully signs up, logs in, successfully changes their password, etc.
5. Debug: Record the more technical infomration, that may not be needed in a production environment. The type of information that would be helpful to a developer, sysadmin, or other technical person.
6. Trace: Very detailed information, more detailed than 'Debug'. Definitely more information than needed in a production environment.
7. All: The idea of logging everything.
8. Off: Idea of not logging anything.




## Winston
A leading and popular logging library in node.
Here are the logging levels in winston:
{
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}




## Project setup:
We already know about express and dotenv. The 'node-fetch' package is for making http requests in a node or non-browser environment, similar to how you can make fetch requests with the fetch API in a browser environment. 

- winston: A logging library
- express-winston: A library that tries to make it easier to use winston with Express. It allows the creation of easy logging middleware with winston too. 
- winston-mongodb: A MongoDB transport for winston. A transport refers to the storage mechanism for storing our logs. With winston-mongodb, it makes it easy to store your logs in a MongoDB database.
```
npm i dotenv express express-winston node-fetch winston winston-mongodb
npm i -D nodemon
```


# Credits:
1. [Four articles from basics to advanced logging](https://www.crowdstrike.com/guides/nodejs-logging/)
2. [How to setup a production grade logger in JavaScript](https://www.youtube.com/watch?v=m2q1Cevl_qw)


