# Load-Store Operations 

## Load-Store Architecture
RISC-V is a load-store architecture, the instructions "load" and "store" will access memory whilst other instructions work with CPU registers. A load reads a value from memory into a register whilst a store writes a value from a register into memory.

## Data Sizes 
RV32 is a 32-bit architecture, so all arithmetic is performed on 32-bit words. For example we can "byte add" to add information represented by a single byte. However, load and store work support 8 and 16 bit data as programmers common work with 8 and 16-bit data, such as text. RISC-V uses consistent names and one-letter abbreviations for data sizes:
- b: byte 8 bits
- h: halfword 16 bits
- w: word 32 bits
- d: double word 64 bits

## Load Operations
```s
lw   # rd = mem[rs1+imm]       ; load word
lh   # rd = mem[rs1+imm][0:15] ; load half word
lhu  # rd = mem[rs1+imm][0:15] ; load half word unsigned
lb   # rd = mem[rs1+imm][0:7]  ; load byte
lbu  # rd = mem[rs1+imm][0:7]  ; load byte unsigned
```

For example, `lw rd, imm(rs1)`. Here `rs1` is the source which holds a memory address, and `imm` is a constant representing an address offset. The offset is a 12-bit signed immediate, allowing us to reach -2048 to +2047 bytes from the base address in `rs1`. For example, we want to load the word at address `0x140` into register t0:
```s
li t6, 0x140 # load the image 0x140 (our address) into register t6
lw t0, 0(t6) # load word from memory address in t6 with 0 byte offset, put data in t0
```
We just read information from addresses `0x140-143`, again 1 byte at each of the 4 addresses to compose a word of data. To read the next word of data (`0x144-0x147`), we can the address by 4 (positive offset of 4 bytes):
```s
lw t1, 4(t6) # load a word of data starting at t6+4=0x140+4=0x144.
```

**Note:** Imagine you had an array of integers. All of those integers in memory contiguous and next to each other! The address offset was made for something like this.

### Signed and Unsigned Loads
Halves and bytes work similarly, but the value is sign extended:
```s
lh t2, 6(t6) # read half-word starting from 0x140+6=0x146, bytes=[0x146, 0x147]
lb t3, 7(t6) # read byte starting from 0x147. bytes=[0x147]
```
Our CPU registers (like t2 and t3) are 32 bits wide. But the values being loaded (half=16 bits, byte = 8 bits) are smaller than that. So our CPU has to decide how to fill the rest of the register.

**Unsigned Load:**
If you do `lhu` (load halfword unsigned) or `lbu` (load byte unsigned), then the upper bits of the register will be filled with zeros:
```
Memory byte = 0xFF(255)
Register after load = 0x000000FF
```

**Signed Load:**
If you do `lh` or `lb`, then the CPU sign-extends the smaller value. That means it looks at the sign bit of that smaller value, and copies it into all the upper bits of the larger CPU register. For example, if we did `lb` on `0xFF=11111111`, then our register will contain `0xFFFFFFFF`, which would be interpreted as signed two's complement as -1. If we did `lb` on `0x7F`, then the register would contain `0x0000007F`, which is 127 as signed 2'complement.

The reason any of this matters? Let's say your byte `0xFF` represents -1 in 8-bit two's complement. 
- If you load it unsigned, you get 255.
- If you load it signed, you correctly get -1.

It all goes back to making sure we load/interpret our signed and unsigned bits correctly.



## Store Operations
```s
sw  # mem[rs1+imm] = rs2             ; store word
sh  # mem[rs1+imm][0:15] = rs2[0:15] ; store half word
sb  # mem[rs1+imm][0:7] = rs2[0:7]   ; store byte

# sw source, imm(dest)
sw rs2, imm(rs1)
```
- Here `rs2` is the source register, the register who has the binary data we want to store in memory. 
- Then `rs1` holds the memory address that we're going to store this binary data at. 
- Then `imm` is an address offset.

**Note:** The source is the first operand this time, making this a weird operation.

### Example 1: Storing a word
```s
li t0, 42    # load immediate 42 into register t0
li t6, 0x140 # load immediate 0x140 into t6
sw t0, 0(t6) # Store the data from t0 at the memory address stored in t6; 0 byte offset.
```
The memory address 0x140 now contains a word with the value 42 (`0x00...2A`)

### Example 2: Zeroing a word
We can zero a word of memory by storing with the zero (x0) register:
```s
sw zero 4(t6) # store 0 at the memory address contained in t6 with 4 byte offset.
```
The memory address in t6 was `0x140`, doing an offset that means that we cleared one word's worth of data starting at `0x144`. This means that memory addresses [`0x144`, `0x145`, `0x146`, `0x147`] were cleared.

