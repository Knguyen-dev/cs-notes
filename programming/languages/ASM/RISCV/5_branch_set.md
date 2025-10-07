# Branch SEt

## Branch
Branch instructions compare two registers and decide whether to jump to another location in the program or continue normally. This acts like if-else logic or loop control flow in higher-level languages. They work internally by jumping to specific memory addresses in your program. Whilst you can specify raw memory addresses to jump to, we use **labels** to mark branch targets, making the code easier to read. Below I'll show some brac=nch conditions
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

### Example 1
```s
li t0, 1000 # time to wait
.L_timer # local label
  lw t1, TIMER_WAIT(t6) # load hardware timer address into t1
  bne t0, t1, .L_timer  # branch (loop) if t1 isn't equal to t0
```
- `.L_timer` is a label, marking the memory address of the instruction within `lw t1, ...`
- `bne t0, t1, .L_timer` means, if `t0 != t1`, go back to where `.L_timer` is.

## Branch Unsigned 
```s
bltu  # less than unsigned
bgtu  # greater than unsigned
bleu  # less than or equal to unsigned
bgeu  # greater than or equal to unsigned
```
If your numbers are unsigned, add the u suffix to the end of the branch instruction. Equal and not equal aren't affected by sign so there aren't unsigned version of them. Again with unsigned comparison, a register wtih the contents of `0xF` is interpreted as an unsigned binary number.

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
Branch offsets are relative to the program counter (PC). The program counter is a register that holds the address of the next instruction to be fetched and executed from memory. 

Usually the program counter is incremented by four to indicate a 4 byte increase (since instructions are 4 bytes long). However when we jump to a branch, the CPU updates the program counter to point to the branch's target address.

### auipc
The program counter is also used to calculate the address of memomry locations. The 

TODO