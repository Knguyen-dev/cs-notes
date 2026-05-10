# Tuning C++ For Performance
- Electricity is a resource, from small phones to a large data center.
- Measure first and tune what matters. So target large abnormal bottlenecks first.

## Macro Benchmarking Servers
- Isolate generation of load .
- Measure throughput (rps) and latency.
- Measure "Long tail latency". Tail latency is the worst case latency.
- Measure production (monitoring) the same way you benchmark

## Installing Google Benchmark
```bash
# 1. Check out the library.
# 2. Go to the library root directory
# 3. Make a build directory to place the build output.
# 4. Generate build system files with cmake, and download any dependencies.
# 5. Build the library.
# 6. Install globally
git clone https://github.com/google/benchmark.git
cd benchmark
cmake -E make_directory "build"
cmake -DBENCHMARK_DOWNLOAD_DEPENDENCIES=on -DCMAKE_BUILD_TYPE=Release -S . -B "build"
cmake --build "build" --config Release
sudo cmake --build "build" --config Release --target install
```


## Micro Benchmarking: Google Benchmark

### Example 1: How Benchmark Works
```cpp
#include <benchmark/benchmark.h>
// Define a benchmark function
static void BM_StringCreation(benchmark::State& state ) {
  for (auto _ : state) {
    std::string empty_string;
  } 
}

// Register the function to be run by the library.
BENCHMARK(BM_StringCreation);

// Define another benchmark function
static void BM_StringCopy(benchmark::State& state) {
  std::string x{"Hello"};
  for (auto _ : state) {
    std::string copy(x);
  }
}
BENCHMARK(BM_StringCopy);
BENCHMARK_MAIN();
```
Using this loop, the library automatically sets how many iterations are nededed
to get statistically significant measurements. It might run our code 10,000 or a million times depending 
on how fast the code is. Here's how it works: 
1. **Define:** Create a `static void` function that takes a `benchmark::State&`.
2. **Loop:** Wrap the critical part that we're testing in a `for (auto _ :state)` loop. Google Benchmark will run the logic inside this loop for many iterations (it'll decide automatically) to get statistically significant results (and to avoid noise).
3. **Register:** Use the `BENCHMARK()` macro to register your benchmark to actually be ran/benchmarked.
4. **Compile:** Link against `-lbenchmark -lpthread` and others.
5. **Analyze:** Run the binary to see time (CPU time) vs. wall time.
  - **Wall Clock Time:** Think of it as a literal stopwatch held by a person standing next to our computer. It's the total elapsed time from the start of the benchmark to the end. It includes everything, the time your process spent waiting for disk, a network packet, and when ti was preempted (paused) by the OS because some other process (e.g., Chrome) needed the CPU.
  - **CPU Time:** The sotpwatch that only ticks hwen the CPU is actually executing our code's instructions. It's the amount of itme the processor was actively working on our specific thread. This time excludes any time our process was sleeping or waiting (I/O Blocked).

If CPU and wallclock are about the same, then your code is CPU bound. If the wallclock time is higer, than your ocde is I/O bound or blocked. Your thread is sitting around and waiting for data. Finally, if your CPU time is greater than your wallclock time, then you're using multiple CPU cores. For example, if you ahve 4 threads working at 100% for 1 second, your wallclock time is 1 second, but your CPU time is 4 seconds. 

### Example 2: Good and Bad Benchmark
```cpp



```

The idea seems to be isolating each line in your code. But after you've isolated your code and measured it, now you have to understand it. Why are your operations showing the times that they show? The best way to do this is to use a profiler that tells us about a program once it executes. One of the best profilers in the world is `perf`. To use this, just do `perf stat <path-to-binary>`. Profilers like `perf` interact with your processor, OS, and your code to count events for metrics. It'll output statistics. For example `task-clock` is similar to CPU time, which measures the amount of time your program spent on a CPU core.
```bash
perf record <path-to-binary>
perf report
```
To actually see what our code is doing in detail, run the above commands. From the hardware, it shows what functions are executing and how long they were executing. But this lacks context, we want a call graph to see which functions are calling which.
```bash
perf record -g <binary-path>
perf report -g
```
This `-g` uses a signal to interrupt our program, and then looks at hte currenet state of the stack. Then it tries to figure out the callstack. However it doesn't have anyway to do that becasue we've optimized our way out of it. 

Use this very important flag: `-fno-omit-frame-pointer`. This tells the compiler to stop
deleting the frame pointer, which is a register that gives the address of the bottom of a 
given stack frame. This has some overhead, has it pins and takes over a single register, which is why teh compiler optimizes it away. But when doing performance analysis, having this frame pointer is always worth it because now `perf` is now able to create call graphs.
- **Self:** How many cycles (as a percentage) were spent inside this exact function, not including any time spent inside functions called within the function.
- **Children:** How many cycles were spent executing the children of this function, so the functions called within the function.

So the perf graph when you run report is actually showing you a list of callees. Then you expand each row, you get the list of callers that called that callee. 

The magical sauce is 'graph,0.5,caller'.
- "graph": Shows absolute percentages
- "0.5": Filters out noisy functions.
- "caller": Inverts the graph for us. So the list is the list of callers, and if we expand a row, we're displayed the callees for that caller. 

We should realize that `perf` is not 100% precise, and to expect artifacts. Alright we hit the 'a' key which annotates the function, allowing us to look at the ASM.

## Defeating an Optimizer
```cpp
static void escape(void *p) {
  asm volatile("" : : "g"(p) : "memory");
}

static void clobber() {
  asm volatile("" : : : "memory");
}
```
Why is `push_back()` 10 times faster when we reserve first? Well because we wrote code that doesn't do anything, so the optimizer looks at it and deletes that code. This indicates that we're about to write ASM code that in itself has some crazy observable side effect. In this case, it's the benchmark.

If an operation is really fast, it'll take more iterations and more time to get something statistically significant, which is why you may see some of your benchmarks taking a little more time than you think.


### Example 2: Fast Modulo
We're generating random numbers as input. If the number is higher than a certain threshold, we have to do an expensive modulo operation on it, otherwise, we just use the input. 

When 80% of the numbers need the modulo 39 ns, but when 30% only need it we only need 16ns. I guess that makes sense because you're doing less modulo operations. Now let's actually profile with `perf record -g <path>`. 

But wait in the ASM the odd thing is that only 80% of the numbers needed the modulo. Even thoguh, modulo is super fast, and the slow thing is actually the store operation into memory. TLDR: Actual sample for a slow operation is after the operation completes. You would find this out if you looked at the outputted ASM.

## Instruction Cache
Everytime you skip over an instruction you migth be skipping over a cacheline. In some cases, there are times when we know (apriori) that most queries and requests are going to branch one way rather than the other.


## Credits
- [CPPCon](https://www.youtube.com/watch?v=nXaxk27zwlk)
- [Google Benchmark GitHub](https://github.com/google/benchmark)