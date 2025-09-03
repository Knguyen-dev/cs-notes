# Redis Notes and Reference

## What is Redis
Redis (Remote Dictionary Server) is an open-source, in-memory data structure store that can be used as a database, cache, and message broker. It's known for its exceptional performance, supporting millions of requests per second with sub-millisecond latency.

**Key Characteristics:**
- In-memory storage (with optional persistence): Redis is in-memory making it really quick to get data out of. Of course, this means it's non-persistent, so you wouldn't use this to store long term data as things are volatile. 
- NoSQL key-value store: It stores data as key-value pairs. Each key is associated with a value, so you can think of it as a really complex hashmap.
- Supports various data structures: You can store strings, lists, etc. 

The common use case would be caching, as it as it allows you to reduce load on your database and important resources.

## Basic Setup and Config
```bash
# Install Redis
sudo apt-get install redis-server  # Ubuntu/Debian
brew install redis                 # macOS

# Start Redis server
redis-server

# Connect to Redis CLI
redis-cli
redis-cli ping  # Should return "PONG" to indicate that Redis is running

# Select database (Redis has 16 databases by default, indexed 0-15)
SELECT 0  # Switch to database 0
```
Though personally, I'd recommend just setting up a docker container.

## Redis Data Types 

### Strings
You can use this to store text, numbers, or binary data:
```bash
# Basic string operations
SET key "value"
GET key
MSET key1 "value1" key2 "value2"  # Set multiple
MGET key1 key2                    # Get multiple

# String with numbers
SET counter 10
INCR counter      # Increment by 1 (returns 11)
INCRBY counter 5  # Increment by 5 (returns 16)
DECR counter      # Decrement by 1
DECRBY counter 3  # Decrement by 3

# String operations
APPEND key "additional text"
STRLEN key        # Get string length
GETRANGE key 0 5  # Get substring (characters 0-5)
```

### Hash Maps
Perfect for storing objects with multiple fields:
```bash
# Hash operations
HSET user:1 name "John" email "john@example.com" age 30
HGET user:1 name          # Get single field
HMGET user:1 name email   # Get multiple fields
HGETALL user:1            # Get all fields and values

# Hash field operations
HEXISTS user:1 name       # Check if field exists
HDEL user:1 age          # Delete field
HKEYS user:1             # Get all field names
HVALS user:1             # Get all values
HLEN user:1              # Number of fields
```

### Lists
Ordered collections of strings, great for queues and stacks.
```bash
# List operations (Left/Right push/pop)
LPUSH mylist "first" "second"  # Push to left (head)
RPUSH mylist "third" "fourth"  # Push to right (tail)
LPOP mylist                    # Pop from left
RPOP mylist                    # Pop from right

# List access and manipulation
LLEN mylist              # List length
LRANGE mylist 0 -1       # Get all elements (0 to end)
LINDEX mylist 2          # Get element at index 2
LSET mylist 1 "newvalue" # Set element at index 1

# Advanced list operations
LTRIM mylist 0 2         # Keep only elements 0-2
LINSERT mylist BEFORE "value" "newvalue"
```

### Sets
Unordered collection of unique strings.
```bash
# Set operations
SADD myset "member1" "member2" "member3"
SMEMBERS myset           # Get all members
SISMEMBER myset "member1" # Check membership
SCARD myset              # Set size
SREM myset "member2"     # Remove member

# Set operations between multiple sets
SINTER set1 set2         # Intersection
SUNION set1 set2         # Union
SDIFF set1 set2          # Difference
```

### Sorted Sets (ZSet)
These are sets but with scores for ordering.
```bash
# Sorted set operations
ZADD leaderboard 100 "player1" 200 "player2" 150 "player3"
ZRANGE leaderboard 0 -1 WITHSCORES  # Get all with scores
ZREVRANGE leaderboard 0 2           # Top 3 (highest scores)

# Sorted set queries
ZSCORE leaderboard "player1"        # Get score for member
ZRANK leaderboard "player1"         # Get rank (0-based, ascending)
ZREVRANK leaderboard "player1"      # Get rank (descending)
ZCOUNT leaderboard 100 200          # Count members in score range
```

