package com.GenericsDemo;

/**
 * Rather than creating a class for the holding the value, let it be generic T, so
 * it works with any value.
 *
 * Boundary values:
 *
 * If we did <T extends Number>, then the data-type you enter must be a subclass of the Number class.
 *
 * + Credits: https://www.youtube.com/watch?v=jUcAyZ5OUm0
 */
public class MyGenericClass<T> {
    private T x;

    MyGenericClass(T x) {
        this.x = x;
    }

    public T getValue() {
        return x;
    }

    public void setValue(T x) {
        this.x = x;
    }
}
