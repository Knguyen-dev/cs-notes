package com.OOP;

/**
 * Generics: Enables types (classes and interfaces) to be parameters when creating other classes, interfaces, and methods.
 * As a result, it eliminates the need to create multiple versions of the same method, class, etc. just so that it
 * can support different data-types
 *
 * Same idea as templates functions in C++.
 */

public class GenericsDemo {
    public static void main(String[] args) {
    }

    public static void ex1() {
        int[] integers = {1,2,3,4,5};
        double[] doubles = {5.5, 4.4, 3.3, 2.2};
        char[] characters = {'h','e','l','l','o'};
        String[] strings = {"B", "Y", "E"};
    }

    public static <T> void displayArray(T[] array) {
        for (T x : array) {
            System.out.print(x + " ");
        }
        System.out.println();
    }

    public static <T> T getFirstElement(T[] array) {
        return array[0];
    }


}
