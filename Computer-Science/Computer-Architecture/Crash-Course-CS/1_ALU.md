# Arithmetic Logic Unit

## What is it?
The ALU is a component in the computer that handles numerical and logical operations. It consists of the 2 parts:
- arithmetic unit: Responsible for handling adding and subtracting. At the simplest, we're doing binary addition, and the group of logic gates that do this 'adding' are called adders. 
- logic unit: Evaluates logical operations such as ADD, OR, NOT, etc. 

## Abstraction
A group of logic gates to do simple addition between 2 bits, is abstracted into an adder, and as adders get more complex we need more logic gates for things to work. We abstract this stuff when designing circuits and computers, as it's more readable and better to think of stuff as 'adders' that are made up of logic gates. And it's easier to think of those groups of transistors as 'logic gates'.

Even an 8-bit ALU, which is designed to handle operations on 8-bit binary numbers, would have hundreds of logic states, and so it's abstracted. It's a component that takes inputs A and B (1 byte each). Then we use an operation code (4 bits) that indicates whether we're adding or subtracting, and the output of such is 1 byte as well. Each ALU will have flags (1 bit each) to see if something has overflowed, the result is equal, or negative. Of course there are more flags in modern ALUs, but this is the baseline.