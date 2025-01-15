
# Overview of IO Ports
The typical function of a pin to perform parallel I/O (working together with other pins that make up the port), but most pins will have alternative functions or extra capabilities. For the TM4C123 microcontrollers, the port pins PA1 and PA0 can be used as asynchronous serial ports called universal asynchronous receiver/transmiter. Let's look at some common IO ports that you can find on any microcontroller, some you've may have already seen before:

### Serial vs Parallel Communication
Let's say you want to send 8 bits. If you use parallel communication, all bits are sent and received simultaneously. That's a wire per bit, so that's 8 wires to send that data. What if you wanted to send 16 bits? If you wanted to send in parallel, that's 16 cables, and generally we want to use the least or most efficient amount of cables as possible.

If you sent the data serially, you'd use one cable, and send the bits one by one. But this will be slower. With parallel communication, a single clock pulse was needed to send those 8 bits. However with serial communication, we need a clock pulse to send a single bit, totaling out to 8 clock pulses for one byte of data.

---
### Synchronous, Asynchronous, and Clock Pulses?
Clock pulses have been mentioned before with flip-flops in the digital electronics section, but a microcontroller can have a 'clock' or a thing that emits a sequence of electric pulses. This is done to keep separate operations in sync and to do things related to timing. 
- **Synchronous Communication:** Uses the clock in order to send data.
- **Asynchronous Communication:** Doesn't need the clock to send data. Since we don't have a clock, we need to establish when one bit will end, and when the next one begins.


---
### Joint Test Action Group (JTAG)
Joint Test Action Group (JTAG) is the standard port for debugging and testing microcontroller code. As per the IEEE standard, a JTAG port will only have 5 pins. You should note that technically you can use the JTAG pins for other general IO tasks, but generally this isn't recommended. 


---

### **Universal Asynchronous Receiver/Transmitter (UART)**  
**UART** is an asynchronous serial communication protocol primarily used for one-to-one communication. It enables two devices to exchange data using only two wires:  
- **Tx (Transmit):** Sends data.  
- **Rx (Receive):** Receives data.  

#### **Key Features of UART:**  
1. **Asynchronous Communication:**  
   - No shared clock between sender and receiver.  
   - Both devices must predefine and agree upon settings like transmission speed (baud rate), data length, and start/stop bits.

2. **Configuration Parameters:**  
   - **Transmission speed (baud rate):** Number of bits sent per second, e.g., 9600 baud.  
   - **Data length:** Typically 8 bits per data packet.  
   - **Start/Stop bits:** Used to synchronize communication. A start bit (0) signals the beginning of data, and a stop bit (1) signals its end.

3. **Data Transmission Process:**  
   - The line is idle at a high voltage (logic 1).  
   - Communication begins with a **start bit** (0).  
   - Each data bit is sent in sequence, with a delay determined by the baud rate (e.g., 104 microseconds per bit at 9600 baud).  
   - A **stop bit** (1) concludes the transmission.  

4. **Full Duplex:**  
   - Both devices can transmit and receive data simultaneously.  

#### **Use Cases:**  
- GPS modules, Bluetooth modules, and long-range communication where simple and reliable data exchange is required.

---

### **Inter-Integrated Circuit (I2C)**  
**I2C** is a synchronous serial communication protocol designed for communication between one or more master devices and one or more slave devices using only two wires:  
- **SDA (Serial Data):** Transfers data.  
- **SCL (Serial Clock):** Synchronizes communication.

#### **Key Features of I2C:**  
1. **Synchronous Communication:**  
   - A shared clock ensures synchronization between sender and receiver.  

2. **Addressing:**  
   - Each slave device has a unique **slave address**.  
   - The master specifies the target slave's address along with the data.  

3. **Configuration Parameters:**  
   - **Data length:** Number of bits in a transmission.  
   - **Clock frequency:** Determines the duration of each bit.  

4. **Master-Slave Architecture:**  
   - Typically, one master initiates communication, but I2C supports multiple masters.  
   - Multiple slaves can be addressed individually.  

#### **Use Cases:**  
- Sensor data transfer, display configuration, and communication with integrated circuits (ICs).

**NOTE:** When we say "chip to chip" communication or communicating with other "integrated circuits" that means a lot. Communicating with other chips could mean other microcontrollers, microprocessors, sensors, memory modules, etc. Any system that has a chip to collect data, processing chip to analyze data, or a memory chip to store data.


---

### **Serial Peripheral Interface (SPI)**  
**SPI** is a high-speed serial synchronous communication protocol that enables full-duplex communication between devices using four wires:  
1. **SCLK (Serial Clock):** Provides the clock signal to synchronize data transfer.  
2. **MOSI (Master Output, Slave Input):** Master sends data to the slave.  
3. **MISO (Master Input, Slave Output):** Slave sends data back to the master.  
4. **CS (Chip Select):** Selects the target slave device.

#### **Key Features of SPI:**  
1. **Full Duplex Communication:**  
   - Simultaneous data exchange in both directions.  

2. **Synchronous Communication:**  
   - Uses a shared clock for precise timing.  

3. **Fast Data Transfer:**  
   - Suitable for high-speed communication.  

4. **No Addressing:**  
   - Unlike I2C, SPI uses the **Chip Select (CS)** line to identify the target slave.  

#### **Use Cases:**  
- Flash memory, EEPROMs, and chip-to-chip communication.

