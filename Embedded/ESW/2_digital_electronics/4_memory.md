# Digital Memory

## Random-Access-Memory

#### Review on building blocks
If we have 4 bytes of memory, that means 4 location components. Each location has a 8 bit register/latch to it, which is just 8 one bit latches. Each location has a read and write signal (2 bits) that control the output and whether to modify the value in the latch. You have 4 different blocks, so you need $A_{0}, A_{1}$ in order to control which block we are either reading or writing from.

So there are four important components:
  1. Address bytes: Computer will use bits to access/name the exact register it wants to either read or modify from.
  2. Write bit/flag: This is used to see if it's going to write data to a register.
  3. Read bit/flag: Used to see if we're just going to read data from a register. Again only one of the read or write flags can be set, no both, as that would cause the tri-state issue of combining two outputs, and flowing current back into our components.
  4. Data: This n-bit bus or set of wires is going to be used to either send data into the latches to either be modified, or to catch any output from your read operations.

So note the address and data computers are definitely going to send multiple bits, so that's going to be a bus (a set of multiple wires). Let's say there's 8 bytes of ram, that means there are 8 different 1 byte registers that the computer needs to be able to access. Essentially they'll need $n$ address related bytes to be able to access $2^{3} = 8$ different registers. As well as this, if the data bus can send 8 bits, then your registers are going to be 8-bit registers. Ram is the temporarily (volatile) form of storage on your computer. Here you're temporarily storing bytes, until your computer shuts down.

#### Misnomer of RAM
RAM means 'Random Access Memory', but it's not like you're randomly accessing memory without any control on where you can access. Ideally it should have been named, read and write memory since we can read values from storage and also update values from storage. They called it 'random' because data can be quickly read and modify in any order, without having to go through a sequence of other locations to reach the one you want.

## Read-Only-Memory

### A quick summary
ROM (read-only-memory) is just data that once set, typically can't be re-written or modified. Early days, they attached fuses to the transistors so once they wanted to store data, they'd blow the fuse, this would remove the transistor from voltage, locking the latch in. This is usually stuff like data on a chip that a manufacturer put in that's literally critical to the operation, and that there's no reason to change it. Usually they use "PROM" (programmable read only memory), which makes it easy for manufacturer to manually write in data, or re-write data if they made a mistake for something. Good for testing and also updating software on a machine. Though the updating does require significant effort.

You can create these with a bunch of transistors that are open when they aren't being written to and closed, when you want to write to that read only memory. This is called "EPROM" (erasable programmable read only memory). These come in two types:
  - EEPROM (Electrically erasable)
  - UV/EPROM (UV erasable)
You know how MOSFET transistors can store charge like a capacitor? Well these ROM types will use this charge to either open or close, allowing for reading or writing data into their latches. 

Once you pass the UV ray the fuse will come back. But they stopped wanting to use UV prom. Then they came up with EEPROM. One of the downsides to EEPROM is that data had to be erased line by line, very slowly. So instead they came up with flash rom to erase data block by block, which was a lot faster.

Okay let's review:
1. Rom: No change
2. (OTP) PROM: One time change
3. EPROM (UV): Erasable and programmable with uv rays.
4. EEPROM: Electrically erasable, line wise
5. Flash (Block EEPROM): Block erasable.

ROM is called non-volatile is because even if you remove hte power from your machine, laptop, etc. The data in the rom is still maintained, as opposed to RAM which would be cleared.


## Sequential Access Memory (SAM) vs Random Access Memory (RAM)
In order to access a certain address in memory, you need to scroll through the memory addresses before it or in between. You can't simply just to go that addresses instantly/directly. If you're at 500 and want to read 555, you only need to go 55 positions. If you're at 0 and want 1000, that's going to take longer.

With RAM, you can access any location in memory directly, without having to go through other addresses. 

## RAM, ROM, and RWM (Technicalities)
I mean ROM is also 'random access', you can also access memory addresses directly. The only difference with the typical ram we see is that it's read only, whilst typical RAM is read and write. So let's set stuff in stone:
  1. RAM: Conventionally, it refers to read-write-memory, the volatile stuff. However in technicality, both RWM and ROM are random access.
  2. ROM: Read only memory. It is random access, so it technically is a form of RAM. 
  3. RWM: Conventionally, this is what people think of when they talk about ram. This is volatile memory that can be read and modified whenever, and yes it is random access. 


### RAM, ROM, and Microprocessors (A preview)
Let's say you have a microprocessor that connects to ROM, ram, input and output (latch and tri-state related). It does this via some combinational logic to see which component it's going to access. Then all of these components are going to form the 'micro-controller'! 
```C
int x, y;
x = 10;
y = x * 2;
```
  - ROM: C code that you want the microprocessor to use would be converted into binary data, and then stored in ROM.
  - RAM: This would store any variables or memory used in your C code. In this case integers x and y.

**NOTE:** You do not store files or programs in ROM. That is an entirely different thing called storage, hard disk, solid-state, etc. 



## Review of what we know so far
1. Digital Electronics: Switches controlled by voltage rather than controlled manually.
2. Logic Gates: With switches, we created logic gates.
3. Logic functions: Combinational, sequential and tri-state logic. The first was really helpful with the metaphor of blocks with binary names, as that built up to the idea of accessing memory addresses associated with registers. Sequential logic as good as it set the stage for storing binary values, what's the next value based on current input and previous values. Then tri-state logic brought it together with how we can safely combine multiple outputs. This lead to the idea of building a byte of ram, where we had an enable, control, and data, which allowed us to read a register, but also write to it.