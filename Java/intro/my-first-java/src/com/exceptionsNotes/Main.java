package com.exceptionsNotes;

import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {


    }

    public static void exceptionHandling() {
        /*
         * If you divided by zero you'd get something like 'ArithmeticException'
         * and it'll show you the location it occurred approximately.
         *
         * To handle exceptions, surround 'dangerous' code in a try/catch block
         */

        // Old version of try/catch/finally; here in our finally block we manually close resources like scanners, files, etc.
        // Scanner scanner = new Scanner(System.in);
        //try {
        //    System.out.println("Enter a whole number to divide");
        //    int x = scanner.nextInt();
        //    System.out.println("Enter a whole number to divide by");
        //    int y = scanner.nextInt();
        //    int z = x / y;
        //    System.out.println("Result: " + z);
        //} catch (ArithmeticException e) {
        //    // Catch block in case the user tries to divide by 0.
        //    System.out.println("You can't divide by 0!");
        //} catch (InputMismatchException e) {
        //    // Catch block in case the user doesn't enter a number for either input prompts
        //    System.out.println("Please enter a number dude!");
        //} catch (Exception e) {
        //    // General catch block for any other exceptions; of course use this last
        //    System.out.println("Something unexpected happened: " + e.getMessage());
        //} finally {
        //    /*
        //     *  Always executes regardless of whether an exception was caught.
        //     *
        //     * A good use for this is closing any scanners or files that you had previously
        //     * opened due to reading input.
        //     */
        //    scanner.close();
        //    System.out.println("Finally, this will always print by the way!");
        //}

        /*
         * New version using try-with-resources
         *
         * This statement automatically manages the closing of resources such
         * as such Scanner, to ensure that they are properly closed at the end of the
         * statement. This reduces the need for a finally block to close
         * the resources manually, and helps prevent resource/memory leaks.
         *
         */
        try (Scanner scanner = new Scanner(System.in)) {

            System.out.println("Enter a whole number to divide");
            int x = scanner.nextInt();

            System.out.println("Enter a whole number to divide by");
            int y = scanner.nextInt();

            int z = x / y;

            System.out.println("Result: " + z);
        } catch (ArithmeticException e) {
            System.out.println("You can't divide by zero");
        } catch (InputMismatchException e) {
            System.out.println("Please enter a number dude!");
        } catch (Exception e) {
            System.out.println("Something unexpected happened: " + e.getMessage());
        } finally {
            // The finally block was typically used for closing resources, but now it's basically optional
            // You can use it for other logic that isn't resource management
            System.out.println("Finally, this will always print at the end!");
        }
    }


    /**
     * A custom function that checks if a user is of age. If they are then it executes
     * and returns nothing (successful). Else it will throw an error
     *
     * If your method can throw a 'checked' exception, then you need to include that information in
     * the function's header.
     *
     * 1. Checked exceptions: These are expected errors, either custom or built-in that are expected
     * to be thrown. Things such as 'IOException', 'SQLException', and even 'Exception'.
     * 2. Unchecked: Any exception caused  by unexpected conditions and whatnot. Such as index out of range, runtime
     * or even NullPointerException.
     *
     * + When to define 'throws' in function header:
     * 1. When your method throws a checked exception
     * 2. When you want the caller of your method to handle the exception in their own try/catch block. So the
     * function throwing the exception is kind of saying like the exception is almost like a return type, so the
     * caller of said function should be ready in case an exception is thrown.
     *
     * @param age- Age of the user
     * @throws AgeException - A custom exception that can be thrown from the function
     */
    static void checkAge(int age) throws AgeException {
        if (age < 18) {
            throw new AgeException("You are under 18, please leave!");
        }
    }

    public static void customExceptions() {


        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Enter your age: ");
            int age = scanner.nextInt();


        } catch (Exception e) {

            System.out.println("A problem occurred: " + e);
        }

    }
}
