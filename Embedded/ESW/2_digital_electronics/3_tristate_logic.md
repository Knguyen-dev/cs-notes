# Tristate logic 

### What is tri-state logic   
In digital circuits, tri-state logic refers to a system where the output can have three possible states:
  1. High (1): Output provides a high voltage signal.
  2. Low (0): Output provides a low voltage signal.
  3. High Impedance(Z): The output is not connected, as if not in the circuit at all. This can also be thought of as having 'no voltage' because the switches connected to this part of the circuit are open, and so voltage can't get through. So there's no output signal.

### Why is this important?
In circuits where multiple devices share a common connection (like buses or communication lines), only one device should drive the signal at a time. If multiple devices try to drive a high or low signal simultaneously, it can cause:
  - **Signal conflicts:** Where one device outputs high and another outputs low, leading to current flowing directly between them due to the 5 volts(a short circuit). Now current is going to flow back into the areas that produced it, rather than moving ahead and outputting like we wanted.
  - **Damage to components:** Excessive current can overheat and damage components.
  - **Data corruption:** Mixed signals can produce undefined or unreliable results.

**Solution:** Let's say you have a bus of 8bits sending over `56`. It will split off into two paths. We would have 'tri-state' transistors, which are just switches that leave the input value unchanged, they just are there to prevent any damage. $E_{A}=1,E_{B}=0$ to close path A and let the binary number through path A. Then $E_{A}=0,E_{B}=1$ makes path B closed, so the binary number can be sent through path B. This example moreso handles outputs branching rather than combining inputs, but the idea is to avoid the both being closed at the same time and then when they connect back together, there's some sort of one directional current flowing back into our gates. By also having a 'high-impedance' state, where one device or path isn't connected (switch is left intentionally open), we can assure that the other device is free to independently send signals without being interrupted.   

### Memory 
Basically it makes up read write memory. This tri-state and sequential logic allows us to save/read values in our latches, then modify the values from that latches. This is basically what happens when we're reading and writing memory. So this is read-write memory, which makes up 'RAM'.

## Takeaway
Don't directly combine multiple outputs in a circuit. To achieve this type of circuit, use transistors (switches) so that we can prevent both outputs from being connected simultaneously.