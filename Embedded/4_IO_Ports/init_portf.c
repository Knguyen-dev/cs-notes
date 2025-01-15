/*
### Steps to Initialize a port
There are 7 main steps to initialize a port, but the first four we list are specific to the TM4C and LM4F microcontrollers:
  1. Activate the clock for the port. I mean remember how clocks are needed for synchronous data transfer protocols?
  2. "Unlock" the port. Unlocking is only needed for the pins PC3-0, PD7, and PF4. Everything else is unlocked so it's good
  3. Disable the analog function for the pins since we want to use the port for digital io.
  4. Clear bits in PCTL register. Remember that this register is used with the AFSEL register, and
  you'd use it to select which alternate function a specific pin is using. But since we're going to disable digital functions,
  it's best to clear this as well.
  5. Set the bits in the port's direction register so indicate which pins are input or output.
  6. Clear the bits in the alternate register to indicate all pins are just regular GPIO. Not using any alternate functions.
  7. Set bits in the digital enable register to indicate hte pins in the port are all handling digital IO.

Then add a short delay between activating the clock and accessing our port registers. This is because after activating the clock, it
takes about 3-5 cycles for it to stabilize and be good.

#### Example 1:

Make PF4 and PF0 input, then make PF1-3 output.

First activate the port's clock. Unlock the port by using a special value to the lock register. Then set bits in CR register.
We disabled the analog functionality for by clearing all available bits in the AMSEL register. We cleared bits in PCTL because
we don't to plan on selecting some alternate function for our IO pins. We then set whether a pin is input or output based on the
bit's in the port F's direction register. We're using the pins as regular digital IO so AFSEL register, which means they aren't
using some alternate functionality. We enabled all bits in the digital enable register to ensure all pins can handle digital IO.

Finally we set he bits in the PUR register for the two switch inputs to have an internal pull-up resistor.
This ensures that when there is external signal (our manual switches are open), the input pins are at a high state of logic rather being in a
"floating" state where it can pick up random electrical noise. Closing the related switches connect to ground (0 volts), which causes the microcontroller
to interpret it as a low signal (logic 0). So our pull-up resistor was keeping the signal at the pin high since there was like no connection since
switch was open, but now it's been overridden by ground.

Just remember, with a pull up resistor, when no signal (not 0, nor 1, litreally no connection) high signal. If you apply a high signal
by connecting the switch the pin will remain high. If you apply a low signal, it will change to low. Alright let's see the code

*/



/*
# 1. Pre-processor directives sections
Constant declarations to access port registers, using symbolic (using variable names) to access port registers
instead of addresses.

Look at the digital enable. On the datasheet we go to GPIODEN on p683. We see that the base memoery address
for GPIO PORT F (AHB) and APB. It seems we're using AHB here:
  - Base memory address: 0x4002.5000
  - Offset: 0x51C
  - Memory address we're using: 0x4002551C

I notice that doing base + offset = the hexadecimal value for the memory address that we need. This
resulting memory address is the data for the digital enable register for PORT F. So that's how the base
memory address and offset is used to calculate the memory address of the register you want.

*/
#define GPIO_PORTF_DATA_R   (*((volatile unsigned long*) 0x400253FC))
#define GPIO_PORTF_DIR_R    (*((volatile unsigned long*) 0x40025400))
#define GPIO_PORTF_AFSEL_R  (*((volatile unsigned long*) 0x40025420))
#define GPIO_PORTF_PUR_R    (*((volatile unsigned long*) 0x40025510))
#define GPIO_PORTF_DEN_R    (*((volatile unsigned long*) 0x4002551C))
#define GPIO_PORTF_LOCK_R   (*((volatile unsigned long*) 0x40025520))
#define GPIO_PORTF_CR_R     (*((volatile unsigned long*) 0x40025524))
#define GPIO_PORTF_AMSEL_R  (*((volatile unsigned long*) 0x40025528))
#define GPIO_PORTF_PCTL_R   (*((volatile unsigned long*) 0x4002552C))
#define SYSCTL_RCGC2_R      (*((volatile unsigned long*) 0x400FE108))

unsigned long In; // input value from PF4
unsigned long Out; // output value that we'll write to PF2 (our blue LED)


void PortF_Init(void);
int main(void) {
  // Initialize Port F for IO
  PortF_init();

  // I mean your embedded systems is going to have a forever loop
  while (1) {

    // 1. Read input from PF4 into switch 1
    // We'll read for port f's data register, then use a mask to only get bit 4, as opposed to getting all data from port f.
    // NOTE: Data could look like 0x11, where both bits are 1, both switches are open.
    In = GPIO_PORTF_DATA_R & 0x10;

    // 2. Right shift of 2 steps. This actually shifts into position of PF2. Allowing us to read the input from PF2 pin
    // NOTE: An example value is 0x0000 0010, which means PF4
    In = In >> 2;


    Out = GPIO_PORTF_DATA_R;
    Out = Out & 0xFB;
    Out = Out | In;

    // Write output to PORT F
    GPIO_PORTF_DATA_R = Out;

    /*
    Also writes to output, but it's not "friendly". Your instructions should do what you want to, and not
    have any unwanted changes.




    */
    // GPIO_PORTF_DATA_R = In;
  }
}



/*

GPIO Commit (CR): p685
GPIO Den: p682
GPIO AFSEL: p671
GPIO PUR: 677

*/
// Function to initialize port F's pins for input or output
// This is what we talked about in the explanation
void PortF_Init(void) {
  volatile unsigned long delay;
  SYSCTL_RCGC2_R |= 0x00000020; // 1) Activate clock for Port F by entering the memory address for port F


  delay = SYSCTL_RCGC2_R;       // allow time for clock to start somehow? 

  GPIO_PORTF_LOCK_R = 0x4C4F434B; // 2) Unlock GPIO port F 
  GPIO_PORTF_CR_R = 0x1F;         // Allow changes to PF4-0; if you don't set it then the data being written to the corresponding bit 
  // in certain registers won't be written to those registers basically

  GPIO_PORTF_AMSEL_R = 0x00;      // 3) Disable analog on the port
  GPIO_PORTF_PCTL_R = 0x00000000; // 4) Not using any alternate functions, so no need to select any.
  GPIO_PORTF_DIR_R = 0x0E;        // 5) PF4 and 0 are input whilst PF1-3 are output
  GPIO_PORTF_AFSEL_R = 0x00;      // 6) Disable alternate functions for all pins on port
  GPIO_PORTF_PUR_R = 0x11;        // Enable pull-up resistors on PF0 and PF4 pins; this isn't applying voltage, but merely connecting it to the circuit.
  GPIO_PORTF_DEN_R = 0x1F;        // 7) Enable digital I/O on PF4-0

}