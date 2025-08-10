package com.threading;

/**
 * Abliity of the program to run two or more threads concurrently, where each thread can handle a different
 * task at the same time making optimal use of available resources.
 */


class Printer {

    /**
     * When a thread executes this method, it acquires the object's intrinsic lock (also known as a monitor lock).
     * As a result, other threads will not be able to execute any synchronized methods of this object until the lock
     * is released. The lock is released when the thread holding it completes the execution of this method or exits
     * the method due to an exception. This locking mechanism applies to all synchronized methods of this object,
     * ensuring that only one thread can execute any of these methods at a time.
     *
     * NOTE 1: Somewhat similar to databases and how they have locks as well. You could mimick something similar if you
     * do encapsulation of fields and synchronize their setters and getters. Ensuring that only one thread can increment
     * the count at a time, and also to ensure that the read operation is thread-safe and that we don't have weird
     * data corruption, manipulation, and race conditions.
     *
     * NOTE 2: Race conditions is when the behavior of a program depends on the timing of multiple threads, processes, or async operations.
     * Here it's like multiple threads trying to access and change data at the same time, which can be messy and make our data erroneous.
     */
    synchronized void printDocuments(int n, String docName) {
        for (int i = 0; i < n; i++) {
            System.out.println("Printing document: " + docName);
        }
    }
}

// Create a custom thread for printing documents; we accept a reference to a printer for this
// As a result you can have various different printers printing off documents on different threads.
// So your printers shouldn't be blocking each other since they are all on separate threads
class MyThread extends Thread {
    Printer pRef;
    MyThread(Printer p) {
        pRef = p;
    }

    @Override
    public void run() {
        pRef.printDocuments(10, "My-Profile.pdf");
    }
}

class YourThread extends Thread {
    Printer pRef;
    YourThread(Printer p) {
        pRef = p;
    }
    @Override
    public void run() {
        pRef.printDocuments(10, "Your-Profile.pdf");
    }
}


public class MultiThreading {

    public static void main(String[] args) {

        System.out.println("Application start!");

        Printer printer = new Printer();
        // printer.printDocuments(7, "MyDocument.pdf")
        /*
         * - Situation: Essentially we have two threads running on the same printer, so the same printer is printing 2
         *   different documents at the same time. In this case, this isn't really a good use of threads, you want it
         *   to be synchronous. Though this idea would make sense if multiple threads were working on the same document.
         *
         * - So we want this stuff synchronized and sequential again. You can use the join() method on a thread to
         * ensure that our program waits synchronously for that thread to be completed before moving on. This can
         * be great as you may have multiple threads running on different printing operations. Such as 'write()', but
         * you may also have deliver() function that opens your printer and slides out the paper. You only want this
         * paper delivering to happen once the other threads have finished finalizing the document. So you can do
         * join() on all of the other threads to make them wait at a certain point in the program, and after you
         * may call your deliver() method.
         *
         * In this case, we're waiting on myThread to finish printing documents until we start printing documents for
         * whatever myThread has. However, we don't want to repeat this myThread.join() everytime for every printing job.
         * So use the 'synchronize' keyword
         */
        MyThread myThread = new MyThread(printer);
        YourThread yourThread = new YourThread(printer);

        myThread.start();

        // try {
        //     // Wait until thread is finished (printing is done) in order to move on to the next line in the code
        //     myThread.join();
        // } catch (InterruptedException e) {
        //     System.out.println("Error: " + e.getMessage());
        // }
        yourThread.start();





        System.out.println("Application end!");
    }
}
