# Under the hood

## How the Java Virtual Machine works
The Java Virtual Machine (JVM) specification is a set of standards and guidelines that define what is required to run Java programs effectively and efficiently.
The JRE (Java Runtime Environment) is the implementation of those standards.

#### How it's done in C:
1. You run your code, ultimately running code from 3 C files. These files are fed to the compiler that
   outputs the corresponding `.obj` files for each of those C files (object code).
2. These object code files are fed into a linker, that outputs a `.exe` file.

#### How it's done in Java:
1. The compiler files the 3 `.java` files. This creates 3 `.class` files, the bytecode files.
2. No linking is done here. The JVM resides or is loaded onto ram.
3. To run the program, the `.exe` file is loaded into ram for execution. Now then three things are running inside the JVM.
    - Class loader: Brings in the `.class`` files onto ram.
    - Bytecode verifier: Verifies that the bytecode files haven't had any security breaches.
    - Execution engine: Converts the bytecode into native machine code (JIT compiling).


## JVM Architecture
- Class loader: A subsystem in our JVM that loads class files when we run the program.
- Class(Method) Area: Stores class structures such as field and method data.
- Heap: Where complex objects are allocated in memory, when they're created.
- Stack: Stores local variables, partial results, and plays a big part in method invocation (callstack) and their management. 
         So a frame is created when a method is invoked, and then destroyed when the method is done.
         If doing multi-threaded stuff, know that each thread has its own private JVM stack, which makes sense as each is probably
         running its own code.
- Program Counter Register: Contains the memory address of the current instruction that's being executed by the JVM for a specific thread, basically keeping track of the program's execution.
- Native Method Stack: Contains all the native Java methods used in the app.
- Execution engine: Reads bytecode and executes it. The JIT compiler reduces the time to compile the code into machine code.
- Java Native Interface: Framework that provides an interface for your application to communicate with an app written in another language. IJava uses this to send output to console or interact with OS libraries.


## Garbage Collection
In Java, it's the process of automatically reclaiming unused memory by destroying unused objects. While in C and C++, the
programmer has to manually create and destroy objects, and the failure to destroy these objects can lead to memory leaks and potentially
running out of memory.

Again any objects are stored on the heap. There are two types:
1. Alive: These objects are used and reference somewhere in your app.
2. Dead: No longer used referenced, so they are deleted to free up memory.

Three major phases of the garbage collector
1. It traverses the 'object tree'. Any memory address it reaches is considered alive, else it's considered dead.
2. Sweeps/deletes these dead objects.
3. Remaining alive objects are 'compacted', meaning they're reorganized so that our memory space
   isn't so fragmented due to empty gaps and spaces (memory addresses) due to dead object deletion.
   
However, re-compacting memory addresses everytime an object is deleted is pretty inefficient. Which is why they created 'generational garbage collection'

## Generational garbage collection
Here we just categorize objects based on how long they've been alive.

- Young Generation: Everytime a GC cycle happens, the dead objects are killed, and they move up in rank and go to the next stage
in memory. So in the 'young' stage, the sectors are 'Eden', 'From', and 'To'. Essentially the youngest objects are in the 'Eden' area, and 
as they survive GC cycles, they go up spaces. When objects are deleted here, it's called a 'minor gc event'. It's common as most objects don't 
live that long in memory.
- Old generation: If they survived the oldest stage of the 'Young Generation', then they move to 'Old generation area'. If objects are here, then they've survived for a long time,
and so when a object is deleted from this stage, it's called a 'Major garbage collection even'.
- Permanent generation: This is non-heap, but rather it's memory. Here we'd store metadata of classes and methods.

## Types of Garbage collectors in JVM
- Serial GC: For small single-threaded applications and simplest implementation. When GC runs, it pauses the application ('stop the world' event).
- Parallel GC: For apps with medium/large datasets that run on multi-threaded hardware. A couple threads are used to manage the young generation whilst a single thread manages the old generation. It also causes 'stop the world events', so it's good in cases where work needs to be done and pauses are okay.
- Concurrent Mark Sweep GC: Uses multiple threads for young and old generation. Also it runs concurrently with your app to minimize 'stop the world events'. As a result though, it uses more CPU resources. So if you can afford a better CPU, this is a better choice than parallel.
- Garbage First (G1 GC): Default Gc by Java designed for multi-threaded apps with a large heap size. It works differently as it doesn't have separate regions for young and old generations. Instead we put the generations is a set of regions. Basically it focuses on the region with the most garbage nad performs collection on those regions first.
- Epsilon GC: Handles memory allocation, but not reclaiming. Only feasible in apps where developers know how much memory they need, or for garbage free apps. Else it's not recommended.
- Shenandoah GC: Does more collection concurrently with the app's threads. Note how G1 can only clear its heap regions when the app is paused, whilst Shenandoah does it with the application.It compacts, cleans, and reclaims ram to the OS almost immediately after seeing free memory. However, due to its concurrent nature it's more cpu intensive.
- ZGC: Allows Java app to continue running while it performs garbage collection. For apps that require low latency or use a very large heap.

# Credits:
1. [Garbage Collection in Java](https://www.youtube.com/watch?v=XXOaCV5xm9s)