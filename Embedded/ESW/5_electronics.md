# Intro to Electronics
Let's get an overview of how electronics and circuits work:
- Understand current, voltage, power, and energy.
- Learn Ohm's law, and then Kirchoff's laws for voltage and current in order to analyze circuits.
- Then understand circuit configurations like 'voltage dividers' and 'current dividers'.
- There are a couple of other ideas and concepts, mainly in the section where we talk about extra electronic components. But treat those are extra fluff. 

## Electricity
### What is electricity? Electricity types
The flow of electric charge, typically by electrons, through a 'conductor' such as a wire. It powers our electronics. There are two main types of electricity:
- **Static Electricity:** This is the electricity that results from an imbalance of electric charges on the surface of a material. Here, electrons don't flow continuously as they would through a wire but instead accumulate in one place. On an atomic level, when an atom has more electrons than protons, it carries a negative charge. If it has more protons, it carries a positive charge. Atoms and objects naturally seek balance, so if there's a charge imbalance, the electrons will try to move to an area with fewer electrons to restore equilibrium. If you've ever felt a small static shock, it means the object you touched was negatively charged, and you were positively charged (or vice versa). The shock you felt was due to electrons moving quickly from the object to you, or from you to the object, to balance out the charge difference.
- **Dynamic Electricity (Current Electricity):** The continuous flow of electrons through a conductor, such as a wire. This is used to power devices, as the electrons move through the circuit to provide energy and keep the device operational. There are two types of current electricity: direct current (DC), where electrons flow in one direction, and alternating current (AC), where electrons periodically reverse direction.

### AC VS DC:
- **Alternating current**:
  1. Commonly found in walls and wall outlets. These outlets output AC.
  2. Powers big appliances such as refrigerators, stoves, etc. Things that we have to kee plugged in. 
  3. With alternating current, the direction of the current is going to alternate frequently each second.
- **Direct current**:
  1. Comes from things such as batteries.
  2. Powers smaller devices such as phones, flashlights, etc. Those all use batteries, so they use DC. AC can be converted to DC, and vice versa. So when you plug your phone into a wall, the AC from the wall is converted into DC, and that energy is stored in your phone.
  3. The current travels in one direction consistently.

### Key Quantities in Electricity:
- **Charge (Coulombs):** Electric charge is measured at a point, or on an object, and basically it doesn't have like a direction. For example, one electron has about $1.602 \times 10^{-19}$ coulombs.
- **Potential Difference (Voltage):** The measure of the difference in electric potential energy between two points in a circuit. It represents the force that pushes electric charges to move through a conductor, like a wire. In simple terms, voltage is what drives current to flow. Voltage is measured in volts (V), and can be thought of as the electrical "pressure" that causes charges to move from an area of higher potential (more electrons) to an area of lower potential (fewer electrons).
  - **Example and analogy:** Consider two materials, A and B. The potential difference between them depends on the number of free electrons (negative charge) they have. If the number of free electrons in both materials is the same, there’s no potential difference, so no current flows. However, if A has a surplus of electrons (say it’s negatively charged) and B has fewer electrons (making it relatively positive), there's a potential difference. Electrons will flow from A (negative) to B (positive) if they are connected by a conductor, such as a wire. This flow of electrons is your electrical current. In a circuit, the material with more electrons (A) is considered negatively charged, while the one with fewer electrons (B) is positively charged. According to conventional current, the direction of current is taken to flow from positive to negative, even though the electrons themselves flow in the opposite direction (negative to positive). 
- **Current (Amp):** Rate of flow of electric charge. You can think of it as the flow of electrons of 'water', the higher the current the more electrons and electric charge is going through the current.
- **Resistance (Ohms):** This limits the amount of current flowing through a circuit. THe higher the resistance, the lower the current, and vice versa. This is pretty useful since sometimes we need to limit the current flowing through a wire
- **Energy (Joules):**  Energy is the capacity to do work. In an electrical context, it refers to the amount of work done by the electric current. It is measured in joules (J), and represents the total amount of electric power consumed or produced over time. For example, when a device uses electricity, the energy it consumes is the product of the power (in watts) and the time (in seconds) that the device is running.
- **Power (Watts):** Power is the rate at which energy is used or generated in a circuit. It is measured in watts (W), which is equivalent to one joule per second.
- **Work (Review):** In physics, work is defined as the transfer of energy that occurs when a force is applied to an object, causing it to move. Represented as $W = FDcos(\theta)$. However in electrical terms, work is more about moving electric charges through a circuit. When voltage pushes (electrons) through the circuit, energy is transferred to make those electrons move, and that's the 'work' being done in an electric circuit.
  - **Example and analogy for work**: Imagine I used some force to push a box 5 meters forward. In doing so, I did work on the box, meaning I transferred energy to the box to make it move. In simple terms, work is just another name for energy when you're using force to move something. So, when you say 'I did work on the box,' what you're really saying is 'I transferred energy to the box to move it.' Ultimately, work is the energy required to move something using force.


## Elements of a circuit:
1. **Battery**: A battery is a device that stores and provides electrical energy. It supplies the voltage needed to drive the current through the circuit. So a battery will have a plus and minus sign, which denote the positive and negative terminals of the battery, so just places where current will flow for the battery. To create a working circuit, the negative and positive terminals need to be connected to each other.
    - **Example**: For a light bulb to be powered, the wires connecting the terminals of the battery must be connected to the lightbulb. The idea here, is that this creates a path from the positive to the negative terminal, allowing current to start flowing from the positive terminal, through the wire and into the lightbulb, and finally to the negative terminal. If the wires attached to the terminals aren't connected, then the circuit is open (incomplete, not turned on, has a gap in it). Else if everything is connected, current will flow.
