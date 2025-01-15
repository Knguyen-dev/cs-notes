# Intro to micro-processors 

## Human brain metaphor
Our bodies are important. Let's look at at our head, at our brain. Our brain has so many different parts. All of these parts are connected through nodes, neurons, connections, etc. One does most sensory processing, other lets you remember, etc. The frontal lobe does most of the processing, and it is a part of your brain. 
You're on the right track, but let me clarify the roles and differences between these components:

---
### **Microprocessor**
A microprocessor is a general-purpose **processing unit** that handles the execution of instructions from software. It's often referred to as the "CPU" (Central Processing Unit). It does math, and reads and writes data from your memory, and runs the code/instructions in ROM.

It doesn't really have its own memory. I mean it has a couple of registers, but that's just there to store temp values when calculating stuff.

---
### **Microcontroller**
The microcontroller is piece of hardware that contains the microprocessor, alongside stuff like RAM, ROM, GPIO, and other component. Microprocessor can interact with these components and actually do its job since it can mess with RAM, it has ROM to get instructions from, etc.


---
### **Board**
This is a physical piece of hardware that allows you put your microcontroller on, alongside other higher level components. 

## Intro to computers

#### Von-Neuman Diagram
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C2_FundamentalConcepts_files/image009.gif)
Here's a basic diagram for a von-neumann computer, a micro-controller.

1. **Processor:** Your micro-processor. It has its own internal IO devices, even its own internal storage. 
2. **RAM:** The read-write-memory on the microcontroller.
  - **Static RAM (SRAM):** Most microcontrollers use this type of RAM.
3. **ROM:** The read-only-memory on the microcontroller. We write software for embedded systems, and this software goes here.
4. **Bus:** A collection of wires to pass bits between devices or components.
5. Address, data and control: 
  - **Address:** A bus that carries the bits that represents the memory address we want to access. 
  - **Data:** A bus is for writing data to memory to or reading it from memory. 
  - **Control:** The bus that carries bits for indicating whether we're reading or writing from a memory location.
6. **IO ports:** Physical openings. They send data to the bus, or receive data from the bus. These are the interfaces that external hardware and circuits interact with in order to mess with your microcontroller.
- **Von Neumann:** It has processor, rom, ram, and IOi. With Von-Neumann architecture, all information components is connected via the same bus.

----
#### Arm-based Microcontroller Diagram
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C2_FundamentalConcepts_files/image011.gif)
- **Harvard architecture:** Same cIt's distinct since it has separate buses for sending data and sending instructions. Instructions are fetched from flash ROM via the ICode bus. The advantage of having separate buses is that we can have more operations happening simultaneously. You could be receiving an op code at the same time as you're writing data to a memory address.
1. **System bus:** Handles sending and receiving data from RAM and I/O. For example, it'll send values to the processor to add, subtract and whatnot, and it'll receive values to write to certain places.
2. **ICode bus:** Handles fetching and sending instructions from flash ROM. This could be 'op codes' that indicate whether to add or subtract operands or values.
3. **DCode bus, peripherals, and PPB:** 
    - **DCode bus:** Handles debugging. 
    - **Peripherals:** These are hardware modules that are on a microcontroller to handle specific tasks. These often involve interacting with the external world or offloading specific operations from the processor. They're like pre-written libraries in software but exist as physical hardware components. The microprocessor can use these peripherals to perform tasks without implementing everything from scratch in software. Peripherals can be built-in for a microcontroller or just external/attachable. Here are some examples:
      1. **GPIO Port:**  This is built-in but it's used to read digital inputs or send outputs.
      2. **Analog to digital converter:** Also built-in, so it converts analog (continuous) signals, maybe from a temp. sensor, to digital data that a processor can read.
      3. **Temperature sensor:** Measures temperature and sends the data to the processor. This is external, as not every microcontroller is going to need to sense temperature, you'd use this for specific use cases.
    - **Private Periphal Bus (PPB):** A special bus on ARM Cortex-M microcontrollers that gives the processor more access to things. Stuff like system config registers so maybe if you want to configure your system more easily. More ability to debug hardware. Also allows communication with the NVIC, which is responsible for handling and prioritizing interrupts in your system.
4. **Data RAM:** Your read-write memory, the place where it's going to store variables and temporary stuff for your software.

---
#### Explaining interrupts
A way for the computer to react immediately to events rather than continuously checking for them. It will temporarily stop the normal flow of execution in the process to handle that important issue. So when I describe it as a "hardware triggered software function" think of it like this:
  - Hardware: A button press or sensor signal generates the interrupt signal
  - Software: A function called the Interrupt Service Routine (ISR) handles that signal. 

##### Interrupt process step by step
1. Trigger: An interrupt is triggered by an external or internal event.
    - External: Button press, signal from a sensor, or communication from another device
    - Internal: when a timer reaches a certain count, or an error condition occurs (e.g.divide by zero).
2. Interrupt Request (IRQ):
    - The triggering device sends an interrupt request signal to the processor.
3. Processor Response:
    - The process will pause the current task, save its current state, and jump to a predefined **Interrupt Service Routine (ISR)**.
4. ISR Execution:
    - The ISR is a special function designed to handle the interrupt. So if a button is pressed, the ISR could toggle an LED. When the drone releases a package, the ISR could send an email to Amazon services to say that the package is delivered. You should note that the programmer creates ISR functions to handle particular interrupts and events accordingly.
5. Return to normal execution:
    - Once the ISR completes, the processor restores its previous state and resumes its original task as if nothing has happened.

---
#### I/O Ports
![](https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C2_FundamentalConcepts_files/image012.gif)

Here's a diagram for the TM4C123 microcontroller, in particular the system bus and what it's interacting with. Notice that typically, your pins are going to be within groups, and a group of pins makes up a port. With a port you can send and receive a lot of data, or more than doing it with a single pin. You can see that not all GPIO ports have the same size busses. For example GPIO Port A sends and receives 8 bits, whilst GPIO Port C sends and receives 4 bits. In general, you can classify I/O interfaces into 4 categories:
  - **Parallel:** All bits are sent/received at the same time.
  - **Serial:** Bits are sent/received one at a time.
  - **Analog:** Data is encoded as voltage, current or power. So in this case for a computer to understand it, it would need to be converted to digital.
  - **Time:** Data is encoded as a period, frequency, pulse width, or phase shift.


### MP, ASIC, FPGA

Microprocessors are general purpose processors. You use them in smartphones, IoT devices, and other appliances.

An FPGA however is just reconfigurable hardware. It allows us to control and repgoram the logic gates after the hardware has been creaetd. It's good for real time signal processing and high performance computing

Finally an ASIC (Appliance Specific Integrated Circuit) is a custom chip tailored for specific tasks or products..