## TTL (Time To Live) and Expiration
TTL allows you to set automatic expiration for keys.
```bash
# Set TTL
SET key "value" EX 60        # Set with 60 seconds TTL
SETEX key 60 "value"         # Alternative syntax
EXPIRE key 120               # Set TTL on existing key

# TTL management
TTL key                      # Check remaining TTL (-1 = no expiry, -2 = expired)
PERSIST key                  # Remove TTL (make permanent)
EXPIREAT key 1735689600      # Expire at specific Unix timestamp

# Millisecond precision
PSETEX key 5000 "value"      # Set with milliseconds
PTTL key                     # Get TTL in milliseconds
```

## Essential Redis Commands

### Common Commands
**String Commands**
- `SET/GET`: Basic get/set
- `MSET/MGET`: Multiple keys
- `INCR/DECR`: Numeric operations
- `APPEND`: Append to string

**Hash Commands**
- `HSET/HGET`: Single field
- `HMSET/HMGET`: Multiple fields
- `HGETALL`: All fields
- `HEXISTS/HDEL`: Check/delete field

**List Commands**
- `LPUSH/RPUSH`: - Add elements
- `LPOP/RPOP`: - Remove elements
- `LRANGE`: Get range
- `LLEN`: List length

**Set Commands**
- `SADD/SREM`: Add/remove members
- `SMEMBERS`: All members
- `SINTER/SUNION` Set operations

**Sorted Set Commands**
- `ZADD`: Add with score
- `ZRANGE/ZREVRANGE`: Get by rank
- `ZSCORE/ZRANK`: Get score/rank

**General Commands**
- `EXISTS/DEL`: Key existence/deletion
- `EXPIRE/TTL`: Expiration management
- `TYPE`: Get key type
- `INFO`: Server info

### Key Management
```bash
# Key operations
EXISTS key1 key2             # Check if keys exist
DEL key1 key2               # Delete keys
KEYS pattern                # Find keys (avoid in production!)
SCAN 0 MATCH "user:*"       # Better alternative to KEYS



TYPE key                    # Get key type
RENAME oldkey newkey        # Rename key

# Database operations
FLUSHDB                     # Clear current database
FLUSHALL                    # Clear all databases
DBSIZE                      # Number of keys in current DB
```

### Information & Monitoring
```bash
INFO                        # Server information
MONITOR                     # Real-time command monitoring
SLOWLOG GET 10             # Get slow queries
CONFIG GET "*"             # Get configuration

# Check memory usage
INFO memory
MEMORY USAGE key           # Memory usage of specific key
```

## Cache Strategies and Key Naming

### Key Naming Conventions
```bash
# Good practices for key naming
user:1001:profile          # Hierarchical with colons
session:abc123def          # Session data
cache:product:1001         # Cached product data
counter:page_views:daily   # Counters with descriptive names
temp:upload:user123        # Temporary data

# Avoid spaces, use consistent patterns
# Keep keys reasonably short but descriptive
```

### Caching Strategies

**Cache-Aside (Lazy Loading)**
```bash
# Pseudo-code pattern:
# 1. Check cache first
GET user:1001
# 2. If miss, get from database and cache it
SET user:1001 "user_data" EX 3600
```
Typically what you're going to use when doing read operations.


**Write-Through:**
```bash
# Update both cache and database simultaneously
SET user:1001 "updated_data" EX 3600
# Also update database
```
Typically what you're going to do when doing write operations.

**Write Behind/Back**
```bash
# Update cache immediately, database later
SET user:1001 "updated_data" EX 3600
# Database update happens asynchronously
```

## Best Practices
- Use appropriate data types.
- Set TTL for your key-value pairs.
- Batch multiple commands to reduce network roundtrips.
- Avoid KEYS command - Use SCAN instead for production. This is non-blocking and lets Redis keep serving other requests whilst you're scanning.
- Use connection pooling so that we can reuse connections rather than setting up and tearing down.