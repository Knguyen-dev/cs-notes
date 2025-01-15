## Embedded Software Development Process

### How it works:
1. Editor creates source code
2. Compiler creates object code. Compiler may produce a **listing file**, which will be output that shows the addresses and object code associated with each line in the source code.
3. Object code is loaded on a simulator for testing. Or even real board.
4. Code is now programmed on the microcontroller and should work.

You do this with a breadboard. But as you go forward, you'd create a PCB, with the microcontroller. Then you'd have power display, put that in a box. A real embedded product.

#### Extra terms
- **target:** The target specifies the platform on which we will be running the object code. We can choose 'simulator' when testing. With the simulator, we aren't downloading our code onto a board, so we can launch the simulator with 'Debug and start debug session'. The simulator is good, but it has limitations as your projects are going to get more complex.

For a real system use the microcontroller's JTAG debugger as the target. By doing this, your object code is downloaded into the EEPROM of the controller. Most microcontrollers help you download your code onto them, and JTAG is one way to do it. JTAG is a loader and debugger. You'd basically connect with a USB cable between the controller and your machine. Then hit 'Flash and download' to download it. After you'd start the system by hitting the reset button on the board or by doing 'Debug, start debug session' on the uVision IDE.

### Data sheet exercise 
Let's look up the bits in the RCGC2 register on the data sheet. What does it mean if we set bit 0 to high?

1. Do control f in the data sheet for 'RCGC2'. We find that this is 'Run Mode Clock Gating Control Register 2' in the table of contents.
2. So each bit controls the clock enable for a given interface module, etc.
3. Bit 0 controls the clock gating for Port A. If 1, the module at port A receives a clock and functions. Else, the module is unclocked and disabled, which also means a read or write to the module generates a bus fault. Meaning it won't work.

**NOTE:** This makes sense as in micro-controllers, peripherals (e.g. GPIO ports) are controlled by clock signals. If its clock is disable, the whole module, including its ability to read/write data could also be disabled. The peripheral's internal state is basically frozen, since without the clock, the internal circuitry prevents it from responding to external IO. A bus fault is just when your controller or processor tries to access memory or peripherals when they aren't working. 

### Debugging
You should probably already know this but debuggers let your debug your program, a lot easier than print statements. There are two operations:
  1. Step Over: This is when you want to basically skip a function that you aren't testing or you know isn't where the issue is.
  1. Step In: Goes to the next execution line, no skipping anything.