# Circuit Fundamentals

## Circuit Analysis 
---
### Kirchhoff's Laws
These laws are useful when we want to analyze more complex circuits.
- **Kirchhoff's Voltage Law (KVL)**: The sum of all voltages around a closed loop is zero. As you go around the loop, each component in the circuit is going to consume some of the potential difference, and eventually as you make a full loop around, your voltage should end up as zero. 
- **Kirchhoff's Current Law (KCL)**: The sum of currents entering a node is equal to the sum of currents leaving the node. Think of it as the amount of water going into a pipe, is equal to the amount of water coming out.

---
### Voltage Divider Rule
- **$V_{2}$**: $V_{2} = V_{AB} \times \frac{R_2}{R_1 + R_2}$. Useful for calculating the voltage across one of several resistors in a series. It helps as $V_{2}$ is sometimes an output voltage as a wire goes out of the series.  The resistance we want to calculate is $R_2$. Then add up the total resistances of the series on the bottom. 

--- 
### Series and Parallel Circuits
It's a series circuit when there's only one wire, but if we splits into multiple wires, then that portion is parallel. Here are some important mathematical relationships when dealing with these circuits.
- **Series Circuits**:
  1. Resistance: $R_{total} = R_1 + R_2 + ... + R_n$
  2. Current: $I_{total} = I_1 = I_2 = ... = I_n$. Is constant throughout all components in a series circuit since there's also only one path for current to flow.
  3. Voltage: $V_{total} = V_1 + V_2 = ... + V_n$. The total voltage across a series circuit is the sum of the voltages across each component. You can use ohm's law in 2 obvious ways such as $V_{total} = I \times R_{total}$ or $V_{i} = I \times R_{i}$, which is the idea of calculating the total voltage or calculating the voltage drop for a particular component.
- **Parallel Circuits**:
  1. Resistance: $\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + ... + \frac{1}{R_n}$
  2. Current: $I_{total} = I_1 + I_2 + ... + I_n$. The idea that the total current is the sum of the currents through each branch.
  3. Voltage: $V_{total} = V_1 = V_2 = ... V_n$. The voltage across each component in a parallel circuit is the same and equal to total voltage.






--- 
### Open, closed, and short circuits
1. Open circuit: A circuit that has an open switch. This is the thing that has a break in the current, so the current won't flow. Light bulb is off
2. Closed circuit: This is when the switch is closed. Light bulb is on. However proper closed circuits will have resistors in them to keep things safe.
3. Short circuit: This is a circuit that has almost no resistance. Imagine connecting a battery back into itself with no resistors, that is called short circuiting a battery. This results in a circuit with an extremely high current, which can heat up a wire and cause a fire. Short circuits are closed circuit, they're just closed circuits that have almost zero resistance.

That's why we need to have elements in our circuit. Let's talk about some of those:
  1. Fuse: A component that snaps the wire if the current reaches a certain limit. E.g. let's say we put a 20A fuse around a wire in our circuit. If the fuse detects a current of 20A or more, then the fuse will snap the wire, breaking the circuit's connection, and ultimately preventing other elements in your circuit from being damaged by high current. So a fuse is designed to protect a circuit from dangerously high current. However fuses are one-time uses.
  2. Circuit breaker: So if too much current flows through the circuit, the circuit breaker will make the circuit open, stopping current flow. However the benefit is that circuit breakers are reusable, you can always turn it back on again, which gives it a major advantage over fuses. 

#### Short Circuiting
This occurs when the current in your circuit is able on a path with little or no resistancne. 



## Basic Circuit Components
There are a lot of components. Well we only need to focus on the important stuff.

---
### Batteries
Device that stores and provides electrical energy. It provides the voltage needed to drive the current through the circuit. 

---
### Resistors
Component that resists the flow of current. It consumes some voltage (causing voltage drop) during this.

---
### Diodes 

#### What is it?
A semiconductor is a material that has electrical conductive properties. Not as conductive as a conductor (metal or wire), but not an insulator (like Rubber). It's in the middle, able to conduct electricity under certain conditions.

Diodes are a basic unidirectional semiconductor device, as current can only flows from one direction. Imagine a water pipe, but there's a swing valve. Water can only enter and push through from one direction. We use diodes to control the direction of current in a circuit. Diodes have 2 ends called the anode (positive) and cathode (negative) So depending on how you install the diode, it can either be a conductor or insulator:
  1. To act as a conductor: Connect anode to the positive terminal and cathode to the negative end. This scenario is called the 'forward bias'
  2. To act as insulator: Connect anode to negative and cathode to positive. This is called the reverse bias, and so no current flows through the diode.

#### How it works:
Electricity is the flow of free electrons. Copper wires have a lot of free electrons, making it easy for electrons to flow.

