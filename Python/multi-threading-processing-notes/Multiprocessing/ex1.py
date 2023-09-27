'''
+ Credits: https://www.youtube.com/watch?v=YOhrIov7PZA

Multiprocessing: Running tasks in parallel on different cpu cores. This is different from multi-threading in 
    python as with multi-threading, the threads take turns to execute different tasks. With multiprocessing, we execute 
    processes/tasks at the same time.

- Remember:
    multiprocessing = better for cpu bound tasks (heavy cpu usage)
    multiprocessing = better for io bound tasks (lots of waiting around)

- For windows multiprocessing: When we run a program we havea main prcess. If we create a child process, it's going to 
    copy the modules, and then create another child process, and we run into a lot of problems. To prevent this from 
    happening, we just make sure that when we create a child process it just copies our module, but it doesn't run it.

    
Main process: Process that's in charge of our main program, akin to a main thread, it's just the main instance of our program running.   

- Methods:

cpu_count(): Prints the number of additionally processes that you can run on your pc. 
    You'll use this to see the upper limit of processes you can run, and it to still be efficient.
    If your cpu count is 4, then you can only run 4 processes on your computer and still be efficient. If you go 
    over, then you lose that benefit since creating and managing processes has some overhead.

'''

from multiprocessing import Process, cpu_count
import time
def counter(num):
    count = 0
    while count < num:
        count += 1
    

def main():
    start = time.perf_counter()

    # Here we'll count to one hundred million. It took about 5 seconds, but what if we split that work among four processes?
    # Then we'd make it a little faster, it took about 2.50 seconds now.

    # Create a process and choose what task it's assigned to; then start the execution of the process
    a = Process(target=counter, args=[25000000])
    b = Process(target=counter, args=[25000000])
    c = Process(target=counter, args=[25000000])
    d = Process(target=counter, args=[25000000])

    a.start()
    b.start()
    c.start()
    d.start()

    a.join()
    b.join()
    c.join()
    d.join()

    end = time.perf_counter()
    print(f"Took {end-start} second(s)")



if __name__ == "__main__":
    main()