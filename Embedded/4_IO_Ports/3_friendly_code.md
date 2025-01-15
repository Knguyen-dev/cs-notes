## Friendly Code 

### What is it?
Basically the code only does what we need it to do, without affecting other parts of the hardware. If your goal is to only mess with port F, then your code shouldn't mess with any other port. The danger of unfriendly code is when we start integrating it with our greater program, and know with code that interacts with multiple modules, our errors can come from anywhere now. 

Your notes are solid and demonstrate a good understanding of the concepts, but they could be improved for clarity and structure. Here's a revised and organized explanation of the two main approaches to bit manipulation for accessing specific bits of a port:

---

## **Manipulating Specific Bits in a Port**

### **1. Read-Modify-Write (RMW) Software Approach**
This is a common method of controlling individual bits in a port by applying **bitwise operations** on the entire register. It typically involves these steps:

1. **Read the register**: Load the current value of the port's register.
2. **Modify the bits**: Use bitwise operations (`|`, `&`, `~`) to change specific bits while preserving others.
3. **Write back to the register**: Save the modified value back into the register.

#### **Example: Setting PA7 as Output**
```c
// Activate the clock for Port A
SYSCTL_RCGC2_R |= 0x00000001;
delay = SYSCTL_RCGC2_R; // Allow time for clock stabilization

// Disable analog functionality for PA7
GPIO_PORTA_AMSEL_R &= ~0x80; // Clear bit 7

// Configure PA7 as GPIO
GPIO_PORTA_PCTL_R &= ~0xF0000000; // Clear bits 31:28 (no alternate function)

// Set PA7 as output
GPIO_PORTA_DIR_R |= 0x80; // Set bit 7

// Disable alternate functions on PA7
GPIO_PORTA_AFSEL_R &= ~0x80; // Clear bit 7

// Enable digital functionality on PA7
GPIO_PORTA_DEN_R |= 0x80; // Set bit 7
```

#### **Key Notes:**
- **Masking**: 
  - `~0x80` ensures only bit 7 is cleared (analog disabled, alternate functions disabled).
  - `|= 0x80` ensures only bit 7 is set (output direction, digital functionality enabled).
- **Bit position**: `0x80` corresponds to bit 7 (`1000 0000` in binary).

### **2. Bit-Specific Addressing**
This mechanism maps **individual bits** to unique memory addresses, allowing direct manipulation without needing to modify other bits in the register. It is often used for efficiency or simplicity when accessing specific bits.

#### **How it Works**
- Each **bit** in a register is assigned an **offset** from the base address.
- You can calculate these offsets using the formula:  
  **Offset = 4 × (2^bit_position)**  
  For example:
  - Bit 0: `0x0004`
  - Bit 1: `0x0008`
  - Bit 7: `0x0200`

#### **Example: Controlling PA7 Using Bit-Specific Addressing**
```c

// Get the memory address of the register that contains the bit for pin 7
// NOTE: The data register for GPIO Port A holds 8 bits for pins PA0-PA7. Then you 
// have PA7. You should know that even though it's a memory address for a single bit,
// when writing, you're not directly writing to a single bit, but instead the entire register. This is why bit masks are used.
#define PA7 (*((volatile unsigned long *)0x40004200))

// Set PA7 to HIGH
PA7 = 0x80; // Output 1 (0x80 corresponds to setting bit 7)

// Set PA7 to LOW
PA7 = 0x00; // Output 0
```

#### **Key Notes:**
- **Direct bit manipulation**: You directly access the memory address for the desired bit, eliminating the need for masking or shifting.
- **Efficiency**: This approach avoids read-modify-write cycles.

---

### **Comparison**
| Feature                        | Read-Modify-Write            | Bit-Specific Addressing       |
|--------------------------------|------------------------------|--------------------------------|
| **Operation**                  | Modifies bits using masks    | Direct access to bit addresses |
| **Complexity**                 | Requires masking and shifts  | Straightforward, less overhead |
| **Use case**                   | General-purpose manipulation | Fast and efficient bit control |
| **Intrusiveness**              | Higher (read-modify-write)   | Lower (direct addressing)      |
| **Flexibility**                | Can modify multiple bits     | Single-bit operations only     |



