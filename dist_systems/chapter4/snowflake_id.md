# Snowflake ID
Snowflake IDs, or snowflakes, are a form of unique identifier used in distributed computing. It was created by Twitter and used for hte IDs of tweets. 

## Format and Structure
They are 64 bits in total, 63 to represent signed numbers, but usually the first bit is always zero since you don't really need to represent negatives.

- **1 bit:** Always 0
- **41 bits:** A timestamp in milliseconds since a chosen epoch (fixed date and time).
- **10 bits:** A machine ID. Distributed systems will have multiple machines generating these ids, so each machine would use a unique machine ID so that it can generate a different ID.
- **12 bits:** A per machine sequence number. This is just an incrementing number. The idea is that this would allow you to create multiple snowflake IDs in the same millisecond. 
  

### Intuition Behind Sequence Numbers

**Without a sequence number:** If you only had timestamp + machine ID, you could only generate one unique ID per millisecond per machine. If your application tried to generate a second ID in the same millisecond on the same machine, you'd get a collision (duplicate ID).

**With the sequence number:**
The 12-bit sequence number can hold values from 0 to 4,095 (2^12 - 1). Here's the process:

1. **First ID in a millisecond**: Sequence starts at 0
   - Timestamp: 1641234567890
   - Machine: 42  
   - Sequence: 0
   - Result: Unique ID #1

2. **Second ID in the same millisecond**: Sequence increments to 1
   - Timestamp: 1641234567890 (same!)
   - Machine: 42 (same!)
   - Sequence: 1 (different!)
   - Result: Unique ID #2 (different from #1)

3. **Third ID in same millisecond**: Sequence increments to 2
   - And so on...

4. **Next millisecond arrives**: Sequence resets to 0
   - Timestamp: 1641234567891 (new!)
   - Machine: 42
   - Sequence: 0 (reset)
   - Result: Another unique ID

Even though the timestamp and machine ID are identical, the different sequence numbers make each complete ID unique. This allows up to 4,096 unique IDs per millisecond per machine. Typically if you hit the maximum of 4096 IDs in one millisecond, then the generator waits till the next millisecond before continuing.

## Benefits and Takeaway
They're sortable by time, and you should be able to derive the time one was created at given a snowflake id. They're unique, you can generate multiple per millisecond per machine. You don't have a central authority or need any database coordination. Also it's really compact, as its in a 64-bit integer. Many companies now use variations of Twitter's original Snowflake design, includingDiscord, Instagram, and others. The concept has become a standard pattern for distributed ID generation in modern scalable systems.

## Credits
- [Snowflake IDs - Wikipedia](https://en.wikipedia.org/wiki/Snowflake_ID)