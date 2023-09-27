# Multi-threading-processing-notes
Notes about threads and processes, that goes into multi-threading and processing in python.



- Process: An instance of a program running. Like an instance of firefox or several instances for microsoft word. Has
    memory for its code and data. Then has at least one thread. However, multiple processes can be executed, and at the same 
    time, making processes concurrent and parallel
    1. Every process has at least one thread
    2. Starting a process is slower than starting a thread
    3. Memory isn't shared between processes
    4. Mutexes isn't needed unless you're threading in your new process
    5. One GIL (Global Interpreter lock) for each process

- Thread: Small sequence of instructions that can be managed by the OS. The thread can access the data in the process. 
    1. A new thread is spawned within an existing process
    2. Starting a thread is faster than starting a process
    3. Memory is shared between threads of the same process
    4. Mutexes often necessary to control  access to shared data
    5. One GIL (Global Interpreter lock for all threads)

    Note: that in python, no two threads from the same process are ever executing at the same time. So they can switch back and forth, but they can't be executing at the same time.
    This makes python multi-threaded, but not simultaneously multithreaded, as multiple threads can be executed, but not at the same time.
    So it's concurrent, but not parallel.

- Global Interpreter Lock: Mechanism that prevents simultanteous multi-threading. So it makes prevents multiple threads of the same process
    being executed in parallel (at the same time).

- Asymmetry of multithreading: As we're executing multiple threads, the amount of executing time given to the threads isn't distributed
    evenly. To improve our performance using our multiocre systems, we do multiprocessing to process several programs simultaneously.

- Symmetry of multiprocessing: When executing multiple processes, they're executing in parallel, at the same time. This is very different 
    from multi-threading as it had to switch between which thread would get some execution time, while here all of them run at the same time. 
    This leads to a roughly even distribution of execution time for each process.

- When to use threading vs multiprocessing:
    1. CPU Bound Tasks: Spends most of its time waitinf for internal events (CPU intensive), then use multiprocessing.
    2. I/O bound tasks: Spend most of its time waiting for external events (user input, web scraping, waiting for data/info), then use multithreading.

    NOTE: Basically it doesn't help to use threading on cpu bound tasks since those threads are still only running on one process. But with multiprocessing, we spread the work out on multiple processors. 

NOTE: Misuse of threading or multiprocessing libraries may make your program slower as a result. 
    Both of these libraries do have some overhead work being done in order for these libraries to work, essentially these benefits aren't for free.
    As well as this, they may not benefit some libraries such as numpy, scipy, or tensorflow use simultaneously multi-threading and have been
    highly optimized already, so using multi-proessing won't help.