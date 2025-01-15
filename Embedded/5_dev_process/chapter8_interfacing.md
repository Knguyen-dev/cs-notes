

### Solder-less Breadboard 
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/c8-Figure8_1.jpg)

You use a breadboard to create prototypes since you're in your testing phase. There are two main parts to a breadboard:
- Long rows (power buses): Out the outer parts of the board there are long rows. These are electrically connected. If the breadboard has two rows like in this image, one row would be connected to voltage (3.3v for high signal), and the other would be connected to ground (0 voltage).
- Short rows: In the middle of the board, the short rows (each 5 holes) are electrically connected. You'd insert components of your board here.




---
### Diving into Switches

![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fg08_02_switch.jpg)
- **Contact/Tactile Switches:** Can be used to see if those things are touching. If the wheels are on the ground, if the paper is in the printer, or two mechanical parts are making contact, etc. Here we're looking at a B3F switch. For this type of switch it has a **bounce time**, which is when you first press it it will toggle on/off/on for about a couple of milliseconds before it settles to a given position. This is often a problem with mechanical switches, which is why you design software that waits at least a couple of milliseconds before reading the switch's value.

![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fg08_03_switchInterface.jpg)
- **Single Pole Single Throw (SPST):** When switch is pressed/closed, it has almost no resistance, allowing for current to pass through and allowing for a connection. When the switch isn't pressed (open) it has almost infinite resistance, preventing the current from going through. Also this just looks like a classic toggle or light switch.

Other terminology that you should know:
- **Positive Logic:** If switch is open, 0 volts. If switch is closed, 3.3 volts
- **Negative Logic:** If switch is open, 3.3 volts. If switch is closed 0 volts

---
### Interfacing switches example:
![Circuit Diagram](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fg08_04_switchInterface.jpg)

![Breadboard Implementation](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/c8-Figure8_4.jpg)

- **Two black wires:** Connected to the ground pin (GND) of the microcontroller board, and into the negative power bus/rail. This allows another wire on that same rail to be connected to ground, including that resistor. 
- **Red wire:** Connected to the 3.3V pin, and is connected to the positive power rail, allowing any other connections in that long row to get those 3.3V.
- **Green wire:** The **in** signal/wire that connects the switch to PA5 of the microcontroller.
- **Contact Switch:** Four legs, and two legs on the same side are connected internally like that diagram in the section before. If you push the button, then the voltage from the red wire across the short row will go through. 
- **Resistor:** One terminal of the resistor is connected to one the switch, whilst the other terminal is connected to ground. This acts as a Pull-down resistor, ensuring that when the switch is open (button isn't pressed), the green wire will carry a very low voltage, making the microcontroller port read 0. 

Let's say there isn't a resistor. When the button isn't pressed we aren't receiving any voltage. If it were 0 volts, we could say it's a LOW value, but no we are receiving no voltage. This can cause unreliable voltage readings due to electrical noise, so we need that resistor, a **pull down resistor** . When button isn't pressed the pull-down resistor connects our GPIO pin (**In** wire) to ground. As a result, when reading from our pin, it's ensured to be a LOW voltage (close to 0V). 

When choosing the value for a pull-down resistor, it's essential to account for the leakage current $I_{IL}$ specified in the microcontroller's data-sheet. For example, if $I_{IL} = 2$ micro-amps this represents the small amount of current "leaking" from the GPIO pin when it is in the LOW state. Using Ohm's law $V = I \cdot R$, a 10 kΩ resistor would result in a voltage of $V = 0.000002 \cdot 10000=20$ millivolts. Since 20 mV is well within the LOW voltage range (typically 0-0.8V), this value is acceptable.

However, if the resistor value is increased significantly, such as to $400 k\Omega$, the voltage across the resistor would rise to $(V = 0.000002 \, A \cdot 400,000 \, \Omega = 0.8 \, V$. This could approach or exceed the threshold for a HIGH value, leading to unreliable readings. Therefore, selecting a resistor value that keeps the voltage drop well within the LOW range is crucial for proper operation.

One final thing, let's review the case when the button is pressed. Due to this,  we create a connection from our power supply (3.3V to 5V) and the GPIO pin. Our resistor is still connect to ground, and yeah some current will go to the resistor, and yeah the same amount of voltage will go to the resistor. But most will go to the microcontroller

---
#### Switch Driver Code: 
Let's look at the code (the driver):
```C
#define PA5   (*((volatile unsigned long *)0x40004080))

void Switch_Init(void) {
  volatile unsigned long delay;
  SYSCTL_RCGC2_R |= 0x00000001;     // 1) activate clock for Port A
  delay = SYSCTL_RCGC2_R;           // allow time for clock to start
  // 2) no need to unlock GPIO Port A
  GPIO_PORTA_AMSEL_R &= ~0x20;      // 3) disable analog on PA5
  GPIO_PORTA_PCTL_R &= ~0x00F00000; // 4) PCTL GPIO on PA5
  GPIO_PORTA_DIR_R &= ~0x20;        // 5) direction PA5 input
  GPIO_PORTA_AFSEL_R &= ~0x20;      // 6) PA5 regular port function
  GPIO_PORTA_DEN_R |= 0x20;         // 7) enable PA5 digital port
}
unsigned long Switch_Input(void) {
  return PA5; // return 0x20(pressed) or 0(not pressed)
}
unsigned long Switch_Input2(void) {
  return (GPIO_PORTA_DATA_R & 0x20); // 0x20(pressed) or 0(not pressed)
}
```
The function `Switch_Init(void)` just sets up Port A's fifth 5 for processing the signal from our switch. Our `Switch_Input(void)` uses bit specific addressing to get the flip-flop that stores the pin value for `PA5`. The `Switch_Input2(void)` function does the same thing, but it reads the entire port and selects bit 5 using a logical AND. Of course, try to write friendly code if possible. Our second function is readying potentially 32 bits when it only needs 1 bit. It

---
### Interfacing LEDs
![](https://courses.edx.org/asset-v1:UTAustinX+UT.6.10x+3T2022+type@asset+block/Fg02_10LEDbareInterface.jpg)

In an LED, current must pass from anode (a, +, long side) to cathode (k or -, short side). The brightness depends on electrical power, $P=IV$. You can look up some useful data in the LED's data-sheet. Look for **forward voltage** which is the amount that's needed to light up the diode, and with this you'll have the **forward current**. Above is a voltage versus current curve, which is a standard chart to show us the LED's behavior.

Let's look at the positive logic interface, which means the LED activates when the software outputs 1. Let's say the LED has a recommended 1.6V and 1 mA. That's great, the last thing we need is a resistor that makes it so we have 0 volts when we reach ground. 

1. The equation is $V_{out} - I_{d}R - V_{d} = 0$. Where 'd' indicates the led, so $I_{d}$ would be the current going to the LED and the resistor. Then $V_{d}$ is the voltage drop of the LED. Finally $I_{d}R$ is the voltage drop of the resistor in front of our LED.
2. Solve for $R=\frac{V_{out}-V_{d}}{I_{d}}=\frac{2.4-1.6V}{1mA}=800\Omega$








### Analyze The Problem

### Design


Learning Objectives:
- Understanding basic circuit elements like source, ground, and resistors.
- Understanding how switches and LEDs work.                      
- Application of Ohm’s Law
- Analog circuit design and construction on a solderless breadboard
- Interfacing switches and LEDs to a microcontroller
- Programming simple logic.