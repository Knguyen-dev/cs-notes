
## 7 Segment Displays
![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbIZ8hvun8D_fILIC9YP-hE1HXGpK4kZGdpw&s)

This is what we're talking about. each "segment" or block on the led, is connected to a gate. There are seven gates plus a decimal point (DP) wire, which would be needed to show a decimal point.
In a common cathode display, all the negative terminals are connected together. In a common anode display, the positive terminals of your segments are connected together.

Either way, you're going to connect your wires from your microcontroller to your led. Then both are going to connect to ground.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdvmI4VR0PQeXGschPdK5fg6hycySf4cQp3A&s)


---
### Common Cathode Configuration
![](https://www.jameco.com/Jameco/workshop/TechTip/working-with-seven-segment-displays-fig1.jpg)

All negative terminals are connected together like this. So it makes sense that the positive terminal is out to the left, and then the 7-segment display is connected to ground instead.

Let's say you apply ON signal, maybe 2.5 volts, to every pin. This is relative to ground, which is 0, and it creates a forward bias that passes through the LEDs that we positioned (turning them on).

---
### Common Anode Configuration
![](https://www.jameco.com/Jameco/workshop/TechTip/working-with-seven-segment-displays-fig3.jpg)

In a common anode situation, the 7-segment display needs to be connected to a positive voltage. So if you apply zero voltage on all the pins, this turns on all the leds on the display.

The reason is that by putting 0 voltage on the pins and having a positive voltage on the outside, we're creating a positive-to-negative current flowing from the voltage source, into the LEDs (lighting them on), which accept this flow of current due to how they're positioned. This then flows back into the microcontroller.

---
### Officially explaining 7 Segment Displays
A single port controls the display. This can be more efficient through clever tricks with the circuitry. before you would need 4 ports = 32 pins, but now to 
represent 4 displays, you're just going to need 8+4 = 12 pins.


I have a port connected to an led, and the led is to ground. If you output 5 volts, the potential difference is +5, allowing a forward bias through the leds to light up.
To control 2 leds you need 2 pins. If you output 0x00, both are off. If you output 0x01 or 0x10 then one pin will light. 

How about instead of connecting the LEDs to ground, connect them to other pins. So if you just ensure that the input pin connected to the anode is positive and the 
one connected to the cathode is 0, then that still creates the forward bias, lighting up the LED. 

## 4. Reading Switches
Switches and keypads are inputs. Their signals go into a microcontroller. Then they 
affect our output components like led, 7 segment displays, or dot matrix displays. If you cna do this 
you'll be able to control everything else. 

For push button switches, once you press the button the switch becomes closed.

When you press a switch, there is something called "bouncing". Remember? With physical switches, after 
pressing it, it takes like 0.25 seconds or something for the switch to stop "oscillating" between 0 and 1, and actually
settle onto its ON/pressed state. So when we're reading the switch during that little period when it's oscillating/bouncing, it's 
unreliable. This bouncing/delay in every physical switch, so we just need to add a delay in our code to make sure we wait that 
duration. That is called debouncing, which is intentionally delaying our input.

## 5. Learning Keypads
![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi7XfHeveDWdhYAGKg5CKfnb9iSM1c-mFwdg&s)

Keypads and switches are very similar. With a switch, on the other side of the switch, it's going to be a source 
of 5 volts. So when the switch (or maybe transistor) is closed, you're microcontroller will get those 5 volts.

With a keypad though, the other side is connected to another output pin. So we could get 5 volts or 0 volts when 
the switch is closed. 

Let's say you wanted to connect 16 switches. You'd organize the circuitry into a 4x4 matrix. Each square in that 
matrix represents connections 0 to 15. Then you'd have 4 input signals C3 to C0, and then 4 output signals.

```C 
for (int i = 0; i < 4; i++) {
  // *outf changes from 0001, 0010, 0100, to finally 1000.
  outf = 1 << i;

  // Then read 
  x = ink;

  // If no switches are pressed.
  if (x == 0) {
  }
}
```
Each column represents a digit in the 4 bit sequence. You know that if we don't press anything, no switches 
are closed and therefore the binary sequence being read is 0 (x == 0). The matrix type circuitry makes sense because if 
you close a given switch, that voltage won't have anywhere to go but the corresponding output pin.

C1 can only activate one switch at a time, and which switch it activates from the column depends on how we 
setup the circuit?

This is called keypad scanning.
 

## 6. Dot Matrix 

### Reviewing Keypad
So each control $C_{0}, ..., C_{3}$ is connected to its respective pin, and these controls are all 
connected to a pull down. You'd also have essentially 16 switches, one for each cell
in that grid-like setup. You'd also have rows 0 to 3, so $r_{0}, ... r_{3}$, and let's assume that 
the rows are connected to 0 volts right now.

So you have a microcontroller, and here the input signals are the controls 0 to 3. That goes into your 
4 control pins. Then you have four output pins that we'll designate at $r_{0}, ..., r_{3}$. And this is connected 
in this grid-like pattern.

If $r_{0} = 5v$, then that whole row has 5 volts. Then if we close switch 1, then that means $C_{0} = 5v$ as well 
because now it's connected. Only by closing the switches on the first row, are we able to make current run through and 
also make voltage hit those control signals.

---
### Explaining Dot Matrix
First starts explaining that for positive and negative terminals, we'll use 2 different pins. Let's have 
port F and port K.

So connect port f pin 0 to anode. Then through the resistor, complete our circuit by connecting the other end to Port k pin 0.
In this situation, in order for the LED to light up, the pin connected to the anode needs to output a positive voltage. Whilst the pin
connected to the cathode needs to output 0. As a result, a forward bias can be created, and current flows correctly through to light up the LED.
Think of each box in the dot matrix as an led. For our led to light up, the control signal has to be ON since it's on the side of anode. Then 
the output signal (on side of cathode), needs to be OFF so that can create a forward bias, flow current through the LED.


### Credits and projects: 
1. [Led and Simple Circuit: Volatile Keyword](https://wokwi.com/projects/421657695348058113)
2. [Lef and Simple Circuits: Bit shifting](https://wokwi.com/projects/421660053973181441)
3. [7 Segment Displays: Potential difference between anode and cathodes, with ground](https://wokwi.com/projects/421710616766648321)
4. [Potential difference between anode and cathode](https://wokwi.com/projects/421725820592104449)
5. [Reading Switches](https://wokwi.com/projects/421935313999948801)
6. [Keypad Scanning]()


BOOK MARK: 
1. [Learning Keypad](https://www.youtube.com/watch?v=Jl-toHqqTho&list=PLlVl4RjlX2_SSE9dCw_meiJ7m12hwMiIz&index=6)
2. [Learning Dot matrix](https://www.youtube.com/watch?v=Rf3OOqv5D6Q&list=PLlVl4RjlX2_SSE9dCw_meiJ7m12hwMiIz&index=5&t=5s)