
# ASM Notes
Notes about assembly. I'm mainly getting this from freeCodeCamp's ARM Cortex -m but then I should also go into RISC-V. I don't think it should be too difficult to work with RISC-V as there's a cheat sheet online.

## Outline
### 1. Basics & Setup
Registers:
- 32 integer registers (`x0` - `x31`), where `x0=0`
- ABI names: `a0-a7` (function args/returns), `t0-t6` (temporaries), `s0-s11` (saved), `sp` (stack pointer), `ra` (return address), `gp`, `tp`.

Instruction Formats:
- **R-type (register):** arithmetic and logical operations (`add`, `sub`, `and`)
- **I-type (immediate):** Loads, immediate ops (`addi`, `lw`)
- **S-type:** stores (`sw`)
- **B-type:** Branches (`beq`, `bne`)
- **U-type** upper-immediate (`lui`)
- **J-type:** jumps (`jal`)

### 2. Core Instructions
- Arithmetic Logic: add, sub, addi, and, or, xor, sll, ra
- Memory Access: lw, sw, and offset addressing like lw t0, 0(sp)
- Control Flow: beq, bne, blt, bge, jal, jalr
- Immediate Handlin: li, lui

### Calling Conventions
Registers:
- Arguments
- Return values 
- Caller saved
- Callee saved

Stack Usage:
- Stack grows down
- Always keep sp 16-byte aligned
- Save ra and any callee saved register at function entry.

### Program Structure
- `.data` Global Variables/constants
- `.text` Code
- `main:` Entry label
- Also we may have syscalls or "environment calls" via `ecall`. On baremetal you'd use `jal`.

## Credits 
- [RISC-V Cheatsheet](https://projectf.io/posts/riscv-cheat-sheet/)

**TODO:** Do notes on bit shifting
```s
ADD R1, R2, R3   ; R1 = R2 + R3
```

000000 00010 00011 00001 00000 100000
