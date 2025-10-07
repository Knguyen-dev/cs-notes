# RISC-V Introduction

## RISC-V Instruction Sets
- **RV32:** 32-bit RISC-V with 32 general-purpose registers.
- **RV64:** 64-bit RISC-V with 32 general-purpose registers.
- **RV32E:** Reduced 32-bit RISC-V with 16 general-purpose registers.

We'll be focusing on RV32, where each instruction takes 32-bits to represent.

## CPU Registers
RV32 has 32 general purpose registers: x0 to x31, and these registers are 32 bits wide. 

x0 is hard-wired to zero, meaning reading from this register always outputs zero. Even writing to it won't work, as it's hard-fixed to zero. You can see a list of all 32 of those registers [here](https://projectf.io/posts/riscv-jump-function/#rv32-abi-registers). We'll use ABI temporary registers t0-t6.

## Load Immediate (Constant)
To load an immediate (constant) value into a register use `li`:
```s
# rd = imm
li rd, imm
```
`rd` is the destination register and `imm` is a 32-bit immediate.

### Example 1: More Examples
```s
li t0, 2        # t0 = 2
li t1, 42       # t1 = 42
li t2, -1       # t2 = -1
li t3, 0x100000 # t3 = 0x100000
li t4, 4100     # t4 = 4100
li t5, 0xFACE   # t5 = 0xFACE
```

### Pseudoinstructions: 32-bits
RISC-V registers and RISC-V instructions are 32-bits wide. An instruction needs room for an opcode and registers, so it can't hold a 32-bit immediate. So how does li work then? 

Load immediate is not a RISC-V instruction but rather a pseudoinstruction. A pseudoinstruction is just syntactic sugar that makes the code easier to understand. Under the hood, it's translated into one or more real instructions by the assembler.

## Addition Operation
RISC_V instructions typically have a destination register and two sources. In addition, your sources can be two registers, or a register and an immediate:
```s
add rd, rs1, rs2  # rd = rs1 + rs2
addi rd, rs1, imm12 # rd = rs1 + imm12
```
Where `rd` is the destination register, `rs1` and `rs2` are source registers, and `imm12` is a 12-bit immediate.

**Note:** In RISC-V the `...i` suffix refers to the immediate form of the instruction, and those immediates are 12-bit signed values (unless it's one of the special cases like `lui` or `auipc`).

### Example 1: Adding Registers
```s
# Some starter values
li t0, 2  # t0 = 2
li t1, 46 # t2 = 46
li t2, 10 # t2 = 10


add t3, t0, t0 # t3 = 2 + 2 = 4
add t4, t0, t1 # t4 = 2 + 46 = 48
add t4, t4, t2 # t4 = 48 + 10 = 58
```

### Example 2: Adding Registers and Immediates
```s
li t0, 48 # t0 = 48

addi t1, t0, 1   # t1 = 48 + 1 = 49
addi t2, t0, -1  # t2 = 48 - 1 = 47
addi t3, t0, 12  # t3 = 48 + 12 = 60
addi t4, t0, -12 # t4 = 48 - 12 = 36
addi t4, t4, 32  # t4 = 36 + 32 = 68
```
The 12-bit immediate can represent values from -2048 to 2047.

### More Pseudoinstructions
In RISC-V Assembly, `mv` and `nop` are also pseudoinstructions. Both are based on the `addi` instruction.
```s
mv t0, t1      # t0 = t1
addi t0, t1, 0 # t0 = t1 + 0
```
The `mv` instruction copies the value stored in one register into another, whilst nop has the sole purpose of advancing the program counter.

### Sign Extension Explained
RISC-V immediates are "sign extended". The value of the constant itself can only represent the range -2048 to 2047 inclusive (12 bits). But then the MSB is copied to the remaining 20 bit positions. 

Sign extension of -2048 decimal (MSB=1):
```
1000 0000 0000 -> 1111 1111 1111 1111 1111 1000 0000 0000
```
I mean this makes sense
Sign extension of 1033 decimal (MSB=0):
```
0100 0000 1001 -> 0000 0000 0000 0000 0000 0100 0000 1001
```

**Note:** The reason they do sign extension is to make two's complement work. Let's review:
- I want to represent `-2048`. Get unsigned representation of 2048 `0000 ... 1000 0000 0000`
- Do one's comp `1111 ... 0111 1111 1111`
- Add one to the result `1111 ... 1000 0000 0000`. There we just represented `-2048` in two's complement.

## Subtraction Operation
The `sub` instruction subtract the values between two registers. If you want to subtract with an immediate, you'd use `addi`.

The `neg` pseudoinstruction negates a register value: positive numbers become negative and vice-versa. Negate only takes one source register because it uses `sub` with the zero register (x0) as the first source.
```s
sub rd, rs1, rs2 # rd = rs1 - rs2
neg rd, rs2      # rd = zero - rs1 (pseudoinstruction)
```

### Example 1: More Examples
```s
li t0, 2   # t0 = 2
li t1, 46  # t1 = 46
li, t2, 10 # t2 = 10

sub t3, t1, t0 # t3 = t1 - t0
sub t4, t0, t2 # t4 = t0 - t2

neg t5, t0     # t2 = -2
sub t6, x0, t0 # t6 = 0 - 2
```

## Load Upper Immediate Operation
This operation loads a 20-bit immediate into the upper 20 bits of a register, and then sets the 12 lower bits to zero. Effectively, it computes: `rd = imm20 << 12`. The immediate 20 bits are signed. The largest positive value you can get is `(0xFFFFF) << 12 = 0xFFFFF000`

The `lui` operation accepts immediates in the range `0x00000` to `0xFFFFF`. If out of range, the GNU assembler returns an error.
```s
lui rd, imm20 # rd = imm20 << 12, at max we result in a 32 bit number
```

### Example 1: More Examples 
```s
lui t0, 1     # t0 = 1 << 12 = 0x1000 = 4096
lui t1, 3     # t1 = 3 << 12 = 0x3000 = 12288
lui t2, 0x100 # t2 = 0x100 << 12 = 0x100000 = 1048576,
```

```s
lui t0, 0x100000 # t0 = 0x100000 << 12, bruh that's 21+12 = 33 bits, out of range
lui t1, -1       # negative value is out of range.
```

## Load Immediate Operation
The load immediate operator can load a 32 bit number into a register:
```s
li rd, imm32 # rd = imm32
```
We can go more indepth on how this works.

We know `addi` (affects lower 12 bits) and `lui` (affects upper 20 bits), and working together they can be used to store 32 bit immediates into a register.


### Example 1: Basic Calculations
```s
li t0, 2
li t1, 42
li t2, -1
```
The first 3 constants can be represented as 12 bit signed integers quite easily, allowing us to use `addi`:
```s
addi t0, x0, 2  # t0 = 0 + 2
addi t1, x0, 42 # t1 = 0 + 42
addi t2, x0, -1 # t2 = 0 - 1
```

### Example 2: Using lui and addi
```s
li t3, 0x100000
li t4, 4100 
```
Let's decompose these operations into `addi` and `lui`. We can reason that `addi` only accepts a 12-bit signed immediate in range(-2048, +2047). So we have to consider `lui`
```s

# 1. 
lui t3, 0x100 # 0x10 << 12 = 0x10 0000

# 
```
The first one is simple, we know that lui actually left shifts by 12, and so we can store `0x10 0000` by doing `0x100 000 << 12`.

The second one requires us to use `lui + addi`
```bash
lui t4, 0x1    # t4 = 0x1 << 12 = 0x1000 = 4096
addi t5, t5, 4 # t5 = 4096 + 4 = 4100
```

### Example 3: Difficult
- Goal: We want `t5 = 0xFACE`

First approach is split the upper and lower parts:
```s
lui t5, 0xF # t5 = 0xF << 12 = 0xF000
addi t5, t5, 0xACE # Attempt to add the lower bits to get 0xFACE? Nope this results in '0xEACE'
```
**Problem:** `addi` only accepts a 12-bit signed immediate in range(-2048, +2047), whilst `0xACE = 2766`, which is already too big for 12 bits. If you write it anyways, it interprets the 12-bit field as signed and extends it, resulting in `0xFFFFFACE = -1330`. Instead of adding `+0xACE` like you intended, you're now adding `-0x532`. This results in `0xEACE`.

**Solution:** Add 1 to the upper part. So `0xF + 1 = 0x10` Now let's look at things:
```s
lui t5, 0x10 # t5 = 10 0000
addi t5, t5, 0xACE # t5 = 0xFACE
```

### Rules and Takeaways 
- Check if constant fits in 12 bits (-2048, +2047)
  - If yes, just use `addi`
  - If no, need `lui` + `addi`
- When splitting a constant into `lui + add`, you'd normally do
```s
# Store the upper 20 bits of the constant
lui rd, UPPER20(constant)

# Store hte lower 12 bits of the constant 
addi rd, rd, LOWER12(constant)
```
If `LOWER12(CONSTANT) >= 0x800`, bump `UPPER20` up by 1 and leave `addi` alone as it will become negative. The shortcut for this is just doing `li rd IMM32`.