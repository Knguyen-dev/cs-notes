// Declares the name of our package
package com.myfirstjava;
import java.awt.*;
import java.util.Arrays;
import java.util.Date;

/*
 * + Primitives vs Reference Data Types:
 *
 * - Primitives: These are your simple data types. When you do assignment with these data types we are assigning the value.
 * Here are the list of data types:
 * 1. byte (1 byte): [-128, 127]
 * 2. short (2 bytes): [-32,768 to 32,767]
 * 3. int (4 bytes): [-2B, 2B]
 * 4. long (8 bytes)
 * 5. float (4 bytes): [3.4e−038 to 3.4e+038]; Has a precision of 7 decimal digits. You can think of it as, we can accurately represent
 * the decimal value up to a point. But after those 7 decimal digits, there is some loss in precision and confidence due to it being a floating point.
 * For example, the in float `3.14159265358979323846`, the first 7 decimal digits (`3.1415927`) will be accurately represented, but anything beyond that
 * may not be accurately stored.
 * 6. double (8 bytes): Has a precision of 15 decimal digits.
 * 7. char (2 bytes): A, B, C...; represents unicode characters, and supports international letters.
 * 8. boolean (1 byte): true/false
 * Stuff like byte, short, int, and long can only represent integers. So the 'bytes' they take, is just the amount of memory
 * that's allocated (used) to store that variable. So if a function has 4 integers, that's about 16 bytes of memory being taken
 * up whilst the function is running or when the variables are in scope. Then that memory is reclaimed when the function ends
 * as we don't need that stuff anymore.
 *
 * - Reference Types: These are complex objects. When we do assignment with a reference type
 * you aren't assigning the value of the object, but a reference (memory address) that points to said
 * object.
 *
 * - Differences:
 * 1. Origin: Primitive types are innately defined in Java, they already exist in teh language itself. Whilst
 * non-primitives, some exist innately, but others can be user defined. I mean you as a developer don't define
 * the 'int' datatype, but you may define 'User'.
 *
 * 2. Value Storage: Primitives hold a single value whilst non-primitives cna hold many and
 * do complex things with them.
 *
 * 3. Memory allocation: Primitive types are allocated memory on the stack, whilst with reference types
 * they only put a reference of themselves on the stack whilst hte actual object resides in heap memory.
 * */


class Animal {}
class Dog extends Animal {
    void bark() {}
}

public class DataTypes {

    public void primitives() {
        /*
         * Initialize a byte 'myAge', which is just an integer. We use byte since
         * someone's age probably isn't going to be larger than 127, and it's the most appropriate and memory efficient choice.
         */
        byte myAge = 30;

        // Initializing multiple variables on the same line.
        int x = 1, y = 2;

        /*
         * int can store values up to 2 billion, which make them a great candidate for
         * storing the views of a YouTube video. As well as this, when dealing with big numbers
         * you can place underscores where there would be commas. This just makes your code more readable.
         */
        int viewCount = 123_456_789;

        /*
         * By default, Java sees '3_123_123_123' as an integer. To make it recognize that
         * this is a 'long' datatype, add the letter 'l' at the end of it. It's considered
         * better to do 'L' (capitalized) as the lowercased version can look like a 1.
         */
        long bigNumber = 3_123_123_123L;

        /*
         * By default, Java sees '10.99' as a double, so to make it recognized as a float, you'd put the
         * 'F' suffix on it.
         */
        float price = 10.99F;

        /*
         * Char variables should be wrapped in single quotes, because it's one character.
         * Later you'll see that 'strings' are
         */
        char letter = 'A';

        // Standard boolean
        boolean isEligible = true;
    }

