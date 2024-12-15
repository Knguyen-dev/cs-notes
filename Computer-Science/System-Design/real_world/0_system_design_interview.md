# System design interviews

## What is it?
They're going to ask you to create a distributed system for a specific situation. It's an open-ended conversation, and you're expected to lead it. Just use a 4 step plan:

### Step 1: Outline assumptions, use cases, and constraints
1. What does the system do? What are it's inputs and outputs?
2. Who's going to use it and how? How many users are there?
3. What's the volume of data are we handling per second? How many requests per second? 
4. The expected read-write ratio?

### Step 2: Create a high level design
Outline a hihg level design with all the important components. You're going to sketch this and justify your choices. Why are you using a load balancer? What kind of architecture are you using? Monolith? Microservices? What kind of database are you using? Those kinds of questions.

### Step 3: Explore individual components
Explain what the load balancer is for. What is the caching for? Where and why are we using Redis? You seem to be using SQL here, but then MongoDB over here, why is that? so you're going to be going deeper into it here.


### Step 4: Wrap up by identifying bottlenecks or blind-spots
Maybe you could do a better job at horizontal scaling over here, or database sharding over there. 


## "Back of the envelope calculations"

### Introduction
Design a system to generate a page of image search that will show 30 images. I mean in a perfect world you'd be able to try all of the possibilities and pick the best one, but that's a lot of time wasted. Instead we can just try to do estimations and math to work things out instead of building every possible thing.

To evaluate design alternatives, you need a good sense of how long typical operations take. Here's the list: 
- L1 cache reference 0.5 ns
- Branch mispredict 5 ns
- L2 cache reference 7 ns
- Mutex lock/unlock 100 ns
- Main memory reference 100 ns
- Compress 1K bytes with Zippy 10,000 ns
- Send 2K bytes over 1 Gbps network 20,000 ns
- Read 1 MB sequentially from memory 250,000 ns
- Round trip within same datacenter 500,000 ns
- Disk seek 10,000,000 ns
- Read 1 MB sequentially from network 10,000,000 ns
- Read 1 MB sequentially from disk 30,000,000 ns
- Send packet CA->Netherlands->CA 150,000,000 ns

**NOTE:**
Writes are 40 times more expensive than reads. Design for scaling writes. Also notice how getting a value from main memory (RAM) is fast whilst getting that data from disk (persistent memory) is slower.

### Example: Generate image results 

#### Design 1: Serial 
We'd read/load images serially, and do it by disk. We'd read a 256K image and go onto the next one.

So that's 30 seeks * 10 ms/seek + 30 * 256K / 30 MB/s = 560 ms.

#### Design 2: Parallel

It's going to read in parallel, so we're assuming all 30 happen at the same time. So this is 10 ms / seek + 256K read / 30 MB/s = 18ms. There's some variance from disk, so it's probably between 30 to 60ms.



# Credits:
1 [Back of the envelope calculations](https://highscalability.com/google-pro-tip-use-back-of-the-envelope-calculations-to-choo/)