# Database Replication

### **Master-Slave Replication**
A replication strategy where:
- **Master Database**: Handles **write** requests.
- **Slave Databases**: Handle **read** requests.

When the master is updated, changes are **replicated** to the slaves. This setup is useful for load balancing and ensuring data availability.

#### **Advantages**:
1. **Backup Data**: If one database fails, replicas provide redundancy.
2. **Load Balancing**: Queries are distributed:
   - Writes go to the master (fewer operations).
   - Reads go to slaves (heavier load).
   - Modern databases handle synchronization automatically.

#### **Disadvantages**:
1. **Single Point of Failure**: If the master fails:
   - Promote a slave to master (manual or automated).
   - Operate in read-only mode temporarily.
   - Use a **multi-master** setup to avoid this risk.
2. **Load Balancer Risks**: Load balancers can fail. Mitigation:
   - Use at least two load balancers in **active-active** mode for redundancy.

#### **Database Clusters**:
Clusters often integrate with replication, optimizing reads for specific users or regions (e.g., East vs. West Coast). This reduces latency by placing servers closer to users.

---
### **Multi-Master Replication**
An approach for systems with high write demands or strict regional requirements. Honestly this approach is only necessary for high-scale apps:
- **Multiple Masters**: Write requests are distributed across multiple masters.
- **Replication**: Changes are replicated asynchronously between masters and their respective slaves.

#### **Challenges**:
- **Conflict Resolution**: Complex mechanisms are needed to handle simultaneous writes.
- **Use Case**: Best suited for high-scale apps where a single master cannot handle the write load.

---
### **Federation (Functional Partitioning)**
Divides databases by **function** (e.g., users, forums, products) instead of replicating the same data.

#### **Advantages**:
1. Reduces traffic to each database.
2. Parallel writes improve throughput (no single master bottleneck).

#### **Disadvantages**:
1. **Complex Joins**: Queries requiring data from multiple databases are more complicated.
2. **Increased Overhead**: More hardware and added complexity. 


## Database Partitioning (Sharding)
The idea of splitting a larger database into smaller pieces (shards). Instead of having all queries go to a single database, the queries go to their respective shards/pieces. 
- **Advantages:** Improves response time, more fault tolerance. Allows us to use horizontal scaling. There's only so many SSDs we can attach to a single database server and eventually we'll reach a limit. So by scaling the database horizontally is better.
- **Disadvantages:** Data distribution can be really lop-sided. Also joining data from multiple shards is going to be more complex. It adds more hardware and additional complexity.

# Credits
1. [Learn database normalization](https://www.youtube.com/watch?v=GFQaEYEc8_8)
2. [What is database sharding?](https://www.youtube.com/watch?v=XP98YCr-iXQ)