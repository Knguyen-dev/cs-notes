package com.myfirstjava;

/*
 * Class in Java that helps us perform user input.
 */
import java.util.InputMismatchException;
import java.util.Scanner;



public class ControlFlow {
    public void arithmeticOperations() {
        // Addition
        int sum = 5 + 3; // sum is 8

        // Subtraction
        int difference = 7 - 2; // difference is 5

        // Multiplication
        int product = 4 * 6; // product is 24

        // Division; datatypes are important so be careful and use the right datatypes
        double quotient = 10.0 / 3; // quotient is 3.3333...
        int quotient2 = 10 / 3; // quotient2 is 3, which you may not want

        // Modulus (Remainder)
        int remainder = 10 % 3; // remainder is 1

        // Increment
        int count = 0;
        count++; // count is now 1

        // Decrement
        count--; // count is now 0

        // compound assignment operator
        count += 5; // add 5 to count

        // Java's 'Math' class provides a lot of handy mathematical functions that you can use.
        double powResult = Math.pow(2,3); // 2^3 is 8.0 here
        double sqrRoot = Math.sqrt(64); // 8.0
    }

    public void relationalOperators() {
        /*
        * Also known as comparison operators. The results of these experssions
        * will just be booleans.
        *
        * List of comparison operators:
        * 1. Equality ==
        * 2. Inequality !=
        * 3. Greater than >
        * 4. Less than <
        * 5. Greater than or equal to >=
        * 6. Less than or equal to <=
        *
        * With primitives, these operators compare their values, however with reference types, they check
        * they compare the references.
        * */
        String str1 = "Hi";
        String str2 = "Hi";

        boolean referenceCheck = (str1 == str2); // false, since these are two different strings at two different memory locations

        // Use the .equals method to compare the contents of the strings
        boolean contentCheck = str1.equals(str2); // true

        /*
        * Floating point comparisons: Precision errors can distort floating
        * point comparisons. To work around this, compare the absolute difference between
        * the two values against a infinitesimal threshold.
        *
        * Here result might not be exactly 0.3, but very close like 0.300000001
        * or something like that, due to the limitations of representing decimal numbers
        * in binary.
        * */

        double result = 0.2 + 0.1;

        boolean isEqual = (result == 0.3); // false due to precision errors

        // Here's the right way to do it
        double tolerance = 0.0000001;
        boolean isBasicallyEqual = Math.abs(result - 0.3) < tolerance;
    }

    public void logicalOperators() {

        boolean andResult = (5 > 3) && (7 < 12); // true, since both are true
        boolean orResult = (5 > 3) || (0 > 2); // true since left side is true
        boolean notResult = !(5>3); // false

        /*
        * + Short Circuiting in Java:
        *
        * 1. For &&, if the left operand is false then the right one is not evaluated.
        * 3. For ||, if left operand is true, the right operand is not evaluated.
        *
        * Here we ensure that str.isEmpty is only called when 'str' isn't null.
        * This avoids a potential 'NullPointerException'
        * */
        String str = null;
        if (str != null && !str.isEmpty()) {
            System.out.println("String isn't empty");
        } else {
            System.out.println("String is empty or null");
        }

        /*
         * Bitwise Operators
         *
         * 1. Bitwise AND &: Performs an OR operation on each of the corresponding bits. Then
         * with the resulting binary number, we are given the base 10 version.
         * 2. Bitwise OR |:Does a bitwise OR
         * 3. Bitwise XOR ^: Does a bitsise XOR
         */

        /*
        5: 101
        3. 011
        AND: 001, which is 1 in base 10
        */
        int bitwiseAND = 5 & 3;
    }

    public void conditionals() {
        // If statements
        int age = 21;
        if (age >= 21) {
            System.out.println("Can drink and can vote!");
        } else if (age >= 18) {
            System.out.println("Can vote!");
        } else {
            System.out.println("Can't do anything!");
        }

        // Switch statement
        int day = 2;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            default:
                System.out.println("Another day");
        }
    }

    public void iteration() {
        // For loop
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }

        // While loop
        int i = 0;
        while (i <= 5) {
            System.out.println("While Count: " + i);
            i++;
        }

        // Do-while: A while loop, but it ensures the loop runs at least once
//        int number;
//        do {
//            System.out.println("Enter a number between 1 and 10: ");
//            number = scanner.nextInt();
//        } while (number < 1 || number > 10);

        // for each loop; simplifies iterating over collections and arrays.
        int[] numbers = {1,2,3,4,5};
        for (int n : numbers) {
            System.out.println("Num: " + n);
        }

        /*
         * Loop control statements
         * - break: Exits the current loop
         * - continue: Skips the rest of the current iteration and proceeds to the nexxt iteration.
         */








    }

    public void userInput() {

        // Create our scanner that gets user input
        Scanner scanner = new Scanner(System.in);

        /*
        1. You are prompted input, the scanner will pause the program until it sees a new line character.
        2. You type "John Paulington" and hit enter
        3. The input buffer or scanner receives 'John Paulington\n'. Same thing but with a newline character at the end.
        4. The input scanner takes everything up to that newline character so 'John Paulington' which is good. It also
           skips that \n character, so the input buffer is empty now
        */
        System.out.println("Enter your name: ");
        String name = scanner.nextLine();

        /*
         * - Prompt and accept integer input
         * 1. You type in '18' and hit enter.
         * 2. Input buffer/scanner receives '10\n'
         * 3. nextInt reads up until it discovers a non-digit character.
         * 4. It gets '10', but now our input buffer still has a '\n' in it.
         *
         * NOTE: However if we don't enter a numerical value, we get a runtime error
         * called 'InputMismatch', which is pretty accurate for what happened. Don't worry
         * we'll cover exception handling in the next section.
         */
        System.out.println("How old are you?");
        int age = scanner.nextInt();

        /*
         * - Clear input buffer of '\n' character; ignoring the newline character essentially
         *
         * NOTE: IF we didn't do this, we'd then the following scanner.nextLine() would execute and get
         *       the input immediately, before the user even got the chance to enter input for thier
         *       favorite food. This is because a '\n' character was already in the input buffer, and
         *       scanner.nextLine() read it immediately and then moved on.
         */

        scanner.nextLine();

        System.out.println("What's your favorite food?");
        String food = scanner.nextLine();

        // Output everything
        System.out.println("Hello " + name);
        System.out.println("You are " + age);
        System.out.println("Favorite food: " + food);
    }
}