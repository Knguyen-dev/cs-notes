package com.threading;

/**
 * + What is a thread:
 * Small sequences of instructions that are associated with a program. Each thread can execute different parts of the program
 * concurrently, which just allows the program to do multiple things at once. Every program/process you run on your computer
 * will have at least one or more threads to allow the program to do things.
 *
 * + In Java:
 * Java's has Threads as classes and this allows us to perform multiple tasks concurrently in a single Java application. Okay
 * let's get things straight, the JVM is its own process, this is the main program running the code. Then your apps will
 * have a main 'thread', the primary thread running your program, and if you want you can add more threads. So in your java programs
 * you can think of your threads as subprocesses.
 *
 * + Thread lifecycle
 * When creating a thread, you should know that it has various stages in its life cycle
 *
 * 1. New: Thread is newly born; it stays in this state until the program starts it.
 * 2. Runnable: After we start a thread, we're just saying that it's prepared to be run and prepared to do tasks.
 * 3. Running: The thread is working on executing some code. You run a state by using run() method and the yield() method can send
 *             the thread back to the 'Runnable' state.
 * 4. Waiting: When it's temporarily inactive (still alive, but not able to execute its tasks at the current moment).
 *             It could be waiting for another thread to finish its task or maybe waiting for some external event to happen such as
 *             the user entering in keyboard input. Once it's done waiting, it transitions back to the 'Runnable' state and then
 *             the 'Running' state. Note this time the scheduler handles putting the thread back into the race rather than us calling a .run() method.
 * 5. Terminated: Happens when it's completed its task.
 *
 * + When to create a thread
 * In Java the main thread is associated with the main() method. So all instructions for that thread are in this method.
 * If you have a long running operation within main(), then it'll take time, and other operations will be blocked
 * until you complete the operations before it. So if you have a long operation, instead of this, you can
 * create multiple threads that work on different parts of the program.
 *
 * + How to create/use thread
 * 1. Create a Thread class
 * 2. Override run() method
 * 3. Instantiate objects
 * 4. Call 'start', which will execute the .run() method
 *
 * + Sequence and synchronization:
 * Threads always execute your code sequentially. So let's say you had one thread. For your program to start executing
 * some code or do some task, it has to finish the tasks before it. For example, in order to start working on 'Task3',
 * the main thread needs to finish 'Task1' and 'Task2'. So as a result, 'Task3' is blocked until those two earlier tasks
 * are completed.
 *
 * So if something like Task2 takes a really long time, then Task3 and the main thread will be blocked for a long time, and
 * the client will probably get a message like 'Application Window isn't responding'. So to workaround this use threads.
 * Make Task2, which is 'MyTask' class a thread, so that we can run it asynchronously. So when we run the thread for
 * Task2 (start executing task2), we don't have to wait until Task2 is finished to start Task3.
 *
 * Of course we should still think about whether this is a good idea. If Task3 relies on Task2 to be finished, then
 * this isn't a good idea. Just the basics of asynchronous and synchronous programming, know when you want your system to
 * wait and when you want to go.
 *
 * + Java Main Thread and JVM:
 *
 * 1. The JVM starts the main thread and other 'demon' threads. A 'demon' thread is just a thread that's started by JVM when
 *    your program starts.
 * 2. Your main thread is the one capable of starting child threads, and of course those child threads can execute code that
 *    creates even more child threads.
 *
 * + Credits:
 * 1. Intro: https://www.youtube.com/watch?v=r_MbozD32eo
 * 2. A little more on theory: https://www.youtube.com/watch?v=TCd8QIS-2KI
 *
 */

class MyTask extends Thread {
    // void executeTask() {
    //     for (int i = 1; i <= 10; i++) {
    //         System.out.println("Printing number: " + i);
    //     }
    // }

    // Override the run method with what your task's operation was
    @Override
    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println("Printer 1: " + i);
        }
    }
}







public class Main {


    public static void main(String[] args) {


        // First task
        displayGreeting();

        // Second task
        MyTask task = new MyTask();
        task.start(); // Starts the thread, and also runs it; non-blocking so it goes on to the next code not waiting on this for completion

        // Start our third task; in this since things are asynchronous our third task my finish before our second one, or vice versa, or they may
        // take turns completing. The main thread waiting on the sub-thread we created, or vice versa.
        // main() and MyTask thread (worker/child thread) are executing in parallel or concurrently
        printer2();

        // Instantiate your runnable and pass it to the Thread constructor.
        Runnable r = new MyTask();
        Thread task4 = new Thread(r);
        task4.start();





    }

    public static void displayGreeting() {
        System.out.println("Application has started!");
    }

    public static void printer2() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Printer 2: " + i);
        }
    }
}
