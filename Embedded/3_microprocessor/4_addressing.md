# Addressing Modes and Operands

## Intro
The issue is that we need to differentiate between when a location is holding a number (data) or a memory address. If you put `1000` into register `R0` it could be used as data or a memory address.

Addressing modes are like rules that dictate how an instruction determines the location of data. Answering the question, "Are we treating the value of this register as a memory address in ram? So then we'd have to get the value at the memory address? Or should the value at the register be treated as a number?". This is important since the CPU needs to know where to get data from and where to store it.

**NOTE:** Thumb-2 version of the ARM Assembly is a mix of 16-32 bit instructions. This makes your assembly software very efficient for constrained environments like embedded.

## Breaking it down

### Immediate Addressing Mode
When the data is literally in the instruction. Either you're using  a number, or the register you're referencing stores a number as its data, as opposed to an address.
```
MOV R1, #1; R1=100
LDR R1, [R2]; R1= value pointed to by R2
ADD R0, R1; R0=R0+R1, all numbers being added
ADD R0, R1, R2; R0=R1+R2, again all numbers
```
Here `#1`, the number 1 is the actual data (immediate value). THe CPU doesn't need to access some other register or memory address, we already have the data.

![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/image015.gif)
So in the ROM, it accesses the software that tells it to put `0064` (100 in decimal) into register `R0`.


#### Register List and Stack Operations
1. Register List: In Assembly, this is the collection of registers specified in a single instruction to perform operations like saving or restoring multiple registers at once. This is useful if you're working with functions to save the current state of the CPU, to be restored later. A register list is enclosed in brackets e.g. `{R0, R1, R2}` specifies those 3 registers to be used. 
2. ARM registers are special:
    - **Stack Pointer (SP, R13):** Points to the top of the stack in memory.
    - **Link Register (LR, R14):** Stores the return address when a function is called.
    - **Program Counter (PC, R15):** Holds the address of the current or next instruction to execute.
3. Push and Pop instructions:
    - Push: Saves the specified registers onto the stack. Also decrements the stack pointer to make space, since the stack pointer is limited after all.
    - Pop: Restores the specified registers from the stack. This increments the stack pointer after the data is removed. 
Here are some examples:
```
PUSH {LR}       ; Saves LR's data on the stack
POP {LR}        ; Removes data from stack and places it in LR
PUSH {R1,R2,LR} ; Saves data from registers R1, R2, and LR
POP {R1,R2,PC}  ; Restores registers and return
```
A little confusing, but yeah this isn't storing the memory address of the respective registers. But rather it's storing the data inside those registers. The motivation behind all of this is that we use these CPU registers since they're directly inside the CPU. You can save it to RAM, outside the CPU, but obviously that will take longer to read from. However CPU registers are limited, which is why you use the stack.

---
### Index Addressing Mode
Uses a register pointer to access memory. A register pointer is a register that holds a memory address in RAM (read-only-memory), as opposed to holding a data/number. You should note that the contents of a register never point to another CPU register, only something in RAM/external memory.

#### Example 1
So there's a certain way that you'll indicate a register pointer when coding in assembly:
```
LDR   R0,[R1]      ; R0= value pointed to by R1
LDR   R0,[R1,#4]   ; R0= word pointed to by R1+4
LDR   R0,[R1,#4]!  ; first R1=R1+4, then R0= word pointed to by R1
LDR   R0,[R1],#4   ; R0= word pointed to by R1, then R1=R1+4
LDR   R0,[R1,R2]   ; R0= word pointed to by R1+R2
LDR   R0,[R1,R2, LSL #2] ; R0= word pointed to by R1+4*R2
```

#### Example 2 (Visualized)
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/image016.gif)
Let the code be: `LDR R0, [R1]`

`R1` is a pointer, pointing to some memory address. Dereference that pointer and get the value at that address. Then store it in the register `LDR`.

---
### PC-Relative Addressing Mode
Uses the **Program Counter (PC)** to calculate a memory address. The PC is a special register that always points to the current instruction to execute.
We call it "PC-Relative" because if we have a memory address we want to target, we'll access it by specifying its offset/difference with the PC's current value. Then of course the assembler will calculate the offset when we compile the code. Let's look at an example:
```
LDR R1, [PC, #8]
```
- If `PC=1000`, the CPU calculates `1000+8=1008`.
- So we'll fetch data from the memory address `1008` and store it in `R1`.

#### Why use PC-Relative?
It's actually useful for 'branching', calling functions, or accessing constants. Don't really know about branching, and definitely need some examples of calling functions using pc relative or accessing constants.