# Assembly

## Motivation
Thi will be important if you want to learn about real time bluetooth networks. 'Thumb instructions' is a specific and optimized assembly language subset, tailored for messing with ARM Cortex-M processors. The idea is to maintain functionality, whilst optimizing for execution speed. 

You should know that Assembly isn't just one language, but it is often specific to a vendor of computer chips or computer architecture.

## Basic Syntax
In Assembly, an instruction (a statement) has four fields separated by spaces or tabs:
  - **label (optional):** In the first column ,and it's used to identify the position in memory of the current instruction. Each label needs to be unique.
  - **opcode:** Specifies the command we're executing. The operation being done.
  - **operand:** Specifies where to find the data to do the operation.
  - **comment (optional):** Allows you to make comments on the code
```assembly
Func MOV R0, #100 ; this sets R0 to 100
          BX LR   ; Indicating that it's a function that returns 
```
When describing instructions, we'll use the following symbols:
- Ra Rd Rm Rn Rt and Rt2 represent registers
- `{Rd,}` represents an optional destination register
- `#imm12` represents a 12-bit constant, 0 to 4095
- `#imm16` represents a 16-bit constant, 0 to 65535
- `operand2` represents the flexible second operand as described in Section 3.4.2
- `{cond}` represents an optional logical condition as listed in Table 2.10
- `{type}` encloses an optional data type
- `{S}` is an optional specification that this instruction sets the condition code bits
- `Rm {, shift}` specifies an optional shift on Rm
- `Rn {, #offset}` specifies an optional offset to Rn

Here's a description of the addition instruction:
```s
ADD{cond} {Rd,} Rn, #imm12
```
So it's adding the value at `Rn` with some kind of 12 bit constant. You could also add a conditional or even add a destination register if you didn't want to directly add to the register you're using.
The following two examples work:
```s
ADD R0, #1; R0 = R0 + 1
ADD R0,R1,#10; R0 = R1 + 10 
```
Okay let's end this off by looking at another example of a function:
```
Func MOV   R1,#100     ; R1=100
     MUL   R0,R0,R1    ; R0=R0*R1
     ADD   R0,#10      ; R0=R0+10
     BX    LR          ; essentially returns R0*100+10
```
In Assembly, your functions don't have explicitly defined parameters or return values, like in higher level 
languages. Instead you rely on registers and conventions. In this function, we just decide that the register 
`R0` (conventionally) is going to hold a parameter that we want to modify. 

By convention in the ARM's Procedure Call Standard (AAPCS):
  - `R0` to `R3` are used for functional arguments/parameters
  - If a function has more than 4 arguments, additional arguments are passed on the stack (region of memory)
Here the return value is stored in `R0`. In any case, your documentation is critical. With clear documentation, 
you can be sure that you aren't messing with registers that already have values stored or are involved in other steps when 
running your function. Anyways I think you should just take away that this is what's happening inside the CPU, there's the Assembly "Load" command to load data from ram (outside CPU) 
into a register inside the CPU. This is reading. Then there's the other main one "store" to write to memory, writes a CPU register value to RAM.


## Assembler and building project
Assembler translates your source code into 'object code'. This is just machine instructions executed by the processor. 
Other stuff is that the object-code, instructions, are 16 or 32 bits wide. Your program counter, the program counter bit will 
always be 0. 

Another thing is that Assembly is different for different microprocessors. ARM, Intel, etc. they all use different variants of Assembly. Why? Because they have different ISAs (Instruction Set Architectures). Meaning they have unique ways of organizing registers, addressing memory, and executing instructions.




When the project is built, all files are compiled and linked together. The linker decides exactly where in memory everything will be. After 
building, you can 'download it', which means programming the flash ROM to have that object code. You can technically load your 
software onto RAM, but that's volatile, and it's standard to put software on ROM. 

## Further Details:
For further details on the thumb language, you'd have to refer to an ARM Cortex -M Technical Reference Manual. But if it helps, here's a video on how to work with the general ARM Assembly.
- [ARM Cortex-M Assembly - freeCodeCamp](https://youtu.be/gfmRrPjnEw4?si=DFVy7ChkGiz1IBzL)
