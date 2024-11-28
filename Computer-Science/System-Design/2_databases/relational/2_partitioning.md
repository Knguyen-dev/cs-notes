# Database Partitioning

### Types of partitioning
- **Horizontal Partitioning:** The rows of your database are split amongst different shards. For example, users might be divided by geography, so you'd have a database table only for users in South America, and one for people in Spain.
- **Vertical Partitioning:** Splits tables by columns. So columns with frequently accessed data could go on one server, while less frequently accessed data goes to another. 

---
### How does sharding work?
So each shard will contain unique rows of data, and each shard will be associated with a server that's dedicated to managing the data contained in that shard. So you'd use a hashmap to create 'shard-key', and this is how we can allocate our rows across different shards. Then you'd need to write software to determine which shard your query is targeting.

---
### Types of sharding
- **Range-based:** An example could be sharding based on the first letter in a customer's first name. So if your first name starts with letters a-i, then your user data goes into the first shard, you get the idea. The downside is that in this case, it's may be more common to have your first name start with a-i rather than t-z, so one of your shards could hold a lot more users in comparison to the others.
- **Hashed:** Based on user info, input it into a hash function, you output a number, and based on that number, the row goes into a certain database. The downside to this is that hash values don't represent any business meaning, making them hard to scale later.
- **Directory:** You'd have a look up table that targets one of the attributes of the rows, and based on said attribute we put the row in a given shard. Just make sure your look-up table is 'correct' in the sense that it is what you want your distributions to be. 
- **Geo-location:** Allocate the record based on location. For example a dating site may shard records using this method, as you may have a shard containing all users on the United States West Coast, or East Coast. With this method, the idea is that your shard and related server is closest to the user physically, allowing for a faster response.

---
### Database hot spots and things to think about
- **Cardinality:** Think about the possible values for the shards keys (cardinality). If you choose a 'yes/no' data field for hte shard key, you'll only have two shards.
- **Frequency:** Think about the probability of storing a row within a shard. For example, if you choose age to be the shard key on a fitness website, there are going to be a lot more rows in the shard where ages are (22-35) rather than (50-80). As a result, that shard is a hot-spot for queries.
- **Monotonic change:** The rate of change of your shard key. Let's say you shard based on the number of purchases your customers make. The shard with (21 or more purchases) is eventually going to be the hot-spot, as for a shopping platform, purchases are naturally going to go up quickly. As a result, the method of sharding is inefficient.