### Memory Addressing and Address Space
1. **32-bit Address Space:**
   - When talking about a 32-bit system, it means the system uses 32-bit addresses. This allows for a total of $2^{32}$ unique addresses, which equals 4 GB of addressable memory.
   - The address range is from `0x00000000` to `0xFFFFFFFF`. It means that the lowest address is `0x00000000` (which is 0 in decimal) and the highest is `0xFFFFFFFF` (which is 4,294,967,295 in decimal).
2. **Addressable Units:**
   - Each address typically holds 1 byte (8 bits) of information. So if you have 4 GB of addressable space, you can store up to 4 GB of data.
### Memory Banks
1. **ROM (Read-Only Memory):**
   - ROM, including Flash memory, is used for storing firmware or code that doesn’t change frequently. 
    - For our example, the ROM is mapped from the lowest address up to `0x0003FFFF`, giving you 256 KB of addressable space for ROM. This is where the microprocessor's code and constants are stored.
    - NOTE: To calculate the kilobytes, know that 1 kb = 1024 bytes. Then convert the hexadecimal memory addresses into decimal. So the lowest is 0, whilst `0x0003FFFF` = 262,143. Together that's 262,144 bytes (1 byte = 1 address). Then $\frac{2626244}{1024} = 256$ KB.
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/image019.gif)

2. **RAM (Random Access Memory):**
   - RAM is used for temporary data storage while a program is running, including variables, data, and the stack.
   - Let's say the address range `0x20000000` to `0x20007FFF` gives you 32 KB of RAM. This space is used for dynamic data storage during program execution.

### I/O Ports and Device Registers
1. **I/O Ports:**
   - I/O ports are used to interact with external devices, such as sensors or actuators. Each I/O port might be mapped to a specific memory address range.
   - The addresses associated with I/O ports are used to read from or write to hardware peripherals. So this would be the of receiving data from these pins and accessing that data from memory.
2. **Internal I/O:**
   - Internal I/O refers to registers within the microcontroller that control internal functions or peripherals (like timers, serial communication interfaces, etc.).
   - These registers are accessed using specific memory addresses and might not always be straightforward to use. They control hardware directly.

### Unused Memory Areas
1. **Unused Memory:**
   - There are regions of the address space that are not assigned to any device or memory bank. Accessing these regions might result in errors or exceptions because they do not correspond to valid memory or I/O areas.

### Using the data sheet
Looking at the overview of the microcontroller on page 41 we see a lot of things.
- Flash: 256 KB of ROM, so that's how much space we have for our code.
- SRAM: 32 KB of static ram, which is faster than dynamic ram since it doesn't need to be periodically refreshed. 
Going back to the table of contents, you can go to section 2.4 'Memory Model', which will describe the memory map for the microcontroller. Giving us the lower and upper bounds for various places. Then in 2.5 'Memory Access Behavior' it explains to us hte various uses for different memory banks and whatnot.

### Across all microcontrollers
Microcontrollers within the same family will likely differ by the amount of memory they have and the types of I/O modules they have. For example the 'LM3S' and 'TM4C' microcontrollers run on a Cortex-M processor


### Summary
- **Address Space:** Refers to the range of addresses that can be used by the system (e.g., `0x00000000` to `0xFFFFFFFF` for a 32-bit system).
- **Memory Banks:** Specific regions of address space allocated for different types of memory (e.g., ROM, RAM).
- **I/O Ports and Registers:** Specific memory-mapped areas for interacting with hardware devices.
- **Unused Memory:** Address ranges that are reserved or not accessible for the specific application.
Feel free to ask more if you have any additional questions or need further clarification!