### Example 3: Storing Halves and Bytes
Halves and bytes work similarly.
```s
sw zero, 4(t6) # stores 0 at the memory address in t6 with 4 byte offset.
li t0, 0xFACE  # load immediate 0xFACE into register t0

sh t0, 4(t6) # store half from t0 to memory address in t6 with 4 byte offset (start at 0x144)
sb t0, 6(t6) # store byte from t0 to memory address in t6 with 4 byte offset (start at 0x146)
```
Remember that RISC-V (alongside ARM and x86) is little endian, so the CPU stores the LSB at the lowest memory address. The `sh` will store the LSB (`0xCE`) at addresses `0x144` and the MSB at `0x145`. The sb operation puts `0xCE` (starts with LSB since little endian) inside address `0x146`. Our address `0x147` is still zeroed from our initial zero operation.

## Load Symbol Address
```s
.section .data
.balign 4
greeting:
  .ascii "Hello, World!\0" # null terminated string
```
We can also reference a "symbol". Above we have a string in our data section with the **.ascii** assembler directive. Imagine a function that called `print_string` and displayed that string. We need to pass the address of our greeting string from the data section, into the function I presume? 

To find the address of our greeting string, we'll use `la` (load address) pseudoinstruction:
```s
# General syntax
la rd, symbol

la a0, greeting   # Load the address of the greeting label from the data section into a0
call print_string # Call function
```
The registers a0-a6 are supposed to contain argument values for function calls. By loading the address of the greeting string into a0, we setup the argument for the function call. The motivation for this and extra explanations will come later.

## What is Memory Alignment
Memory alignment means placing data in memory addresses that are multiples of the data's size. For example, a char has a size of 1 byte, which means has a 1-byte natural alignment. As a result, we'd place the char at memory addresses that's a multiple of 1, which would be `0x1000`, `0x1001`, `0x1002`, etc. For a word, it has 4 bytes of data. It has a natural alignment of 4, meaning to store the data in a memory-aligned address, we'd store the data at an address that's a multiple of 4. Examples of aligned addresses would be `0x1000`, `0x1004`, `0x1008`, etc.

Imagine if the CPU wants to load a word:
- Address: 0x1000
- Bytes: [0x1000][0x1001][0x1002][0x1003]

All 4 bytes belong to a single aligned 4-byte chunk in-memory. This is called aligned access, when we access memory aligned addresses. This is just how things are naturally partitioned. Below we have an example of misaligned access:
- Address: 0x1001
- Bytes: [0x1001][0x1002][0x1003][0x1004]

The word starts in the middle of one 4-byte block and spills over to the next. On some CPUs, this causes a hardware exception and serious errors. On others, the CPU will need to perform two separate memory reads and then combine them, which is slower. We typically want to have our data stored as memory-aligned. This will maintain performance, and reduce errors.

### Example 1: Visualizing Memory Alignment
```
Address:   0x1000 0x1001 0x1002 0x1003 0x1004 0x1005 0x1006 0x1007
Bytes:     A0    A1    A2    A3    B0    B1    B2    B3
```
Typically memory is naturally laid out like this. Every 4 bytes represents a single chunk. Here we have two memory aligned words. Typically if we wanted to read a word's worth of data, we'd start at `0x1000-0x1003`, reading all four bytes. However if you accidentally started reading from `0x1001`, you'd get the bytes `0x1001-0x1003`, which correspond to two separate chunks. 

### Alignment in Programming
In RISC-V (and other assembly languages) you can force alignment with the assembler directives:
```s
  .data
foo:
  .balign 4        # Align the next data to a 4-byte boundary
  .word 0x12345678 # This word will start on an address divisible by 4.
```
In C/C++, the compiler usually align things automatically, but you can still influence it:
```c
struct Foo {
  char a; // 1 byte
  int b;  // 4 byte
}

// In memory:
// | a | pad pad pad | b0 b1 b2 b3 |

printf("%zu\n", sizeof(struct Foo)); // Prints 8
```
The struct will typically be 8 bytes instead of 5 because of padding. The compiler may add 3 byte sof padding so that `b` starts at an address divisible by 4. You can override this, but generally that's not recommended as it'll cause memory to be misaligned, which can lead to suboptimal performance or even crashes.

TLDR: Always align your data naturally in memory according to its size.

## Addressing Modes 
An addressing mode is how the CPU calculates a memory address of an operand in an instruction. For example:
- In some instructions, the binary inside a register is the data we want.
- In other instructions, the binary inside a register should be interpreted as a memory address, and it's the data inside that memory address we want. 

Different CPUs may have different ways to address. RISC-V intentionally keeps things simple but here they are:
- **Register:** Operands come from registers only e.g. `add x1, x2, x3`.
- **Immediate:** One operand is an immediate constant e.g. `addi x1, x2, 10`.
- **Displacement:** We do base address + offset to calculate the new address.
- **PC-Relative:** The `address = PC + offset` (used for branches/jumps). 

### Direct Addressing 
The instruction contains the memory address of the data. In this example we directly pass the memory address `1000`, so we're going to get the data at that memory address and store it in `R1`
```s
# In ARM Asm, R1 = data stored at memory address 1000
MOV R1, [1000] 
```

### Indirect Addressing 
A situation where the register contains some memory address. We get the data located at the memory address stored in the register. In this example, we're going to interpret the binary in `R2` as a memory address. Then we're going to load the data from that memory address into `R1`
```s
MOV R1, [R2]
```