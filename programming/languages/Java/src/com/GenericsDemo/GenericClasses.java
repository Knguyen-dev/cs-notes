package com.GenericsDemo;


public class GenericClasses {
    public static void main(String[] args) {

        MyGenericClass<Integer> myIntClass = new MyGenericClass<>(1);
        MyGenericClass<Double> myDoubleClass = new MyGenericClass<>(1.1);
        MyGenericClass<Character> myCharClass = new MyGenericClass<>('a');


    }
}