In an atom, it as a nucleus, and then 'shells' which are like orbital rings that contain electrons. Each shell has a max. amount of electrons and an electron needs to have a certain amount of energy to be in a shell. Electrons in the outermost shell, the valence shell, have the most energy, and a conductor has about 1 to 3 electrons here. Electrons are held due to the nucleus. Beyond the valence shell, there's the "conduction" band, and if electrons can break out of this ring, it is free to move around another and go somewhere else.
  - With a conductor: Conduction band is very close to valence shell, making it easy for electrons to break out, move, and flow.
  - With an insulator: Conduction band is far away, making it difficult for electrons to break out and flow.
  - Semiconductor: It's somewhere in the middle, a balance. If we provide external energy, an electron in the valence shell can break out.

Silicon has no free electrons, a neutral state, and engineers inject other elements in there to change the electrical properties. As a result, create a 'p-region' (positive) and 'n-region' (negative) semiconductor material. The p-region has room for electrons whilst the n-region needs electrons. However between these regions there's a 'depletion' region. This has an electric field, produced by a potential difference that we'll call 'forward potential barrier', that prevents our electrons from moving across and current from flowing.

When we connect the voltage source for a forward bias, we're able to overpower the electric field (since our emf is greater than the small emf of depletion region), and allow electrons to flow through. By connecting it as a reverse bias, it increases that depletion region, allowing the diode to act as a 

#### Testing a diode
Using a multimeter you can get a reading which tells you the amount of voltage needed to actually have current pass through the diode. If you try the opposite ends then it should read zero, which is good since that's the insulator part working. 

---
### Capacitors

#### **What Is It?**
A capacitor is a component that stores electrical charge. It has two conductive plates separated by an insulating material (the dielectric).  

#### How it works
Imagine water going through a pipe, but let's say we have a storage tank. If we cut off the source of water, we'll still have water going out the output pump since the water tank still has a couple of seconds of water left. In theory, we can take advantage of this, we're allowed to switch off the source for a couple of seconds and turn it back on and still maintain a smooth output flow due to the existence of the tank. In a circuit, the capacitor is the tank. If you have a circuit with a light, and open/close the switch quickly, the light will go off and on. However if we have that capacitor, during the moments when the switch is open, the capacity can discharge and keep the light on. Then when the switch is closed, we can charge the light and capacitor.

- **In technical detail**:
  - When current flows, electrons accumulate on one plate, creating a charge imbalance, a potential difference if you will.
  - This imbalance creates an electric field between the plates, which stores energy. Even when the power source is removed, the stored charge remains due to the electric force between the plates.
  - Now once you connect the capacitor to a current, a path now exists for those electrons to move to move through the circuit and  onto the other plate. This lasts until the there's an equal amount of electrons on the other side, causing the potential difference between both plates to be zero. 
  - NOTE: Your electrons never go through the plates directly, that's why the insulator is there.

#### **Capacitance (Efficiency of Charge Storage)**  
- **Capacitance** measures how much charge a capacitor can store per unit of voltage.  
- Formula: **1 farad = 1 coulomb/volt**.  
  - A capacitor with higher capacitance can store more charge for the same voltage.  
  - Example:  
    - Capacitor A (10 F) charged with 1 V stores **10 C** of charge.  
    - Capacitor B (2 F) charged with 1 V stores only **2 C** of charge.  

#### **Using a Dielectric**  
- Adding a dielectric (insulating material) increases capacitance because it reduces the electric field strength between the plates.  
- While this increases charge storage, the voltage across the capacitor decreases because the dielectric lowers the electric potential difference.

#### Why though and closing?
A lot of situation need you to have a capacitor to smooth out the energy output.

Other thing is that capacitors are quite dangerous. Don't touch the terminals, they will shock you if there's a potential difference. You'd need to check using a multimeter and if so, you need to discharge it. Else you may get shocked.


#### Equations 
1. $Q=CV$. Where Q is charge in coulombs, V is voltage, and C is capacitance in Farads. 
2. $Q=IT$. This makes sense because 1 coulomb = 1 amp * 1 second.
3. $Q=n*e$. Where n is the number of electrons and $e=1.6*10^{-19}$ coulombs.
4. Electric potential of point charge: $v=\frac{kq}{r}$. Voltage is the difference in electric potential at two points. This equation calculates the electric potential at one point.
5. Capacitance formula (without dielectric): $C = \frac{\epsilon_{0}A}{d}$. 
6. Capacitance formula (with dielectric): $C = \frac{k\epsilon_{0}A}{d}$. 
6. $V = \frac{V_{0}}{k}$
7. $\epsilon_{0}$ is the permittivity of free space.

