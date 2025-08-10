
/**
 * In this example, it's very simple. The compile will likely do
 * some optimizations, and the results would look like this:
 * <register> = x;
 * a = <register>
 * b = <register>
 *
 * Now this is fine, we have some simple code here. However we'll run
 * into an issue if x somehow changes as the function is being executed.
 *
 * this type of behavior can happen in Embedded Programming. E.g. x is the
 * real time data gotten from a sensor. There's a chance the bits being assigned at a aren't going to be the same
 * bits that are going to be stored in b. Or we're doing parallel or concurrent programming, where
 * there's a chance that x could be mutated by another thread, and ultimately make values during the time
 * between those two assignments.
 *
 * + Solution 1:
 * Use volatile keyword, to indicate to the compiler that the value of the variable can change via an external script.
 *
 * 1. Very simple to use volatile.
 *
 *
 * + What's happening on a low level:
 * Let's assume a microprocessor and random access memory. Sometimes
 * the MP doesn't write to memory, it just caches the result in a register. This is
 * because writing to memory is a slow process, we'll just cache it on some MP register.
 *
 * So let's say we need to write into a register, in order to affect some LEDs? If the compiler decides to optimize, we
 * would cause our bits to be stored in our local MP registers, rather than actually writing to
 * the RAM and port. And so the bits on a port aren't applied correctly, and so the led isn't turned on, because the compiler
 * decided to cache the bits in the MP's local registers instead.
 *
 * char *x;
 * *x = 0x01;
 *
 * So in this case DON'T optimize. Write the data to the registers for real, don't cache it in the MP's local registers. If we can do that, we can apply
 * our bits to the port, and light up the LED. To do this use "volatile" keyword. As a result, when you
 * write data to memory instead of caching it and then eventually writing it. We'd read data from memory (reading real time data) instead of
 * reading cached versions. It tells our compiler that these variables are subject to unexpected changes
 * so we always need to read or write from memory.
 *
 * It will optimize this:
 *
 * for (int i = 0; i < 10000; i++) {
 *    port_data = 0xFF;
 * }
 *
 *f f
 * It would remove the for-loop, as well as caching the reads of to local
 * registers in the MP. I mean I'm assigning a variable the same value many times,
 * The compiler thinks I'm making unnecessary operations.
 *
 *
*/
void example1() {
  int x = 5;
  int a = x;
  int b = x;
}

void example2() {
  // A pointer to a volatile int. So we're pointing to an integer variable, whose 
  // value can change with external means beyond this script.
  volatile int* pointerOne = 0;

  // Here we have an integer pointer, but the address of the pointer is now subject to change 
  // by external forces.
  int* volatile pointerTwo = 0;

  // Volatile pointer and a volatile integer; probably wouldn't see this often.
  volatile int* volatile pointerTwo = 0;
}

/**
 * Let's look in a multithreaded environment. Maybe just using
 * code that's in the main thread, but there are interrupt service
 * routines being executed.
 *
 * Since we know x is a volatile, the compiler will extract the value, increment it,
 * and write it back to x again. However what if there's an interrupt that
 * happens between those operations?
 *
 * Well the compiler doesn't really know about concurrency. The code will work if your CPU has
 * an atomic incrementing operation, incrementing on one instruction cycle. But this is not
 * very common.
 *
 *
 */
void function3() {
  volatile x = 1;
  x++;

}

int main() {

}