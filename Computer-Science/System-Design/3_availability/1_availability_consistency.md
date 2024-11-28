# Availability vs Consistency

## Intro and premise
We want to scale out systems as we need our systems to be able to handle more work efficiently. We use this by adding more hardware to increase the load our system can take. However scaling has its downsides, and we need to balance those downsides. This is where the Cap Theorem comes into play.


## Latency vs Throughput
- **Latency:** The time it takes to do something, or get an answer. 
- **Throughput:** The number of actions we can do or the number of answers we can get per some unit of time.

### Example 1: Car Designer
An assembly line is making cars. It takes 8 hours to make a car and the factory makes 120 cars a day.
- **Latency:** 8 hours, because this is the amount of times it takes to yield a result, make a car.
- **Throughput:** 120 cars per day, or 5 cars an hour. Amount of results in a clear unit of time.

### What is network partitioning
The process of separating a computer network into independent areas or 'subnets' either done by design, or due to an uncontrolled network failure. 
For example, a group chat where some members lose their internet connections. Now you have two separate groups of people who can talk among themselves, but can't message back and forth between the two groups until the internet is restored. This can happen due to hardware failures, network overload, physical damage to cables, or just maintenance and updates that need the network segments to be disconnected temporarily.

## CAP/Brewer's Theorem
States that in a distributive system, you can only have two out of 3 guarantees:
1. **Consistency:** A read is guaranteed to return the most recent write or an error. Here all nodes have the same data, and if you update data, all subsequent reads need to reflect that newest update (fresh data). You could also think of it as the idea that data is the same across the cluster.
2. **Availability:** A working server/node will return a reasonable response in a reasonable amount of time. No errors and no timeouts or long latency. Could also think of it as the ability to access the cluster even if a node goes down.
3. **Partition Tolerance:** The system will still work when a network partitions (network breakdowns/outages) happens. In a partitioned network, nodes might nto be able to communicate with each other, but can communicate with the nodes in its own partition/group. 

Let's say you have a distributed system with 2 nodes X and Y, a master-master setup. At the time of a network partition you have to choose
between either consistency or availability, you can't have both. 
1. **Consistency:** If you try to go for consistency, then it'd be a good idea to shut down one of your master nodes. You don't want write requests 
going to both of them whilst they're out of sync because now there's two different databases making write requests to the same data, and they could 
be vastly different now. Whereas before they communicated to check changes, now we don't know. As a result to achieve consistency you need to turn off one of them, which 
obviously is going to affect your availability.
2. **Availability:** If your system is focused on availability, then you keep both of them on as data consistency isn't as important in your app. As a result 
you can have that increased availability, but of course know that you're sacrificing your data consistency.

Since you can only achieve two out of three properties simultaneously, we can only have 3 possibilities:
1. **CP (Consistency + Partition Tolerance):** Guarantees data consistency across all nodes (fresh data). However, since we partitioned our network, we may be sacrificing availability. Use it when your business requirements want atomic read and writes, such as a banking system. MongoDB and HBase support this as they have replication mechanisms and prioritizes the idea of fresh data.
2. **AP (Availability + Partition Tolerance):** System is available despite network partitions. However your nodes may return outdated data since you sacrificed consistency. Use this when freshness of data isn't as important, but you still want to be responsive and work under network outages or outside interference. E.g. Cassandra and DynamoDB as these prioritize responding to requests with data, even if it's not the most recent.
3. **CA (Consistency + Partition Tolerance):**  However in the case of a network partition, we go out of sync and once the partition is resolved, we won't resync. System provide consistent with good availability. This isn't possible in a truly distributed system, but it is possible in a non-distributed or single-node system. Most of the time this isn't going to be a choice. You can't choose this choice as you don't have a choice in whether network partitions happen to you.

## Consistency Patterns
We want data consistency in a distributed system. We want to not only get fresh data, but also the data must be the same across our cluster. That's what we mean by fresh and consistent, as everyone would get the same data regardless of which database it was outputted from.
1. **Weak consistency:** After a write, reads may or may not see it. This works well in real time applications such as video chat, VoIP, and multiplayer games. So if you're on the phone and lose reception for a couple of seconds, you won't hear what was spoken during the connection loss. Or like a cache, you may get the data or you may not.
2. **Eventual consistency:** After a write, reads will eventually see it (typically within milliseconds). Data is replicated asynchronously. This is often in systems such as email, and it works well in highly available systems.
3. **Strong consistency:** After a write, reads will see it as data is replicated synchronously. Often seen in relational database management systems, and a common example would be ACID transactions. E.g. if a user's balance is updated, the next reads are guaranteed to see the new amount.

