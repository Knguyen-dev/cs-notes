# Array and Functional Debugging Theory


### Minimally Intrusive Debugging
**Intrusiveness** refers to how much your debugging affects your code. Ideally you want your debugging technique to be minimally debugging, so that you can debug whilst your system's performance is as real as possible.

Intrusive stuff is like print statements. Or even break points or single stepping, as real hardware continue sto change whilst the software is stopped. 

- **Dump:** Debugging technique where we strategically record selective info. We have a **filter** so that information is only recorded after some conditions are met. 
- **Monitor:** Debugging technique where we output the information we want on LEDs or just an LCD.
- **Black vs White box testing:** Black box testing is when we only look at inputs and outputs. White box is when we actually look at what's happening inside.

For Embedded systems, here are some debugging tips:
1. **Keep debugging code visible:** There should clearly be functions like `logInfo()` or `monitor()`, that are distinguishable from main application logic like `processSensorData()`.
2. **Use global runtime flag:** A global booleans that decides whether the program is running regular or with debugging tools activated is useful. Of course it comes with some overhead.
3. **Remove Debugging Code During Compilation:** Conditional compilation allows debugging code to be included or excluded based on compile-time settings.

### SysTick Timer
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/systick.jpg)

It's a 24 bit timer S.T. `CURRENT` counts down after every bus cycle. When it reaches 0, it is reset to reflect the value of `RELOAD`. It's found in all Cortex-M processors.

#### Control Register
- enable bit
- interrupt enable bit
- clock selection register
- flag: This bit is reset every time we reload.

#### Reload Register 
A 32 bit register, but 24 bits are used to represent the reload value.

#### Current Register
Has 32 bits, but only 24 bits (0 to 23) are used to represent the number or count.

#### Initializing the SysTick Timer
1. Clear enable bit to turn off SysTick when we're in the process of initializing it.
2. Set the `RELOAD` register.
3. Write any value to the `NVIC_ST_CURRENT_R` to clear the counter.
4. Write the desired mode to `NVIC_ST_CTRL_R`. To do this, set `CLK_SRC` so the counter returns with the system clock. Clear `INTEN` so no interrupts and set `ENABLE` to start the counter.

The counter decrements once every bus cycle. So if the  clock is 80 MHz, this is once every 12.5 ns. When `CURRENT` goes from 1 to 0, `COUNT` is set. Then on the next clock pulse, `CURRENT` is loaded with the value of `RELOAD`. Some connections we should make: 
1. The value of current rolls over every n+1 clock cycles.
2. The period of a clock is t, and let reload be n. Then the count flag is set every (n+1)t cycles.
3. Clearing the `CLK_SRC` bit would make SysTick run off hte precision of the internal oscillator. This has inaccurate timing which is why clock source is always set.
3. Writing a value to `NVIC_ST_CURRENT_R` will reset that counter to zero and clear the `COUNT` flag.


#### Example
The bus clock runs at 16mhz so every 62.5 nanoseconds, the counter will count down To setup the SysTick counter we go through some steps.

First turn off SysTick device to configure it. Set enable to 0. T
hen load some initial value. Then write some value to the current, as this will set it to zero. 

Now write 101, to enable the counter, disable interrupts, and choose clock to be the 16mhz clock.

### Arrays and strings for debugging
Use it to record data and it's surprisingly not very intrusive. We can use RAM to store data temporarily, and if we already know the values before compiling, just put it into ROM

I'm sure this is review but with arrays, we pay attention to two things:
1. **Precision:** Size of elements in bits or bytes.
2. **Length:** Number of elements.
Using this, we can understand how much space we're taking up. If it's a const array then it can't be modified and it'll be in ROM. But if not then it's in RAM and C initializes all RAM-based variables to zero, unless you specify otherwise.

Strings are just arrays of characters. These are always automatically null terminated in C, but in Assembly you'd do it manually. One thing is that you should always ensure a string if null terminated before working with it.

---
### Print Statements
Usually a printer or screen isn't available. Also they can significantly slow down real time systems, as the bandwidth we're sending is large. A function can be called 1000 times in 1 ms, but once add print statements, they take more than a millisecond, causing things to crash.


---
### Example 1: Dumping into Array with/without filtering 
```C
void Save(void){
  if(Cnt < SIZE){  // make sure there is room
    HappyBuf[Cnt] = happy; // record happy
    SadBuf[Cnt] = sad;     // record sad
    Cnt++;
  }
}

void SaveWithFilter(void){
  if(sad > 100){     // conditional debug; dump only if sad>100
    if(Cnt < SIZE){  // make sure there is room
      HappyBuf[Cnt] = happy; // dump strategic data
      SadBuf[Cnt] = sad;
      Cnt++;
    }
  }
}
```
Let happy and sad be just two 8 bit variables that we want to record at certain points. Then doing `save()` at certain points would help us out. You could even have some filters. In our second function, we only record sad when it reaches a certain threshold, and we even made our code safer with our array assignment.

With the SysTick timer we could log this data every 10 ms. You could reset the timer, run some code, and capture the elapsed time as well. You could also just record the current SysTick value and treat it like a timestamp.

