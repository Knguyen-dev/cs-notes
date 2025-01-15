
## IO Pins and Buses 

### I/O Bus Basics 
We already know that the bus is a system that transfers data between different components. An **I/O bus cycle** is just a single transaction where the microcontroller reads from or writes data to an I/O peripheral.

### IO Pins and many functions 
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/c6-image001.gif)

For most microcontrollers a given pin can have many different functions related to input and output. For example looking at the family of LM4F/TM4C launchpads these are the different pin functions:
    - Digital I/O: Can send and receive digital signals (0s and 1s).
    - Analog input: Can receive analog/continuous data.
    - Timer I/O: Can send and receive signals from a timer
    - Serial I/O: Can send and receive data serially.
For the Cortex-M4, the microprocessor on these micro-controllers, has 2 buses for I/O. The digital IO ports can connect at both buses, but the main idea of having 2 buses is to be able to perform I/O bus cycles and instruction fetches from flash rom simultaneously. They're able to send/receive data (I/O operations) while executing the software located in the ROM. This is possible by having two buses that don't conflict with each other.

### Difference between the two buses
1. **High-Speed Buses (e.g., Advanced High Performance Bus)**:
   - **Purpose**: Designed for **performance-critical components** that need high data throughput, such as memory, DMA controllers, and high-speed peripherals.
   - **Pros**:
     - Higher bandwidth for faster data transfer.
     - Supports wider data paths and more complex operations (e.g., burst transfers).
     - Direct access to the CPU for time-sensitive operations.
   - **Cons**:
     - More complex design and higher power consumption.
     - May not be necessary for low-speed peripherals, making it less power-efficient.

2. **Low-Speed Buses (e.g., Advanced Peripheral Bus)**:
   - **Purpose**: Used for **low-power peripherals** that don’t require high data transfer rates, such as GPIO, timers, and UART.
   - **Pros**:
     - Simpler design and lower power consumption.
     - Easier to implement in peripherals with limited functionality.
   - **Cons**:
     - Lower bandwidth and slower data transfers.


### Overview of Ports and Pins
So yeah a given pin on a port can do both input and output. Software can read from a port. Software can also write to a port. Data is sent to a register and that register sends data to the pin. To control whether we're reading or writing, we have a **direction register**. This register controls the transistor that sends the data out. If the direction register holds 0, the transistor is open, and so the voltage from the write port is never sent out to the pin. At the same time though, it is now safe for voltage and data to come through the pin and flow into the read port. So that 3.3 or 0 volts entering the pin will map to a 1 or 0 respectively. 

Else, if it holds 1 (output mode), the transistor is closed, and so the voltage at the write port reaches the pin, sending the data out. So that 0 or 1 you send is going to be converted to 0 or 3.3 volts respectively. Also you can technically still read data if you're in write mode. **NOTE:** Remember that writing to the output port once means that the bits that you send are still in that D-flip-flop, so it remains there until you write something different onto there.

#### IO Ports Example 1 Diagram
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fig02_27_IOport.jpg)
- **n**: Number of bits being read or sent
- **Write to port direction register:** This bit controls whether the port is getting input (0) or sending output (1). 
- **Write to port address:** The output bits that come from the bus and that the device wants to send out. 
- **Read from port address:** The input bits being received from the port, and are being sent to the bus.

#### IO Ports Example 2 Diagram
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Table6_1.jpg)

Kind of confusing table but here's what we need to know from it:
    - There are 43 port pins. We exclude pins PC3-PC0 since they're associated with the JTAG debugger port.
    - They can all be used for GPIO.
    - Port pins can be or have alternate functions. Some of these alternate functionalities are for other communications SPI, UART, ADC (Ain), PWM, and timer. SO this table shows the possible alternate functions for a given pin. 
The numbers in the pin function names, like `U0Rx`, `CAN1Rx`, `I2C1SDA`, or `M1PWMM3`, are **not arbitrary**; they usually indicate a specific **module instance** or channel number within the microcontroller. Here's a breakdown to clarify:

**NOTE:** The label **Ain** means "Analog Input". When this label is here, it means that the pins can be used to receive analog values that can then be converted into digital values via the microcontroller's ADC peripherals.

---
##### **Example 1: Pin `PA0`**
- **`U0Rx`:** 
  - `U` stands for **UART**.
  - `0` indicates **UART Module 0** (microcontrollers often have multiple UART modules: UART0, UART1, etc.).
  - `Rx` stands for **Receiver Pin** (used to receive data).

- **`CAN1Rx`:**
  - `CAN` stands for **Controller Area Network**.
  - `1` indicates **CAN Module 1** (microcontrollers can also have multiple CAN modules: CAN0, CAN1, etc.).
  - `Rx` means it is the **Receiver Pin** for CAN communication.

