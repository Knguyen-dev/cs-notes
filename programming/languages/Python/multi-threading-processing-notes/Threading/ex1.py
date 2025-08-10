'''
- Creditw: https://www.youtube.com/watch?v=3dEPY3HiPtI

- Usually when running program, we have one thread running to execute our program. Usually this is called the main thread, which
    is in charge of running the main body of our program. However we can increase our threads so that we leave the main thread in 
    charge of the main part of the program, other threads can be in charge of different parts of the program. 

- Example: In a quiz program, while you're waiting for user input (io-bound task), you can have a countdown timer going. One thread
    is in charge of waiting for user input, and the other is for the count down timer.



- threading.active_count(): Prints the amount of threads running in a program.
- threading.enumerate(): Prints a list of the threads
'''

import threading
import time

'''
- Example: Pretend that we have to do 3 things before going to school, eating breakfast, drinking coffee, and studying. Just pretend it takes 3, 4, and 5 seconds to 
    complete these things respectively. All of these are IO bound as we're waiting around for something to happen, for time.sleep to be over

- Two ways to do this:
1. Without threading, which does all of these in order, and it takes 12 seconds. We did these tasks sequentially as we only moved on to the next if 
    the curernt was done. Now all of this is done with the main thread: 

    eat_breakfast()
    drink_coffee()
    study()

2. With multiple threads, now doing all tasks concurrently, switching between the three very quickly. So we 
    will assign each task a thread. The main thread creates/starts other threads, and then it prints some stuff. 
    these threads are separate, so now the main thread doesn't have to wait for the other threads to finish and vice versa:


- Thread synchronization: We can have our main thread wait around for another thread to finish before continuing.
    So in the example below, we're still keeping that benefit of the program being quick, and we're able to control
    the sequence of operations as well.


- Methods:
- start(): starts the execution of a thread
- time.perf_counter(): Returns how long it takes our main-thread for finishing its stuff
- threading.enumerate(): Returns a list of threads that are in the program
- threading.active_count(): Returns the number of threads in the program
'''

startingPoint = time.perf_counter()

def eat_breakfast():
    time.sleep(3)
    print("Done eating breakfast")

def drink_coffee():
    time.sleep(4)
    print("Done drinking coffee")

def study():
    time.sleep(5)
    print("Done eating studying")

# Create thread to handle some task, pass arguments if needed
x = threading.Thread(target=eat_breakfast, args=[])
# Then start the execution of that thread
x.start()

y = threading.Thread(target=drink_coffee, args=[])
y.start()

z = threading.Thread(target=study, args=())
z.start()


# By doing this we force our main thread or our main program to wait for the x thread to finish executing before moving on.
# NOTE: This can be good for situations where the finishing of a certain task is necessary for the program to continue.
x.join()

# Now we force the main thread to wait for y and z to finish before moving on as well
y.join()
z.join()

# Main thread is now in charge of doing these tasks
print(threading.active_count())
print(threading.enumerate())
print(time.perf_counter()- startingPoint)