2. **Resistor**: A resistor is a component that resists the flow of electrical current, creating a voltage drop across it. Useful for lowering the current to something that other components in your circuit can handle. Resistance values are often denoted by color codes or numerical values on the resistor.
3. **Wire**: Conductive material that's used to connect different components in a circuit, allowing current to flow between them. The 'gauge' of a wire refers to its thickness, which also affects how well it can carry current. the thicker the wire, the easier current can flow through it. Think of it as a pipe carrying water, the larger the pipe, the more water will flow through, but if it's a narrow pipe, less water can flow through. 
4. **Switch**: A device used to open or close a circuit, and thereby controlling the flow of the current. There are many different types of switches such as toggle switches, push-button switches, etc.
5. **LED (Light Emitting Diode)**: A device that emits light when current flows through it. Useful for providing visual indication when current is flowing through different parts of your circuit. 
    - **Anode**: The longer one is the anode, should be hooked up to a positive voltage source.
    - **Cathode**: The shorter one, the cathode, needs to be hooked up to the negative terminal of the battery.
- **Capacitor**: A device that stores and releases electrical energy. It's used to smooth out voltage fluctuations, and 'filter signals'.
- **Inductor**: A coil of wire that stores energy in a magnetic field when current flows through it. It's used to filter signals, store energy, and also it opposes sudden changes in curren.
- **Diode**: Device that allows current to flow in one direction only, as it blocks the flow of current in the other direction. Conventionally, current flows from anode to cathode, so when current flows the other way, it acts like an open switch.
- **Transistor**: These devices act as switches or 'amplifiers' in circuits. They basically allow us to control the flow of current between two points based on an input signal. Or you can get an input signal and produce a larger output signal.
- **Potentiometer**: A manually adjustable variable resistor. It's useful because let's say you want to change the resistance value for a part in your circuit, instead of buying another fixed resistor, you can manually adjust the resistance value on a potentiometer. [Here](https://www.youtube.com/watch?v=sWbSeJmUFfw) is a video on how it works and how you can use it. Remember that it's a tool for testing, rather than an actual replacement for a smaller, more compact, fixed resistor.

## Equations and relationships:
We're going to focus on the basics and foundations of what you need in embedded systems. There's a lot in physics and circuits and electricity, but here are the essentials:
### **1. Ohm's Law**
- $V=IR$
  - Where $I$ is current, $V$ is voltage, and $R$ is resistance. If you notice, voltage is directly proportional to the product of current and resistance. Then re-writing the equation $I = \frac{V}{R}$, you know that current is directly proportional to voltage, and inversely proportional to resistance. More simply, more voltage means more current, but more resistance means less current.
### **2. Power Equations**
- **Power (P)**: $P=I \times V$
- **Ohmic Power (P)**: $P = I^2 \times R$
- **Power in Terms of Voltage**: $P=\frac{V^2}{R}$
### **3. Energy Equations**
- $E = V \times I \times t$
- $E = P \times t$
### **4. Kirchhoff’s Laws**
- **Kirchhoff's Voltage Law (KVL)**: The sum of all voltages around a closed loop is zero. As you go around the loop, each component in the circuit is going to consume some of the potential difference, and eventually as you make a full loop around, your voltage should end up as zero. 
- **Kirchhoff's Current Law (KCL)**: The sum of currents entering a node is equal to the sum of currents leaving the node. Think of it as the amount of water going into a pipe, is equal to the amount of water coming out.
### **5. Voltage Divider Rule**
- **$V_{2}$**: $V_{2} = V_{AB} \times \frac{R_2}{R_1 + R_2}$. Useful for calculating the voltage across one of several resistors in a series. Here you put the resistance on top of the resistor you want to calculate, $R_2$ in this case. Then add up the total resistances of the series on the bottom. Then multiply by the voltage across those resistors. Of course, there are other and probably more easier ways that you've learned in your classes for getting the voltage drop for a particular resistor.
### **6. Current Divider Rule**
- **I_out**: $I_{out} = I_{in} \times \frac{R_1}{R_1 + R_2}$

### **7. Series vs Parallel**
- **Series Circuits**:
  1. Resistance: $R_{total} = R_1 + R_2 + ... + R_n$
  2. Current: $I_{total} = I_1 = I_2 = ... = I_n$. Is constant throughout all components in a series circuit since there's also only one path for current to flow.
  3. Voltage: $V_{total} = V_1 + V_2 = ... + V_n$. The total voltage across a series circuit is the sum of the voltages across each component. You can use ohm's law in 2 obvious ways such as $V_{total} = I \times R_{total}$ or $V_{i} = I \times R_{i}$, which is the idea of calculating the total voltage or calculating the voltage drop for a particular component.
- **Parallel Circuits**:
  1. Resistance: $\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + ... + \frac{1}{R_n}$
  2. Current: $I_{total} = I_1 + I_2 + ... + I_n$. The idea that the total current is the sum of the currents through each branch.
  3. Voltage: $V_{total} = V_1 = V_2 = ... V_n$. The voltage across each component in a parallel circuit is the same and equal to total voltage. 

## Tools of the trade:
- Battery holders
- Pliers: For cutting wires.
- Switches: For opening and closing your circuits.
Buttons for pushing.
- Breadboards and wires: Allow you to place components and wires in an organized way. 
- Multimeter: Allows you to measure certain values in a circuit. Any multimeter allows you to measure current, resistance, and voltage across a circuit.
- Resistors: Essential so that you don't short-circuit your board, but also it allows you to control your current so that it works with your components.


# Credits


1. [Circuit Analysis for dummies](https://www.dummies.com/article/technology/electronics/circuitry/circuit-analysis-for-dummies-cheat-sheet-207997/)