---
##### **Example 2: Pin `PA7`**
- **`I2C1SDA`:**
  - `I2C` stands for **Inter-Integrated Circuit Protocol**.
  - `1` indicates **I2C Module 1** (again, microcontrollers can have I2C0, I2C1, etc.).
  - `SDA` stands for **Serial Data Line**, the wire used to transfer data in I2C.

- **`M1PWMM3`:**
  - `M` stands for **Motor Control/Pulse Width Modulation (PWM)**.
  - `1` indicates **PWM Module 1**.
  - `M3` specifies **PWM Channel 3** within that module.
##### **Why These Numbers Exist**
1. **Multiple Instances**:
   - Many microcontrollers support multiple hardware modules for a given protocol. Typically a UART module supports one communication line at a time, so if you needed multiple, then you'd have multiple UART modules.  For example:
     - UART0, UART1, UART2 for multiple UART connections.
     - CAN0, CAN1 for multiple CAN buses.
     - I2C0, I2C1 for multiple I2C interfaces.
   - The numbers distinguish which module the pin is connected to.

2. **Flexibility**:
   - Pins are often **multi-functional**, meaning they can serve different purposes depending on how you configure the microcontroller.
   - The numbers help identify the exact function/module/channel you want to use.




### Using registers and setting up pins

#### Using registers
You're going to see a lot of registers, so just look them up in the data sheet. In the data sheet there are going to be a lot of different registers like we've seen CPU registers when we talked about Assembly, but here we're talking about IO so we'll deal with IO registers.
- `GPIOAFSEL` (Enable Alternate function): If 1 then the pins use alternate functions, else 0 means use gpio. Each GPIO port will have its own AFSEL register, and it can be addressed using various addresses that will be provided. Then target a specific pin by selecting the corresponding bit in the register. If you want to select Pin 2 in GPIO Porta A to use an alternate function, set bit position 2 to 1
- `GPIOAMSEL` (Analog Mode Select): If 1 then analog IO is activated for this pin. Else 0, which means it's disabled. Then you can try to activate for digital IO.
- `GPIODEN` (Digital Enable): If 1, digital functions for the pin are enabled. Else digital functions are disabled. This is just talking about digital IO. So if this is diabled, then it won't receive logical/digital (1 or 0) onto the pin and won't send digital info.
- `GPIOPCTL` (Port Control): Used in tandem with `GPIOAFSEL` to select which peripheral function or alternate function is used for a givne pin.

At least this is what I understood from using the data sheet.

#### Example: Configuring UART7 on PE0 and PE1
1. Set bit positions 1 and 0 in `GPIO_PORT_DEN_R` register (Enable Digital):
    - This register controls whether each pin is enabled for digital IO. So setting these specific bits will have our pins work with digital IO.
2. Clear bit positions 1 and 0 in `GPIO_PORTE_AMSEL_R` register (Disable Analog):
    - Clearing these bits makes the pins work with digital IO. This is of course needed for UART, which is based on sending digital info.
3. Set PMCx bits in `GPIO_PORTE_PCTL_R` register to `0001` (Enable UART functionality):
    - To use PE0 and PE1 for UART7, you need to set the bits in `GPIO_PCTL` that correspond to the UART function for these pins.
4. Set bits in `GPIO_PORTE_AFSEL_R` (Enable Alternate Function):
    - The `AFSEL` register enables alternate functions for pins. So setting the bits corresponding to these pins to 1 will enable them to perform their alternate functions. If you set their bits to 0, then it makes the pin function as standard GPIO.
    
#### Talking about ADC one more time
The Analog-to-Digital converter samples the analog signal from the pin and converts it to a digital value by 'sampling' the voltage at regular intervals.
1. Pin configured for analog input
2. Analog signal is received:
    - Analog signal from the pin is sent to ADC. So it doesn't enter the bus, it needs to be converted first.
    - ADC converts it to a digital value.
3. Digital signal is outputted from ADC and is available for further processing.


#### Example 2: Analyzing the launchpad
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fig06_05_LaunchPad.jpg)


- **Serial Link:** This is a physical UART port created by two pins PA1 and PA0.
- **USB:** Created by 4 pins. There are 0-ohm resistors, for two pins, so if you want those pins connected and USB working, then have those resistors on. The LaunchPads actually come with them removed so yeah.
- **Pull-up/Pull-down resistors:** These are resistors that are used to ensure a GPIO pin is at a defined logic level (HIGH or LOW) when there's no signal going towards it. If a GPIO isn't connected, it's voltage is undefined, which leads to erratic behavior. 
    - **Pull-up**: By default, high signal (it pulls things up by default). When you supply a HIGH voltage to it, it remains high, nothing really happens. However if you apply a low voltage 
    signal then it changes to low.
    - **Pull-down:** By default, it's a low signal. When low voltage is applied, it remains a low signal, but if you apply high voltage then it turns into a high signal. Basically with these resistors if nothing is connected they maintain a high or low state, preventing electrical noise from other devices from pushing things around. Then when you connect things you can basically control whether you want high or low at that point.
    - **External:** Physically added to the circuit and can be removed.
    - **Internal:** Resistors are built into the circuit, and can be activated when setting bits in a register.