Some context to help you:
- **Multi-homing:** Serving something from multiple data-centers at the same time. 
- **Read/write data (toughest kind):** Data that the user can change and they're expecting to see those changes.
- **Transactions**: ACID Transactions are consistent database operations.

### Why or why not run multiple data centers
To protect against failures. What if there's a fire, earthquake, or a natural disaster that renders your data center nulled.
Another thing is geo-locality, as it's good to have infrastructure near your users in order to minimize latency. We want our data to 
be as close to your customers as possible.

I mean it costs a lot of money to have multiple data centers. If you want to help it, you 
don't want to multi-home unless you absolutely have to. 

What makes multi-homing a very difficult problem is that once we accept writes from multiple sources of truth, we are at risk of violating 
our data's consistency. Imagine this for a bank, that seems like a mess could happen where you aren't consistent with the balance of a person's 
account since you had multiple write databases acting on it.

### What options are there for transactions across data centers/in a distributed system?
- **Option 1 (Bunkerize):** Focusing all resources on one data center. This is the most common approach as it's a very simple and trusted way of handling a distributed system. Obviously if a disaster strikes, then that's large scale data loss, downtime, etc. Also, you're sacrificing the ability to spread across the map, and serve data closer to users from different parts of the world.
- **Option 2 (Primary with failover):** You have multiple data centers, but the primary data center will handle writes, whilst the other data centers will handle reads. In case the master data center is taken down, a slave data center takes its place. Similar to how we do master-slave database replication. So its geo-located for reads, but not writes.
- **Option 3 (Multi-homing):** Many different data centers serving read and writes (multi-master approach), and they have strong consistency indicated by their good transactions. This is extremely hard, and there still is overhead. Your data centers will communicate with each other, and you'll see drawbacks in general latency.

### Multi-homing implementations:
Here's a restructured and organized format for your notes based on key criteria: consistency, transactions, latency, throughput, data loss, and failovers.

---

### 1. **Backups**
Backups create a static copy of your data at regular intervals, preserving information for recovery. However, they are typically not real-time, meaning they provide only a snapshot of data at a particular point. Backups have weak consistency since they may not reflect recent changes. They are useful for disaster recovery but not for maintaining up-to-date copies of data. Restoring from a backup can be slow and typically requires manual intervention.
   - **Consistency**: Weak consistency; backups may be outdated.
   - **Transactions**: Not transaction-aware; only provides raw copies of data.
   - **Latency**: Generally high latency to restore and update; not intended for real-time operations.
   - **Throughput**: High throughput is possible during backup, but not suitable for high-frequency, real-time data updates.
   - **Data Loss**: High potential for data loss, as backups are periodic and do not capture every change.
   - **Failover**: Poor failover capability; backup restoration can take time and often requires manual intervention.

---

### 2. **Master/Slave Replication**
Master/Slave replication involves a master database that handles all write operations, while one or more slave databases replicate the master’s data. Replication is often asynchronous, so slaves may lag slightly behind the master, leading to eventual consistency. Reads can be directed to slaves to improve throughput and reduce load on the master. This setup provides decent failover options, as a slave can take over if the master fails, although recent data might be lost due to replication lag.
   - **Consistency**: Weak or eventual consistency, typically asynchronous.
   - **Transactions**: Supports transactions, but since replication is asynchronous, recent changes may not appear immediately on slaves.
   - **Latency**: Low latency for reads (especially if reads are directed to slaves), but writes are delayed until replication.
   - **Throughput**: Good throughput for reads and writes, as slaves can handle read operations.
   - **Data Loss**: Moderate potential for data loss in the event of failure, as slave lag means some recent writes may be lost.
   - **Failover**: Fair failover capability; if the master fails, a slave can take over, though data lag may affect consistency.

---

