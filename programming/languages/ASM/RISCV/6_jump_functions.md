# Jump and Functions

## Jump Operation
The jump instruction's main job is to update the program counter (PC). The PC contains the next instruction to be executed and typically it moves to the next instruction by adding 4 bytes to the address that it stores to get to the next instruction (assuming instructions are 4 bytes in size). However, with a jump operation, the CPU updates the pC to point at the jump "target" instead. Jump instructions don't use conditionals, which makes them different from the likes of branch. There are two operations in RISC-V: `jal` (Jump and Link) and `jalr` (Jump and Link Register).
```s
jal rd, imm       # rd = pc + 4; pc = pc + imm
jalr rd, rs1, imm # rd = pc + 4; pc = rs1 + imm
```
Before updating the PC, we save the address of the next instruction into a register, this is our **return address**. The idea is that when the function ends, we'll return to this address and continue program execution where we left off in the caller. `jal` uses a 20 bit signed immediate for the jump destination, whilst `jalr` uses a register plus 12-bit signed offset. 

### Example 1: Creating an Infinite Loop
```s
.L_forever:
  la a0, message # loads the address of the label 'message' into a0, the idea of doing a0 = message and preparing it as an argument
  call printstr  # calling the function
  j .L_forever   # jump to .L_forever label
```

The `j` is just shorthand. When we write `j .L_forever`, the assembler expands it to `jal x0, .L_forever`. 
- `jal rd, label` is a jump and link. It stores the return address  in register `rd` adn then jumps to the address of `label`
- If `rd` is x0, that means "don't store it anywhere" because x0 is always zero and can't hold a value.

So the idea is that you'd use these for unconditional jumps in your code, like when you need to go back to the beginning of a for loop:
```s
j .L_forever       # simple and clear
beq x0, x0 .L_loop # functionally the same, but kind of hack looking.
```

## Functions
Before calling a function, we'll save the address of where we'll return to after the function is done, that's the return address. In RISC-V this is typically stored in register **ra** (`x1`), which is set by the RISC-V ABI. After you're done with the function, you take the return address in `ra` and jump to it using `jalr`.

### Example 1: Boilerplate Classic
```s
li a0, 7 # insert values for arguments for the function call
li a1, 8
jal ra, add_int # ra = pc + 4; pc = pc + imm; jump to the function after we've prepared the registers that are expected

ebreak # stops execution

add_int:
  add a0, a0, a1    # a0 = a0 + a1
  jalr zero, 0(ra)  # jump to the address in the register ra with 0 offset; don't need to store the pc+4 anywhere so discard it 
```

**Note:** In RISC-V a0-a7 store the arguments for functions. Before calling a function, put the 1st argument in a0, the 2nd in a1, etc. Then when the time comes to return a value from the function, the convention is putting the result in a0. Akin to using ra for the return address, this ensures different code can easily work together.

### Example 2: Shorthand and Clear
We always use `ra` as the return address we always jump to the `ra` when we're done. When calling a function, we always store the return address in ra. Both of these are boilerplate, but they have their readable versions within using **call** and **ret**:
```s
li a0, 7
li a1, 8
call add_int
ebreak

add_int:
  add a0, a0, a1 = # a0 = a0 + a1
  ret # return from functions, equivalent to jalr zero 0(ra)
```
**Note:** Above we used jal, but it's limited to plus or minus 1 MiB (approx 1 million bytes). For really far function calls, combine jalr with auipc to reach anywhere in 32-bit memory space. You can use the call pseudoinstruction and the assembler will choose the correct instructions for us.

## Stack, Calling Convention, Etc.

### Review on Function Call Stack
```s
fun_one:
  add sp, sp, -16 # allocate 16 bytes on the stack
  sw ra, 12(sp)   # store return address onto the stack 
  call fun_two
  lw ra, 12(sp)  # load return address from stack
  addi sp, sp 16 # restore stack pointer
  ret            # return from fun_one 
```
A lot of this remainder stuff is more so related to computer organization rather than actual assembly syntax. An area in memory set aside for function calls and local variables. The stack grows downsides, so pushing information onto it will occupy memory addresses that approach 0. We allocate memory on the stack by decrementing the stack pointer. 

**Note (Stack Alignment):** we allocated 16 bytes on the stack when our return address is only 4 bytes long. The RISC_V calling convention states that the stack pointer should be aligned to a 128-bit boundary upon procedure entry. We must ensure all data types are correctly aligned by aligning the stack pointer to 16 bytes.

### Caller and Callee Saved Registers:
- saved registers: s0-s11 - keep their value across function calls (preserved)
- argument registers: a0-a7 - for passing arguments and the return value (not preserved). 
- temporary registers: t0-t6 - for internal function use (not preserved)

### Many Arguments
Note that if a function needs more than eight arguments, you can pass them onto the stack instead. The RISC-V calling convention indicates that hte first argument passed on hte stack is located at offset zero of  the stack pointer on function entry. The following arguments are stored at correspondingly higher addresses.
```s
fun_ten:
    lw t0, 0(sp)  # load 9th argument off stack into t0
    lw t1, 4(sp)  # load 10th argument off stack into t1
    # the first 8 arguments are in a0-a7
```