- **0-Ohm Resistors:** Basically a wire in the form of a resistor. Many PCBs use it as a jumper cable, allowing designers to modify circuits without redesigning the PCB. All you need to know is that if you remove the 0-ohm resistor, you break the connection between two points, just as if you had cut the wire. This disconnects whatever circuits or components was on the other side of the resistor. However, removing the 0-ohm resistor doesn't always just disconnect everything. 
    - **NOTE:** You should note that pull-up/down resistors have non-zero resistance, so they are different from the 0-ohm resistors.

- **Physical switches:** It has two switches which are "negative logic", meaning they're off by default. You'll activate internal pull-up resistors by setting bits 0 and 4 in `GPIO_PORTF_PUR_R` register.
- **LED Interfaces:** PF1 to PF3 are the interfaces for the LEDs. This is easy, you just need to apply voltage (HIGH signal) to the respective transistor for the switch to be closed, and for the led to activate!




## Digital Circuits and IO
Okay we got really theoretical and complex with that last one. Let's start over simple again.

- **Parallel IO Port:** A port that allows us to transfer multiple bits of data simultaneously. As opposed to serial ports, which transfer one bit at a pin, and at that point it's just a single pin. 
    - **Input Port:** For read only, so writing to this usually does nothing. Just know the existing digital values on the input pins are copied when the software does a read from the address.
    ![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fig06_6_inputPort.jpg)

    - **Readable output port:** Can do both read and write. So when you write, data from the bus is saved into the D flip flops.
    ![alt text](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fig06_7_outputPort.jpg)

---
### Direction Registers 
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fig6_7_IOport.jpg)
We use a direction register to control whether we're accepting input or sending output. This controls the nature of our bi-directional pins, and therefore changing the nature of the port that they make up.

### Initializing a parallel port with code
Let's pretend you have some code. Here are the things you'll need to know:

You're definitely going to have constants defined, with the memory addresses of the registers. Each IO device has a clock that we need to turn on.

So with every port, there are related registers:
  - **Direction Register (DIR):** At some memory address. Let's say we're working with Port F, which has 5 pins. It's going to have bits with positions 0, 1, 2, 3, and 4 that correspond to those pins. Pins are either input or output. Pins 0 and 4 are connected to switches which are input. Then pins 1,2,3 are LED related, which are output. If you want a particular pin to be input, ensure the bit related to it is 0. Else if you want it to be output, make the bit related to it 1.
  - **Enable Register (DEN):** This activates whether or not the pin has digital IO capabilities, basically allowing you to enable or disable the core functionality of a pin. Because pins that's what pins do, send out digital data. So to make sure things work, ensure the bits for these pins in this register are set to 1.
  - **Clocks:** Each device has a separate clock that can be turned on. So find the clock register where you can set a bit, and enable the clock for port F. This takes about 3-5 cycles for the clock to stabilize and work, so you're probably going to set a 5 cycle delay to ensure the clock works before moving to your main code.

There are two pins that we need to "unlock". These are:
1. PF0: Port F bit 0
2. PD7: Port D bit 7

Focusing on port f, in the code you'll unlock it by writing a magic number into lock register. After it's unlocked, only then are we able to make changes to the 5 bits in Port F. Remember to disable analog mode, as we're dealing with digital data, and make sure alternate function mode is off, since we're using these as regular GPIO. For the direction register,write `0x0E` which corresponds to `01110` for the 5 bits. Finally you'll see us enable the internal pull-up resistors for Pf4 and PF0

---
### Initializing Port F Review:
To make our software readable, we have constants for definitions and registers related to the IO ports. Here's a review of what we used to initialize port F:
  1. **GPIO_PORTF_DIR_R:** The direction register we used to indicate which pins were input and output.
  2. **GPIO_PORTF_AFSEL_R:** We used this if we wanted to activate alternative functions. We didn't, so we we kept all available bits to 0.
  3. **GPIO_PORTF_DEN_R:** Regardless of whether we wanted GPIO or alternative functionality, these pins need to be able to handle digital data, so we used this register to set all bits so tha tall pins are using digital data.
  4. **GPRIO_PORTF_DATA_R:** Use this register to set values to your pins in port F. You can send output to turn on or off an LED switch, etc. But also, when you read data, you're going to access this register to see what data you got.