A component that stores electrical energy in an electric field between two conductive plates, separated by insulating material (called the dielectric).

---
### Inductors

#### What is it?
A coil of wire that stores energy in a magnetic field when electrical current passes through it. It can then quickly release this energy.

#### How does it work?
If this was an example with water, an inductor would be a water wheel. Initially no water goes through the wheel, but over the span of a couple of seconds, the wheel speeds up, causing the current to increase up to its maximum flow. Then once you turn off the pump, due to inertia, the wheel is still spinning so the current will keep going but will slow down until it stops.

This is how things work in an electric circuit. When you first power the circuit, very little current will flow through the inductor, but after a bit, the current will reach its maximum in that inductor. Then when you open the switch, the inductor will still pump electrons in your circuit, but it'll slow down until a stop.

On a technical level, electrons produce magnetic field. An inductor is a coil, and all those little magnetic fields, combine to become one strong magnetic field. Then once switch is open, this magnetic field is used as electrical energy to push the electrons along the circuit.

#### Why does it work like this?
Inductors resist change. If current increases, it tries to stop it. When current decreases, it opposes this by pushing electrons to try to keep things the way they are. 

#### Unit of measure and closing
The inductance of an inductor is measured in henry. The higher the inductance means the more energy we can store and provide. But this also means it takes longer for the magnetic field to build and longer for the back emf to be overcome.

---
### Switches and Relays
A switch is a device that opens or closes a circuit, starting or stopping the flow of electricity. A relay is just an electro-magnetic switch.

- **Manual switch:** Used when you want to manually open or close a circuit. Examples are light switches, or a button that turns on or off the device.
- **Relay:** Used when you want to open or close the switch automatically, or without human intervention. So this is when you have parts of your device communicating internally with each other

---


### Transistors

First there are two types of transistors. A bipolar junction transistors (BJT) and field effect transistors (FETs).  The latter is more relevant for modern electronics, and the latter is more common in older designs or hobby circuits. So we'll do an intro on the former, and then transition to focusing on the latter.

Transistors are electronic components that do two main things:
1. Can act as a switch
2. Amplify signals

Your lower power transistors have a resin case to protect internals. Higher power transistors such MOSFETs as may have a metal part, so that they can handle cooling and transferring heat. Transistors are rated to handle certain voltage and currents.

---
### **Bipolar Junction Transistors (BJTs)**

#### **Overview**
A BJT is a three-pin device with:
1. **Emitter**
2. **Base**
3. **Collector**

#### **How It Works**
- Acts as a switch or amplifier.
- A small current or voltage applied to the **base** controls a larger current between the **collector** and **emitter**.
- Example: Apply 0.6-0.7V to the base to "turn on" the transistor, allowing a larger current to flow in the main circuit. 

#### **Types**
- **NPN**: Current flows when the base is **positive** relative to the emitter.
- **PNP**: Current flows when the base is **negative** relative to the emitter.

#### **Key Concept**
- Allows a small input signal to control a much larger output, making it useful for amplifying signals or controlling high-power devices.
- $I_{C} = \beta I_{B}$ and $I_{E} = I_{B}+I_{C}$. 
  - $I_{C}$: Collector current
  - $I_{E}$: Emitter current
  - $I_{B}$: Base current
  - $\beta$: Current gain of the transistor.

---
### Field Effect Transistors (MOSFET section)

Your notes are a solid start, but the explanations can be clarified and refined. Below, I’ve improved your notes, addressed your questions, and included additional insights to clarify the tricky concepts like PWM, MOSFET efficiency, gate pin behavior, and inrush current.

---

### **MOSFETs (Metal-Oxide-Semiconductor Field-Effect Transistors)**  

#### **What is a MOSFET?**  
A MOSFET is a type of transistor with three terminals:  
1. **Gate**: Controls the flow of current.  
2. **Drain**: The current enters from the circuit here.  
3. **Source**: The current exits to complete the circuit.  

---
#### **How Does It Work?**  
Think of it like a water pipe analogy:  
- The **pipe** is the main circuit (between drain and source).  
- The **gate** is like a valve controlled by pressure.  
- Applying a small "pressure" (voltage) to the gate "pushes" the valve open, allowing water (current) to flow through the pipe.  

In a real MOSFET:  
- Applying a voltage to the **gate** allows current to flow between the **drain** and **source**. This creates an electric field,
  modifying the behavior of the drain and source, creating a 'conductive channel' that allows current to flow through the main circuit.
  Note that voltage is isolated from the main circuit, so no charge or energy from the gate ever interacts with the 
  current flowing from drain to source.
- You can automate this process using sensors, microcontrollers, or other electronic components to control the MOSFET.  

