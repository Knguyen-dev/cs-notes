# Embedded Systems

## What is an Embedded System?
An embedded system is a computer system that is integrated into a larger device, often to perform a specific, dedicated function. These systems are "embedded" because they are part of the device's hardware and software, designed to operate independently without requiring user intervention. They are found in a wide variety of applications, such as cars, home appliances, medical devices, and industrial machines.

## Microcontrollers
- Micro-controllers: These are small/micro computers that interact with RAM, ROM, and I/O stuff. They're low cost, small size, and low power consumption. They come in a wide variety of I/O devices, such as different ports, digital to analog converters (DAC) and analog to digital converters (ADC)

For example, a multimeter is an embedded system. It's a electronic machine used to measure voltage. You have some 'inputs' which are the probes you use, then you have an LCD which is used for showing data and the voltage to you. It has a chip inside of it (a micro-controller), such that code has be programmed into the ROM of that chip. As a result, this little chip does a lot of the work 

Software on embedded systems is typically programmed into the ROM (read-only memory), and is therefore fixed. So for a machine, we create the code during hte manufacturing process, and it's not really meant to be changed after. If our software needs to be updated, then we replace the ROM chip, which should update the software that our microcontroller uses.
- Microcomputer: A small computer, in the sense that we can carry it. These are things such as laptops, desktop PC, or but it can refer to a small computer chip.
- Microcontroller: A very small microcomputer that contains all the components of a computer such as processor, memory, I/O, on a single small chip.


## Digital vs Analog Data
- Analog Data: Continuous data that can take any value within a range. Very fine tuned values with theoretically infinite precision. As a result, it's hard for computers to understand them. Examples include sound waves, temperature, and light intensity.
- Digital Data: Discrete data that can take specific values, usually represented in binary (0s and 1s). This type of data is a lot more easy to understand.

- ADC (Analog-to-Digital Converter): Converts analog signals (e.g., voltage from a sensor) into digital data that a micro-controller can process. For example, a temperature sensor might send an analog voltage signal to an ADC, which then converts it into a digital value that represents the temperature.
- DAC (Digital-to-Analog Converter): Converts digital data from a microcontroller into an analog signal. For example, a micro-controller might output a digital audio signal, which a DAC converts into an analog signal that can drive a speaker.

## Ports and I/O Interfaces 
- Port: A physical interface on a microcontroller or computer that allows it to connect to other devices. Examples include USB ports, serial ports, and GPIO (General-Purpose Input/Output) pins. Ports are just a set of pins, so make that differentiation. A pin is one wire on the microcontroller used for input or output, whilst a port is a collection of pins. We use a collection of pins because more pins means faster way of transferring input data or sending out output data. Our ports are then connected together via a bus that's used to transfer data.
- Interface: 'The collection of I/O ports, external devices, and software that allow the computer to communicate to the outside world'. The means by which data is exchanged between a micro-controller and external devices. I/O interfaces can be hardware-based (like ports) or software-based (like communication protocols). So like an interface could literally be using a usb port to download some data to my computer (hard-ware, and some software of course), or just emailing me the data (software mainly).
Types of I/O Interfaces:
  - Parallel: Multiple data lines transfer several bits simultaneously. Faster but requires more connections.
  - Serial: Data is transferred one bit at a time over a single line. Slower but requires fewer connections. Mainly used for communication.
  - Analog: Interfaces that handle continuous signals, such as voltage levels or sound. Could be used to measure analog data, or output analog data.
  - Time-Based: Interfaces that rely on timing signals (e.g., PWM – Pulse Width Modulation). Time can be measured as an input or time can be outputted.
- GPIO (General purpose Input/output): A general I/O port, physical port, on your microcontroller that you can use to connect it to other things with. Your ports are a collection of usually 8 pins that can be used for getting input data or writing output data. For example, `Port A` is an input port, then it'll get 1 byte (8 bits) of data representing something. Else if it's output, then your software would be able to send out 8 bits to that port, which is hopefully connected to some other hardware that can use the data. 