    public void referenceTypes() {
        /*
         * Reference types and instantiating class instances:
         *
         * This should be familiar, but when declaring primitives you don't need to manually allocate memory as the Java Runtime Environment
         * handles that for you automatically. However, when declaring reference types (complex objects) we need to always
         * manually allocate memory using the 'new' keyword to indicate a new object.
         *
         * Since point1 is a complex object, when we assign it to point2, we're actually
         * assigning the reference/memory address of point1. There's only one 'Point' object that's
         * been created (point1), but we now have two variables to reference it. So when we change 1, the changes
         * will be seen on the other variable, because they are literally pointing to the same Point object.
         */
        Date now = new Date();
        Point point1 = new Point(1, 1);
        Point point2 = point1;
    }

    public void stringExample() {
        /*
         * Strings in Java are reference types, like in Python and JavaScript. They are immutable,
         * so reassigning a string creates a new string object. Methods are available for string manipulation.
         */
        String str1 = "Hello";
        String str2 = str1;
        str1 = "World";

        // str1 'World'
        // str2 'Hello'
        String str3 = "Hello World" + "!!";

        // Returns boolean if it really ends with an exclamation point.
        // str3.endsWith("!"); true

        // Returns index position of first occurrence, or -1 if not found
        int index = str3.indexOf("W");

        // Replaces the target characters with the replacement character and returns a new string
        String str4 = str3.replace("!", "*");

        // Lowercases string and trims off any whitespace from both sides
        String str5 = str3.toLowerCase().trim();

        /*
         * Like other languages, to use double quotes inside a string (which already has double quotes) requires you to
         * simply escape the character with a backslash to tell Java to treat a certain character as the raw character.
         *
         * Of course there are \n and \t which add a new line and tab respectively.
         * */
        String str6 = "And he said, \"You are an amazing chef!\". What a nice dude.";

    }

    public void arrayExample() {
        // Arrays: A fixed-size list of elements, after creating an array you can't add or remove elements.
        // Elements are accessed by index. Array elements are initialized to default values (0 for int) if not explicitly set.

        // Creating an array with 5 elements
        int[] arr1 = new int[5];
        arr1[0] = 1;
        arr1[2] = 2;

        // Creating and initializing an array in one line
        int[] arr2 = {5, 4, 3, 2, 1};

        // Sorting an array
        Arrays.sort(arr2);

        // Creating a 2D array with 2 rows and 3 columns
        int[][] arr3 = new int[2][3];

        // Creating and initializing a 2D array in one line
        int[][] arr4 = {
                {1, 2, 3},
                {4, 5, 6}
        };
    }

    public void creatingConstants() {
        /*
         * To make a variable constant and unchangeable, use the
         * 'final' keyword in your initialization.
         */
        final float pi = 3.14F;
    }

    public void typeCasting() {
        /*
        * Type casting is the practice of changing one's data type to another.
        * Sometimes you'll need to do it to overcome and solve compatibility issues.
        *
        * + Implicit Casting (Automatic): When the conversion is risk-free and the 'destination type' can
        * hold the original data without loss. As a result your compiler will step in and handle the conversion
        * automatically.
        * */

        int myInt = 9;
        double myDouble = myInt;

        /*
        * + Explicit Casting (Manual): This can be risky and lead to potential data loss.
        * So here developers step in to manually convert the types.
        *
        * Here you're converting a double into an integer, which is obviously going to lead to data-loss
        * and myInt will be 9 since it always floor down.
        * */
        double myDouble2 = 9.78;
        int myInt2 = (int) myDouble2;

        /*
        * Upcasting: Casting an object as one of its parent classes. This is safe
        * since we know the Dog has everything the Animal class has and probably more.
        * So treating it as an Animal class is aafe because our Dog instance would have everything
        * needed.
        * */
        Animal myDog = new Dog();

        /*
        * Down-casting: Not as safe. The Animal class instance may not have
        * methods, fields, and other data that a Dog class instance has, yet we are treating it
        * like one anyways. Which is pretty risky.
        *
        * So the best practice is to ensure you check the types with a conditional
        * like this.
        * */

        if (myDog instanceof Dog) {
            Dog myDog2 = (Dog) myDog;
        }




    }


}