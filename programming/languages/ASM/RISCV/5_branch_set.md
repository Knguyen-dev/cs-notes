# Branch Set

## Branch and labels
Branch instructions compare two registers and decide whether to jump to another location in the program or continue normally. This acts like if-else logic or loop control flow in higher-level languages. They work internally by jumping to specific memory addresses in your program. Whilst you can specify raw memory addresses to jump to, we use **labels** to mark branch targets, making the code easier to read. Below I'll show some branch conditions
```s
# General syntax
branch rs1, rs2, imm

bge a0, a1, calculate_stuff  # if (a0 >= a1) jump to calculate_stuff label
```
- Where `rs1` and `rs2` are registers being compared, signed comparisons.
- The branch target is given by an immediate offset (imm) added to the program counter (PC).
- Offsets are signed 12-bit values, allowing branches forward or backward (±4 KB range). In RISC-V, most instructions are encoded in 4 bytes but RISC-V also has a compressed instruction set that's encoded in 2 bytes to save memory. Branch offsets are encoded in units of two bytes.

Under the hood, RISC-V encodes this jump as a relative offset from the current instructions's address, which is just the address stored in the program counter. In any case though, branches and labels are how we can implement functions and other control flow patterns.

```s
# If registers x1 and x2 aren't equal, jump to label
bne x1, x2, label
```

### Example 1: Doing a Loop
```s
li t0, 1000 # time to wait
.L_timer # local label
  lw t1, TIMER_WAIT(t6) # load hardware timer address into t1
  bne t0, t1, .L_timer  # branch (loop) if t1 isn't equal to t0
```
- `.L_timer` is a label, marking the memory address of the instruction within `lw t1, ...`
- `bne t0, t1, .L_timer` means, if `t0 != t1`, go back to where `.L_timer` is.

**Note:** These parts of the notes kind of leak into the idea of how we can create functions, do control flows, and also just the general setup of an ASM program. We'll cover all of this with examples in the next chapter about jumping in ASM, and that should complete the main core.

## Branch Unsigned 
```s
bltu  # less than unsigned
bgtu  # greater than unsigned
bleu  # less than or equal to unsigned
bgeu  # greater than or equal to unsigned
```
If your numbers are unsigned, add the u suffix to the end of the branch instruction. Equal and not equal aren't affected by sign so there aren't unsigned version of them. Again with unsigned comparison, a register with the contents of `0xF` is interpreted as an unsigned binary number.

## Branch Zero
You often want to compare a register to zero, for example, to check for the end of a loop or null terminated string. RISC-V has some pseudoinstructions for this.
```s
beqz  # equal to zero
bnez  # not equal to zero
bltz  # less than zero
bgtz  # greater than zero
blez  # less than or equal to zero
bgez  # greater than or equal to zero

# General syntax
beqz rs1, imm
```

### Example 1: Absolute value
```s
abs:
  # If a0 >= 0, then jump/branch to .L_abs_end
  bgez a0, .L_abs_end 

  # Else, a0 = -a0
  neg a0, a0

.L_abs_end:
  ret # return from function (a0 holds the return value)
```

If a0 is non-negative we immediately return from the function. In RISC-V calling convention `a0` holds the first argument and also the return value. Else, the function is negative, we don't do the jump. Instead we proceed through the function to negate the register value. Ultimately achieving the functionality of absolute value.

## Program Counter
Branch offsets are relative to the program counter (PC). The program counter is a register that holds the address of the next instruction to be fetched and executed from memory. Usually the program counter is incremented by four to indicate a 4 byte increase (since instructions are 4 bytes long). However when we jump to a branch, the CPU updates the program counter to point to the branch's target address.

### auipc
You can also use the program counter to calculate the addresses of memory locations **relative** to the address currently stored in the program counter. This is called program counter relative addressing. Anyways we can add an upper immediate (20 bit number) to our program counter. The general format is:
```s
auipc rd, imm # rd = pc + << 12
```
Using auipc, we can use PC-relative addressing to reach a symbol anywhere in the 32-bit memory space. The PC isn't a general purpose register, so we can't access it directly, which makes sense. However we can copy the pc register using auipc with an immediate of zero
```s
auipc t0, 0 # copy program counter into register t0
```
But yeah I imagine that this can be pretty useful for things like PC-relative addressing.

## Set 
Here we do a comparison and set a variable the result of that comparison. Most CPU set condition codes or status flags such as zero, carry, and overflow based on the result of an arithmetic or logical (comparison) instruction. However RISC-V doesn't have any condition codes, however the `set` instructions handles many of the same situations. Set compares two registers, or a register to an immediate, and writes 1 to the destination register if the comparison is true. 
```s
slt  rd, rs1, rs2  # set less than:                     rd = rs1 < rs2
sltu rd, rs1, rs2  # set less than unsigned:            rd = rs1 < rs2 (unsigned)

slti  rd, rs, imm  # set less than immediate:           rd = rs1 < imm
sltiu rd, rs, imm  # set less than immediate unsigned:  rd = rs1 < imm (unsigned)
```
These are are 12-bit sign extended values representing -2048 ot 2047 inclusive.

### Example 1: You don't need 'sgt'
```s
li   t0, 2       # t0 =  2
li   t1, -2      # t1 = -2
li   t2, 42      # t2 = 42

slt  t3, t0, t2  # since 2 < 42 is true, so t3 = 1
sltu t4, t0, t2  # still true, so t4 = 1

# However obviously things will change with negative numbers
# 
slt  t5, t1, t2  # t5 = 1 because -2 < 42
sltu t6, t1, t2  # t6 = 0 because 4294967294 > 42
```
I mean you don't really need set greater than, just place your stuff on the right if you want that. You can compare with signed and unsigned binary like above, compare and set to zero, or use the set instruction to do multi-word addition.