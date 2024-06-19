package com.GenericsDemo;

public class GenericMethods {
    public static void main(String[] args) {
    }

    public static void ex1() {
        // In java generics can't be used with primitives, so the workaround is using their wrapper types
        Integer[] integers = {1,2,3,4,5};
        Double[] doubles = {5.5, 4.4, 3.3, 2.2};
        Character[] characters = {'h','e','l','l','o'};
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
