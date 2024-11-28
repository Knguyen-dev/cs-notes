
# Messaging

### Messaging in a Nutshell
Messaging is the process by which different systems or services communicate with each other by sending messages (tasks or data). **Message brokers** facilitate this communication by managing the flow of these messages, allowing systems to interact asynchronously without needing to know each other's specific details or being tightly coupled.

---
#### Houses and Telephone System Example
Imagine you had a house and you wanted to communicate with people using the telephone. Early on, to talk to a specific house, you had to have a direct connection to that. So if you wanted to talk to your entire neighborhood, you had to have a line to every house, and that gets messy. Here's where the message broker comes in. The message broker is the central hub, and it is connected to every house. When you want to send a message to a house, you send it to the message broker, and the message broker handles sending it to the other house. This reduces the complexity and amount of telephone lines. For an application, it doesn't need to be connected to other apps, it just needs to be connected to the one message broker.

---
### Message Queues and Their Role

A **message queue** is a type of communication system that stores messages (tasks, events, or data) temporarily and allows consumers (workers or other services) to retrieve and process them at their convenience. This approach decouples the components of a system, allowing for asynchronous processing and more efficient resource management. So remember the message queue itself (aka job queue) doesn't do any processing, it just listens for and stores data.

#### Breakdown of the Process:
1. **Job Queue**: A queue where tasks or messages are stored until they are processed. This is used when tasks take time (e.g., video uploads, batch processing).
   
2. **Workers**: These are the processes that pull messages from the queue and perform the tasks. Workers can run in parallel, helping to process multiple tasks at the same time.

3. **Notification**: After a worker processes a message, it can notify the user that the task is completed, or it can trigger other actions within the system (e.g., updating a database or sending a notification).

#### Key players in the process:
- **Producers:** Systems that generate messages (tasks, data).
- **Consumers:** Systems that process messages.
- **Message Brokers:** The middleware that handles the messages, ensuring communication between producers and consumers.

---
### Messaging Patterns

1. **Point-to-Point Messaging**: Each message is consumed by a single consumer. This pattern is ideal for scenarios where only one system should handle a particular message, like processing a financial transaction.
   - **Use Case**: Payroll systems, financial transactions, or order processing.

2. **Publish/Subscribe (Pub/Sub) Messaging**: A publisher sends messages to multiple consumers. Consumers who are subscribed to a particular topic or message type can handle the message, allowing for broadcast communication.
   - **Use Case**: Real-time alerts (e.g., flight updates) or notification systems (eg., updating multiple services with a new post or event).

---
### Handling Off-line and In-line Work

1. **Offline Processing (Async)**: Tasks that take a long time to complete are handled in the background. The user is notified once the task is done but doesn't need to wait for it. 
   - **Example**: Uploading a video on YouTube. The video is uploaded in the background, and the user can continue browsing, but the system notifies the user once the upload is finished.

2. **Inline and Asynchronous Work (Hybrid)**: Some parts of the task are handled synchronously, so the user sees an immediate response, while other parts are processed asynchronously in the background. This gives the user an impression that the task is done quickly, while heavy lifting happens in the background.
   - **Example**: Posting a tweet. The tweet appears instantly on the user's timeline, but updating all followers' timelines happens in the background.

**Benefit**: With asynchronous processing (via message queues), you can offload long-running tasks to dedicated servers, allowing the web server to remain responsive to other incoming requests.

---
### Scaling with Message Queues
Message queues also help with scaling. Since message processing happens separately from web request handling, you can scale the message queue module independently of your web servers. This is particularly useful when you need to handle many background tasks without affecting the user-facing experience.

---
### Scheduling Periodic Tasks
Message queues are also effective for scheduling recurring tasks. You can publish messages for periodic tasks (e.g., data aggregation, reporting) and have dedicated workers that listen for those messages and handle the tasks at regular intervals.

# Credits:
1. [RabbitMQ in 100 Seconds - Fireship](https://www.youtube.com/watch?v=NQ3fZtyXji0)
2. [Message Brokering - IBM](https://www.ibm.com/topics/message-brokers)