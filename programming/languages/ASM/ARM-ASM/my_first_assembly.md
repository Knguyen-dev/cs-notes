
## Emulation and Memory Layout
Registers are areas in memory that are very close to the CPU. Your registers look like `r0=00000000`, with 8 digit, each digit representing a hex value. This reinforces that a register is going to have 32 bits, hence the 32-bit processor. In general a word, represents the maximum amount of information that a register can store.

All of the registers are going to be available to us, with some of them being special. Typically R0-R6 are general purpose, R7 is used for talking to the OS. For the OS to know what to do, we'll place a value in R7, that value will be used in a lookup table to see what the OS actually has to do. 

- Stack pointer: Stack memory is stored on RAM and it's kind of slower to access and write to, since it's slower to mess with RAM than to mess with our CPU registers. The SP register tells the address of the next available piece of memory on the stack. To traverse memory you know that it's 4 bytes, 8 bytes, 12, bytes, and then 16 bytes. That covers hex 0000 000. Then hex 0000 0010 covers the next set. That's the way our stack memory grows.
- The LR (link register) stores the location of where a function should go back to. 
- Program Counter: Stores the memory location of the next instruction. All instructions are stored in memory, and the program counter allows us to move through one by one. 
- cpsr: Used to store information about the program. Stuff like whether the ALU result was negative, zero, how to interpret it etc.

## My First Assembly

A label is synonymous with a function in higher level languages. If you go to a label, you execute the code underneath that label. Your `_start` label is similar to a main function. If anyone wants to run our program, `.global` indicates where the entrypoint to the program is, and it's at the `_start` label. In technical detail, it exports this, but the general idea is that anything should be able to be directed to this start label.
Everything we want is done under the start label.

Register 7 stores information about system calls. When we go to the OS we want it to do something for us. It manages IO, execution of programs, etc. This communication can be done with system interrupts or system call numbers. We place a number in R7, which maps to a command that the OS should do. Then we call an interrupt which interrupts the OS, the OS reads R7, the OS goes to a lookup table to see what action that number corresponds to, and it does that action. For example `1` tells the OS to end our program.

Let's start by learning how to put values into registers and see how registers work. We'd use the "MOV" opcode to move data into locations. We need to provide a destination (where the data should end up) and source for our data (where are we getting the data). The destination is the first argument and the source is the second argument. If we want to use a constant value you'd use a hashtag. So here we used the decimal `30`, but you can also do `0x` prefix after the hashtag to insert hex into the register.
```s
.global _start
_start:
	MOV R0, #30 ; Moves the constant 30 into R0. 
	MOV R7, #1  ; Moves the csont
	SWI 0
```
To do an interrupt you'd do `SWI 0`, which is a software interrupt making the OS take over. As a result the OS will read R7, it maps the value to some command, and it ends our program. Your R0 register will contain 1E which is hexadecimal for 30.

The most significant bit is on the left hand side, we actually refer to this as little endian. That's the how  ARM functions as well as many other processors, but you could also have the most significant bit on the right hand side, which is big-endian. ARM is bi-endian as things can change depending on what we're doing.

## Addressing Modes 

The ways we're able to store and retrieve data from the various memory locations we have. Previously we used **immediate addressing**, which is when we want to move a constant value into a register. 
You can also move data between 2 registers, which is called register direct addressing:
```s
MOV R1, R0
```

