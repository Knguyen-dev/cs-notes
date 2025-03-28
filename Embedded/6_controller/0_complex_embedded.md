# Complex Embedded Systems 



## What is VLSI and what are we talking about?
People use transistors to connect stuff on a board. But later we put the circuit inside silicon, this is called an integrated circuit (IC). There are multiple technologies such
as SSI, MSI, LSI, and VLSI. This is just talking about the amount of transistors inside your piece of silicon with VLSI being the most modern and having the most transistors.

When we say "VLSI" we're talking about integrated circuit design. Each IC is basically like a block, like an AND or OR gate, and then those ICs are connected. We use software to draw a circuit diagram/schematic. The people who do circuit designs are PCB/layout engineers. They're the people who create the hardware.

On my laptop I'm going to design some circuits, some gates. I give it to a company, and they give me back an "ASIC". This is a circuit for specific applications and tasks, and it usually can't be changed. 

In another situation you design the circuit on your laptop. Then connect your laptop to a "configurable unit". Then in that circuit module, it connects the existing gates to create the circuit you designed on your laptop.

Then they created **Hardware Descriptive Language** where you write some "code" that describes what kinds of input and outputs should be happening in the circuit. So using Verilog, you're interacting with programmable logic devices, which are components that can have their circuitry changed/configured.

Remember there are **permanent** ICs where they can't be changed, they're set by the manufacturer. This is known as ASIC. Then there are **configurable** ICs, which can change. This is typically known as FPGA. 

