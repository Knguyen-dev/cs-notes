## Branch Prediction

### Example 1: Packing Operations 
```cpp
unsigned long v1[N], v2[N]
unsigned long a = 0;
for (size_t i = 0; i < N; i++) {
  a += v1[i] * v2[i];
}
```
This is quite inefficient. You're loading in two things from memory into registers. We're doing one multiplication operation per iteration. If you pack in two or three operations in one iteration, you're going to get the same time. Depending on what CPU you have, you can benchmark and see how many operations you can stuff into one loop iteration.

However you can almost never do this because:
- Data dependencies: To do the next operation you need the results of the previous operation. 
- Control Dependencies: Conditions or branches.

### Data Dependencies
They helped solve or minimize these by using CPU pipelining. After completing an instruction, we have the writeback stage write the data into the execution stage. However even in our base loop, we're still checking a conditional `i < N` on each iteration. CPU designers thought it's kind of a waste to check the conditional every time for something that's only wrong once, which is one of the usecases for branch prediction!

The processor, not the compiler, makes a guess on which instructions to load. As a result, it can put these instructions in its pipeline. As long as you've predicted the future correctly, the pipeline stays efficient. If you're wrong, the pipeline needs to flush (clear) all those erroneously loaded instructions and then fetch the correct instructions. This takes a relatively long time.

Anything that we've done speculatively has to be discarded:
- Any errors that happened during speculative execution are held until branch is evaluated. Errors that don't actually happen must not be reported.
- Memory writes must be held until branch evaluation, write buffers are used for this purpose.

The process of recovering from bad guesses is kind of expensive!

### How is prediction done?
Basically if the conditional is very easy to guess, like there's a pattern in whether the conditional evaluates to true or false, then it'll predict well. It bases its predictions based on the past. Let's look at some simple rules.
- If the conditional evaluated to true last time, then guess true this time. If the conditional evaluated to false last time, guess false again.
- There's also a smarter way to do like by keeping counters (very unlikely, unlikely, likely, very likely) on whether it evaluates to true.

Again these rules must be able to run within 1 cycle, so they have to be good enough and very efficient! So tldr, if your conditionals evaluate in a very predictable way, then you're going to have good branch predictions.

### Using `perf` and Google benchmark
You can use `perf stat` to tell you various stats about the program. For us, it tells us the number of branch misses, but you can generate the annotated ASM to see where these branch msises happen. Typically, 10% is really bad. Mispredictions are expensive and misguided optimizations are also really expensive. Always benchmark. 

### likley and unlikely
Most compilers have builtin keywords that let programmers guide the CPU predictor to certain conditons. The issue with these is because programmers are also kind of bad at predicting the future. Again to know you're right you must always benchmark. It's a very high chance that you can get it wrong and cause more branch misses.

## What is a Branch?
```cpp
if (x || y) {
  do_it();
} else {
  dont_do_it();
}
```
To the processor, there are two conditions "if x is true" and "if y is true". Boolean expression evaluation is short circuited, meaning evaluation isstopped when the final result is known. If x == true, we don't even look at y, which is something we already know. The processor has to evaluate x, it will try to predict it. It will have to predict whether it needs to evaluate y or not. Then y to predict y as well. At worst 2 branch mis-predictions if x is false. 

### Optimizing a False Branch away
Replace short circuit logic evaluations with something that doesn't have short circuits, boolean arithmetic. Some compilers often do this, so you'll have to check your Assembly or optimized output to see whehter you need to manually do this yourselfs. Again this is the idea of compressing those 2 x y conditions into some conditional containing a final booelan value. Optimizing branches almost always results in doing more work. But that may mean we're using free CPU computation units that would have been idle anyways. Again you'll need to benchmamrk and actually see whether you're getting speedups.

## Branchless Computing
We've seen going from two branches to one which is great. But what's even better is having no branches somehow.
- Use boolean integers as indices into an array.

```cpp

// Branchy version: CPU guesses and potentially flushes pipeline
sum += cond ? expr1 : expr2;

// Branchless version: CPU always does the same work. 
// We pre-calculate both or store them, hten "pick" one via memory offset
const int options[2] = {expr2, expr1};
sum += options[static_cast<int>(cond)];


```
- Improves performance if: extra computations are small or branch is poorly predicted.


## Profiling?
Use `perf stat` and perf as it literally shows you.

## Credits
- [](https://youtu.be/g-WPhYREFjk?si=6lJ-QhOaOxNrFc4X)