### Data sheets and I/O pin lookups
Use the table of contents on your data sheet. Look up things such as the 'pin diagram', which will be a diagram of your micro-controller chip, with all of the various GPIO pins that it has. 

## Cpu registers
The base unit is a 'latch', which can store a bit. Then we have a register that can store multiple bits. For example a 16-bit register has 16 latches, each latch stores a bit. As a result this register is able to hold a 16 bit binary number. Let's talk about some types:

1. General Purpose registers: Contains data or addresses.
2. Special registers: 
3. Stack pointer:Points to top element of the stack
4. Link register: Store the return location for functions. We write functions a lot, so this stores those?
5. Program counter: Holds the address of the next instruction to run.

- Instruction Set Architecture (ISA): 
  1. Instructions supported on a machine: Adding, subtracting, etc.
  2. Data types supported: Characters, integers, floats, etc.
  3. Registers: What types of registers you have.
  4. Addressing mode: How data is formed.
  5. Memory access: How much data you get get from memory; how you can get data.

- Popular ISAs:
  1. x86: Used popular in desktop computers
  2. ARM: Used in mobile devices
  3. powerpc: Used in automobiles
  4. sparc: Used mainly with computer servers. 

## Device Driver
A device driver is software that controls a specific hardware device. It's the middleman between the OS (or firmware) and the hardware, translating high-level commands into the low-level operations required to communicate with the hardware.

- Bus: Wires that act as a communication system that transfers data between different components inside a computer or between computers. Focusing on the former, it allows various parts of the system, such as CPU, RAM, and IO ports to communicate with each other efficiently. Let's look at some key concepts:
  1. Data bus: Carries the data being transferred between components.
  2. Address bus: Carries the memory address of where the data needs to be.
  3. Control bus: Carries 'control signals' which just coordinate the actions of different components. Such as whether to read or write the data.
  4. Bus width: How much data can be transferred at one time (via our 'Bus' system), which is measured in bits. So a 32-bit data bus can transfer 32 bits of data at once.

### Interrupts
Signals or events that temporarily halt the execution of the current program to address/handle a more urgent task. A signal is sent to the processor to tell it that something has happened.
1. Hardware interrupt: Your interruptions are generated by your hardware components such as sensors, timers, or some other communication peripheral (e.g. a button press).
2. Software interrupt: Generated by your software or exceptions. 


Here's how the process works:
1. Interrupt signal is sent to processor. An interrupt request is the mechanism that sends this to the CPU.
2. Interrupt Service Routine: When an interrupt occurs, processor stops the current execution and jumps to this function or the 'Interrupt Handler'. 
3. Context Switching: Before ISR is executed, the processor saves the state of the current program (context) so it can resume execution later. After ISR completes and interrupt issue is handled, the processor restores the previous state to continue where it left off. 


## Real time operations!
Most embedded system run in 'real-time', so the program is needed to be fast. As a result, we set an upper limit on how long a single input-calculation-output process should take. In any case our real-time system should be able to at least take the 'worse case' amount of time or better. And this time taken is 'latency'. As well as this, other tasks should be performed periodically at roughly equal time intervals. In these cases, we set a limit to keep track of the time error between when a task should be run and when it actually is run.


## Creating Embedded Systems
- Bare-Bones Approach:
  1. Start with a microcontroller that doesn't have a pre-built operating system.
  2. You write all the software to control the hardware, manage the I/O interfaces, and perform the desired tasks.
  3. This approach offers maximum control but requires deep knowledge of both hardware and low-level programming.
- Using a Pre-Built System:
  1. Use a microcontroller or development board with a pre-existing operating system (like an RTOS – Real-Time Operating System) or firmware.
  2. You focus on developing the application-level code, leveraging the OS to manage low-level hardware interactions.
  3. This approach is quicker and easier but offers less control over the hardware.

