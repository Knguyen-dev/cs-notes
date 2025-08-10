```sql
CREATE TABLE url_shortener.urls (
    backhalf_alias text PRIMARY KEY,
    original_url text,
    -- The user ID is going to be an integer primary key from a Postgres table rather than a UUID.
    -- Hopefully this is also fine.
    user_id int,    
    is_active boolean,
    password_hash text, -- For password protected ones.
    expires_at timestamp,
    created_at timestamp,
    updated_at timestamp
);

-- Materialized view "urls_by_user_id" based on urls table
CREATE MATERIALIZED VIEW url_shortener.urls_by_user_id AS
SELECT *
FROM url_shortener.urls
WHERE user_id IS NOT NULL AND backhalf_alias IS NOT NULL
PRIMARY KEY ((user_id), backhalf_alias);


-- A Cassandra table that contains a COUNTER column can only contain
-- COUNTER columns (and primary key columns). This is a separate table.
CREATE TABLE url_shortener.url_clicks (
  backhalf_alias text PRIMARY KEY,
  total_clicks counter
);
```
The main challenge was the choice of materialized views over just having two table. Both options will duplicate the data on disk. Both are adding hits in write performance, with having 2 manual tables maybe being faster than a materialized view. For now it boils down to complexity of maintaining data consistency. During situations where one write succeeds adn the other fails, a materialized view will be able to handle that internally and much better than me currently. Materialized views at least have decent read performance which is nice. Our `urls` and `urls_by_user_id` are on different partitions so a batch operation can'only guarantees that writes are attempted, not succeded. In case in the future you want to try dual tables:
 


If any of the two writes fail, you must retry with exponential backoff. Have a maximum number of retrys. Application level transactions, so have try/catch blocks around each write.
- If a secondary write fails, log it to a durable store. Imagine logging a success for one, and then a success for the next. If the second success wasn't written, we failed. So maybe every hour you could have a script go through this log, and if it sees an issue, raise it with a separate service to investigate it. This almost seems full proof. Should just make sure to time it so that we write to a new log every hour, and it reads from the previous log every hour, and we delete the previous log. This is to keep the logs at least somewhat short so our service doesn't spend hours looking through it? This seems like a full-proof repair mechanism.
  - Not full proof yet. Ideally you shouldn't have your log be local. You should have a store like Kafka or a message queue that handles inconsistencies in the background. Of course this isn't full-proof, but we're reaching the limit for pretty good. 
  - In any case, a tough problem, but I'm guessing I just don't have the knowledge yet to solve this effectively and in a clean way.
- I should also write that ultimate safety net mechanism would be comparing the `urls` table with the `urls_by_user_id` table. Instead of doing a massive table scan, please do this in batches of 500-1000 rows at a time to avoid excessive memory consumption.