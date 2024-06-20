package com.threading;


class Parent {

}

/**
 * Multiple inheritance isn't allowed in Java, so how do you make a class a thread when it's already a child class?
 * You'd use the 'Runnable Interface'
 *
 */
// class ChildClass extends ParentClass, Thread { }

public class Child extends Parent implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < ; i++) {
            System.out.println("Printer 3: " + i);
        }

    }
}