### 3. **Multi-Master Replication**
Multi-Master replication allows multiple databases (masters) to handle writes independently, often across different regions or data centers. Each master replicates its changes to others, but managing consistency can be challenging when different masters update the same data. Conflict resolution, often based on timestamps, is used to merge changes. This setup provides high availability and scalability but makes global transactions difficult due to the need to synchronize independent systems.
   - **Consistency**: Eventual consistency; requires conflict resolution when multiple masters modify the same data.
   - **Transactions**: Local transactions are supported, but global transactions (involving multiple masters) are difficult and prone to issues.
   - **Latency**: Low latency for writes and reads locally, but high latency for global replication across regions.
   - **Throughput**: High throughput due to parallel writes at multiple masters, but potential bottlenecks from global replication and conflict resolution.
   - **Data Loss**: Low data loss; replication between masters mitigates risk, though conflicts may lead to resolution-based changes.
   - **Failover**: Good failover capability; if one master fails, another can continue operating, though conflict resolution might impact consistency.

---

### 4. **Two-Phase Commit (2PC)**
Two-Phase Commit is a protocol for coordinating distributed transactions, ensuring that either all systems (master databases) commit the transaction or none do. In the prepare phase, a coordinator asks all participants if they’re ready to commit. If all agree, the coordinator instructs each to commit in the commit phase; otherwise, it aborts. This protocol guarantees atomicity but has high latency and blocking risks if participants or the coordinator fail during the process.
   - **Consistency**: Strong consistency across participants; all nodes commit or none do.
   - **Transactions**: Transaction-aware, providing atomicity across distributed nodes by coordinating commit decisions.
   - **Latency**: High latency due to the two-phase protocol, which requires multiple network round trips.
   - **Throughput**: Moderate throughput; serial coordination can introduce bottlenecks, especially with high-latency networks.
   - **Data Loss**: Low risk of data loss within a transaction if nodes are reliable, but protocol failures can leave participants in uncertain states.
   - **Failover**: Fair failover capability; if the coordinator fails, participants may be left waiting. Requires recovery protocols or manual intervention in case of failure.

---

### 5. **Paxos**
Paxos is a consensus algorithm used in distributed systems to agree on a single value even with failures. It enables multiple nodes to reach a consistent state by following a series of proposals and acceptances, ensuring strong consistency. Paxos is fault-tolerant, capable of handling network partitions and node failures, but its multi-phase design can introduce high latency and limit throughput. It’s commonly used for distributed consensus rather than directly for database transactions.
   - **Consistency**: Strong consistency; Paxos ensures consensus among distributed nodes, even in the face of network partitions.
   - **Transactions**: Transaction-aware, but Paxos is typically used for distributed consensus (not directly for typical database transactions).
   - **Latency**: High latency due to multiple phases and the need for quorum-based consensus.
   - **Throughput**: Lower throughput compared to simpler protocols, as Paxos is complex and involves a lot of coordination.
   - **Data Loss**: Very low; Paxos is designed to handle failures and ensure consensus even in the event of partial system outages.
   - **Failover**: Excellent failover capability; Paxos can continue operating as long as a majority of nodes are available.

---

## Availability Patterns
When we talk about availability patterns, we are asking, what types of mechanisms do we have in place in order to keep our system up and running. There are two main patterns that support high availability: fail-over and replication.

---
### Types of fail-over
1. **Active-passive (Master-slave):**  Active-passive failover is the idea that heartbeats are sent between an active and a passive server that's on standby. If the passive server does not hear that heartbeat anymore, that means the active server has gone offline and so the passive server takes over the active server's IP address and maintains operations. The only thing here is that when your active server goes offline, there could be a noticeable duration where your services aren't working. This depends on whether your passive server is on 'hot' standby, meaning it's ready to go at any moment, or 'cold' standby, which means it'll take a couple of minutes to start up.
2. **Active-active (master-master):** Both servers are handling traffic. If one stop, then all traffic is going to be handled by the other one. 
- **Disadvantages:** It adds more hardware and setup complexity and you may lose data if the active system fails before any new 

---
### Database Replication
You can obviously have database replication be a failover mechanism for your database layer. You can read more about this in the database section.


### Quantifying availability
Typically quantified by uptime or downtime as a percentage of time the service is availability. If a service was down for only 1 minute and 26.4 seconds a day, that means the service had an availability of about 99.9%. The service was active 99% of the time.






## Credits:
1. [Cap Theorem Revisited](https://robertgreiner.com/cap-theorem-revisited/)
3. [Transactions Across Data Centers](https://www.youtube.com/watch?v=srOgpXECblk)