# Registers and ram

## Latches and Registers
In digital electronics, a latch is a basic memory component made from a combination of logic gates. A latch can store one bit of data—either a 0 or a 1. By controlling the input to the latch and deciding when to write to it, we can "open" the latch to store a bit and then "close" it to keep the bit stored.

A collection of latches forms a register, which holds a single number in binary form. The number of bits in a register is referred to as its width. Historically, computers had 8-bit or 16-bit registers, but modern systems typically have 32-bit or 64-bit registers, which is why they are called 32-bit or 64-bit systems.

In a 64-bit register, for example, there are 64 latches, each storing one bit. This allows the register to hold a 64-bit binary number, which can represent a wide range of values, supporting larger numbers and more precise calculations. Then your registers could be memory cells, and then many memory cells make up a ram module/stick

## Organizing Latches into a Memory Array
Imagine organizing these latches into a grid, like an 8 by 8 matrix. This grid would have 64 latches in total. To store data, you would write to one of these latches in the grid. Each latch in the grid has a unique location, which can be identified by a memory address.

For example, if data is stored in the latch located at row 2, column 4, the binary representation of 2 (row) is 10, and the binary representation of 4 (column) is 100. Combining these gives a memory address of 10100. When you want to retrieve the stored bit, you refer to this memory address to identify the exact latch.

- 'Writing': The idea of sending data to be stored into memory.
- 'Reading': Getting data out of the stored memory.
## Multiplexers
A multiplexer (or MUX) is a component that helps decode the memory address to find the specific row and column in the grid of latches. Two multiplexers can be used—one to identify the row and one to identify the column—enabling the system to access the correct latch and read or write the desired bit of data.

## Memory and RAM
This concept of organizing latches and accessing them via memory addresses forms the basis of how RAM (Random Access Memory) works in computers. In early computing systems, memory was much smaller, often measured in kilobytes (thousands of bytes), where each byte is 8 bits. Today, modern RAM sticks can store gigabytes of data, far exceeding the capacity of early systems. For example, 1 gigabyte (GB) is equivalent to approximately 8 billion bits (8,589,934,592 bits to be exact). This vast amount of memory allows computers to handle complex tasks, run multiple programs simultaneously, and store large amounts of data temporarily while in use.

