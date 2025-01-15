## Sequential Logic Theory

### What is sequential logic?
In combinational logic, the output is only affected by the present inputs. However in sequential logic, the current output is also affected by the values of the previous outputs.

### SR (Set-Reset) Latch
![](https://sub.allaboutcircuits.com/images/04173.png)

If you want `Q=1`, then do `S=1`. To reset things (`Q=0`), do `R=1`. But if `R=S=1`, then that results in neither being powered. This last case is considered an invalid state since it's really just supposed to be one or the other. But the main idea is that if you let `S=R=0` whilst the latch currently has a state, then it 'remember' or just continue having that state.

if there's no prior state (e.g., at power-up), the latch my settle unpredictably, depending on physical factors like signal noise, and circuit design. Anyways the latch will keep holding this state, until we remove the electricity.

#### SR-Latch Truth Truth Table Explained
| **S** | **R** | **Q (current)** | **Q (next)** | **$\bar{Q}$ (next)** |
|-------|-------|-----------------|--------------|---------------|
| 0     | 0     | Q (unchanged)   | Q            | Q'            |
| 0     | 1     | X               | 0            | 1             |
| 1     | 0     | X               | 1            | 0             |
| 1     | 1     | X               | Invalid      | Invalid       |

- **Q (current):** The current output of the latch. This is the value of `Q` before you apply the new inputs (S and R). 
- **Q (next):** The next output of the latch. This is the value of `Q` after processing inputs (S and R). Then $\bar{Q}$ is the negated output. Think of this as the future output of the latch. 
The output `Q (next)` doesn't only depend on S and R, but it also depends on the current value of Q. So to predict the next state, you sometimes need to consider the current input and state.

1. If `S=R=0`:
  - Once you get rid of both signals, the latch will simply continue storing what its most recent state was. 
  - `Q(next) = Q(current)`; 
2. If `S=1`, and `R=0`:
  - The latch is set, meaning that `Q(next)=1` regardless of `Q(current)`
3. If `S=0`, and `R=1`:
  - The latch is reset, meaning that `Q(next)=0` regardless of `Q(current)`
4. If `S=R=1`:
  - state is invalid since both set and reset are active simultaneously.

**NOTE:** A trick for analyzing the cases in the circuit is always start with the path of 0. If you're at an AND gate and one of the inputs is 0, you know you can just evaluate the AND gate to be zero. While if you're on the path of 1, and you're at an AND gate, you're not going to know the other value, so you can't be sure if it's zero or 1, it totally depends on that other value.

#### Takeaway
SR latches form the foundation for more complex memory elements like flip-flops, which are used in registers, counters, and memory storage. One last thing is that an SR latch is called 'level sensitive' because it'll change state regardless of the duration of an input pulse. Turn on S for a millisecond or 2 seconds, it'll still make $Q=1$. It's the 'level' (high or low, S or R) that matters. 


---

### Gated SR Latch
The Gated SR latch builds upon the SR latch by introducing additional circuitry, most notably a control input, often called an enable (`E`). You'll see later that we'll call it an 'SR flip flop' if it has a clock pulse for its enabler.. The core idea is that the latch will only change state when the control signal is active, ensuring better control over when the latch responds to its inputs.

#### Gated SR (2 Nor and 2 AND gates)
![](https://www.allaboutcircuits.com/uploads/articles/gated-sr-latch-truth-table.jpg)

In this case, we're using AND gates left side. As a result, the inputs from S and R will only work when the clock pulse `E=1`. Otherwise their inputs won't be registered since `S=R=1`, which doesn't do anything.

#### Gated SR (4 NAND gates)
![](https://media.geeksforgeeks.org/wp-content/uploads/20240513153126/Untitled-Diagram---2024-05-13T153118202.webp)

The SR latch in this flip flop is 'level sensitive active low'. This means it requires a low pulse (zeros) required to set or reset it. 

By connecting the 2 NAND gates (steering gates) to it, we make it so that only high pulses (ones) are able to set or reset the latch. So we're now an 'active high latch'. 

**NOTE:** It says clock pulse here, just ignore it and pretend it says 'E' the voltage source. I'll explain this when talking about level vs edge sensitivity. 

#### Voltage graphs
The values for R, S, E, and Q can be visualized with 4 graphs of voltage (a timing diagram). At any given moment, the voltage could be zero (binary value 0) or 5 volts (binary value 1). These changes in the voltage can happen in nanoseconds, so approximate it to be instantaneous, which gives us a classic square wave.

Let's for this exercise let's assume that the clock pulse is always on, because we already know that if it's off there's no effect on Q. If S is high (1), then Q is high. If S goes to low, Q remains high (no effect, saves its most recent state). If R goes high, then Q is low (it was reset). Of course if S goes high again, then Q goes high as it was set. If R is high, Q is low. R going low has no effect (latch saving itself). If R goes high and low again, nothing happens as Q was already low.

#### D (Data) latch 
The issue with the gated SR latch is that both R and S could be 1 (invalid state). Then when you set this to zero, there's a race condition to see whether Q is on or off. To prevent this you'd make it so R is the inversion of S. As a result both inputs are the opposite of each other, preventing issue from before, and since it's essentially a boolean, you'd replace it with D. This is a d latch, which is built on the gated SR latch.

### Clock, Enable, and sensitivity
You probably saw in the diagrams either 'E' or 'clock pulse'. These represent different setups. We should probably clear up that latch and flip flop basically have an identical design, except for when handling the enabler.

#### Clock vs Enable:
- Enable: Voltage source doesn't follow a periodic pattern where we can describe the voltage graph with a frequency. This lets the circuit be `level-sensitive`.
- Clock Pulse: Voltage source follows a pattern. So here the voltage graph would go from low to high at some frequency. You'd see this with the classic square wave. However with a clock, you have the flexibility of making your circuit either `level` or `edge` sensitive.

#### Level vs Edge sensitivity
- **Level sensitive (Latches):** The latch operates as long as `E` or whatever your enabler is, is held high (or low depending on the design). In any case, it only operates when the enabler's voltage is in a set state/level. This is used in circuits where timing isn't critical.
- **Edge Sensitive (Flip flops):** The latch only responds to inputs when the enable voltage is transitioning. So inputs only apply when on the rising edge (low-to-high transition) or falling edge (high to low transition). It doesn't respond when voltage is already on high or already at low. This is used in flip-flops, which are just latches with clocks on them. and in systems where operations need to happen in sync with clock cycles. You should know **Positive edge triggered** means the flip-flop responds when on the rising edge. If **negative edge triggered**, it only responds on the falling edge. 

**Examples:**
1. +ve level triggered d flip-flop: Only responds to d when enable is high.
2. -ve Level Triggered D Flip Flop: Only responds to d when enable is low.
3. +ve Edge Triggered D Flip Flop: Only responds to d when transitioning from low to high.
4. -ve Edge Triggered D Flip Flop: Only responds to d when transitioning from high to low.

#### Synchronous and asynchronous
- Synchronous: Changes happen at specific times (triggered by clock edge). E.g. flip-flops are synchronous since they rely on a clock pulse to trigger changes.
- Asynchronous: Changes happen immediately in response to inputs, regardless of a clock. E.g. latches are async since they respond immediately and don't care about being in sync with a clock. Of course be careful of race conditions and we'd only design this when we know it's an asynchronous task.

## Application of Sequential Logic

### 8-bit register/latch
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C4_DigitalLogic_files/image014.gif)
Made up of 8 1-bit D flip-flops. So it ranges from $D_{0},...,D_{7}$, and outputs $Q_{0},...,Q_{7}$. However they'll all have logically equivalent enable/control inputs. If we only had 4 d-flip-flops, then it'd just be called a 4-bit latch. 

Let's say we had an 8-bit register. We'll call these our "Sequential Logic" (SL) block. Then we have a 16-bit combinational logic block, so that's a block with a 16-bit binary number associated with it. The hex is '1257' so it's better to remember that. The combinational block correlates with the control on the S.L. block, and then we're feeding `00010101` into the SL block. We're going to input `1257` into that C.L. block, which outputs a 1, and therefore makes the control on S.L. a 1. **NOTICE:** The control on the latch is now 1, that means it can process inputs and we can essentially save a binary value to it! While control `c=1` on the latch, input `00010101` (15) input the S.L. block. This saves those 8-bits into the latch as $Q_{0},...,Q_{7}$. Congratulations, we've updated the value at a memory address. In code, we've done this:
```C
char* x;

// Access a very specific memory address by its name
x = 0x1257; 

// Update the value at that address.
*x = 0x15;
```
In the future, you're going to have a microprocessor and you're going to write software that sends the address (name of the block), and then the data (binary value) for you.

Don't forgot that everything is 0 or 5 volts.

### Shift register

#### What is a shift register?
These components produce a discrete delay of a digital signal/waveform. This 'waveform' can be synchronized with a clock, so you can say something nis delayed `n` (discrete, integer) clock cycles, where `n` is the number of shift register stages in that particular register. For example if you have a four-stage shift register, it'll delay the incoming data (data-in) by four clock cycles, and after the data will reach 'data out', which could just be another component.
```C
char* x;

// Loading 
x = 0x12;

// Shifting 
y = x >> 2;
```


#### Types of shift registers
- Serial-in/serial-out: Data enters and exits one bit at a time. 
- Parallel-in/serial-out: Multiple bits are loaded into the register simultaneously, but exit one at a time.
- Serial-in/parallel-out: Data enters serially but can be accessed from all stages.
- Parallel-in/Parallel-out: 
- Ring counterOutput of the last stage is fed back into the first stage creating a circular shift

---
### Serial-in, Serial Out shift register
![](https://www.allaboutcircuits.com/uploads/articles/serial-in-serial-out-shift-register-with-4-stages.jpg)

The shift register has four stages, so the input data will be delayed by four clock periods from the input to the output of the shift register:
  1. Data, one single bit, enters stage A after one clock pulse.
  2. At the second clock pulse, the data from stage A is transferred to stage B. Then the another bit enters stage A.  
  3. At third clock, the bit from stage B enters stage C. Then the bit from A enters B. Then of course stage A is empty, so another bit enters stage A.
  4. At the fourth clock pulse, the bit originally at stage A, is now at stage D. And of course the bits from other stages move forward. Stage D is the output, so once the data reaches here, it's considered outputted. There's not some additional pulse to output it from D. You'll learn after that data isn't ejected separately, but rather it waits in the last stage (D) and is available at an 'output pin'. So when a bit is at stage D, the data becomes accessible and able to be read by a device.

If all four stages are filled, the stages act as a temporary storage mechanism until something reads the data from the output stage. Though if new data is inputted in, then the data at stage D is overwritten by the data at stage C, and so on. So you will lose data if you're not reading it.

#### Use case: 
If input data is already in serial form, and you only need to read it serially, then this is what you'd use.

---
### Parallel-in, Serial out:
![](https://www.allaboutcircuits.com/uploads/articles/parallel-in-serial-out-shift-register-with-4-stages.jpg)

#### **How it works**
1. **Loading the Data (Parallel-In):**
   - Data is loaded **simultaneously** into all stages (e.g., A, B, C, D).
   - This is typically done by asserting a **load signal**, which enables the parallel input.

2. **Shifting the Data Out (Serial-Out):**
   - Once the parallel data is loaded, the register begins to **shift the data** stage by stage with each clock pulse.

---
#### Step-by-Step Example
Assume the data loaded into the 4 stages is:  
Stage A: `1`, Stage B: `0`, Stage C: `1`, Stage D: `1`.

- **Before any clock pulse:**  
  Data is already present in the stages (A = `1`, B = `0`, C = `1`, D = `1`).
##### **Clock 1:**
- Data in Stage C moves to Stage D (output).  
  Data in Stage B moves to Stage C.  
  Data in Stage A moves to Stage B.  
  Stage A receives no new data unless a new parallel load is triggered.

**Output at D:** `1` (Stage C’s value).

##### **Clock 2:**
- Data in Stage B moves to Stage D (output).  
  Data in Stage A moves to Stage C.  
  Stage A remains unchanged unless a new load occurs.

**Output at D:** `0` (Stage B’s value).

##### **Clock 3:**
- Data in Stage A moves to Stage D (output).  
  Stages B and C are now empty (or filled with default values depending on implementation).

**Output at D:** `1` (Stage A’s value).

##### **Clock 4:**
- Nothing new is shifted into Stage D unless another parallel load occurs.  
  Output at D is now empty (or whatever the last shifted value is).



#### Use case
There will be times when input data is already in parallel form, and you need to quickly serialize that block of parallel data. Then this type of shift register is the go-to.


---
### Serial-in, Parallel-out:
![](https://www.allaboutcircuits.com/uploads/articles/serial-in-parallel-out-shift-register-with-4-stages.jpeg)

#### **How It Works**
1. **Serial Input:**  
   - Bits are shifted in serially (one bit per clock pulse).  

2. **Parallel Outputs:**  
   - Each stage (A, B, C, D) outputs its current value on its respective output pin ($Q_{A}$, $Q_{B}$, $Q_{C}$, $Q_{D}$).  
   - After every clock pulse, the bits "move forward," and the outputs update accordingly.

#### Step by step:
1. After the first clock, the data at “data in” appears at $Q_{A}$.
2. After the second clock, the old $Q_{A}$ data appears at $Q_{B}$; $Q_{A}$ receives the next data from “data in”.
3. After the third clock, $Q_{B}$ data is at $Q_{C}$.
4. After the fourth clock, $Q_{C}$ data is at $Q_{D}$. This stage contains the data first present at “data in”. The shift register now contains four data bits.

#### **Why is this Useful?**
The SIPO shift register is useful for converting serial data into parallel data that external devices or circuits can use.

**NOTE:** In most cases you're going to wait until the full parallel output is available. This is due to having consistent data, as if you're reading the bits whilst they're shifting you may get inconsistent data. Some stages might hold new bits whilst other stages hold bits that you've already read.

### Parallel in, Parallel out
![](https://www.allaboutcircuits.com/uploads/articles/parallel-in-serial-out-shift-register-with-4-stages1.jpg)

In this four-stage register, multiple bits are staged. Probably read. Then are shifted for the next load if needed.


### Ring counter using a shift register 
![](https://www.allaboutcircuits.com/uploads/articles/ring-counter-shift-register-output-fedback-to-input.jpg)

A **ring counter** is a type of counter implemented using a shift register where the data is fed back to the input after reaching the last stage. Here's how it works and why it’s useful:

#### **Shift Register with Feedback:**
   - The output of the last stage is fed back into the first stage, forming a loop. Each clock pulse shifts the bits around, and eventually, the bit that started in the first stage will return there after passing through all the stages.
   - The key characteristic of the ring counter is that only **one bit** is set to '1' at any given time, while all others are '0'. This bit moves from one stage to the next, creating a cyclic pattern.

#### **Example of a 4-Stage Ring Counter:**
   - Assume we have a 4-stage shift register, initialized as:  
     `1000`
   - On each clock pulse, the '1' bit will move:
     - Clock Pulse 1: `0100`
     - Clock Pulse 2: `0010`
     - Clock Pulse 3: `0001`
     - Clock Pulse 4: `1000` (and then it repeats the cycle).
   
#### **Why Use a Shift Register as a Counter?**
Useful for timing or sequence operations. Maybe you want a series of actions to happen in a certain order or after `n` clock cycles. If that's the case then you'd probably want to use a ring counter and read the `1` bit at a specific time. This allows you to control events.