---
#### **Why Use a MOSFET Over a BJT?**  
1. **Efficiency**:  
   - BJTs require **current** to flow into the base to stay "on." This wastes energy because current flowing through the base produces heat.  
   - MOSFETs only require **voltage** at the gate to turn "on," with almost no current wasted.  
2. **High Current Capacity**:  
   - MOSFETs can handle higher current compared to BJTs.  
3. **Simpler Control**:  
   - Voltage is easier to work with than current in many circuits.  

---
#### **Key Behaviors of a MOSFET**  
1. **Capacitor-Like Gate Behavior**:  
   - The gate pin acts like a **capacitor**, storing charge when voltage is applied.  
   - Once the voltage is removed, the charge remains, keeping the MOSFET "on" until the charge is discharged.  
   - To "turn off" the MOSFET, you need to provide a path for the stored charge to flow to **ground** (negative terminal of the circuit).  

2. **Inrush Current**:  
   - When switching from "off" to "on," the gate capacitor initially draws a **burst of current** as it charges.
   - This can damage sensitive components like an Arduino as too much current is flowing from its output pin. 
   So a **resistor** is placed on the gate to limit the inrush/output current.  

3. **Discharging Gate Voltage**:  
   - When turning off the MOSFET, a resistor is also used to allow the gate charge to safely flow to ground, fully deactivating the MOSFET.  

---
#### **Pulse Width Modulation (PWM)**  
PWM is a technique where the MOSFET is switched "on" and "off" very rapidly:  
- The **"on" time vs. "off" time ratio** determines the average power delivered to the load (e.g., a lightbulb).
  As a result, you're essentially controlling the average voltage being received, and therefore the current.
- For a lightbulb, this creates a dimming effect because the human eye averages out the rapidly changing brightness.  


### Types of MOSFETs

#### **Enhancement Mode**
- **Off by default.** Applying voltage to the gate allows current to flow in the main circuit.
  1. **N-Channel**
     - Condition to turn on: $V_{G} > V_{S}$.
  2. **P-Channel:**
     - Condition to turn on: $V_{G} < V_{S}$.

#### **Depletion Mode**
- **On by default.** Applying voltage to the gate prevents current from flowing.
  1. **N-Channel**
     - Condition to turn off: $V_{G} < V_{S}$.
  2. **P-Channel:**
     - Condition to turn off: $V_{G} > V_{S}$.

#### **Example (P-Channel Enhancement):**
If $V_{G} = 9V$ and $V_{S} = 0V$:
- $V_{G} > V_{S}$, so the transistor is **off**.
- The transistor turns **on** only when $V_{G} < V_{S}$.

For P-channel, the current flows through a pathway made of **holes**. Electrons "hop" across these holes to create the flow of current. In contrast, for N-channel, electrons move directly through a channel of free electrons.

---
### Detailed Look: Gate and How N- and P-Types Work

#### **N-Channel Enhancement Type**
- The main body is made of **P-type material**, with **N-type material** at the source and drain.
- Applying a **positive voltage** to the gate creates an **electric field**, attracting electrons from the P-type body to the region under the gate.
- This forms an **N-channel** of free electrons, allowing current to flow between the source and drain.

**Key Concepts:**
1. **Threshold Voltage ($V_{th}$):** The minimum gate voltage required to form the N-channel and allow current to flow.
2. **Ohmic Region:**
   - As gate voltage increases, the N-channel widens.
   - Current increases linearly, and resistance decreases.
3. **Pinch-Off Point:**
   - At higher drain-source voltages, the N-channel near the drain starts to narrow.
   - Beyond this point, increasing the drain-source voltage doesn’t significantly increase current.
4. **Saturation Region:**
   - The current flattens out.
   - To increase current further, the gate voltage must be increased to widen the N-channel.

#### **N-Channel Depletion Type**
- By default, an N-channel exists, allowing current to flow even without a gate voltage.
- Applying a **negative voltage** to the gate repels electrons in the N-channel, replacing them with positive charges, and preventing current flow.

#### **P-Channel Enhancement Type**
- The main body is made of **N-type material**, with **P-type material** at the source and drain.
- Applying a **negative voltage** to the gate creates an electric field, repelling electrons and attracting holes.
- This forms a **P-channel** (a pathway of holes that free electrons to go through), allowing current to flow from the source to the drain.

#### **P-Channel Depletion Type**
- By default, a P-channel exists, allowing current to flow.
- Applying a **positive voltage** to the gate we attract electrons from the p-region and fill up holes. This prevents current from flowing as free electrons can't just travel through those holes anymore.


## Beyond?
Well there's still more of the basics that could be helpful. Like we totally skipped over AC circuits and whatnot. Like the book Practical Electronics for Inventors is pretty good. But yeah learn as you need, since the goal is to do projects.