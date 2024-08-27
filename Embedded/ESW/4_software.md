# Embedded Software Development

### How it works:
Here's how software development will work for embedded: The editor will create the source code and convert it into object code. Then this object code is run on a simulator that simulates the electronics or an actual board. Of course you can also 'download' the code onto the board. 

In the beginning, you'll use a breadboard, which is a simple tool that makes it easy to connect wires and components without soldering. It allows you to quickly prototype and test your circuit designs by plugging in components and wires into the holes. Once you've finalized your design and it's working as expected, you can move on to creating a Printed Circuit Board (PCB). A PCB is a more permanent and organized version of your circuit. Instead of using wires, the connections between components are made by conductive tracks printed onto the board. Components are mounted onto the PCB, making it a more professional and reliable way to build and replicate your circuit.

### IDE
When writing software for a microcontroller, you're going to pick an IDE that's closely associated with the specific microcontroller family and tools provided by the manufacturer. For newer stuff a lot of people will use VSCode, which is good, but here are some commonly used IDEs:
### 1. **Microchip MPLAB X**
   - **Microcontrollers Supported:** PIC, dsPIC, AVR, SAM
   - **Features:** MPLAB X is a comprehensive IDE from Microchip that supports a wide range of microcontrollers. It integrates with the XC series of compilers and provides debugging tools and plugins for various development needs.
### 2. **STM32CubeIDE**
   - **Microcontrollers Supported:** STM32 (ARM Cortex-M)
   - **Features:** STM32CubeIDE is developed by STMicroelectronics for STM32 microcontrollers. It combines Eclipse-based IDE, STM32CubeMX (for peripheral configuration and code generation), and a powerful debugging environment.
### 3. **Keil µVision**
   - **Microcontrollers Supported:** ARM Cortex-M, 8051
   - **Features:** Keil µVision is a popular IDE for ARM Cortex-M and 8051 microcontrollers, offering an integrated debugger, compiler (ARMCC), and project management tools. It's widely used in the embedded systems industry.
### 4. **Arduino IDE**
   - **Microcontrollers Supported:** Various (AVR, ARM, ESP, etc.)
   - **Features:** The Arduino IDE is simple and beginner-friendly, supporting various microcontrollers, particularly in the Arduino ecosystem. It's suitable for quick prototyping and educational purposes.
### 5. **Eclipse IDE with GNU MCU Eclipse Plugins**
   - **Microcontrollers Supported:** Various (ARM Cortex-M, AVR, etc.)
   - **Features:** Eclipse IDE can be extended with the GNU MCU Eclipse plugins to support embedded development. It's flexible and supports a wide range of toolchains and microcontrollers.