## Volatile Unsigned Long Explained

### **Why Use `volatile unsigned long`?**
1. **`volatile` Keyword**  
   - **Purpose**: Prevents the compiler from optimizing access to the memory address.  
     - For example, the compiler might think that a value stored in memory doesn’t change because the program doesn’t explicitly modify it. However, for hardware registers (like GPIO ports), the value can be changed externally (e.g., by hardware events or peripherals).  
   - **Result**: Every access to `PF2` directly reads or writes to the memory-mapped register, ensuring correct behavior for real-time hardware interactions.

2. **`unsigned long` Type**  
   - **Reason**: ARM Cortex-M microcontrollers are designed to handle registers as **32-bit wide memory locations**.  
     - Registers may represent 8-bit or 16-bit values, but the hardware addresses these as 32 bits. This ensures compatibility with the processor’s architecture.  
   - **Typecasting**: By using `unsigned long` (which is 32 bits), you ensure that the program interprets the memory correctly, avoiding issues with partial reads/writes.

3. **Memory Alignment**  
   - ARM Cortex-M uses **word-aligned memory** for registers, meaning each register starts at an address divisible by 4 (since 32 bits = 4 bytes). Using `unsigned long` respects this alignment.

---

### **Why Typecasting is Important**
Typecasting is used to ensure:
- The compiler knows how to interpret the raw memory address (i.e., treat it as a `volatile unsigned long*`).
- The code explicitly states the data width and prevents ambiguous behavior when accessing memory.

Without typecasting:
- The compiler might misinterpret the size or access pattern, leading to undefined behavior (e.g., overwriting unintended bits).

---

### **How This Relates to Cortex-M**
On ARM Cortex-M:
- Registers like GPIO are memory-mapped, meaning they are treated as specific locations in RAM or ROM.
- These memory addresses can be read or written using pointers, but they must align with the expected architecture (32-bit access for Cortex-M).

So we could get 8, 16, or 32 bit data. By default, the hardware might work with smaller chunks (e.g., 8-bit registers for pins), but we align everything to 32-bit to match the processor's architecture and ensure consistency.


## Depth of debugging

### Intrusiveness and Heartbeat
**Intrusiveness** is the degree to which debugging the code itself is altering the performance of the system being tested. A 'monitor' is an independent output process that's similar, but faster thana print statement since it's less intrusive. So let's say an LED is attached to Port F bit 2. Well a function `HeartBeat()` to toggle the signal being outputted at that pin. A little bonus, but we'll make the same function, but as a macro, since this is simple operation and the operation won't have as much overhead now. 

```C
#define PF2 (*((volatile unsigned long *)0x40025010))
void HeartBeat(void) {
  PF2 ^= 0x04; // toggle signal being at pin.
}
```
So here we used bit-specific addressing, base address + offset, to get the memory address for the register for a specific pin. This is pin 2, so you know you're going to use a bit mask that affects the second bit (zero index) in a binary number. So `0x04` = `0000 0100`, which sets the 2nd bit. As a result we're only toggling bit 2 of Port F. 

### Logic Analyzer
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fg06_08_logicAnalyzer.jpg)
A tool to debug hardware and software issues. It's a multiple channel digital scorage scope. It allows us ot see digital signals at various points in time and make decisions based on those observations. So you get to see whether something is high or low signal, but what's the catch?

The catch is that you have to be strategic about it. Simply being able to see volumes of logical output isn't going to help you know where the issue is. You need to think about what places you're looking at, which parts of important and which parts aren't. 


### Oscilloscope 
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Lab14_12scopeProfile.png)

Used to capture voltage vs time data. So again, whilst the logic analyzer only cares about whether it's a digital HIGH or LOW, an oscilloscope 