# Combinational Logic

### Theory behind combination logic (blocks)
The logic are just booleans like "True", or "False". Then the combination of logic is combining the logical statements like "True or False", "True and False". Combinational logic is just a binary name. So a block has a name  "101100". If you call it "101100", by its correct name, it outputs 1 (yes). If you call it with the wrong name like "0010", then it outputs 0 (no). 

When calling someone by their name, it takes some time. The longer the name, the longer it takes. Trying to say their name in one second, the person won't understand. However engineers have found a way to do it all in one second. If your name is '1011', then we'll just have 4 inputs. So rather than having 1 input and inserting the bits one by one, we can insert 4 bits.

Let's say the name of a block is `1101`. Then we'd need an input of 4 pins to get a binary response from it. 3 regulars and 1 inverter for the 0.
If you give `1101` it'll be converted to `1111`, as the third pin has an inverter, and the four pins connect to the AND gate. Then we output 1. For any other combinations of bits, it'll return 0.

If your binary block `11010`, we're going to have 5 inputs for our and gate. 
3 regular ones and 2 inverters for the zeros. As a result, inputting `11010` will be converted to `11111`, all ones, so and gate outputs 1. For any other 5 digit binary number that calls this block, it will output zero.

Okay, what's the smallest 5 digit number in base 10? 10000. How about in binary? Well this is '00000'. This makes sense as we don't ignore those zeros.

Consider a block with 2 names `1011` and `0101`. To make this work, we'd just have two AND blocks with their respective and gates. Then we'd connect the result with an OR gate. So if we inputted `1011`, one gate outputs 1 whilst the other outputs 0. But since it's an OR, we output 1, which satisfies.

Let's talk about the four cases:
1. **Multiple input, one output (one combination):** So this would be a single box with a single gate. The case where the block has one binary number as the name.
2. **Multiple input, one output (multiple combinations):** A case where you'd have multiple AND gates connected by an OR gate. So a medium sized box with 2 smaller boxes (our AND gates) inside. Case where block has 2 binary numbers as the name
3. **Multiple input, multiple output (multiple combination):** You have a large box with two medium sized boxes. A given medium sized box contains 2 small boxes.

### Bus (Bundle of Wires)
Let's say we have a block named `1011001`. Instead of drawing 7 input wires, we can draw one wire with a line through it, and the number 7. This is called a bus.
So if we have a bus called A, underneath the abstraction, we should realize there are 7 A wires (A0 to A6).

### Hexadecimal notation
So if we have a block called `0110100011100011`, which is 16 bits. We wouldn't actually write out the entire binary name, that's too long. 
Rather we'd convert that name into hexadecimal. So that block is `0110 1000 1110 0011`, break them up into groups of 4 bits because 1 hex = 4 bits. 
This block is actually `68E3` in hexadecimal. So use the hex value when writing it out, and know that it refers to this binary 
value underneath.

So let's say our bus has 32 inputs, that means the block is 32 bits long. In hexadecimal that would be `ffffffff` 8 hex digits since that 
correlates with 32 bits. 


## 3. Applications of Combinational Logic
So the combinational logic are the binary blocks with the wires, whilst the application of combinational logic is stuff 
as adder, subtractor, encoder, decoder, mux, and demux. So we'll create these components with combinational logic. 

So a 1-bit adder (component that adds 2 1 bit numbers), is just 3 input wires and 2 output wires. The inputs are A, B, and $C_{in} =0$, so there's always 
that implicit carry-in, which is always zero for the first operation. Then you have $C_{out}$ and $S_{o}$.

If you wanted a 2-bit adder (adds 2 bit numbers), then that's just 2 1 bit adders. A 4-bit adder is just 4 1 bit adders, and of course you can scale this up to a 64-bit microprocessor which will use a 64-bit adder 

## Images 
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C4_DigitalLogic_files/image003.gif)
Here we're using 'complimentary metal oxide semiconductors' or P and N channel MOS transistors. A little different, but you'd get what's happening if I told you that it's representing the binary number `01100111`. Anytime we want 0, don't apply voltage. If you want a 1, apply voltage. For this specific setup, it seems that a high output is anywhere between 2.4 and 3.3 volts.

## Takeaway and future motivation
Combinational logic and this metaphor about 'blocks' with binary names is actually the idea of accessing certain places in memory. So if we had a block `1257`, we would call it by its name to access that block. Now accessing it is part of 'combinational logic', then changing its value will come when we learn about 'sequential logic'.