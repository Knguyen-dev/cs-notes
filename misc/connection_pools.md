# Connection Pools Explained

## Basic Connection Flow
Typically in the beginning we start off by creating one database client. This is great, but we'd only be able to handle one request at a time rather than multiple requests in parallel. 

Then we can try to create a new client for every request, which enables parallelism, but this is inefficient as there's always a cost to creating a a conncetion. Creating a database connection involves:
1. The application uses a database driver to open a connection.
2. A network socket is opened to connect the application and the database.
3. The user is authenticated.
4. The operation completes and the connection may be closed.
5. The network socket is closed.

You can see that the opening and closing of the connection and the network socket is a multi-step process that requires computing resources. Of course not closing the connection and keeping it open and idle also consumes resources.

For simple operations at small scale, the computational resources needed aren't expensive enough to worry about. However, in a high scale application, constantly opening and closing connections becomes a lot more expensive and can impact your performance. Your application can only handle opening and closing so many connections until your performance degrades or you full-on crash your application.


## What is a connection pool? 
It's more intuitive to keep connections open and reuse them for incoming operations, rather than opening and closing brand new connections for each operation. A connection pool is a cache of database connections that are created upfront and reused across requests. Instead of opening a new connection every time you need the database, you "borrow" an existing one from the pool, use it, and then return it. 

Think of it like a taxi company, instead of manufacturing a new taxi for every ride request, they maintain a fleet of taxis that drivers can use for multiple rides throughout the day. This allows us to parallelize our requests, but control the maximum amount of connections we make. We don't need to always keep paying the connection cost, but rather we already pay when we open a connection for the first time (and through keeping it open).

## Pool Lifecycle and Example
```Python
import asyncpg
import asyncio

class DatabasePool:
    def __init__(self):
        self.pool = None
    
    async def initialize(self, database_url: str, min_size=5, max_size=20):
        """Create the pool upfront"""
        self.pool = await asyncpg.create_pool(
            database_url,
            min_size=min_size,  # Always keep 5 connections open
            max_size=max_size,  # Never exceed 20 connections
            command_timeout=60  # Usually there's also a timeout
            # Could also add a timeout for extra connections that have 
            # been inactive for a while. This allows you to close idle 
            # connections after they haven't done much for a bit.
        )
    
    async def close(self):
        await self.pool.close()

# Global pool instance that's imported to all repository classes
db_pool = DatabasePool()

class PostgresUserRepo:
  def __init__(self, pool):
      self.pool = pool
  
  async def get_user(self, user_id: int):
      # This borrows a connection from the pool
      async with self.pool.acquire() as conn:
          return await conn.fetchrow(
              "SELECT * FROM users WHERE id = $1", 
              user_id
          )
      # Connection automatically returned to pool here
  
  async def create_user(self, name: str, email: str):
      async with self.pool.acquire() as conn:
          return await conn.fetchrow(
              "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
              name, email
          )
```
The pool lifecycle goes like this:
1. **Startup:** The pool creates `min_size` connections immediately.
2. **Runtime:** When we need a connection:
    - If one is available, use it immediately. 
    - If all busy but under `max_size`, then create a new connection.
    - If at `max_size`, then wait for one to become available. This is the one drawback, as we create additional latency through traffic spikes. 
3. **After use:** Connection returns to pool for reuse.
4. **Shutdown:** Pool closes all connections cleanly.

## Takeaways and Benefits
- No connection overhead: Reuse existing connections.
- Controlled resource usage: Limits concurrent connections to your database.
- Better under load: Database servers handle 20 concurrent connections better than 200 short-lived ones.
- Connection validation: Pool can test connections and replace broken ones.

## Credits
- [Database pooling - Cockroach Labs](https://www.cockroachlabs.com/blog/what-is-connection-pooling/)