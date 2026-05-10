

With most non-performance probelms, you have a yes/no question. Either your code is working or not, so there's a clear end goal. You analyze the problem, implement a potential solution, and test to see if that solution actually works. For most performance problems, you don't get a yes/no as you don't know how fast you should really be able to go, and you never really finish optimizing. 


- **Metrics:** You need to come up with metrics. For example, the amount of simulations you can get done per day. The amount of images you can process per minute, etc. Coming up with meaningful definitions and metrics. If you're presenting this to someone, they're not going to care about bytes per second, or flops. Explain in business-level terms.
- **Sources of Error:** Random error is caused by natural error and systemic error are errors caused by some inaccuracy. Observational error is unavoidable and real performance analysis should use statistical testing (e.g., hypothesis testing) to see whether the samples you took are statistically significant (not just random luck  )


## Variance
Your code isn't going to do the same exact thing, have the same exact performance for each run. 
- Difference in CPU/memory and bus clock cycles. The CPU clock is different from memory bus clock speed. CPU has to wait for memory soemtimes.
- Shared Hardware Caches: Caches shared between multiple cores/thread are subject to variance due to concurrent use by other kernel or userspace processes.
- Additional OS activities can cause non-determinism. For example, some hardware interrupts require OS handling immediately after delivery.
- Observer effect: Measuring your code makes it a little slower (instrumentation effect)

## Statistics Best Practices
Imagine a graph that measures the speed up vs number of nodes we have in an HPC system. To improve this graph, also include intervals that show the uncertainty/standard deviation of the speedup from the average. You can reason that if two the range of variance overlap, then you probably can't say that the chnages in the number of cores actually makes a real difference. Essentially, don't only look at the average, look at the variance.

**Process:**
- Form a hypothesis: How do you expect performance to change?
- Come up with a test to determine if you're right. Please identify your indepenent/dependent/control variables when making chnages.
- Gather data 
- Statistically analyze datta.
- Draw conclusions.

**Gathering Data**
- When measuring small events, amortize. The entire loop run is one sample that we've measured. Then measure the variance betwen samples.
- Benchmark multiple times.
- Ensure the things you're measuring are running hot. To ensure the thing that you're measuring isn't messed up by the first few bad accesses or something.

Basically discard the first few executions of your test. 

**Estimating Variance**
- Uncertainty is the representation of the amount of error in a certain measurement. You can use this with calculating the standard deviation of an entire sample.

**Confidence Intervals**
Use confidence intervals, which gives you the uncertainty and sample size. An estimation of the plausible range of the population.

**Normality Test**
You data should typically have a normal distribution. You can then do a normality test e

## Time-based Benchmarking
In x86 based CPUs we have options:
- System Wide High Resolution Clock: 
  - Monotonic, frequency-stable, higher latency and overhead (slightly). 
  - Suitable for measuring microsecond and up level events; has a resolution in nanoseconds.
  - Times can be passed between threads
- Timestamp Counter (TSC)
  - Monotonic and lower latency and overhead.
  - Resolution in CPU cycles. Timing is not representative oef the # of executed clock cycles though.
  - Sutiable for measuring short events from cycles to minutaes.

## `<chrono>`
C++11 standard library for measuring date and time:
- **Duration:** A span of time, defined as some number of ticks of some time unit.
- **Time Point:** A duration of time that's passed since teh epoch of a specific clock.
- **Clocks:** An object with a starting point and a tick rate, which can be queried for the current time.
  - **system_clock:** Wall clock time from system-wide clock. Real world time clock and not monotonic as the user could change the time.
  - **steady_clock:** Montonic clock that can't be adjusted.
  - **high_resolution_clock:** Clock wtih the shortest tick period available.
  - Note: In practice this is the same clock on modern systems. 

The best way to measure durations that are in the microsecond magnitude or larger.

## Memory Benchmarking 
You can look at allocated/deallocated objects. If you're allocing tons and tons of object in parallel that could be bad. Or memory itself (total, per object size, per object type)

## Counting Copies/Moves 
They wanted to see how many times data in the codebase was copied.


## Hardware Performance Counters
x86 processors have performance counters. Very low overhead but very microarchitecture specific, some are estimations, and suffer from overcounting. 

Intel VTune Amplifier is a sampling-based profiling tool. It runs your application, collects snapshots of performance metrics while your program is running.  

## Writing Performance Tests

Staetful tests are what we do, ideally do a stateleess test though. For example, comparing lock vs lock free.

## Credits

- The best practices for benchmarking code in a way that's statistically sound. Quite involved, but this is probably the right way to do things.
- Very alien from what 


Doing this to get ready to test the 