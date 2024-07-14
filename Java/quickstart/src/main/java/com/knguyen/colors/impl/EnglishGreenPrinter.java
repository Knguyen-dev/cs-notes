package com.knguyen.colors.impl;
import com.knguyen.colors.interfaces.GreenPrinter;
import org.springframework.stereotype.Component;


public class EnglishGreenPrinter implements GreenPrinter {
    public String print() {
        return "green";
    }
}