## Computer Architecture
- Optical devices: Those some kind of sensors we get analog data.
- Analog to digital convert: On the embedded system, we'll have a converter to translate that analog data into something data that our computers can understand. 
- IO Ports: These ports allow the sensor to directly write analog data to our embedded system.
- Bus: Now our embedded system is probably doing some math or something. The bus is sending that data to different parts of the system.
- ROM: Where our code is located. However most controllers will have rom that allows you to store data in-between sessions or power cycles, such tools are EEPROM or flash memory. The former is a style of chip that lets you quickly clear it, whilst the latter is popular since it needs only two transistors to store a single bit.
- RAM: Where data is located. Stuff like allocating variables to memory, storing data in memory, etc. It's volatile and is used for temporarily storing data when the microcontroller and software is running. Stores things such as variables, stack data, etc. 
- Processor: Used to execute the software .
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C2_FundamentalConcepts_files/image006.gif)


### Von Neumann vs Harvard Architecture; ARM Cortexes
- Von Neumann: Uses a single bus system for communicating between different components on your microcomputer. 
- Harvard architecture: The separate buses allow the cpu to fetch an instruction and its data at the same time. Here's a simple breakdown of a 'ARM Cortex - ARM Cortex M4 processor (32-bit): 
  1. ICode bus:  Instruction fetched from ROM
  2. System bus: Data is transferred from RAM and and IO ports using this bus.
  3. DCode Bus: For debugging.
  - Data and instructions are fetched 32 bits at a time, with each byte being a unique address. The memory and I/O ports are 'byte addressable' meaning the processor can read or write 8-bit, 16-bit, or 32 bit data. It gets to choose how many bits it wants to work with, and the amount of course depends on what instructions it's running.

### Registers and interrupts on an ARM Cortex-M Processor
The ARM Cortex-M processor has a set of registers that play crucial roles in its operation:

1. **General Purpose Registers (R0-R12):**
   - Used for holding data or addresses.
   
2. **Special Registers:**
   - **R13 (Stack Pointer, SP):** Points to the top of the stack, essential for managing function calls and local variables.
   - **R14 (Link Register, LR):** Stores the return address for functions and handles special cases during exceptions like interrupts.
   - **R15 (Program Counter, PC):** Points to the next instruction to be executed. It is automatically incremented as the processor fetches instructions.

3. **Status Registers:**
   - **Application Program Status Register (APSR):** Contains flags (N, Z, V, C, Q) that reflect the outcome of ALU operations.
     - **N (Negative):** Set if the result is negative.
     - **Z (Zero):** Set if the result is zero.
     - **C (Carry):** Set on unsigned overflow.
     - **V (Overflow):** Indicates signed overflow.
     - **Q (Saturation):** Indicates saturation in arithmetic operations.
   - **Interrupt Program Status Register (IPSR)** and **Execution Program Status Register (EPSR)** can be accessed individually or combined with APSR as the **Program Status Register (PSR)**.
   - **T Bit:** Always set to 1, indicating that the processor is executing Thumb instructions.

### Interrupts in ARM Cortex-M Processor

Interrupts allow the processor to respond to hardware events. They are key in embedded systems for tasks like periodic actions (e.g., every 1ms) or responding to external inputs (e.g., pressing a switch).

- **Interrupt Service Routine (ISR):** The code executed in response to an interrupt.
- **ISR_NUMBER:** Indicates which interrupt the processor is currently handling.
- **PRIMASK Register:** Controls whether most interrupts are allowed. If bit 0 is set to 1, interrupts are masked (disabled); if 0, interrupts are allowed.
- **FAULTMASK Register:** Similar to PRIMASK but affects both interrupts and faults.
- **Nonmaskable Interrupt (NMI):** A high-priority interrupt that cannot be masked by PRIMASK or FAULTMASK.
- **Interrupt Priority Levels:** On the TM4C123 microcontroller, there are 8 levels (0 is the highest, 7 is the lowest). The **BASEPRI Register** is used to block interrupts of equal or lower priority, allowing higher priority interrupts to proceed.

In summary, the ARM Cortex-M processor uses a combination of general-purpose and special registers to manage data, function calls, and instruction flow. Status registers provide feedback from the ALU, and a sophisticated interrupt system allows the processor to prioritize and handle external events efficiently.