More interesting, is working with the stack. Here we create a list, we label it "data" (essentially a variable) name. Then each element of that list is of data type word, meaning each one is going to be represented by a word's worth of bits. You'd typically look at the first entry in the last, and all elements will appear sequentially word by word (really simple, I didn't explain it well here).

Here we're using "LDR" which allows us to load data from the stack to the register. Here we load the address of the first value in our list. Note that we aren't loading the number itself, but right now we're just getting the LOCATION/address of the first value in our list, and we're placing that in register 0. This is called **direct addressing**. You may see `R0=0000 0008`, which is the memory address of that first list element.

Now to derive the value of the first list element, we need to use this memory address and access the value at this memomry address. To do this we need to use register **indirect addressing**. We'll still use LDR because we're taking data from the stack into the register, but hey "Hey treat the binary number given by the stack as a memory address." As a result, we won't just load the address of the element on the stack, but we'll read the value associated with that address, finally being able to get the value of that first list item. Those square brackets tell your Assembler to treat it as a memory address and fetch from said memory address.

```s
.global _start 
_start:  
  LDR R0,=list ; Load memory address  first element in the array (from the stack) onto our register
  LDR R1, [R0] ; Interpret data stored in R0 as a memory address, and get the value at that address.

.data
list:
  .word 4,5,-9,
```
Thinking about this in a higher level language, we just essentially got the value of the first element in the list. You can think about indirect address as a reminder to C and C++. In that line we basically dereferenced a pointer. We didn't interpret the value of the variable (register R0) at face value, we didn't treat the binary data in it as a number, but rather we correctly interpreted that binary as a memory address to some other location that stored the value of that list item. 

You can also use register indirect with an offset. So let's say you started with memory location `0000 0010` (in hex), which is the address of your first element in the list. You can then add an offset of 4 bytes, which will point you to the memory location of the next element in that list. 

```s
.global _start 
_start:  
  LDR R0,=list ; 
  LDR R1, [R0] ;
  LDR R2, [R0, #4] 

.data
list:
  .word 4,5,-9,
```
Get the memory address stored at R0, and add 4 to it. This does binary addition and the result should be a memory address that's 4 bytes ahead and points to the next element in the list. We then dereference and get the value at that new memory address. Essentially you're getting the value of the next index in the list `my_list[n+1]`.

Now let's talk about **pre-increment addressing**. A pre-increment increments the memory address before de-referencing. The result is almost the same as the last example, as the value that R2 gets is the same, but R0 is updated to be incremented. So we actually add 4 to the value in R0 in this case, whilst in the last case this didn't happen.
```s
LDR R2, [R0, #4]! 
```
In post-increment addressing, it'd be the same as accessing the list at index n, but after the access we'll increment the value in the register. Akin to doing `my_list[index]` and the `index += 1`. Or in some languages it's `my_list[index++]`.
```s
LDR R2, [R0], #4
```

## Basic Arithmetic Operations 
We'll talk about basic arithmetic operations, and some modifications to these in many variants of ARM assembly. 

You can add, subtract, and multiply in ARM with `ADD`, `SUB`, and `MUL` respectively. Division isn't included as its a little more involved, so we'll focus on the basic operations first.

```s
.global _start
_start:
  MOV R0, #5
  MOV R1, #7
  ADD R2, R0, R1 // R2 = R0 + R1 = 12
  SUB R2, R0, R1 // R2 = R0 - R1 = -2
  MUL R2, R0, R1 // R2 = R0 * R1 = 35
```
But notice something. When we subtract `R2= R0 - R1 = 5 - 7 = ffff fffe`. We know that this is negative -2, however other operations can yield the same result. For example `ffff ffff - 1 = ffff fffe` as well. In the case second however, the result a really big number yet the hex value is the same. The reason for this is because the negative number is being represented in two's complement as a signed integer, whilst the positive number is an unsigned integer. So the question is, how can we differentiate when something is a big number and when something is a negative number?

To solve this, use the CPSR register to see the result of the operation. We can look at the N flag, which sees whether the result of the last ALU operation was negative or not. To do this you'd have to set an arithmetic flag. Literally instead of `SUB`, do `SUBS` OpCode to set the flags in the CPSR register. The reason this isn't done automatically is because that means added overhead.

As a rule of thumb you would only use `SUB` when you are sure that the numbers being subtracted are going to yield a positive value. Else, if you don't know whether it's going to be positive or negative, then use `SUBS` so that your CPSR register updates, allowing you to see more information about the result of your arithmetic operation.
```s
.global _start
_start:
  MOV R0, #5
  MOV R1, #7
  SUBS R2, R0, R1 // R2 = R0 - R1 = -2
```
The CPSR would be `8000 01d3`, remember this is hex. This should mean `1000 ... 0001 1101 0011`. So that first bit, which corresponds to the n bit being set, indicating that the result is negative (bit mask stuff).

When we have an integer overflow, typically we would 'set the CPSR' register so that the carry out (extra data) is stored in that register. Again when `ADD`, `SUB` or any arithmetic instruction has the `S` suffix, it updates the CPSR. One of the bits in CPSR is the C (carry) flag, and if it's set if an unsigned overflow happens. This allows the proecssor to track carry outs, which is essential if you want to handle the overflow. Remember that overflow wraps things around, so it's not like you can get that extra overflowed data somehow. You only have that carry flag, and it can be useful to simply just know if/when we overflowed.

```s
.global _start
_start:
  MOV R0, #0xFFFFFFFF 
  MOV R1, #3
  ADDS R2, R0, R1 // R2 = R0 + R1, but it also tells the CPSR to record extra info about this operation
```

When this happens we want to catch that it happened, but we may also want to use that carry in a future operation. Using the `ADC` Op Code which adds two registers and the carry bit (0 or 1).
```s
MOV R0, #0xFFFFFFFF
MOV R1, #3 
ADC R2, R0, R1 ; R2 = R0+R1+carry bit
```

## Logical Operations in ARM
These are operators like AND OR XOR and negation. We'll show simple stuff like comparisons, but then we'll move to more complex things.

```s
.global _start
_start:
  MOV R0, #0xFF
  MOV R1, #0x16
  AND R2, R0, R1; bitwise AND 

  ORR R2, R0, R1; bitwse OR operation
  EOR R2, R0, R1; bitwse XOR operation
```
Here you're doing a bitwise AND operation that should result in 0x16. You can also do `ANDS`. I think the main idea in general is that your basic operations in assembly will most likely have some complementary version that can do more things for you. Here you're doing a bitwise OR operation, and the results would be `0xFF`. That `EOR` is a XOR op code.

To negate something we need to do something a little more special. ARM assembly has an op code called `MVN` (move negative). It negates the source and puts that result in the destination. So get the value of R0, negate it, and put it back into R0 as the new value for that register. Remember that `0xFF` is actually `0x0000 00FF`, and then negating it gives `0xFFFF FF00`
```s
  MOV R0, #0xFF
  MVN R0, R0
  ADD R0, R0, #0x000000FF ; This is wehn you want to revert R0 back to its original value
``` 
This is really useful of you have bitmasks and whatnot

## Logical Shifts and Rotation Part 1
A logical shift to the left inolves moving all digits from te left of where they originally were. Note that doing a left shift on a byte is like multiplying the number by $2^{n}$. A left shift is very efficient and a common way to multiply by two.

A right shift does something similar but in the opposite direction. If your'e doing a right shift of $n$ places, you're dividing your result by $2^{n}$
```s
.global _start
_start:
  MOV R0, #10 ; Moves constant 10 into r0
  LSL R0, #1 ; left shift one time, akin to multiplying by 2, 20
  LSL R0, #2 ; left shift two times, akin to multiply by 2 twice, now 80

  LSR R0; #3 ; right shift three times, so divide by 2 three times, resulting in 10
```

A rotation slightly differs from a shift. For example, when doing right shifts, we get rid of the right most element. For example `1010 >> 1 = 101`, where we get rid of that zero on the right. Rotation operations don't do this, but rather, the zero at the end is wrapped around to the start. This results in `0101`. Rotations aren't a common operation you see, and it's kind of been left in here for historical reasons. They have their applications in hashing, crypto, and graphics, but it's rare and we're learning it because.

## Logical Shifts and Rotations Part 2
We can do shifting and move operator together. Imagine you don't want to shift R0, but instead store the result of multiplying by two into register R1. Here you're preserving the value of R0. 
```s
# Here we're moving and shifting in separate instructions.
MOV R0, # 10 ; R0 = 10
MOV R1, R0   ; R1 = 10
LSL R1, #1   ; R1 = 10*2 = 20

# Here's a more compact way of doing the same thing
MOV R0, #10       
MOV R1, R0, LSL 1; LSL #1 ; R1 = R0 * 2
ROR R0, #1 ; Stores the result of a right rotation in R0
``` 

## Conditionals in ARM Assembly
```s
.global _start
_start:
  MOV R0, #1
  MOV R1, #2
  cmp R0, R1

  BGT greater

greater:
  MOV R2, #1
```
A comparison will do R0-R1. If R0 is bigger, we should have a positive number, else we'll have some negative number. If they're the same, then the result should be zero. The CPSR register will get set based on the result of the operation, and this is very useful because we'll check the negative flag on the CPSR register. We have to check the register because we could have an unsigned binary number, or a negative number that's represented in two's complement.

We can use a "branch greater than". So if it's greater than something, we use a label that will run when that branch happens. Essentially if it finds that R0 > R1, it'll move the program to this "greater" label, which will contain different application logic. If we don't trigger BGT, then the program moves on like normal.

If it were greater, then we'd do a comparison, and in the CPSR register you'll see the carry-bit being set, which indicates that it's positive. If the BGT wasn't activated, then once the `_start` label finishes, it will continue to the next instructions. It'll end up in the greater branch anyways. This is an issue, that we need to fix.

You can define a branch-always called `default`. As a result if BGT isn't activated, we will jump to default branch, skipping greater. It should still be noted that when you activate BGT and finish running `greater`, the next thing the program runs will be `default`. Truly sequential.

```s
.global _start
_start:
  MOV R0, #1
  MOV R1, #2
  cmp R0, R1

  BGT greater
  BAL default

greater:
  MOV R2, #1

default:
  MOV R2, #2
```
There are a lot of Op codes for conditional like `BGT`, `BGE`, `BLT`, `BLE`, `BEQ`, `BNE`.

## Loops in ARM Assembly

We need to check when we have the last element in a list. The size of your literals need to be 2 hex values. If it's more, then we need to be more creative. To solve this, we'll use constants. We'll use keyword `equ`, and we'll give it a label/name and a value.

```s
.global _start
.equ endlist, 0xaaaaaaaa


_start:
  LDR R0,=list   ; Loads the list we defined from stack memory into register
  LDR R1, [R0]   ; Dereference the memory address to get the value of the first element in the list
  LDR R3,=endlist
  ADD R2, R2, R1 ; R2 = R2+R1 

loop:
  LDR R1, [R0, 4]!

.data
list:
  .word 1, 2, 3, 4, 5

```


## Credits
TIMESTAMP: 1:25:04
- [ARM Assembly Tutorial - freeCodeCamp](https://youtu.be/gfmRrPjnEw4?si=G5kpZubQIzLHDbzt)

Probably should follow it once you're a little deeper into the embeddeds.
