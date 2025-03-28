# Memory Map

## Intro
There's a lot of memory. RAM, and then different types of ROM. So we'd simplify this by using a memory map, a little diagram that helps us visualize the boundaries of different memory types.


### Walkthrough
- Lower bound: `0x00000000`
- Upper bound: `0xFFFFFFFF`
Every memory address is 8 bits long.


- ROM: From `0x00000000` to `0x0003FFFF`. This encapsulates 256 kilobytes. For code and constants.
- RAM: From `0x2000 0000` to `0x20007FFF`. Encapsulates 32K RAM. This is for data such as variables or stuff in the stack.
- I/O (Ports): From `0x4000 0000` to `0x400F FFFF`. Here you can address stuff like IO pins and get the data from there, or external device registers as devices can store the data you want in these registers.
- Internal IO: From `0xE000 0000` to `0xE004 FFFF`. For any internal registers in your IO devices. 

Any memory in-between would be unused memory. Any access to these memory locations would lead to errors.

### Finding this information?
The information I listed was pretty specific. To see this information, use the data-sheet for your microcontroller. Here I'm using the data-sheet for the 'Tm4C123' microcontroller. Here's how: 
1. Go to the data-sheet's table of contents.
2. Looked at 'Microcontroller Overview' section. 
3. We looked for 'flash memory' (ROM) which said '256 KB of single-cycle flash memory'. Then we looked at system ram, which used SRAM, and it said '32 KB single cycle SRAM'. 
4. Go back to table of contents and look for 'Memory Model'
5. It says at `0x00000000` and `0x0003FFFF` for 'On-chip flash' which are our boundaries for flash ROM.
6. Then `0x2000 0000` to `0x2000 7FFF` for 'bit-banded on-chip SRAM' so that's for our RAM.
7. A table called "Memory Access Behavior" tells us what each region of memory is dedicated/used for.