Of course there's a third category which is embedded software. You aren't affecting the circuits (not as much, maybe you're activating a transistor or something), but you're accessing data, facilitating data transfer, and writing software that allows various concrete pieces of software to talk to each other.

---
### VLSI vs Embedded System Programming 

With ESP, we sequentially execute code form rom, mess with ram, etc. It's sequential and things are done one by one. It can't do things in parallel. However, with FPGA things can happen in parallel. If we want to add numbers, we add them sequentially in the former case, and in the latter we'd have multiple adders at the hardware level. As a result, it's a lot faster. But why not use FPGA all the time? Well you don't need it all the time and there are other issues:
1. It requires more expertise.
2. It takes time to develop and design.
3. It is costly.


## Embedded System Design

Your microprocessor or microcontroller will communicate with a component that controls something like a motor. That component is a controller, a peripheral controller, or just peripherals for short.

You have a microcontoller. All are basically same (8051, PIC, ARM, etc). They all take input and do output. Then you add other controllers, like timers, lcd, etc.

When you get a microcontroller, you'll probably research what kinds of controllers it already has. How many sensors, inputs, controllers it has. Of course, the more information the microcontroller handles, it'll eventually start getting slower. If performance and speed is that much of an issue, look into buying something faster.

You have a microcontroller and then a camera, or an lcd controller. Your job is to find out how to connect both of these systems. What registers do I need to mess with to setup communication, what protocols are supported? For the LCD, how do I setup the dot matrix, such that it shows information such as the user's balance in their local currency, etc.

Your face is recorded by the camera. THen the camera controller converts your face into data and sends it to the microcontroller

## Hardware/Software Partition
With a regular microprocessor, we can process one item on the conveyor belt for our embedded system.

But the issue is that we're getting sensor data, processing the item, running code to display to the LCD. We aren't fast enough to process if the items come in faster.

Most work is using peripherals and controllers. Timers, LCD, etc. Most of the foundational and hard code has been built. Akin to how you don't need to make your own web framework, you don't need to make your own software that operates on a controller.

---
## Complex Embedded Systems

All components are connected to a **bus matrix**. This is just a more advanced structure that provides interconnected pathways between components. Often used in modern micro-controllers, allowing multiple masters (CPUs, etc) to talk to multiple slaves (memory, peripherals) at the same time.

So your MP1 (microprocessor 1), MP2, MP3, ROM, RAM, etc. are all connected to the bus matrix. Now each microprocessor can access all other components in parallel and things can be done a lot quicker.

Multiple processors (multi-core). If multiple access the same component (such as RAM), then there has to be arbitration to decide what comes first. Like locking in databases. 

For right now, understand that each component has its own base address, and the offsets and how you use this to access different ports.

There's nothing complex. There's just different domains. Of course it'd be tough to go from one field to another. Just take things one step at a time.

## Linux Fundamentals 

### Operating System 
The foundational software that bridges the hardware and other software that the system sues.

### Scheduler 
The component of the OS that's responsible for:
- Managing CPU time by deciding which task/process runs and for how long.
- balances performance (general purpose OS) or ensures timing guarantees (RTOS).  Examples are round-robin, priority based scheduling.

- **General Purpose OS:** Designed for flexibility, multitasking, and prioritizing throughput over strict timing. Examples are like Linux, Windows and MacOS. Things used on PCs, smartphones, etc.
- **Real Time OS (RTOS):** Operating systems that are focused on precise timing requirements. They have "deterministic task scheduling", which means fixed priorities. As well as this, they should be very light-weight since they're being used in embedded systems.
- **Memory Management Unit:** A hardware component that translates virtual memory addresses used by programs into physical memory.
- **Kernel:** Core of the operating system that directly interacts with hardware, manages system resources like CPU, memory, and IO. 


The stack goes:
1. App
2. Operating System
3. Kernel
4. Device Driver (Firmware): This is where you're mainly going to be focusing. You're writing software that interacts with hardware. 
5. Hardware

Balajee believes the roadmap or levels of difficulty is:
1. Embedded System programming
2. Complex applications
3. Advanced embedded applications
4. File handling, networking, debugging.
5. Embedded networking, RTOS applications.
6. Embedded device drivers and embedded linux.


---
## **IoT (Internet of Things)**  
Integration of embedded systems with web applications, enabling devices to collect, share, and act on data over the internet.  

---
### **OSI Model in IoT Context**
IoT systems leverage the OSI model for communication between devices and the internet:  
1. **Application Layer:**  
   - User interfaces, APIs, and protocols like HTTP, MQTT, CoAP for IoT communication.  
   - Handles device data management and integration with cloud platforms.  

2. **Transport Layer:**  
   - Protocols like TCP (reliable) or UDP (faster) to transport data.  

3. **Network Layer:**  
   - IPv4/IPv6 for addressing and routing between devices and servers.  

4. **Data Link Layer:**  
   - MAC addresses and technologies like Wi-Fi, Ethernet, or Zigbee for local communication.  

5. **Physical Layer:**  
   - The hardware medium: wired (Ethernet), wireless (Wi-Fi, Bluetooth), or optical (fiber).  

---

### **Storing Data in the Cloud**
- **Purpose:**  
  Store, analyze, and access IoT data remotely.  
  Examples: Sensor readings, user interactions, and event logs.  

- **Connecting to the Internet:**  
  Embedded systems can connect to the internet via:  
  1. **Ethernet:**  
     - Wired connection for stable and secure data transfer.  
     - Simple to set up using a TCP/IP stack (most microcontrollers support it).  
  2. **Wireless:**  
     - Wi-Fi: Common for IoT devices like smart home systems.  
     - Cellular: For remote locations, using 4G/5G modules.  

- **Protocols for Cloud Communication:**  
  - **HTTP/HTTPS:** For web API interactions.  
  - **MQTT:** Lightweight protocol for constrained devices.  
  - **WebSockets:** Real-time communication for continuous updates.

---

### **IoT Architecture Overview**  
1. **Sensors/Devices:** Collect data (e.g., temperature, motion).  
2. **Edge Computing/Embedded Systems:** Process raw data locally.  
3. **Network Communication:** Send data to cloud servers.  
4. **Cloud Storage/Processing:** Store and analyze data.  
5. **User Interface:** Access via mobile apps, dashboards, or APIs.  