---
### **Comparison: UART vs. I2C vs. SPI**  

| Feature                | **UART**                          | **I2C**                          | **SPI**                          |
|------------------------|------------------------------------|-----------------------------------|-----------------------------------|
| **Type**              | Asynchronous                     | Synchronous                      | Synchronous                      |
| **Wires**             | 2 (Tx, Rx)                       | 2 (SDA, SCL)                     | 4 (SCLK, MOSI, MISO, CS)         |
| **Communication**     | Full duplex                      | Half duplex                      | Full duplex                      |
| **Speed**             | Slow                             | Medium                           | Fast                             |
| **Addressing**        | None                             | Slave addresses                  | Chip Select (CS)                 |
| **Use Case**          | Long-range, simple data exchange | Sensors, IC configuration        | High-speed chip-to-chip transfer |

---
### **Timer**
A **timer** is a hardware peripheral used to measure time or generate specific time intervals. Timers are useful for a variety of applications, such as:
1. **Measuring time intervals:** For example, calculating the duration of an event.
2. **Generating periodic signals:** Like blinking an LED every second.
3. **Delays:** Creating a delay between actions in a program.
4. **Triggering events:** For example, starting a process after a specific time.

Timers can operate in different modes:
- **One-shot mode:** The timer triggers an event once after a specified time.
- **Periodic mode:** The timer repeats its event at regular intervals.

Example: If you want to blink an LED every 500ms, a timer can help you achieve this by creating a 500ms delay repeatedly.

**NOTE:** A timer is different from a clock as it uses the clock's signals to perform time-based operations.


---

### **Pulse Width Modulation (PWM)**
**PWM** is a technique used to control the power delivered to a device by rapidly switching the power on and off. Instead of lowering the voltage directly (which often isn’t possible), PWM changes the **duty cycle**—the percentage of time the signal is "on" in one cycle.

- **How it works:**
  - The signal alternates between ON (high) and OFF (low).
  - If the ON time is longer than the OFF time, the device (e.g., LED) appears brighter.
  - If the ON time is shorter than the OFF time, the device appears dimmer.

Example: If you want an LED to appear dimmed, you might use a 25% duty cycle (ON for 25% of the time, OFF for 75%).

---

### **Analog to Digital Converter (ADC)**
An **ADC** converts an analog signal (a continuous signal like voltage from a sensor) into a digital value (discrete numbers that a microcontroller can process).

- **Use Case:** Reading data from analog sensors like temperature sensors, light sensors, or microphones.
- **Example:** A temperature sensor outputs 0-5V depending on the temperature. The ADC converts this voltage to a digital number (e.g., 0-1023 for a 10-bit ADC), which represents the temperature.

---

### **Digital to Analog Converter (DAC)**
A **DAC** performs the opposite of an ADC: it converts digital values (numbers) into analog signals (continuous signals like voltage or current).

- **Use Case:** Generating analog outputs like audio signals, controlling motors, or dimming lights smoothly.
- **Example:** A DAC takes a digital audio file and converts it to a continuous signal to drive a speaker.

---

### **Analog Comparator**
An **analog comparator** compares two analog voltages and outputs a digital signal indicating which voltage is higher.

- **Use Case:** Detecting thresholds or events.
- **Example:** If you have a sensor measuring voltage and you want to detect when it exceeds a certain threshold, the comparator outputs a high signal when the sensor voltage is greater than the reference voltage.

---

### **Quadrature Encoder Interface (QEI)**
A **QEI** is a peripheral used to interface with a quadrature encoder, a device that tracks the position and speed of rotating machinery.

- **How it works:**
  - Quadrature encoders produce two signals (A and B) with a phase difference.
  - The QEI interprets these signals to determine the rotation direction and speed.
- **Use Case:** Monitoring the position of motors in robotics or controlling the wheels of a robot.

---

### **Universal Serial Bus (USB)**
**USB** is a standardized protocol for connecting devices and transferring data. It's widely used for connecting peripherals like keyboards, mice, and storage devices to computers.

- **Features:**
  - High-speed data transfer.
  - Power delivery for charging devices.
  - Universal compatibility.

Example: A USB drive allows you to transfer files between devices.

---

### **Ethernet**
**Ethernet** is a communication protocol used for wired network connections. It provides a stable and reliable way to connect devices to a local area network (LAN).

- **How it works:**
  - Devices are physically connected using Ethernet cables.
  - Data is transmitted in packets over the network.

Example: Connecting a desktop computer to a router using an Ethernet cable for high-speed internet access.

---

### **Controller Area Network (CAN)**
**CAN** is a robust communication protocol designed for connecting multiple devices (nodes) in systems where reliability is critical, such as in vehicles.

- **Features:**
  - Each node can send and receive messages without a central controller.
  - Messages are prioritized, ensuring critical data gets transmitted first.
  - It is fault-tolerant, meaning it can continue functioning even if some nodes fail.

- **Use Case:** 
  - In cars, CAN is used to allow the engine, brakes, and other systems to communicate efficiently and reliably.
  - In industrial machinery, it connects sensors and actuators.


## Takeaway
While it's ideal that you have an idea of all of these, It's okay if you forget. You can come back here as a reference, as the main ideas we want to focus on are in the next section. As we move forward we're going to go deeper into learning about IO ports. We'll learn about the Tiva Tm4C123's IO pins.

