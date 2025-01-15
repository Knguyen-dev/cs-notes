
## ALU

### How it works
- **Arithmetic Unit:** Does any mathematical operation. So it'll take in two bits, and it's going to output the result. If you want to add higher number of bits, then you just scale up.
- **Logical:** Handles doing logical operations like AND, OR, or NOT. It also takes care of basic numeric operations, such as checking if a number is negative, or zero.

### 8 Bit ALU Example
- **Inputs A and B:** It takes two 8 bit numbers to do the mathematical operation on.
- **Operation Code (OP Code):** 4 bits representing the mathematical operation we're doing to do on the two numbers. For example, `1000` may indicate we're going to do addition, `1100` could be for subtraction, etc.
- **Output:** We're going to output 8 bits to represent the result of the operation.
- Zero flag: Bit indicating if the result is 0.
- Overflow flag: Bit indicating if we had an overflow, meaning we couldn't represent the result within 8 bits.
- Negative flag: Indicates whether the result is a negative number. This could be useful if you wanted to know whether A or B was bigger.
Fancier ALUs will have a lot more flags, but these three flags are universal and frequently used. 


## Memory

### Basics: Latches, Registers
We've talked about RAM and ROM before, but let's see if we can clean more
- SR-Latch: Takes a set and reset bit to set data to 1 or 0. Then it stores one bit.
- Gated latch: Takes a data bit, and a enable/write bit. It simplifies things as now you only need one bit for setting data. You set the enable bit when you want to modify the bit being stored/output.
- Register: If you want to store 8 bits, just use 8 latches. A group of latches is a register, so to store 8 bits, you'd have something called an '8 bit register' as a component. The width of a register is teh amount of bits it can store. Over the years, we've gone from 8, 16, and now 64 bit registers.

To write to our register, first set the enable bit to 1. This allows for writing, and now just send the 8 bits you just want to store via the bus. Then you can reset the enable bit, which means your operations won't affect the value stored in the register. Congratulations, you've stored a byte in a register.

### Memory Matrix
A 64-bit register would need 64 latches. Essentially that's 129 wires, and there's a better solution. To have a 256 bit register (32 bytes), set up a 16 by 16 grid, where each cell will contain a gated latch. For a given latch we will have:
  - Data bit
  - Write bit
  - Read bit
To activate a latch, turn on its row and column wire. While a latch is activated all others are deactivated. Since only one latch is ever active at a time, you can use a trick and make all latches share their data, write, and read buses. Now we'll use a memory address to identify the location of a latch in the matrix. Since it's a 16 row matrix, we can use a 4 bit number to represent 0-16 (row address). Do the same with the columns (column address). Together these are 8 bits and make up an 8bit memory address. So if you wanted to access latch on row 4, column 7, the memory address would be `0100 0111`.

- **Multiplexer:** Converts a memory address to get the row and column of the latch we want to access. Technically you'd need separate multiplexers for handling the row and column.

Let's review each 256 bit register has this:
  1. 8-bit address bus, which is used to indicate the specific latch we're accessing.
  2. Data bit 
  3. read and write bits

### Scaling and abstracting
Let's have 8 256-bit registers, and each register stores a single bit. Then let's have these components:
  1. 8-bit data bus
  2. 8-bit address bus
  3. read and write bits
Analyzing this, we can store 256 bytes at 256 different memory addresses. To store a number you'd feed the exact same address to all 8 registers, then write a single bit from the byte to each register. 




## CPU

### CPU Example Setup
The **CPU** executes programs made up of instructions. It uses:
- The **ALU** for mathematical operations.
- **RAM** for reading/writing values.

Programs are stored in **RAM**, and the CPU fetches instructions and data as needed.
- **RAM**: 16 addresses (each 8 bits).
- **Registers**: 4 (each 8 bits) for temporary data storage.
- **Instruction Format**: 
  - First 4 bits: **Operation Code (Opcode)**.
  - Last 4 bits: **RAM Address**.

#### Opcodes:
1. `Load_A`: Load RAM value into register A.
2. `Load_B`: Load RAM value into register B.
3. `Store_A`: Store register A value into RAM.
4. `Add`: Add two registers and store the result in register A.

#### Key CPU Components:
- **Instruction Address Register (IAR)**: Tracks the memory address of the current instruction.
- **Instruction Register (IR)**: Stores the current instruction.
- **Control Unit**: Decodes instructions and manages execution.
- **Clock**: Drives the CPU's fetch-decode-execute cycle.
- **ALU**: Executes arithmetic operations.

---
#### Instruction Cycle Walkthrough:
1. **Fetch**:
   - IAR points to address `0000` in RAM.
   - Instruction `0010 1110` is fetched into IR.

2. **Decode**:
   - Opcode `0010`: `Load_A` (load data into register A).
   - Address `1110` (decimal 14): Fetch RAM data from address 14.

3. **Execute**:
   - RAM at address 14 contains `0000 0011`.
   - Load `3` into register A.

4. **Next Instruction**:
   - Increment IAR to `0001`.
   - Fetch instruction `0001 1111`.

5. **Repeat Decode**:
   - Opcode `0001`: `Load_B` (load data into register B).
   - Address `1111` (decimal 15): Fetch RAM data from address 15.

6. **Execute**:
   - RAM at address 15 contains `0000 1110`.
   - Load `14` into register B.

7. **Next Instruction**:
   - Increment IAR to `0010`.
   - Fetch instruction `1000 0100`.

8. **Decode and Execute**:
   - Opcode `1000`: `Add` (add two registers).
   - Operands `01 00`: Add B (14) to A (3) and store the result in A.
   - ALU computes `3 + 14 = 17`, and `17` is written to register A.

---


### CPU Registers
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C2_FundamentalConcepts_files/image013.gif)
From the example you're aware that CPUs have registers, which allow them to store things such as memory addresses, values, essentially bits when they're doing their operations. Let's go through the list that's important right now:
  1. General Purpose Registers: Stores bits representing numbers or memory addresses.
  2. Stack Pointer: Points to the top element of the stack, whatever that means.
  3. Link register: You know how functions call other functions? Well this stores the memory address of the caller, so that when a function is done, we can return the result to the caller.
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C2_FundamentalConcepts_files/image014.gif)
For ARM, registers R0 to R3 are used to pass input parameters to a function in C. There are some status registers that should be mentioned:
  - Application Program Status Register (APSR)
  - Interrupt Program Status Register
  - Execution Program Status Register (EPSR)
  - Program Status Register: The bits N (is negative?), Z (is zero?), V (is overflow?), C (carry bit), and Q (saturation) are just flag bits for the ALU. 

I mean other useful bits are actually related to interrupt handling:
 - **ISR_NUMBER:** What interrupt is being handled?
 - **PRIMASK:** If 1, most interrupts and exceptions aren't allowed. Else interrupts are allowed.
 - **FAULTMASK:** If 1 all interrupts and faults aren't allowed. Else allowed. Though a 'non-maskable interrupt' isn't affected by this. 
 - **BASEPRI:** Records the priority of the software being executed. So it'll prevent interrupts with lower or equal priority, but will defer to higher priority interrupts, which is pretty helpful.
